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
    
    // Simulate a cinematic loading state but with variable steps for "dopamine"
    setTimeout(() => {
      const counts: Record<string, number> = {};
      allAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);
      
      const winner = Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
      ) as CoffeePersonality;

      setFinalPersonality(winner);
      setScreen('result');
    }, 2000);
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-b-2 border-terracotta rounded-full"
                />
                <motion.div 
                  animate={{ 
                    rotate: -360,
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-t-2 border-coffee opacity-30 rounded-full"
                />
              </div>
              <div className="text-center space-y-2">
                <p className="font-serif italic text-2xl tracking-wide">Synthesizing flavors...</p>
                <div className="flex justify-center space-x-1">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-coffee rounded-full"
                    />
                  ))}
                </div>
              </div>
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

