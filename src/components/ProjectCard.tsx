import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import type { Project } from "../data/projects";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <div
            className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Project Image */}
            <div className="h-48 bg-neutral-100 dark:bg-neutral-700 w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                        {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-2">
                    {project.problem}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex gap-4">
                        <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                            <FaGithub size={20} />
                        </button>
                        <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                            <FaExternalLinkAlt size={18} />
                        </button>
                    </div>

                    <Link
                        to={`/project/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View Details <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}
