import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Image as ImageIcon, CheckCircle2, RefreshCw, Layers } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCompressor({ onAction }: { onAction: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([70]);
  const [compressing, setCompressing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setCompressedFile(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setCompressing(true);
    
    try {
      const options = {
        maxSizeMB: (file.size / 1024 / 1024) * (quality[0] / 100),
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      };
      
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      toast.success("Image optimized successfully!");
    } catch (err) {
      toast.error("Compression failed");
    } finally {
      setCompressing(false);
    }
  };

  const download = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `optimized_${file?.name}`;
    a.click();
    toast.success("Download started");
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <Card className="p-12 border-dashed border-2 border-primary/20 flex flex-col items-center justify-center bg-primary/5 rounded-[2.5rem] group cursor-pointer overflow-hidden">
          <label className="cursor-pointer flex flex-col items-center w-full">
            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-primary/30 group-hover:rotate-12 transition-transform">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tight mb-1 text-center">Select Image</span>
            <p className="text-sm text-muted-foreground font-medium opacity-70 italic text-center">
              Supports JPG, PNG, WebP up to 10MB
            </p>
            <Input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
        </Card>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-5 bg-card/40 backdrop-blur-md rounded-[1.5rem] border border-border/50">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden border border-border/50">
                {file ? (
                   <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <ImageIcon className="text-muted-foreground w-8 h-8" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-black text-base truncate mb-1">{file.name}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Original</span>
                  <span className="text-sm font-bold opacity-60">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="h-8 font-bold text-xs hover:bg-destructive/10 hover:text-destructive">
                REMOVE
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 rounded-[2rem] border-none">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-primary/70">Optimization</span>
              </div>
              <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-black">
                {quality[0]}%
              </div>
            </div>
            <Slider 
              value={quality} 
              onValueChange={setQuality} 
              max={100} 
              min={10}
              step={1} 
              className="py-4"
            />
            <p className="text-[10px] text-center text-muted-foreground mt-2 font-bold uppercase tracking-tighter">
              Lower quality = Smaller file size
            </p>
          </Card>

          <Button 
            className="w-full h-16 rounded-[2rem] font-black text-xl shadow-xl shadow-primary/20" 
            disabled={compressing}
            onClick={handleCompress}
          >
            {compressing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" /> Optimizing...
              </span>
            ) : "Start Compression"}
          </Button>

          <AnimatePresence>
            {compressedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-8 bg-green-500/5 rounded-[2.5rem] border border-green-500/20 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-green-500/20">
                    SAVED {Math.round((1 - compressedFile.size / file.size) * 100)}%
                  </div>
                </div>
                
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="font-black text-2xl tracking-tight mb-2">Done!</h4>
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Before</p>
                    <p className="font-black text-lg">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-green-500 uppercase mb-1">After</p>
                    <p className="font-black text-lg text-green-500">{(compressedFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl gap-2 text-lg font-bold bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/20" onClick={download}>
                  <Download className="w-6 h-6" /> Save to Device
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}