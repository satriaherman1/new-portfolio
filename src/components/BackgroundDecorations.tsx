import { motion } from "motion/react";
import { CircleIcon } from "./icons/CircleIcon";
import { SquareIcon } from "./icons/SquareIcon";
import { StripedCircleIcon } from "./icons/StripedCircleIcon";
import { TriangleIcon } from "./icons/TriangleIcon";
import { useMemo } from "react";

const shapes = [
    CircleIcon,
    SquareIcon,
    TriangleIcon,
    StripedCircleIcon,
];

interface FloatingShapeProps {
    Icon: React.ElementType;
    initialX: number;
    initialY: number;
    size: number;
    duration: number;
    delay: number;
}

function FloatingShape({ Icon, initialX, initialY, size, duration, delay }: FloatingShapeProps) {
    return (
        <motion.div
            className="absolute text-neutral-200 dark:text-neutral-200/40"
            style={{
                left: `${initialX}%`,
                top: `${initialY}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0.8, 0.4, 0.1, 0]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            <Icon size={size} />
        </motion.div>
    );
}

export default function BackgroundDecorations() {
    // Memoize the random configuration to prevent re-renders on every scroll/state change
    const decorationConfig = useMemo(() => {
        const items = [];
        const count = 15; // Number of shapes

        for (let i = 0; i < count; i++) {
            items.push({
                id: i,
                Icon: shapes[Math.floor(Math.random() * shapes.length)],
                initialX: Math.random() * 100,
                initialY: Math.random() * 100,
                size: Math.random() * 40 + 20, // 20px - 60px
                duration: Math.random() * 10 + 10, // 10s - 20s
                delay: Math.random() * 5,
            });
        }
        return items;
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {decorationConfig.map((config) => (
                <FloatingShape
                    key={config.id}
                    Icon={config.Icon}
                    initialX={config.initialX}
                    initialY={config.initialY}
                    size={config.size}
                    duration={config.duration}
                    delay={config.delay}
                />
            ))}
        </div>
    );
}
