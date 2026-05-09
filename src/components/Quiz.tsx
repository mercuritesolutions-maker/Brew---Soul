import { motion } from 'motion/react';
import { Question, CoffeePersonality } from '../types';

interface QuizProps {
  question: Question;
  onAnswer: (p: CoffeePersonality) => void;
}

export default function Quiz({ question, onAnswer }: QuizProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-md w-full space-y-12"
    >
      <header className="space-y-4">
        <motion.h2 
          layout
          className="text-3xl md:text-4xl font-serif leading-tight"
        >
          {question.text}
        </motion.h2>
      </header>

      <div className="grid gap-4">
        {question.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            id={`choice-${choice.id}`}
            data-personality={choice.personality}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.03, backgroundColor: '#ffffff' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(choice.personality)}
            className="group relative w-full text-left p-6 bg-white/80 backdrop-blur-sm border border-beige rounded-2xl transition-all duration-200 hover:border-terracotta/30 hover:shadow-xl hover:shadow-terracotta/5 flex items-center justify-between cursor-pointer overflow-hidden"
          >
            <span className="text-lg text-coffee/90 group-hover:text-coffee transition-colors pr-4 relative z-10 font-medium">
              {choice.text}
            </span>
            <motion.div 
              className="absolute inset-0 bg-terracotta/5 opacity-0 group-hover:opacity-100 transition-opacity" 
              initial={false}
            />
            <div className="w-2 h-2 rounded-full bg-terracotta scale-0 group-hover:scale-100 transition-transform duration-300 relative z-10" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
