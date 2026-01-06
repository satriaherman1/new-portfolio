import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
    id: string;
    title?: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    dark?: boolean;
}

export default function SectionWrapper({
    id,
    title,
    subtitle,
    children,
    className = "",
    dark = false,
}: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        gsap.fromTo(
            content,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
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
        <section
            ref={sectionRef}
            id={id}
            className={`py-20 md:py-28 dark:bg-neutral-900/70 dark:text-white bg-white text-neutral-900
                 ${className}`}
        >
            <div ref={contentRef} className="container max-w-6xl mx-auto px-6">
                {(title || subtitle) && (
                    <div className="mb-12 md:mb-16">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p
                                className={`text-lg ${dark ? "text-neutral-400" : "text-neutral-600"
                                    } max-w-2xl`}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}
