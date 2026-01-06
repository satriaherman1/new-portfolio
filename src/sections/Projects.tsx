import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = grid.querySelectorAll(".project-card");

        gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <SectionWrapper
            id="projects"
            title="Featured Projects"
            subtitle="Case studies of business systems I've designed and built."
        >
            <div
                ref={gridRef}
                className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
                {projects.map((project, index) => (
                    <div key={project.id} className="project-card">
                        <ProjectCard project={project} index={index} />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
