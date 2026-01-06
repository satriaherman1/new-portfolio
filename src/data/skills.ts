export interface Skill {
  name: string;
  level?: "proficient" | "experienced" | "familiar";
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Python / Flask", level: "proficient" },
      { name: "Node.js / Express", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "MySQL", level: "experienced" },
      { name: "Redis", level: "experienced" },
      { name: "REST API Design", level: "proficient" },
      { name: "GraphQL", level: "familiar" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: "proficient" },
      { name: "Next.js", level: "experienced" },
      { name: "TypeScript", level: "proficient" },
      { name: "Tailwind CSS", level: "proficient" },
      { name: "GSAP", level: "experienced" },
      { name: "Responsive Design", level: "proficient" },
    ],
  },
  {
    id: "tools",
    title: "System & Tools",
    icon: "terminal",
    skills: [
      { name: "Git / GitHub", level: "proficient" },
      { name: "Docker", level: "experienced" },
      { name: "Linux / Ubuntu", level: "experienced" },
      { name: "CI/CD Pipelines", level: "experienced" },
      { name: "AWS / Cloudflare", level: "familiar" },
      { name: "Nginx", level: "experienced" },
    ],
  },
];
