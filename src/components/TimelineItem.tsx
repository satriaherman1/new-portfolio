import { type Experience } from "../data/experience";

interface TimelineItemProps {
    experience: Experience;
    isLast: boolean;
}

export default function TimelineItem({
    experience,
    isLast,
}: TimelineItemProps) {
    return (
        <div className="relative pl-8 md:pl-12">
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-700" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1 top-1.5 w-6 h-6 rounded-full bg-neutral-900 dark:bg-white border-4 border-white dark:border-neutral-900 shadow-md" />

            <div className="pb-12">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {experience.role}
                    </h3>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {experience.period}
                    </span>
                </div>

                <p className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-4">
                    {experience.company}
                </p>

                <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                    {experience.description}
                </p>

                <ul className="space-y-2">
                    {experience.highlights.map((highlight, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300"
                        >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 flex-shrink-0" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
