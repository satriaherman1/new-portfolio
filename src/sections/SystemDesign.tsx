import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import ArchitectureCard from "../components/ArchitectureCard";
import { systemDesigns } from "../data/systemDesign";

gsap.registerPlugin(ScrollTrigger);

export default function SystemDesignSection() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = grid.querySelectorAll(".architecture-card");

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
            id="system-design"
            title="System Design & Architecture"
            subtitle="How I approach complex technical challenges with scalable solutions."
            dark
        >
            <div
                ref={gridRef}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                {systemDesigns.map((design, index) => (
                    <div key={design.id} className="architecture-card">
                        <ArchitectureCard design={design} index={index} />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
