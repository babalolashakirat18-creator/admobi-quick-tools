import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, FileDown, Trash2, FileText, CheckCircle2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

export default function PDFConverter({ onAction }: { onAction: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} images added`);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setConverting(true);
    
    try {
      const doc = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        if (i > 0) doc.addPage();
        
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      doc.save("QuickFix_Document.pdf");
      setCompleted(true);
      toast.success("PDF generated successfully!");
    } catch (err) {
      toast.error("Failed to generate PDF");
    } finally {
      setConverting(false);
    }
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
          />
          <CheckCircle2 className="w-14 h-14 text-green-500 relative z-10" />
        </div>
        <h3 className="text-3xl font-black mb-3 tracking-tight">Success!</h3>
        <p className="text-muted-foreground mb-10 max-w-[250px]">Your PDF has been generated and is ready for use.</p>
        <div className="flex flex-col gap-3 w-full max-w-[280px]">
          <Button onClick={() => { setCompleted(false); setImages([]); }} variant="outline" className="h-12 rounded-2xl border-primary/20">
            Convert More
          </Button>
          <Button onClick={onAction} className="h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20">
            Return Home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-10 border-dashed border-2 border-primary/20 flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors rounded-[2.5rem] group cursor-pointer relative overflow-hidden">
        <label className="cursor-pointer flex flex-col items-center w-full h-full py-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-5 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
            <Plus className="w-8 h-8 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tight mb-1">Add Images</span>
          <span className="text-sm text-muted-foreground font-medium opacity-70 italic">Tap to browse files</span>
          <Input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </Card>

      <AnimatePresence>
        {images.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-end px-2">
              <div>
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-primary/70">
                  Queue ({images.length})
                </h4>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setImages([])} className="text-destructive font-bold h-7 px-2 hover:bg-destructive/10">
                CLEAR
              </Button>
            </div>
            
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2 scrollbar-hide">
              {images.map((file, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center p-3.5 bg-card/50 backdrop-blur-md rounded-2xl border border-border/50 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mr-4 group-hover:bg-primary/10 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button 
                    onClick={() => removeImage(idx)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <Button 
              className="w-full h-16 text-lg font-black rounded-3xl mt-4 shadow-xl shadow-primary/20 relative overflow-hidden group" 
              disabled={converting}
              onClick={generatePDF}
            >
              {converting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Build PDF Document <FileDown className="w-5 h-5" />
                </span>
              )}
              <motion.div 
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}