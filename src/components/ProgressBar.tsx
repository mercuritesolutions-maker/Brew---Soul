import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-2 z-50 bg-beige/30 backdrop-blur-md overflow-hidden border-b border-coffee/5 shadow-sm">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="h-full bg-linear-to-r from-terracotta to-coffee relative"
      >
        <motion.div 
          animate={{ x: ['100%', '-100%'], opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
        />
      </motion.div>
    </div>
  );
}
