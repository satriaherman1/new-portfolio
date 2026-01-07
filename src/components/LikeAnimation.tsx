import { motion, AnimatePresence } from "motion/react";
import { FaThumbsUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LikeAnimationProps {
    isVisible: boolean;
    onComplete: () => void;
}

export default function LikeAnimation({ isVisible, onComplete }: LikeAnimationProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isVisible) {
            // Auto close after 1.5s
            timer = setTimeout(() => {
                onComplete();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [isVisible, onComplete]);

    // Particle configuration


    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none isolate">
                    {/* Dark Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Central Icon Container */}
                    <div className="relative z-[60] flex items-center justify-center w-64 h-64">
                        {/* Particles */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Particle key={i} index={i} total={12} />
                        ))}

                        {/* Thumb Icon */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotate: 0
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15, // Low damping = more bounce/wobble
                                mass: 0.8
                            }}
                            className="relative z-20"
                        >
                            <FaThumbsUp className="w-32 h-32 text-blue-500 drop-shadow-[0_0_50px_rgba(59,130,246,0.6)]" />
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

function Particle({ index, total }: { index: number; total: number }) {
    const angle = (index / total) * 360;
    const radius = 100; // Distance from center
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    const colors = ["#60A5FA", "#F472B6", "#A78BFA", "#FBBF24"]; // Tailwind colors
    const color = colors[index % colors.length];

    return (
        <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
                x,
                y,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0]
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.1
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
                backgroundColor: color,
                marginLeft: "-6px",
                marginTop: "-6px"
            }}
        />
    );
}
