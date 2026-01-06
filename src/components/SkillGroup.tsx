import type { SkillCategory } from "../data/skills";
import { FaServer, FaCode, FaTerminal } from "react-icons/fa";

interface SkillGroupProps {
    category: SkillCategory;
    index: number;
}

const iconMap: Record<string, React.ReactNode> = {
    server: <FaServer className="text-2xl" />,
    layout: <FaCode className="text-2xl" />,
    terminal: <FaTerminal className="text-2xl" />,
};

export default function SkillGroup({ category, index }: SkillGroupProps) {
    return (
        <div
            className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-700"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
                    {iconMap[category.icon] || <FaCode className="text-2xl" />}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {category.title}
                </h3>
            </div>

            <ul className="space-y-3">
                {category.skills.map((skill) => (
                    <li
                        key={skill.name}
                        className="flex items-center justify-between text-neutral-700 dark:text-neutral-300"
                    >
                        <span className="font-medium">{skill.name}</span>
                        {skill.level && (
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${skill.level === "proficient"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : skill.level === "experienced"
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
                                    }`}
                            >
                                {skill.level}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
