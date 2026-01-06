import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import TimelineItem from "../components/TimelineItem";
import { experiences } from "../data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        const items = timeline.querySelectorAll(".timeline-item");

        gsap.fromTo(
            items,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: timeline,
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
            id="experience"
            title="Experience"
            subtitle="My professional journey building enterprise software solutions."
        >
            <div ref={timelineRef} className="max-w-3xl">
                {experiences.map((experience, index) => (
                    <div key={experience.id} className="timeline-item">
                        <TimelineItem
                            experience={experience}
                            isLast={index === experiences.length - 1}
                        />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
