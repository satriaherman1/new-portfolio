import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useEffect } from "react";
import Button from "../components/Button";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import ReactMarkdown from "react-markdown";

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

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
        <div className="min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors">
                <FaArrowLeft /> Back to Projects
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">
                        {tech}
                    </span>
                ))}
            </div>

            {/* Project Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl">
                    <h3 className="font-semibold mb-2">Category</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{project.category}</p>
                </div>
                {/* Placeholders for links if they existed in data, or just generic stats */}
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl md:col-span-2 flex items-center gap-4">
                    {/* If we had links in the data, we would use them here. For now just placeholder buttons */}
                    <Button variant="primary" icon={<FaExternalLinkAlt />}>
                        Live Demo
                    </Button>
                    <Button variant="secondary" icon={<FaGithub />}>
                        View Code
                    </Button>
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
        </div>
    );
}
