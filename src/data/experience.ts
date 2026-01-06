export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "TechCorp Solutions",
    role: "Senior Fullstack Developer",
    period: "2023 - Present",
    description:
      "Lead development of enterprise applications serving 500+ internal users. Architect and implement critical business systems including ERP modules and approval workflows.",
    highlights: [
      "Designed and built modular ERP system reducing manual processes by 60%",
      "Implemented role-based access control system across 5 business units",
      "Led migration from legacy PHP system to modern React + Node.js stack",
    ],
  },
  {
    id: "exp-2",
    company: "Digital Innovations Inc",
    role: "Fullstack Developer",
    period: "2021 - 2023",
    description:
      "Developed internal tools and business applications for finance and operations teams. Collaborated with product managers to translate requirements into technical solutions.",
    highlights: [
      "Built budget approval system processing $2M+ monthly transactions",
      "Created real-time dashboard for operations monitoring and KPI tracking",
      "Reduced report generation time from 2 hours to 5 minutes through automation",
    ],
  },
  {
    id: "exp-3",
    company: "StartUp Ventures",
    role: "Junior Developer",
    period: "2020 - 2021",
    description:
      "Contributed to full-stack development of SaaS products. Learned best practices in agile development, code review, and continuous integration.",
    highlights: [
      "Developed REST APIs serving 10K+ daily active users",
      "Implemented responsive UI components using React and Tailwind CSS",
      "Participated in code reviews and improved test coverage by 40%",
    ],
  },
];
