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
    company: "Systex Asia",
    role: "Software Engineer",
    period: "Jun 2025 - Present",
    description:
      "Build and Develop Robust and Scalable ERP System to support operational of Power Plant(PLTU Tanjung Jati B unit 5&6)",
    highlights: [
      "Designed and built modular ERP system reducing manual processes by 60%",
      "Implemented role-based access control system across 5 business units",
      "Successfully handle race condition that affected system performance and increase system efficiency by 20%",
      "Actively participated in code reviews and iterative development to improve system quality and team productivity."
    ],
  },
  {
    id: "exp-2",
    company: "22222-Labs",
    role: "Software Engineer",
    period: "Oct 2023 - Feb 2025",
    description:
      "Engineered and maintained a diverse suite of digital products, including a social media platform, a real-time price tracking system for luxury timepieces, and an AI-powered virtual try-on solution for fashion retail.",
    highlights: [
      "Optimized Core Web Vitals (FCP, LCP, CLS) resulting in 40% overall performance improvement and significantly better user experience.",
      "Designed and implemented CI/CD pipeline using GitHub Actions, automating build & deployment process and reducing release time and human error.",
      "Integrated Stripe payment gateway, enabling secure, scalable, and seamless online transactions.",
    ],
  },
  {
    id: "exp-3",
    company: "Medictrek",
    role: "Frontend Engineer",
    period: "Oct 2022 - Sept",
    description:
      "Developed a web-based platform for private doctor booking and medical record management, enabling patients to schedule appointments and doctors to securely manage patient medical histories.",
    highlights: [
      "Designed and implemented a responsive, tablet-optimized user interface for iPad, delivering a smooth and intuitive user experience across devices.",

    ],
  },
  {
    id: "exp-4",
    company: "PT Clodeo Indonesia Jaya",
    role: "Frontend Developer",
    period: "Aug 2021 - Aug 2022",
    description:
      "Contributed to full-stack development of Logistic Aggregator for SMEs. Learned best practices in agile development, code review, and continuous integration.",
    highlights: [
      "Contributed to feature delivery and bug fixes in a collaborative team environment following Agile and CI/CD best practices.",
      "Collaborated closely with designers, backend engineers, and stakeholders, ensuring clear communication and smooth feature delivery.",
      "Worked effectively in a team environment, contributing to discussions, planning, and problem-solving to achieve project goals."

    ],
  },
];
