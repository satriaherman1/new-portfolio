import { profile } from "../data/profile";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-white py-12">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-lg font-semibold">{profile.name}</p>
                        <p className="text-neutral-400 text-sm mt-1">{profile.role}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href={`mailto:${profile.email}`}
                            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                            aria-label="Email"
                        >
                            <FiMail className="text-lg" />
                        </a>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin className="text-lg" />
                        </a>
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                            aria-label="GitHub"
                        >
                            <FiGithub className="text-lg" />
                        </a>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
                    <p className="text-neutral-500 text-sm">
                        © {currentYear} {profile.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
