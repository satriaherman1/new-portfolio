import SectionWrapper from "../components/SectionWrapper";
import { aboutContent } from "../data/profile";
import { FiCheck } from "react-icons/fi";

export default function About() {
    return (
        <SectionWrapper

            id="about"
            title={aboutContent.title}
            subtitle="Software Engineer with a passion for building robust business systems."
        >
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                <div className="space-y-6">
                    {aboutContent.paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-neutral-600 dark:text-neutral-300 leading-relaxed"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                        What I Bring
                    </h3>
                    <ul className="space-y-4">
                        {aboutContent.highlights.map((highlight, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-4 text-neutral-700 dark:text-neutral-300"
                            >
                                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <FiCheck className="text-lg" />
                                </span>
                                <span className="font-medium">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
