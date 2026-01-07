import { GoogleGenAI, type Content } from "@google/genai";
import { profile } from "../data/profile";
import { searchData } from "./rag";
// 🔑 MULTI API KEY SETUP
// ===================================
const API_KEYS = (import.meta.env.VITE_GEMINI_API_KEYS || "")
  .split(",")
  .map((k: string) => k.trim())
  .filter(Boolean);

if (API_KEYS.length === 0) {
  throw new Error("No Gemini API keys provided!");
}

let currentKeyIndex = 0;

function createClient() {
  return new GoogleGenAI({
    apiKey: API_KEYS[currentKeyIndex],
  });
}

let client = createClient();

function rotateKey() {
  currentKeyIndex++;
  if (currentKeyIndex >= API_KEYS.length) {
    throw new Error("All Gemini API keys have exhausted their quota.");
  }
  console.warn("🔁 Switching Gemini API key to index:", currentKeyIndex);
  client = createClient();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isQuotaError(err: any): boolean {
  const msg = String(err?.message || err).toLowerCase();
  return (
    msg.includes("quota") ||
    msg.includes("rate") ||
    msg.includes("resource_exhausted") ||
    msg.includes("429")
  );
}

// Retry wrapper
async function callWithFailover<T>(fn: () => Promise<T>): Promise<T> {
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (isQuotaError(err)) {
        console.warn("⚠️ Gemini quota hit, rotating key...");
        rotateKey();
        continue;
      }
      throw err;
    }
  }
}

// ===================================
// 🧠 CHAT MEMORY
// ===================================
let chatHistory: Content[] = [];
const MAX_HISTORY = 20;

// ===================================
// 💬 NORMAL CHAT
// ===================================
export async function getChatResponse(message: string) {
  try {
    // 1. Retrieve relevant context
    const retrievedContext = searchData(message);
    
    // 2. Construct System Instruction with Context
    const systemInstruction = `
You are an AI assistant for the portfolio website of ${profile.name}, a ${profile.role}.
Your name is Antonio AI.
Your role is to answer questions about ${profile.name}'s skills, experience, and projects.
Be professional, friendly, and concise.

${retrievedContext ? `
Here is some relevant information found in ${profile.name}'s portfolio based on the user's query:

${retrievedContext}

Use this information to answer the question accurately.
` : `
I don't have specific information in my knowledge base about this exact query, so answer generally based on your knowledge of ${profile.name} as a Software Engineer, or politely decline if it's completely unrelated.
`}

If the user asks about something clearly outside the scope of ${profile.name}'s professional work, politely redirect them.
    `;

    chatHistory.push({ role: "user", parts: [{ text: message }] });

    if (chatHistory.length > MAX_HISTORY) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }

    const response = await callWithFailover(() =>
      client.models.generateContent({
        model: "gemini-2.5-flash",
        config: { systemInstruction: systemInstruction.trim() },
        contents: chatHistory,
      })
    );

    const text = response.text || "I didn't get a response. Please try again.";

    chatHistory.push({ role: "model", parts: [{ text }] });

    return text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I'm having trouble connecting to the AI right now. Please try again later.";
  }
}

// ===================================
// ⚡ STREAMING CHAT
// ===================================
export async function* getChatResponseStream(message: string): AsyncGenerator<string, void, unknown> {
  try {
    // 1. Retrieve relevant context
    const retrievedContext = searchData(message);

    // 2. Construct System Instruction with Context
    const systemInstruction = `
You are an AI assistant for the portfolio website of ${profile.name}, a ${profile.role}.
Your name is Antonio AI.
Your role is to answer questions about ${profile.name}'s skills, experience, and projects.
Be professional, friendly, and concise.

${retrievedContext ? `
Here is some relevant information found in ${profile.name}'s portfolio based on the user's query:

${retrievedContext}

Use this information to answer the question accurately.
` : `
I don't have specific information in my knowledge base about this exact query, so answer generally based on your knowledge of ${profile.name} as a Software Engineer, or politely decline if it's completely unrelated.
`}

If the user asks about something clearly outside the scope of ${profile.name}'s professional work, politely redirect them.
    `;

    chatHistory.push({ role: "user", parts: [{ text: message }] });

    if (chatHistory.length > MAX_HISTORY) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }

    const result = await callWithFailover(() =>
      client.models.generateContentStream({
        model: "gemini-2.5-flash",
        config: { systemInstruction: systemInstruction.trim() },
        contents: chatHistory,
      })
    );

    let fullText = "";

    // ⚠️ IMPORTANT: result IS the stream (AsyncGenerator)
    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        yield text; // send partial to UI
      }
    }

    chatHistory.push({ role: "model", parts: [{ text: fullText }] });

  } catch (error) {
    console.error("Gemini Chat Stream Error:", error);
    yield "Sorry, I'm having trouble connecting to the AI right now. Please try again later.";
  }
}

// ===================================
// 🧹 OPTIONAL: RESET CHAT
// ===================================
export function resetChat() {
  chatHistory = [];
}
