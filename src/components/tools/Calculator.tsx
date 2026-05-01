import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { evaluate } from "mathjs";
import { Delete, History, X, Divide, Minus, Plus, Equal, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator({ onAction }: { onAction: () => void }) {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [scientific, setScientific] = useState(false);

  const handleClick = (val: string) => {
    setExpression((prev) => prev + val);
  };

  const calculate = () => {
    try {
      if (!expression) return;
      const res = evaluate(expression.replace(/×/g, "*").replace(/÷/g, "/"));
      setResult(res.toString());
      setExpression(res.toString());
    } catch (err) {
      toast.error("Expression error");
    }
  };

  const clear = () => {
    setExpression("");
    setResult("");
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const buttons = [
    { label: "AC", action: clear, type: "operator", color: "bg-red-500/10 text-red-500" },
    { label: "(", action: () => handleClick("("), type: "operator" },
    { label: ")", action: () => handleClick(")"), type: "operator" },
    { label: "÷", action: () => handleClick("÷"), type: "operator", icon: <Divide className="w-6 h-6" />, primary: true },
    
    { label: "7", action: () => handleClick("7"), type: "number" },
    { label: "8", action: () => handleClick("8"), type: "number" },
    { label: "9", action: () => handleClick("9"), type: "number" },
    { label: "×", action: () => handleClick("×"), type: "operator", icon: <X className="w-6 h-6" />, primary: true },
    
    { label: "4", action: () => handleClick("4"), type: "number" },
    { label: "5", action: () => handleClick("5"), type: "number" },
    { label: "6", action: () => handleClick("6"), type: "number" },
    { label: "−", action: () => handleClick("-"), type: "operator", icon: <Minus className="w-6 h-6" />, primary: true },
    
    { label: "1", action: () => handleClick("1"), type: "number" },
    { label: "2", action: () => handleClick("2"), type: "number" },
    { label: "3", action: () => handleClick("3"), type: "number" },
    { label: "+", action: () => handleClick("+"), type: "operator", icon: <Plus className="w-6 h-6" />, primary: true },
    
    { label: "0", action: () => handleClick("0"), type: "number" },
    { label: ".", action: () => handleClick("."), type: "number" },
    { label: "⌫", action: backspace, type: "operator", icon: <Delete className="w-6 h-6" /> },
    { label: "=", action: calculate, type: "equals", icon: <Equal className="w-7 h-7" /> },
  ];

  const scientificButtons = [
    { label: "sin", action: () => handleClick("sin(") },
    { label: "cos", action: () => handleClick("cos(") },
    { label: "tan", action: () => handleClick("tan(") },
    { label: "log", action: () => handleClick("log10(") },
    { label: "ln", action: () => handleClick("log(") },
    { label: "π", action: () => handleClick("PI") },
    { label: "√", action: () => handleClick("sqrt(") },
    { label: "^", action: () => handleClick("^") },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <Card className="p-8 bg-card/40 backdrop-blur-xl border-none shadow-inner flex flex-col items-end justify-end min-h-[160px] rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-4 left-6 flex items-center gap-2">
           <Sparkles className="w-4 h-4 text-primary/50" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Engine V2.0</span>
        </div>
        <motion.div 
          key={expression}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground text-xl mb-2 font-bold opacity-60 h-8 overflow-hidden"
        >
          {expression}
        </motion.div>
        <motion.div 
          key={result}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-5xl font-black tracking-tighter"
        >
          {result || "0"}
        </motion.div>
      </Card>

      <div className="flex justify-between items-center px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setScientific(!scientific)}
          className={`text-[10px] font-black uppercase tracking-widest px-4 rounded-full transition-all ${scientific ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-primary'}`}
        >
          {scientific ? "Basic Mode" : "Scientific"}
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
          <History className="w-5 h-5" />
        </Button>
      </div>

      <AnimatePresence>
        {scientific && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-4 gap-2.5 px-1 overflow-hidden"
          >
            {scientificButtons.map((btn) => (
              <Button
                key={btn.label}
                variant="outline"
                className="h-12 bg-primary/5 border-none font-black text-xs rounded-xl hover:bg-primary/20 transition-colors"
                onClick={btn.action}
              >
                {btn.label}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-3.5 flex-1 px-1">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            onClick={btn.action}
            className={`
              h-[4.5rem] text-2xl font-black rounded-[2rem] transition-all active:scale-90 border-none shadow-md
              ${btn.type === "equals" ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30" : ""}
              ${btn.type === "number" ? "bg-card hover:bg-card/80 text-foreground" : ""}
              ${btn.primary ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
              ${!btn.primary && btn.type === "operator" && btn.label !== "AC" ? "bg-secondary text-foreground" : ""}
              ${btn.color || ""}
            `}
          >
            {btn.icon || btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}