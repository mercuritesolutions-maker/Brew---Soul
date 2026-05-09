import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-beige/50 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-terracotta shadow-[0_0_10px_rgba(160,82,45,0.3)]"
      />
    </div>
  );
}
