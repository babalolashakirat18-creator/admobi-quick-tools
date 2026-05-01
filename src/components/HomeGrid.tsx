import React from "react";
import { 
  FileText, 
  Image as ImageIcon, 
  QrCode, 
  Repeat, 
  Calculator,
  ChevronRight,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

interface HomeGridProps {
  onSelectTool: (tool: "pdf" | "compressor" | "qr" | "unit" | "calculator") => void;
}

export default function HomeGrid({ onSelectTool }: HomeGridProps) {
  const tools = [
    {
      id: "pdf",
      name: "PDF Converter",
      desc: "Images to PDF",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-600",
      type: "pdf" as const,
      featured: true
    },
    {
      id: "compressor",
      name: "Compressor",
      desc: "Reduce size",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-600",
      type: "compressor" as const
    },
    {
      id: "qr",
      name: "QR Scanner",
      desc: "Scan & Create",
      icon: <QrCode className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-600",
      type: "qr" as const
    },
    {
      id: "unit",
      name: "Converter",
      desc: "Unit conversion",
      icon: <Repeat className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-600",
      type: "unit" as const
    },
    {
      id: "calculator",
      name: "Calculator",
      desc: "Smart math",
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-600",
      type: "calculator" as const
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4"
    >
      {tools.map((tool) => (
        <motion.button
          key={tool.id}
          variants={item}
          onClick={() => onSelectTool(tool.type)}
          className={`
            group relative flex flex-col p-5 rounded-[2rem] bg-card border border-orange-500/10 
            hover:border-orange-500/40 transition-all active:scale-95 text-left overflow-hidden 
            ${tool.featured ? "col-span-2 flex-row items-center gap-5 bg-gradient-to-r from-card to-orange-500/5" : ""}
            shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]
          `}
        >
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className={`${tool.color} p-3.5 rounded-2xl shadow-xl shadow-orange-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-white`}>
            {tool.icon}
          </div>
          
          <div className={`flex-1 ${tool.featured ? "mt-0" : "mt-4"} group-hover:translate-x-1 transition-transform duration-300`}>
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="font-extrabold text-base tracking-tight group-hover:text-orange-500 transition-colors">{tool.name}</h3>
              {tool.featured && (
                <div className="flex items-center px-1.5 py-0.5 rounded-full bg-orange-500/10 text-[10px] font-bold text-orange-500 uppercase tracking-tighter border border-orange-500/20">
                  <Zap className="w-2.5 h-2.5 mr-0.5 fill-orange-500" /> Hot
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-xs font-medium line-clamp-1 group-hover:text-foreground/80 transition-colors">{tool.desc}</p>
          </div>

          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <ChevronRight className="w-5 h-5 text-orange-500" />
          </div>

          {/* Animated Background Blob */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-all duration-500" />
        </motion.button>
      ))}
    </motion.div>
  );
}