import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { projects } from "../data/projects";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { FaArrowLeft, FaExternalLinkAlt, FaExpand, FaTimes } from "react-icons/fa";
import CommentSection from "../components/CommentSection";
import ReactMarkdown from "react-markdown";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import BackgroundDecorations from "../components/BackgroundDecorations";

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === id);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Lock body scroll when fullscreen
    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isFullScreen]);

    if (!project) {
        return (
            <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                <Link to="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300 relative overflow-hidden">
            {/* Background Layers */}
            <BackgroundDecorations />

            {/* Dynamic Mesh Gradient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full mix-blend-multiply blur-[120px] opacity-30 animate-pulse -z-10 dark:bg-blue-600/10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full mix-blend-multiply blur-[100px] opacity-30 animate-pulse delay-1000 -z-10 dark:bg-purple-600/10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full mix-blend-multiply blur-[80px] opacity-20 -z-10 dark:bg-pink-600/10"></div>

            {/* Main Content */}
            <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto relative z-10">
                <SEO
                    title={`${project.title} - Satria Herman`}
                    description={project.problem.slice(0, 150) + "..."}
                    image={project.imageUrl}
                    url={`https://satriaherman.com/project/${project.id}`}
                    type="article"
                />
                <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors">
                    <FaArrowLeft /> Back to Projects
                </Link>

                <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                    {project.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-12">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Split Layout: Image (Left) & Details (Right) */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    <div className="w-full md:w-2/3 group relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 relative bg-neutral-100 dark:bg-neutral-900">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-auto block cursor-pointer"
                                onClick={() => setIsFullScreen(true)}
                            />
                            {/* Expand Button Overlay */}
                            <button
                                onClick={() => setIsFullScreen(true)}
                                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                aria-label="View Fullscreen"
                            >
                                <FaExpand />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 shrink-0">
                        <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700/50 sticky top-24">
                            <div className="grid grid-cols-1 gap-8 mb-8">
                                <div className="relative pl-4 border-l-2 border-blue-600 dark:border-blue-500">
                                    <h3 className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold mb-2">Client</h3>
                                    <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{project.client}</p>
                                </div>
                                <div className="relative pl-4 border-l-2 border-purple-600 dark:border-purple-500">
                                    <h3 className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold mb-2">Category</h3>
                                    <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{project.category}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                                <Button variant="primary" icon={<FaExternalLinkAlt />} className="w-full justify-center py-4 text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
                                    Live Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                        <div className="prose dark:prose-invert max-w-none text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            <ReactMarkdown>{project.problem}</ReactMarkdown>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                        <div className="prose dark:prose-invert max-w-none text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            <ReactMarkdown>{project.solution}</ReactMarkdown>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Impact</h2>
                        <div className="prose dark:prose-invert max-w-none text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            <ReactMarkdown>{project.impact}</ReactMarkdown>
                        </div>
                    </section>
                </div>

                <div className="mt-20">
                    <CommentSection projectId={project.id} />
                </div>

                {/* Fullscreen Lightbox Portal */}
                {createPortal(
                    <AnimatePresence>
                        {isFullScreen && (
                            <div
                                className="fixed inset-0 z-[1000] flex items-center justify-center p-4 isolate"
                                onClick={() => setIsFullScreen(false)}
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/95 backdrop-blur-md"
                                />

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                    className="absolute top-6 right-6 p-4 text-white/50 hover:text-white transition-colors z-[1002]"
                                    onClick={() => setIsFullScreen(false)}
                                >
                                    <FaTimes size={24} />
                                </motion.button>

                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="relative z-[1001] max-w-full max-h-full"
                                    onClick={(e) => e.stopPropagation()} // Prevent close on image click
                                >
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                                    />
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </div>
    );
}
