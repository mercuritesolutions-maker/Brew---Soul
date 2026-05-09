import { motion } from 'motion/react';
import { Coffee } from 'lucide-react';

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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full py-5 bg-coffee text-cream rounded-2xl font-medium text-lg shadow-xl shadow-coffee/10 transition-shadow hover:shadow-2xl hover:shadow-coffee/20 cursor-pointer"
      >
        Begin Exploration
      </motion.button>
    </motion.div>
  );
}
