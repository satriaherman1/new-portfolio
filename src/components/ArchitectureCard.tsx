import { type SystemDesign } from "../data/systemDesign";
import { FaCogs } from "react-icons/fa";

interface ArchitectureCardProps {
    design: SystemDesign;
    index: number;
}

export default function ArchitectureCard({
    design,
    index,
}: ArchitectureCardProps) {
    return (
        <article
            className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <FaCogs className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">{design.title}</h3>
            </div>

            <div className="space-y-5">
                <div>
                    <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-2">
                        Problem
                    </h4>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                        {design.problem}
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-2">
                        Architecture
                    </h4>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                        {design.architecture}
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-2">
                        Why It Works
                    </h4>
                    <p className="text-neutral-200 text-sm leading-relaxed font-medium">
                        {design.whyItWorks}
                    </p>
                </div>

                <div className="pt-4 border-t border-neutral-700">
                    <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                        Key Components
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {design.keyComponents.map((component) => (
                            <span
                                key={component}
                                className="px-3 py-1 text-xs font-medium bg-neutral-700 text-neutral-300 rounded-full"
                            >
                                {component}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
