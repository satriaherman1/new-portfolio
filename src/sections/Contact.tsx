import { useRef, useEffect, type FormEvent, useState } from "react";
import { gsap } from "gsap";
import SectionWrapper from "../components/SectionWrapper";
import { profile } from "../data/profile";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { FaVk, FaYoutube } from "react-icons/fa";
import Button from "../components/Button";

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        const form = formRef.current;
        const info = infoRef.current;

        if (form && info) {
            gsap.fromTo(
                [info, form],
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: info,
                        start: "top 80%",
                    }
                }
            );
        }
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert("Message sent! (Demo mode)");
    };

    const socialLinks = [
        { icon: <FiGithub size={22} />, href: profile.github, label: "GitHub", color: "hover:bg-gray-800" },
        { icon: <FiLinkedin size={22} />, href: profile.linkedin, label: "LinkedIn", color: "hover:bg-blue-600" },
        { icon: <FiTwitter size={22} />, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
        { icon: <FiInstagram size={22} />, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
        { icon: <FaVk size={22} />, href: "#", label: "VK", color: "hover:bg-blue-500" },
        { icon: <FaYoutube size={22} />, href: "#", label: "YouTube", color: "hover:bg-red-600" },
    ];

    return (
        <SectionWrapper id="contact" className="relative overflow-hidden py-32">
            {/* Dynamic Mesh Gradient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full mix-blend-multiply blur-[120px] opacity-30 animate-pulse -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full mix-blend-multiply blur-[100px] opacity-30 animate-pulse delay-1000 -z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full mix-blend-multiply blur-[80px] opacity-20 -z-10"></div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                {/* Left Column: Creative Info Display */}
                <div ref={infoRef} className="flex-1 lg:sticky lg:top-32">
                    <div className="relative">
                        <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 dark:from-white dark:via-neutral-400 dark:to-white bg-300% animate-gradient">
                            Let's Work <br /> Together.
                        </h2>
                        {/* Decorative line */}
                        <div className="w-24 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mb-8"></div>
                    </div>

                    <p className="text-xl md:text-2xl font-light text-neutral-600 dark:text-neutral-300 mb-12 max-w-lg leading-relaxed">
                        Have a project in mind? We'd love to help you bring your ideas to life. Let's discuss how we can collaborate.
                    </p>

                    <div className="bg-white/40 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-white/50 dark:border-white/10 mb-12 hover:bg-white/60 dark:hover:bg-black/40 transition-colors duration-500">
                        <p className="text-lg italic font-serif text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            "The best way to predict the future is to create it. Let's build something extraordinary together."
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                            Find me on
                        </span>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-all duration-300 hover:text-white hover:-translate-y-1 hover:shadow-lg ${link.color}`}
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Premium Form Card */}
                <div className="flex-1 w-full relative group">
                    {/* Glow effect behind form */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/20 dark:border-white/10 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-auto text-xs font-mono text-neutral-400">contact.tsx</span>
                        </div>

                        <div className="space-y-6">
                            {/* Name Input */}
                            <div className="group/input relative">
                                <div className={`absolute left-4 top-4 text-neutral-400 transition-colors duration-300 ${focusedField === 'name' ? 'text-blue-500' : ''}`}>
                                    <FiUser size={20} />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border-2 border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-neutral-800 text-neutral-900 dark:text-white outline-none transition-all duration-300 font-medium placeholder-neutral-400"
                                    placeholder="Your Name"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="group/input relative">
                                <div className={`absolute left-4 top-4 text-neutral-400 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : ''}`}>
                                    <FiMail size={20} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border-2 border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-neutral-800 text-neutral-900 dark:text-white outline-none transition-all duration-300 font-medium placeholder-neutral-400"
                                    placeholder="email@example.com"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="group/input relative">
                                <div className={`absolute left-4 top-4 text-neutral-400 transition-colors duration-300 ${focusedField === 'message' ? 'text-blue-500' : ''}`}>
                                    <FiMessageSquare size={20} />
                                </div>
                                <textarea
                                    id="message"
                                    rows={5}
                                    required
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border-2 border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-neutral-800 text-neutral-900 dark:text-white outline-none transition-all duration-300 font-medium placeholder-neutral-400 resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <Button className="w-full py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-300 group/btn">
                                <span className="flex items-center gap-2">
                                    Send Message <FiSend className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                </span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </SectionWrapper>
    );
}
