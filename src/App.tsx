/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { QUESTIONS, RESULTS } from './constants';
import { CoffeePersonality } from './types';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Result from './components/Result';
import ProgressBar from './components/ProgressBar';
import BackgroundDecor from './components/BackgroundDecor';

type Screen = 'welcome' | 'quiz' | 'loading' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<CoffeePersonality[]>([]);
  const [finalPersonality, setFinalPersonality] = useState<CoffeePersonality | null>(null);

  const handleStart = () => setScreen('quiz');

  const handleAnswer = (personality: CoffeePersonality) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: CoffeePersonality[]) => {
    setScreen('loading');
    
    // Simulate a cinematic loading state
    setTimeout(() => {
      const counts: Record<string, number> = {};
      allAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);
      
      const winner = Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
      ) as CoffeePersonality;

      setFinalPersonality(winner);
      setScreen('result');
    }, 2500);
  };

  const handleReset = () => {
    setScreen('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinalPersonality(null);
  };

  const progress = (answers.length / QUESTIONS.length) * 100;

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden selection:bg-terracotta/20 selection:text-coffee">
      <div className="grain-texture" />
      <BackgroundDecor />
      
      <AnimatePresence mode="wait">
        {screen === 'quiz' && (
          <div key="progress-container">
            <ProgressBar progress={progress} />
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <div key="welcome-container">
              <Welcome onStart={handleStart} />
            </div>
          )}

          {screen === 'quiz' && (
            <div key={`quiz-${currentQuestionIndex}`}>
              <Quiz 
                question={QUESTIONS[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            </div>
          )}

          {screen === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-6"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 border-t-2 border-coffee rounded-full"
              />
              <p className="font-serif italic text-xl tracking-wide">Brewing your profile...</p>
            </motion.div>
          )}

          {screen === 'result' && finalPersonality && (
            <div key="result-container">
              <Result 
                result={RESULTS[finalPersonality]} 
                onReset={handleReset} 
              />
            </div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}

