import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { profile } from "../data/profile";
import Button from "../components/Button";
import { BsDownload } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Avatar from "../components/avatar";
import { useTypewriterEffect } from "../hooks/useTypewriter";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const typedText = useTypewriterEffect([
        "Muhammad Satria Herman",
        "Professional Software Engineer",
        "Tech & AI Enthusiast"
    ]);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const elements = content.querySelectorAll(".animate-in");

        gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                delay: 0.2,
            }
        );
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800"
        >
            {/* Glassmorphism decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-purple-900 dark:opacity-10"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-cyan-900 dark:opacity-10"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-pink-900 dark:opacity-10"></div>

            <div
                ref={contentRef}
                className="container max-w-6xl mx-auto px-6 pt-0 pb-20 md:py-32 relative z-10"
            >
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl basis-full md:basis-[calc(60%-20px)]">
                        <p className="animate-in text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                            Hello, I'm
                        </p>

                        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 min-h-[1.2em]">
                            {typedText}
                            <span className="animate-pulse text-blue-600">|</span>
                        </h1>

                        <p className="animate-in text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-medium mb-6">
                            {profile.role}
                        </p>

                        <p className="animate-in text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10 max-w-lg">
                            {profile.tagline}
                        </p>

                        <div className="animate-in flex flex-wrap gap-4">
                            <Button
                                variant="primary"
                                href={profile.resumeUrl}
                                icon={<BsDownload />}
                            >
                                Download CV
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={scrollToContact}
                                icon={<FiMail />}
                            >
                                Contact Me
                            </Button>
                        </div>
                    </div>

                    <div className="animate-in relative basis-full md:basis-[calc(40%-20px)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 dark:opacity-40 transform scale-110"></div>
                        <Avatar
                            imageSrc="/me.jpeg" // Placeholder
                            altText={profile.name}
                            className="w-48 h-48 md:w-64 md:h-64 relative z-10 border-4 border-white/50 dark:border-white/10 backdrop-blur-sm"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
