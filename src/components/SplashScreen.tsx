import React from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Background Animated Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8 z-10"
      >
        <div className="w-28 h-28 bg-primary rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(124,58,237,0.3)] relative overflow-hidden group">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30"
          />
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/deaabbc6-8c45-464e-ae17-199b79227a9e/app-logo-9db07841-1777584711810.webp" 
            alt="Logo" 
            className="w-16 h-16 object-contain brightness-0 invert relative z-10"
          />
        </div>
      </motion.div>
      
      <div className="text-center z-10">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl font-black text-foreground tracking-tighter"
        >
          Quick<span className="text-primary">Fix</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-muted-foreground text-sm font-bold uppercase tracking-[0.2em] mt-2"
        >
          Essential Utilities
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 flex flex-col items-center gap-4"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">
          Powered by Gebeya Dala
        </p>
      </motion.div>
    </div>
  );
}