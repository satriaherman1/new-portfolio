export interface SystemDesign {
  id: string;
  title: string;
  problem: string;
  architecture: string;
  whyItWorks: string;
  keyComponents: string[];
}

export const systemDesigns: SystemDesign[] = [
  {
    id: "sd-1",
    title: "Approval Workflow Engine",
    problem:
      "Business processes require flexible, multi-level approval chains that vary by department, amount, and request type. Static workflows cannot adapt to changing business rules.",
    architecture:
      "Event-driven architecture with configurable workflow definitions stored in database. State machine pattern handles approval states and transitions. Rule engine evaluates conditions for automatic routing.",
    whyItWorks:
      "Separating workflow logic from business rules allows non-technical users to modify approval chains without code changes. Event sourcing provides complete audit trail.",
    keyComponents: [
      "Workflow Definition Store",
      "State Machine Processor",
      "Rule Engine",
      "Notification Service",
      "Audit Logger",
    ],
  },
  {
    id: "sd-2",
    title: "Modular ERP Architecture",
    problem:
      "Traditional monolithic ERP systems are rigid and expensive to customize. Organizations need ability to adopt modules incrementally without full system replacement.",
    architecture:
      "Microservices-inspired modular monolith with clear boundaries between domains. Shared database with schema isolation per module. Event bus for cross-module communication.",
    whyItWorks:
      "Module isolation enables independent development and testing while shared infrastructure reduces operational overhead. Can extract to true microservices when scale demands.",
    keyComponents: [
      "Module Registry",
      "Shared Auth Service",
      "Event Bus",
      "API Gateway",
      "Schema Manager",
    ],
  },
  {
    id: "sd-3",
    title: "Role-Based Access Control System",
    problem:
      "Complex organizations need granular permission control that reflects organizational hierarchy. Simple role systems cannot handle cross-functional access requirements.",
    architecture:
      "Hierarchical RBAC with permission inheritance. Roles contain permissions, users belong to roles, and organizaional units scope access. Permission caching layer for performance.",
    whyItWorks:
      "Hierarchical design reflects real organizational structure. Permission inheritance reduces admin burden. Caching ensures sub-millisecond permission checks at request time.",
    keyComponents: [
      "Role Manager",
      "Permission Registry",
      "Hierarchy Resolver",
      "Cache Layer",
      "Audit Service",
    ],
  },
];
