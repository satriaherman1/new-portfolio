import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import SkillGroup from "../components/SkillGroup";
import { skillCategories } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = grid.querySelectorAll(".skill-card");

        gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
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
            id="skills"
            title="Skills & Technologies"
            subtitle="Technologies and tools I use to build scalable, maintainable systems."
            dark
            className="relative overflow-hidden"
        >
            {/* Dynamic Mesh Gradient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full mix-blend-multiply blur-[120px] opacity-30 animate-pulse -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full mix-blend-multiply blur-[100px] opacity-30 animate-pulse delay-1000 -z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full mix-blend-multiply blur-[80px] opacity-20 -z-10"></div>

            <div
                ref={gridRef}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                {skillCategories.map((category, index) => (
                    <div key={category.id} className="skill-card">
                        <SkillGroup category={category} index={index} />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
