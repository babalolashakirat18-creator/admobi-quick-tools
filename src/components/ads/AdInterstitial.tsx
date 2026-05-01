import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdInterstitial({ onDismiss }: { onDismiss: () => void }) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [timeLeft]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[100] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/5 rounded-full blur-[100px]" />

      <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
        <AnimatePresence mode="wait">
          {!canClose && (
            <motion.span 
              key="timer"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-white text-[10px] font-black bg-primary px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 uppercase tracking-widest"
            >
              Wait {timeLeft}s
            </motion.span>
          )}
        </AnimatePresence>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => canClose && onDismiss()}
          className={`rounded-full h-10 w-10 bg-card border border-border shadow-xl transition-all ${!canClose ? 'opacity-30 cursor-not-allowed' : 'opacity-100 scale-110'}`}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        className="w-full max-w-sm bg-card rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-border/50 relative z-10"
      >
        <div className="aspect-[4/3] bg-neutral-900 relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop" 
            alt="Ad Content" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
            >
              <Play className="w-10 h-10 text-white fill-white ml-1.5" />
            </motion.div>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <ShieldCheck className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">Verified Ad</span>
          </div>
        </div>
        
        <div className="p-8 text-center bg-gradient-to-b from-card to-secondary/20">
          <div className="flex justify-center gap-1 mb-4 text-primary">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
          </div>
          <h3 className="text-3xl font-black mb-3 tracking-tighter">Fast App Builder</h3>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium">
            Join 100,000+ creators building stunning mobile experiences without writing a single line of code.
          </p>
          <Button className="w-full h-16 rounded-[2rem] gap-3 text-lg font-black shadow-xl shadow-primary/30 group" onClick={() => window.open('https://google.com', '_blank')}>
            Get Started Free <ExternalLink className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-muted-foreground/30 text-[10px] uppercase tracking-[0.5em] font-black"
      >
        QuickFix Ad System
      </motion.p>
    </motion.div>
  );
}