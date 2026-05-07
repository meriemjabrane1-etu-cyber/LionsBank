import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';
import { Fingerprint } from 'lucide-react';

interface HoldToConfirmButtonProps {
    onConfirm: () => void;
    duration?: number; // in milliseconds
    label?: string;
    className?: string;
    icon?: React.ReactNode;
}

export function HoldToConfirmButton({
    onConfirm,
    duration = 2000,
    label = 'Hold to Authorize',
    className = '',
    icon = <Fingerprint className="w-5 h-5" />,
}: HoldToConfirmButtonProps) {
    const [isHolding, setIsHolding] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const progressControls = useAnimation();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handlePointerDown = () => {
        if (isConfirmed) return;
        setIsHolding(true);
        
        // Start filling the progress bar
        progressControls.start({
            width: '100%',
            transition: { duration: duration / 1000, ease: 'linear' }
        });

        // Trigger confirmation after duration
        timeoutRef.current = setTimeout(() => {
            setIsConfirmed(true);
            setIsHolding(false);
            onConfirm();
            
            // Pulse effect when confirmed
            progressControls.start({
                opacity: [1, 0.5, 1],
                transition: { duration: 0.5, repeat: Infinity }
            });
        }, duration);
    };

    const cancelHold = () => {
        if (isConfirmed) return;
        setIsHolding(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Reset progress bar
        progressControls.start({
            width: '0%',
            transition: { duration: 0.2, ease: 'easeOut' }
        });
    };

    return (
        <motion.button
            onPointerDown={handlePointerDown}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            onContextMenu={(e) => e.preventDefault()}
            className={`relative overflow-hidden w-full h-14 rounded-xl flex items-center justify-center font-bold transition-all duration-300 select-none ${
                isConfirmed 
                ? 'bg-[#1bd382] text-[#061818] shadow-[0_0_25px_rgba(27,211,130,0.6)]' 
                : 'bg-[#061818] border-2 border-[#1a4f4d] text-[#1bd382] hover:border-[#1bd382]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
            } ${className}`}
            whileTap={!isConfirmed ? { scale: 0.98 } : {}}
        >
            {/* Background Progress Bar */}
            {!isConfirmed && (
                <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-[#1bd382]/20"
                    initial={{ width: '0%' }}
                    animate={progressControls}
                />
            )}

            {/* Glowing Scan Line Effect while holding */}
            {isHolding && !isConfirmed && (
                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-2 bg-[#1bd382] blur-[2px]"
                    initial={{ x: '-10px' }}
                    animate={{ x: '100vw' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
            )}

            <div className="relative z-10 flex items-center gap-3">
                {isConfirmed ? (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <span>Authorized</span>
                    </>
                ) : (
                    <>
                        <motion.div
                            animate={isHolding ? { scale: 1.1, opacity: 0.8 } : { scale: 1, opacity: 1 }}
                            className={isHolding ? "text-[#1bd382] animate-pulse" : ""}
                        >
                            {icon}
                        </motion.div>
                        <span>{isHolding ? 'Hold to Confirm...' : label}</span>
                    </>
                )}
            </div>
        </motion.button>
    );
}
