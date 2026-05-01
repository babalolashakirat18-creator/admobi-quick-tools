import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Copy, Share2, RefreshCw, Camera, ScanLine, Link as LinkIcon, Globe } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function QRScanner({ onAction }: { onAction: () => void }) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (isScanning && !scanResult) {
      setTimeout(() => {
        scanner = new Html5QrcodeScanner(
          "reader",
          { fps: 20, qrbox: { width: 280, height: 280 } },
          false
        );

        scanner.render(
          (decodedText) => {
            setScanResult(decodedText);
            setIsScanning(false);
            scanner?.clear();
            toast.success("Code detected!");
          },
          () => {}
        );
      }, 100);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(err => console.error("Scanner clear fail", err));
      }
    };
  }, [isScanning, scanResult]);

  const copyToClipboard = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      toast.success("Copied to clipboard");
    }
  };

  const shareResult = () => {
    if (scanResult && navigator.share) {
      navigator.share({ title: "QuickFix Scan", text: scanResult });
    }
  };

  return (
    <div className="space-y-6">
      {!isScanning && !scanResult ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-32 h-32 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-8 relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl"
            />
            <div className="w-20 h-20 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/30 z-10">
              <Camera className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h3 className="text-3xl font-black mb-3 tracking-tight">QR Scanner</h3>
          <p className="text-muted-foreground mb-10 max-w-[240px] font-medium leading-relaxed">
            Position any QR code within the camera frame for instant detection.
          </p>
          <Button 
            className="w-full h-16 text-xl font-black rounded-[2rem] shadow-xl shadow-primary/20" 
            onClick={() => setIsScanning(true)}
          >
            Open Camera
          </Button>
        </div>
      ) : null}

      {isScanning && !scanResult && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden border-4 border-primary/20 bg-black shadow-2xl">
            <div id="reader" className="w-full h-full"></div>
            
            {/* Overlay UI */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="w-[280px] h-[280px] border-2 border-primary/60 rounded-[2rem] relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg -translate-x-1 -translate-y-1" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg translate-x-1 -translate-y-1" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg -translate-x-1 translate-y-1" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg translate-x-1 translate-y-1" />
                
                <motion.div 
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
             <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/70 animate-pulse">Scanning...</p>
             <Button 
               variant="outline" 
               className="w-full h-14 rounded-2xl border-primary/20 font-bold" 
               onClick={() => setIsScanning(false)}
             >
               Cancel Scanning
             </Button>
          </div>
        </motion.div>
      )}

      {scanResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Card className="p-8 bg-primary/5 border-2 border-primary/20 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                {scanResult.startsWith('http') ? <Globe className="w-5 h-5 text-white" /> : <ScanLine className="w-5 h-5 text-white" />}
              </div>
              <h4 className="text-xs font-black text-primary/70 uppercase tracking-[0.2em]">Detection Result</h4>
            </div>
            
            <div className="bg-card p-5 rounded-2xl border border-border/50 mb-8 max-h-40 overflow-y-auto">
              <p className="text-lg font-bold break-all leading-tight tracking-tight">{scanResult}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="h-14 rounded-2xl gap-2 font-black shadow-md border-border/50" onClick={copyToClipboard}>
                <Copy className="w-5 h-5" /> Copy
              </Button>
              <Button variant="secondary" className="h-14 rounded-2xl gap-2 font-black shadow-md border-border/50" onClick={shareResult}>
                <Share2 className="w-5 h-5" /> Share
              </Button>
            </div>
            
            {scanResult.startsWith('http') && (
              <Button 
                className="w-full h-14 rounded-2xl gap-2 font-black mt-4 shadow-xl shadow-primary/20"
                onClick={() => window.open(scanResult, '_blank')}
              >
                <LinkIcon className="w-5 h-5" /> Open Website
              </Button>
            )}
          </Card>
          
          <div className="flex flex-col gap-3">
            <Button className="w-full h-16 rounded-[2rem] gap-3 font-black text-lg" onClick={() => { setScanResult(null); setIsScanning(true); }}>
              <RefreshCw className="w-5 h-5" /> Scan Again
            </Button>
            <Button variant="ghost" className="w-full font-bold opacity-60" onClick={onAction}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}