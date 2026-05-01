import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import SplashScreen from "./components/SplashScreen";
import HomeGrid from "./components/HomeGrid";
import PDFConverter from "./components/tools/PDFConverter";
import ImageCompressor from "./components/tools/ImageCompressor";
import QRScanner from "./components/tools/QRScanner";
import UnitConverter from "./components/tools/UnitConverter";
import Calculator from "./components/tools/Calculator";
import AdBanner from "./components/ads/AdBanner";
import AdInterstitial from "./components/ads/AdInterstitial";
import { ArrowLeft, History, Settings, Sparkles, Share2 } from "lucide-react";
import { Button } from "./components/ui/button";
import "./theme.css";

type Screen = "home" | "pdf" | "compressor" | "qr" | "unit" | "calculator";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [nextScreen, setNextScreen] = useState<Screen | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (screen: Screen) => {
    if (screen !== "home") {
      if (Math.random() > 0.7) {
        setNextScreen(screen);
        setShowInterstitial(true);
        return;
      }
    }
    setCurrentScreen(screen);
  };

  const handleInterstitialComplete = () => {
    setShowInterstitial(false);
    if (nextScreen) {
      setCurrentScreen(nextScreen);
      setNextScreen(null);
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl font-sans border-x border-border/50">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-violet-600/10 rounded-full blur-[80px]" />
      </div>

      <AnimatePresence mode="wait">
        {currentScreen === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-5 pb-24 z-10"
          >
            <header className="flex items-center justify-between mb-8 pt-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-primary rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-tight">QuickFix</h1>
                </div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest opacity-80">Premium Utility Suite</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => toast.info("History feature coming soon!")}>
                  <History className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => toast.info("Settings coming soon!")}>
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </header>

            <HomeGrid onSelectTool={navigateTo} />

            <div className="mt-10 grid grid-cols-2 gap-4 pb-4">
              <Button variant="outline" className="gap-2 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 h-12" onClick={() => toast.success("Thanks for the feedback!")}>
                <Sparkles className="w-4 h-4 text-primary" /> Rate Us
              </Button>
              <Button variant="outline" className="gap-2 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 h-12" onClick={() => toast.info("Link copied!")}>
                <Share2 className="w-4 h-4 text-primary" /> Share
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col z-10"
          >
            <div className="p-4 flex items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-20">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="rounded-full hover:bg-primary/10">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h2 className="text-lg font-bold leading-none mb-1">
                  {currentScreen === "pdf" ? "PDF Converter" : 
                   currentScreen === "compressor" ? "Image Compressor" :
                   currentScreen === "qr" ? "QR Scanner" :
                   currentScreen === "unit" ? "Unit Converter" :
                   currentScreen === "calculator" ? "Advanced Calculator" : ""}
                </h2>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">QuickFix Tool</span>
              </div>
            </div>
            
            <div className="flex-1 p-5 pb-24 overflow-y-auto">
              {currentScreen === "pdf" && <PDFConverter onAction={() => setCurrentScreen("home")} />}
              {currentScreen === "compressor" && <ImageCompressor onAction={() => setCurrentScreen("home")} />}
              {currentScreen === "qr" && <QRScanner onAction={() => setCurrentScreen("home")} />}
              {currentScreen === "unit" && <UnitConverter onAction={() => setCurrentScreen("home")} />}
              {currentScreen === "calculator" && <Calculator onAction={() => setCurrentScreen("home")} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdBanner />
      
      <AnimatePresence>
        {showInterstitial && (
          <AdInterstitial onDismiss={handleInterstitialComplete} />
        )}
      </AnimatePresence>

      <Toaster position="top-center" expand={true} richColors theme="dark" />
    </div>
  );
}