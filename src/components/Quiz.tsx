import { motion } from 'motion/react';
import { Question, CoffeePersonality } from '../types';

interface QuizProps {
  question: Question;
  onAnswer: (p: CoffeePersonality) => void;
}

export default function Quiz({ question, onAnswer }: QuizProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md w-full space-y-12"
    >
      <header className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif leading-tight">
          {question.text}
        </h2>
      </header>

      <div className="grid gap-4">
        {question.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            id={`choice-${choice.id}`}
            data-personality={choice.personality}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.01, backgroundColor: '#F5F2ED' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onAnswer(choice.personality)}
            className="group relative w-full text-left p-6 bg-white border border-beige rounded-2xl transition-all duration-300 hover:border-coffee/20 hover:shadow-lg hover:shadow-coffee/5 flex items-center justify-between cursor-pointer"
          >
            <span className="text-lg text-coffee/90 group-hover:text-coffee transition-colors pr-4">
              {choice.text}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-coffee opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
