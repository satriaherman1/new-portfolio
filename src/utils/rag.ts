import { projects } from "../data/projects";
import { experiences } from "../data/experience";
import { systemDesigns } from "../data/systemDesign";
import { profile, aboutContent } from "../data/profile";
import { skillCategories } from "../data/skills";

// ------------------------------------------------------------------
// 📚 KNOWLEDGE BASE DEFINITIONS
// ------------------------------------------------------------------

interface KnowledgeItem {
  id: string;
  type: "project" | "experience" | "system-design" | "profile" | "skill";
  title: string;
  content: string;
  tags: string[];
}

// ------------------------------------------------------------------
// 🛠️ DATA INDEXING
// ------------------------------------------------------------------

const knowledgeBase: KnowledgeItem[] = [];

// Index Profile
knowledgeBase.push({
  id: "profile-main",
  type: "profile",
  title: `${profile.name} - ${profile.role}`,
  content: `${profile.tagline}\n${aboutContent.paragraphs.join("\n")}\nHighlights: ${aboutContent.highlights.join(", ")}`,
  tags: ["about", "profile", "contact", "email", "linkedin", "github", "bio"],
});

// Index Skills
skillCategories.forEach((cat) => {
  knowledgeBase.push({
    id: `skill-${cat.title}`,
    type: "skill",
    title: `Skills: ${cat.title}`,
    content: cat.skills.map((s) => s.name).join(", "),
    tags: [cat.title.toLowerCase(), ...cat.skills.map((s) => s.name.toLowerCase())],
  });
});

// Index Projects
projects.forEach((p) => {
  knowledgeBase.push({
    id: p.id,
    type: "project",
    title: p.title,
    content: `Problem: ${p.problem}\nSolution: ${p.solution}\nImpact: ${p.impact}\nTech Stack: ${p.techStack.join(", ")}`,
    tags: ["project", "portfolio", p.category.toLowerCase(), ...p.techStack.map(t => t.toLowerCase())],
  });
});

// Index Experience
experiences.forEach((e) => {
  knowledgeBase.push({
    id: e.id,
    type: "experience",
    title: `${e.role} at ${e.company}`,
    content: `${e.period}\n${e.description}\nHighlights:\n${e.highlights.map((h) => `- ${h}`).join("\n")}`,
    tags: ["experience", "work", "job", "career", e.company.toLowerCase(), e.role.toLowerCase()],
  });
});

// Index System Designs
systemDesigns.forEach((sd) => {
  knowledgeBase.push({
    id: sd.id,
    type: "system-design",
    title: sd.title,
    content: `Problem: ${sd.problem}\nArchitecture: ${sd.architecture}\nWhy it works: ${sd.whyItWorks}\nKey Components: ${sd.keyComponents.join(", ")}`,
    tags: ["system design", "architecture", "design pattern", ...sd.keyComponents.map(k => k.toLowerCase())],
  });
});

// ------------------------------------------------------------------
// 🔍 SEARCH LOGIC
// ------------------------------------------------------------------

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
}

export function searchData(query: string, limit = 5): string {
  if (!query.trim()) return "";

  const queryTokens = tokenize(query);
  const normalizedQuery = query.toLowerCase();

  // Context Boosting
  const boostExperience = /work|working|company|job|role|career|employ|position|experience/.test(normalizedQuery);
  const boostProject = /project|build|create|develop|app|web|system/.test(normalizedQuery);
  const boostSkill = /skill|stack|tech|technology|language|framework/.test(normalizedQuery);
  
  const results = knowledgeBase.map((item) => {
    let score = 0;

    // Token matching
    const titleTokens = tokenize(item.title);
    const contentTokens = tokenize(item.content);
    const tagTokens = item.tags.flatMap(t => tokenize(t));

    queryTokens.forEach((qt) => {
      if (titleTokens.includes(qt)) score += 10; // High weight for title match
      if (tagTokens.includes(qt)) score += 5;    // Medium weight for tags
      if (contentTokens.includes(qt)) score += 1; // Low weight for content body
    });

    // Apply Context Boosts
    if (score > 0) {
      if (boostExperience && item.type === "experience") score += 20;
      if (boostProject && item.type === "project") score += 10;
      if (boostSkill && item.type === "skill") score += 10;
    }

    return { item, score };
  });

  // Filter relevant results and sort by score
  const topResults = results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (topResults.length === 0) {
    // If no specific match, return a broad summary (optional, or let the LLM handle it)
    return "";
  }

  return topResults
    .map((r) => `[${r.item.type.toUpperCase()}] ${r.item.title}\n${r.item.content}`)
    .join("\n\n---\n\n");
}
