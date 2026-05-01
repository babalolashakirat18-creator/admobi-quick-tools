import React from "react";
import { Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AdBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 p-3 pb-6 z-20 flex justify-center items-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-gradient-to-r from-primary/10 to-violet-600/10 rounded-2xl p-0.5 border border-primary/20 group cursor-pointer relative overflow-hidden"
      >
        <div className="bg-card/80 backdrop-blur-md p-3 rounded-[0.9rem] flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-black tracking-tight">QuickFix Premium</span>
                <span className="bg-primary/20 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Native Ad</span>
              </div>
              <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-tighter">Remove all ads & unlock features</span>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all shadow-md group-hover:scale-105">
            UPGRADE
          </button>
        </div>
        
        {/* Animated shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
        
        {/* Subtle accent glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-50" />
      </motion.div>
    </div>
  );
}