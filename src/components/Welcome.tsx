import { motion } from 'motion/react';
import { Coffee, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md w-full text-center space-y-12"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-beige border border-coffee/10 flex items-center justify-center shadow-sm">
            <Coffee className="w-8 h-8 text-coffee" />
          </div>
        </motion.div>
        
        <div className="space-y-2">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="uppercase tracking-[0.3em] text-[10px] font-semibold text-olive"
          >
            Brew & Soul Cafe
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-6xl font-serif leading-tight"
          >
            What's Your <br />
            <span className="italic">Coffee Soul?</span>
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-coffee/70 text-lg leading-relaxed max-w-xs mx-auto"
        >
          A five-minute immersion to find the blend that matches your spirit.
        </motion.p>
      </div>

      <motion.button
        id="start-quiz-button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.9,
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
        whileHover={{ 
          scale: 1.05, 
          backgroundColor: '#3C2A21',
          boxShadow: '0 20px 25px -5px rgba(60, 42, 33, 0.2)' 
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative w-full py-5 bg-coffee text-cream rounded-2xl font-bold text-xl shadow-xl shadow-coffee/10 cursor-pointer overflow-hidden transition-all"
      >
        <span className="relative z-10 flex items-center justify-center space-x-2">
          <span>Begin Exploration</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <motion.div 
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.button>
    </motion.div>
  );
}
