import type { IconProps } from "./icon-props";
import { useId } from "react";

export const StripedCircleIcon = ({ size = 24, className = "", ...props }: IconProps) => {
    const patternId = useId();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <defs>
                <pattern
                    id={patternId}
                    patternUnits="userSpaceOnUse"
                    width="4"
                    height="4"
                    patternTransform="rotate(45)"
                >
                    <line
                        x1="0"
                        y="0"
                        x2="0"
                        y2="4"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                </pattern>
            </defs>
            <circle cx="12" cy="12" r="12" fill={`url(#${patternId})`} />
        </svg>
    );
};
