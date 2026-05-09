import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import { Result as ResultType } from '../types';
import { Compass, Heart, Palette, Sun, Share2, Menu as MenuIcon, ArrowRight, Mail, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

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
  const [showShareMenu, setShowShareMenu] = useState(false);

  const Icon = IconMap[result.icon as keyof typeof IconMap] || Compass;

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#A0522D', '#F5F2ED', '#3C2A21']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#A0522D', '#F5F2ED', '#3C2A21']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const shareTitle = `I'm ${result.title}!`;
  const shareText = `I just found my coffee personality: ${result.title}. Find yours at Brew & Soul.`;
  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToInstagram = () => {
    // Instagram doesn't have a direct URL share intent for posts, but we can copy and redirect
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopyFeedback(true);
    setTimeout(() => {
      setCopyFeedback(false);
      window.open('https://www.instagram.com/', '_blank');
    }, 1500);
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
      <div className="text-center space-y-6 relative">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
          className="mx-auto w-24 h-24 rounded-3xl bg-terracotta/10 flex items-center justify-center text-terracotta border border-terracotta/20 shadow-xl shadow-terracotta/5 relative z-10"
        >
          <Icon className="w-12 h-12" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 bg-terracotta/5 rounded-full -z-10"
          />
        </motion.div>

        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-olive">Revealed</span>
            <Sparkles className="w-3 h-3 text-terracotta" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.4,
              type: 'spring',
              stiffness: 400,
              damping: 15
            }}
            className="text-5xl md:text-6xl font-serif tracking-tight"
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

        <div className="flex flex-col gap-3">
          <div className="relative">
            <motion.button
              id="share-button"
              onClick={handleShare}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center space-x-2 w-full py-4 border border-coffee/20 rounded-2xl font-medium cursor-pointer transition-all duration-300 ${copyFeedback ? 'bg-olive text-cream border-olive' : 'text-coffee bg-white/50'}`}
            >
              {copyFeedback ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Link Copied for Instagram</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share My Result</span>
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full mb-3 left-0 w-full bg-white border border-beige rounded-2xl p-2 shadow-2xl z-20 grid grid-cols-3 gap-2"
                >
                  <button onClick={shareToInstagram} className="flex flex-col items-center py-3 hover:bg-beige rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white mb-1">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase tracking-tighter">Insta</span>
                  </button>
                  <button onClick={shareToTwitter} className="flex flex-col items-center py-3 hover:bg-beige rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white mb-1">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </div>
                    <span className="text-[10px] uppercase tracking-tighter">X / Twitter</span>
                  </button>
                  <button onClick={shareToFacebook} className="flex flex-col items-center py-3 hover:bg-beige rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white mb-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <span className="text-[10px] uppercase tracking-tighter">Facebook</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
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
