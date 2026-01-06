import { GoogleGenAI, type Content } from "@google/genai";
import { profile, aboutContent } from "../data/profile";
import { projects } from "../data/projects";
import { skillCategories as skills } from "../data/skills";

// ===================================
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
// 🧾 SYSTEM PROMPT
// ===================================
const SYSTEM_INSTRUCTION = `
You are an AI assistant for the portfolio website of ${profile.name}, a ${profile.role}.
Your role is to answer questions about ${profile.name}'s skills, experience, and projects.
Be professional, friendly, and concise.

Here is the context about ${profile.name}:

PROFILE:
${profile.tagline}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}

ABOUT:
${aboutContent.paragraphs.join("\n")}
Highlights: ${aboutContent.highlights.join(", ")}

SKILLS:
${skills
  .map(cat => `${cat.title}: ${cat.skills.map(s => s.name).join(", ")}`)
  .join("\n")}

PROJECTS:
${projects
  .map(
    p =>
      `- ${p.title} (${p.category}): ${p.problem} Solution: ${p.solution} Tech: ${p.techStack.join(", ")}`
  )
  .join("\n")}

If asked about something not in this context, politely say you don't have that information but suggest contacting ${profile.name} directly via email.
`;

// ===================================
// 💬 NORMAL CHAT
// ===================================
export async function getChatResponse(message: string) {
  try {
    chatHistory.push({ role: "user", parts: [{ text: message }] });

    if (chatHistory.length > MAX_HISTORY) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }

    const response = await callWithFailover(() =>
      client.models.generateContent({
        model: "gemini-2.5-flash",
        config: { systemInstruction: SYSTEM_INSTRUCTION },
        contents: chatHistory,
      })
    );

    const text = response.text;

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
    chatHistory.push({ role: "user", parts: [{ text: message }] });

    if (chatHistory.length > MAX_HISTORY) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }

    const result = await callWithFailover(() =>
      client.models.generateContentStream({
        model: "gemini-2.5-flash",
        config: { systemInstruction: SYSTEM_INSTRUCTION },
        contents: chatHistory,
      })
    );

    let fullText = "";

    // ⚠️ IMPORTANT: use result.stream
    for await (const chunk of result.stream) {
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
