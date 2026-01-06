export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  impact: string;
  category: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Enterprise Resource Planning System",
    problem:
      "Organization struggled with fragmented data across multiple spreadsheets and legacy systems, causing delays in decision-making and frequent data inconsistencies.",
    solution:
      "Built a unified ERP platform with modules for inventory, procurement, and finance. Implemented real-time data sync across departments with role-based access control.",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    impact:
      "Reduced data entry errors by 80% and decreased report generation time from days to minutes. Now serving 200+ daily active users.",
    category: "Enterprise System",
    imageUrl: "/images/erp.png",
  },
  {
    id: "proj-2",
    title: "Budget Approval Workflow System",
    problem:
      "Manual budget approval process via email and paper forms led to lost requests, unclear approval chains, and no audit trail for compliance.",
    solution:
      "Designed multi-level approval workflow engine with configurable rules, automated notifications, and complete audit logging. Integrated with existing finance systems.",
    techStack: ["React", "Flask", "PostgreSQL", "Celery", "Redis"],
    impact:
      "Approval cycle time reduced from 2 weeks to 3 days. Achieved 100% audit compliance with full request traceability.",
    category: "Workflow Automation",
    imageUrl: "/images/budget.png",
  },
  {
    id: "proj-3",
    title: "Operations Dashboard",
    problem:
      "Operations team lacked real-time visibility into KPIs and spent hours manually compiling reports from multiple data sources.",
    solution:
      "Created real-time dashboard aggregating data from 5+ sources. Built automated report generation with scheduled email delivery and export capabilities.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js", "Cron"],
    impact:
      "Eliminated 10+ hours of weekly manual reporting. Enabled data-driven decisions with real-time metrics visibility.",
    category: "Business Intelligence",
    imageUrl: "/images/operations.png",
  },
  {
    id: "proj-4",
    title: "Document Management System",
    problem:
      "Critical documents scattered across file shares, emails, and physical storage made retrieval difficult and posed security risks.",
    solution:
      "Implemented centralized document repository with version control, full-text search, and granular access permissions. Added workflow for document review and approval.",
    techStack: ["React", "Node.js", "Elasticsearch", "MinIO", "PostgreSQL"],
    impact:
      "Document retrieval time reduced from hours to seconds. Achieved compliance with document retention policies.",
    category: "Content Management",
    imageUrl: "/images/document.png",
  },
];
