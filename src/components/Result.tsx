import { motion, AnimatePresence } from 'motion/react';
import { Result as ResultType } from '../types';
import { Compass, Heart, Palette, Sun, Share2, Menu as MenuIcon, ArrowRight, Mail, CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

interface ResultProps {
  result: ResultType;
  onReset: () => void;
}

const IconMap = {
  Compass,
  Heart,
  Palette,
  Sun
};

export default function Result({ result, onReset }: ResultProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const Icon = IconMap[result.icon as keyof typeof IconMap] || Compass;

  const handleShare = async () => {
    const shareData = {
      title: `I'm ${result.title}!`,
      text: `I just found my coffee personality: ${result.title}. Find yours at Brew & Soul.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulating API call for data collection
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md w-full space-y-10 pb-12"
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          className="mx-auto w-24 h-24 rounded-3xl bg-terracotta/10 flex items-center justify-center text-terracotta border border-terracotta/20 shadow-xl shadow-terracotta/5"
        >
          <Icon className="w-12 h-12" />
        </motion.div>

        <div className="space-y-2">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="uppercase tracking-[0.2em] text-xs font-bold text-olive"
          >
            You are
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-6xl font-serif"
          >
            {result.title}
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-coffee/70 text-lg leading-relaxed px-4"
        >
          {result.description}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-beige/50 border border-coffee/5 p-8 rounded-[2rem] space-y-6 text-center shadow-inner"
      >
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-bold text-coffee/40">Recommended for you</p>
          <h3 className="text-2xl font-serif italic text-coffee">{result.recommendedDrink}</h3>
        </div>
        <p className="text-sm text-coffee/60 leading-snug italic">
          Crafted to match your unique rhythm and sensory palette.
        </p>
      </motion.div>

      {/* Email Collection Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-white border border-beige rounded-[2rem] p-6 shadow-xl shadow-coffee/5"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <h4 className="font-serif text-xl">Join the Inner Circle</h4>
                <p className="text-sm text-coffee/60">Get treats and news for your {result.type} spirit.</p>
              </div>
              
              <form onSubmit={handleSubmitEmail} className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-cream border border-beige rounded-2xl focus:outline-none focus:border-terracotta/30 transition-all text-coffee placeholder:text-coffee/30"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee/30 group-focus-within:text-terracotta transition-colors" />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-coffee text-cream text-sm px-4 py-2 rounded-xl hover:bg-terracotta transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'Join'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 text-center space-y-2"
            >
              <CheckCircle2 className="w-10 h-10 text-olive mx-auto" />
              <h4 className="font-serif text-xl">You're in!</h4>
              <p className="text-sm text-coffee/60">Your first reward is on its way.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid gap-3 pt-4">
        <motion.a
          id="menu-link"
          href="#menu"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center space-x-2 w-full py-4 bg-coffee text-cream rounded-2xl font-medium text-lg shadow-lg cursor-pointer"
        >
          <MenuIcon className="w-5 h-5 opacity-70" />
          <span>See Our Full Menu</span>
        </motion.a>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            id="share-button"
            onClick={handleShare}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center space-x-2 py-4 border border-coffee/20 rounded-2xl font-medium cursor-pointer transition-colors ${copyFeedback ? 'bg-olive text-cream border-olive' : 'text-coffee'}`}
          >
            {copyFeedback ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                {navigator.share ? <Share2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{navigator.share ? 'Share' : 'Copy Link'}</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            id="reset-button"
            onClick={onReset}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 py-4 bg-beige border border-coffee/5 text-coffee rounded-2xl font-medium cursor-pointer"
          >
            <span>Retake Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-center text-xs text-coffee/40 uppercase tracking-widest pt-4"
      >
        Visit us downtown • Open 7am-7pm
      </motion.p>
    </motion.div>
  );
}
