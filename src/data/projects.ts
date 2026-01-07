export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  impact: string;
  category: string;
  imageUrl: string;
  client: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Power One - All in One Power Plant Resource Planning System",
    problem:`Previously, the company relied heavily on many **subscription-based enterprise applications** to support daily operations. Over time, the power plant had to manage dozens of separate systems that were fragmented and could not be customized to fit specific business processes.

Another major challenge was that **each application had its own user management system**, forcing administrators to manage users, roles, and permissions separately in every system. This created:

- High administrative overhead  
- Inconsistent access control  
- Higher risk of misconfiguration and security issues  
- Inefficient onboarding and offboarding process  

Overall, this resulted in operational inefficiencies, scattered data, high operational cost, and complex system maintenance.
`,
    solution:
      `
My team and I proposed and developed an **All-in-One ERP Platform** called **Power One** to unify all internal systems into a single integrated ecosystem.

Power One centralizes and digitizes key operational workflows, including:

- Digital Checksheet  
- FABA Monitoring  
- Budget Management  
- Warehouse Management  

In addition, we designed and implemented a **centralized RBAC (Role-Based Access Control) user management system** that works across all modules and applications.

We also successfully **replaced several subscription-based enterprise applications such as ELO and Eclipse PTW** with in-house integrated modules inside Power One.

This allows administrators to:

- Manage users in one place  
- Assign roles and permissions consistently  
- Control access across all systems from a single source of truth  
`,
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    impact:`- Successfully replaced enterprise subscription applications like **ELO** and **Eclipse PTW**  
- Significantly reduced dependency on third-party subscription systems  
- Reduced operational and licensing costs  
- Eliminated the need to manage users in multiple systems  
- Reduced administrative workload and operational complexity  
- Improved security and consistency of access control  
- Faster user onboarding and role changes  
- Increased efficiency through a unified and integrated platform  
- Better data visibility and cross-department collaboration  `,
    category: "Enterprise System",
    imageUrl: "/images/power-one.jpeg",
    client: "Systex Asia",
  },
  {
    id: "proj-2",
    title: "Real or Fake Watch Authentication",
    problem:`Before RealorFake existed, luxury watch authentication was a slow, manual, and expensive process. Collectors, buyers, and sellers had to rely on experts or physical inspection to verify whether a watch was genuine or fake.

22222 Labs saw a bigger opportunity: build a product that could **instantly verify the authenticity of a luxury watch using AI**, directly from a phone — especially on iOS devices.

However, the challenge was not only about the AI.

From the engineering side, we had to solve several problems at once:

- The product had to work smoothly on mobile devices.  
- It had to be discoverable on Google, because content and brand pages are crucial for trust and growth.  
- A single rendering strategy could not satisfy both the **product experience** and **SEO needs**:
  - CSR gave us poor SEO.  
  - SSG was good for SEO, but content updates were not instant.  
  - SSR solved both, but the server cost would be too expensive for a fast-growing product.  

On top of that, the team needed a way to **ship content updates continuously** without increasing infrastructure cost.`,
    solution:`We decided to design RealorFake as **two separate applications**: a **Main App** and a **Landing App**.

The **Main App** focuses purely on the product experience:

- Users can scan a watch image and verify its authenticity using AI.  
- If the AI cannot detect the model, users can manually search the watch type.  
- The result is saved to Firebase.  
- Users can sign in using OTP and pay using Stripe with Google Pay and Apple Pay.  

The **Landing App** focuses on growth and SEO:

- Built using **Next.js Static Site Generation (SSG)**.  
- Articles are powered by Hygraph and brand pages by Supabase.  
- We generate \`sitemap.xml\` and OpenGraph metadata so search engines and social media can easily index and preview our pages.  

To keep the content fresh without using expensive servers, I built a **CI/CD pipeline using GitHub Actions** that automatically rebuilds the static site every 3 days and deploys it to **Cloudflare Pages**.

With this setup, we achieved:

- Great SEO performance  
- Low infrastructure cost  
- Fast and reliable user experience on mobile  
`,
    techStack: ["React", "Flask", "PostgreSQL", "Celery", "Redis"],
    impact:`
After several months of development, **RealorFake was successfully launched by 22222 Labs in June 2024** as a real-world AI authentication platform for luxury watches.

This architecture allowed the team to:

- Deliver a **fast mobile-first product** for end users  
- Achieve **strong SEO presence** for brands and articles  
- Keep **server costs very low** by relying on static delivery  
- Scale content and features without reworking the core system  

For me personally, this project was a major milestone:

- I was responsible for key **technical decisions and architecture**  
- I owned the **performance, SEO, and CI/CD pipeline**  
- I helped bring a complex AI product from **idea to production launch**  `,
    category: "Workflow Automation",
    imageUrl: "/images/realorfake.png",
    client: "22222 Labs",
  },
  {
    id: "proj-3",
    title: "Volta Indonesia",
    problem:
        `
Before having their own website, Volta Indonesia relied on third-party marketplaces like Blibli to sell their electric motorcycles and spare parts. While this worked for sales, it did not help build **strong brand identity** or give Volta full control over their customer experience.

As the business grew, Volta needed more than just a marketplace presence. They needed a platform that could:

- Represent Volta as an official brand website  
- Handle direct product sales and checkout  
- Showcase their motorcycles in an interactive **360° / 3D-like view**  
- Publish articles and updates  
- Allow the internal team to manage orders from an admin panel  

In short, Volta needed a **complete digital platform**, not just another online catalog.
`,
    solution:`
We decided to build a **full-featured official website and e-commerce platform** for Volta Indonesia using **Next.js** to ensure good performance and strong SEO.

To solve each requirement:

- We used **Next.js** as the frontend framework to get fast performance and SEO-friendly pages.  
- For the 360° product experience, we implemented **JS-Image-Cloud-360**, based on the available assets provided by Volta. This allowed users to interactively explore the motorcycle from all angles.  
- We built an **article system** with an editor in the admin panel so the marketing team could publish content easily.  
- We implemented a **checkout system** and connected it to the admin panel so the team could monitor and manage incoming orders.  

As a Frontend Developer, my role was to:

- Translate UI/UX designs into a **clean, interactive, and responsive website**  
- Collaborate closely with the backend team to integrate the frontend with the system using **RESTful APIs**  
`,
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js", "React"],
    impact:`
After several months of development, the official website **https://voltaindonesia.com** was successfully launched in **June 2021**.

This platform allowed Volta to:

- Establish a **strong official online presence and brand identity**  
- Sell products directly through their own website  
- Showcase products in an interactive and modern way  
- Manage articles and orders from their own system  

The project also proved how **good teamwork and communication** helped us deliver a complex product from concept to production.
`,
    category: "Ecommerce",
    imageUrl: "/images/volta.jpeg",
    client: "Volta Indonesia",
  },
  {
    id: "proj-4",
    title: "Screening Boost",
    problem:
      `In many companies, the recruitment process still relies heavily on **manual CV screening**. HR teams have to read hundreds or even thousands of resumes one by one, which is:

- Time-consuming  
- Inconsistent (depends on who reads the CV)  
- Prone to human error and bias  
- Slow down the overall hiring process  

Because of this, many good candidates can be missed, while HR teams spend too much time on **repetitive administrative work** instead of focusing on interviews and decision making.

The company needed a system that could:

- Automatically screen and filter candidates  
- Standardize the screening process based on defined criteria  
- Help HR focus only on the **most relevant candidates**  
- Speed up the recruitment pipeline significantly  
`,
    solution:`
We built **ScreeningBoost**, a platform designed to **automate and optimize the CV screening process**.

The system allows HR teams to:

- Upload candidate CVs in bulk  
- Parse and extract important information such as skills, experience, and education  
- Apply screening rules and criteria to filter candidates automatically  
- Rank and shortlist candidates based on their relevance to the job requirements  

With ScreeningBoost, the screening process is no longer fully manual. Instead of reading every CV, HR teams can directly focus on **top-ranked and most relevant candidates** produced by the system.

From the engineering side, the platform was designed to:

- Be scalable for large numbers of CVs  
- Provide consistent and objective screening results  
- Integrate easily with existing recruitment workflows  
`,
    techStack: ["React", "Node.js", "Elasticsearch", "MinIO", "PostgreSQL"],
    impact:`
ScreeningBoost helped transform the recruitment workflow into a **faster, more efficient, and more structured process**.

With this system:

- HR teams save a significant amount of time in the early screening phase  
- The screening process becomes more **consistent and standardized**  
- Recruiters can focus more on interviews and candidate evaluation instead of administrative work  
- The overall hiring process becomes **faster and more efficient**  

This project demonstrates how automation can **directly improve business processes** and how technology can be used to solve real operational problems in recruitment.`,
    category: "Content Management",
    imageUrl: "/images/screeningboost.jpeg",
    client: "22222 Labs",
  },
];
