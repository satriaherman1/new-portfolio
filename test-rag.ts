import { searchData } from "./src/utils/rag";

const queries = [
  "Tell me about Power One",
  "What is your experience with React?",
  "which company he's has been working",
  "i want to contact him"
];

console.log("--- RAG VERIFICATION ---\n");

queries.forEach(q => {
  console.log(`QUERY: "${q}"`);
  const result = searchData(q, 3);
  console.log("CONTEXT FOUND:");
  console.log(result ? result.substring(0, 200) + "..." : "No context found.");
  console.log("\n--------------------------------------------------\n");
});
