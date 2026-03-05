import { cn } from "../../lib/utils";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface LineConfig {
    duration: number;
    delay: number;
    width: number;
    left: string;
    top: string;
    rotation: string;
}

export const BackgroundLines = ({
    children,
    className,
    containerClassName,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const lines = useMemo<LineConfig[]>(
        () =>
            [...Array(20)].map(() => ({
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 5,
                width: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotation: `rotate(${Math.random() * 360}deg)`,
            })),
        []
    );

    return (
        <div
            className={cn(
                "h-screen w-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-black",
                containerClassName
            )}
        >
            <div className="absolute inset-0 z-0">
                <svg
                    className="w-full h-full opacity-[0.05] dark:opacity-[0.1]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style={{ stopColor: "rgba(233, 30, 140, 0.4)", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "rgba(22, 72, 212, 0)", stopOpacity: 0 }} />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad1)" />
                </svg>
            </div>

            <div className="absolute inset-0 z-0 pointer-events-none">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5], rotate: [0, 45] }}
                        transition={{
                            duration: line.duration,
                            repeat: Infinity,
                            delay: line.delay,
                            ease: "easeInOut",
                        }}
                        className="absolute bg-gradient-to-r from-blue-500/20 to-pink-500/20"
                        style={{
                            width: line.width,
                            height: "1px",
                            left: line.left,
                            top: line.top,
                            transform: line.rotation,
                        }}
                    />
                ))}
            </div>

            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    );
};
