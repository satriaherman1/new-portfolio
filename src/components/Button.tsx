import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    href?: string;
    onClick?: () => void;
    className?: string;
    icon?: ReactNode;
}

export default function Button({
    children,
    variant = "primary",
    href,
    onClick,
    className = "",
    icon,
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer";

    const variants = {
        primary:
            "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
        secondary:
            "bg-transparent border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-neutral-900",
        ghost:
            "bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800",
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                {icon && <span className="text-lg">{icon}</span>}
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
            {icon && <span className="text-lg">{icon}</span>}
            {children}
        </button>
    );
}
