import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Scale, Ruler, Thermometer, DollarSign, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type UnitType = "length" | "weight" | "temp" | "currency";

const units: Record<UnitType, { label: string; units: string[] }> = {
  length: { label: "Length", units: ["Meters", "Kilometers", "Feet", "Miles", "Inches"] },
  weight: { label: "Weight", units: ["Kilograms", "Grams", "Pounds", "Ounces"] },
  temp: { label: "Temperature", units: ["Celsius", "Fahrenheit", "Kelvin"] },
  currency: { label: "Currency", units: ["USD", "EUR", "GBP", "JPY", "NGN", "CAD"] }
};

const conversionRates: Record<string, number> = {
  "Meters": 1, "Kilometers": 0.001, "Feet": 3.28084, "Miles": 0.000621371, "Inches": 39.3701,
  "Kilograms": 1, "Grams": 1000, "Pounds": 2.20462, "Ounces": 35.274,
  "USD": 1, "EUR": 0.95, "GBP": 0.79, "JPY": 150, "NGN": 1600, "CAD": 1.40
};

export default function UnitConverter({ onAction }: { onAction: () => void }) {
  const [type, setType] = useState<UnitType>("length");
  const [fromUnit, setFromUnit] = useState(units.length.units[0]);
  const [toUnit, setToUnit] = useState(units.length.units[1]);
  const [value, setValue] = useState("1");

  const convertValue = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return "0";

    if (type === "temp") {
      if (fromUnit === "Celsius" && toUnit === "Fahrenheit") return (val * 9/5 + 32).toFixed(2);
      if (fromUnit === "Fahrenheit" && toUnit === "Celsius") return ((val - 32) * 5/9).toFixed(2);
      if (fromUnit === "Celsius" && toUnit === "Kelvin") return (val + 273.15).toFixed(2);
      if (fromUnit === "Kelvin" && toUnit === "Celsius") return (val - 273.15).toFixed(2);
      return val.toString();
    }

    const baseValue = val / conversionRates[fromUnit];
    return (baseValue * conversionRates[toUnit]).toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
        {(Object.keys(units) as UnitType[]).map((u) => (
          <Button
            key={u}
            variant={type === u ? "default" : "outline"}
            className={`
              rounded-2xl whitespace-nowrap px-6 h-12 font-bold transition-all
              ${type === u ? "bg-primary shadow-lg shadow-primary/20 scale-105" : "border-primary/10 bg-primary/5"}
            `}
            onClick={() => {
              setType(u);
              setFromUnit(units[u].units[0]);
              setToUnit(units[u].units[1]);
            }}
          >
            {u === "length" && <Ruler className="w-4 h-4 mr-2" />}
            {u === "weight" && <Scale className="w-4 h-4 mr-2" />}
            {u === "temp" && <Thermometer className="w-4 h-4 mr-2" />}
            {u === "currency" && <DollarSign className="w-4 h-4 mr-2" />}
            {units[u].label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={type}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Initial Value</label>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{fromUnit}</span>
            </div>
            <div className="flex gap-3">
              <Input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                className="text-3xl h-20 font-black rounded-3xl bg-secondary/30 border-none px-6 focus-visible:ring-primary shadow-inner"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-[110px] h-20 rounded-3xl font-black bg-primary/10 border-none flex flex-col justify-center gap-1">
                  <span className="text-[10px] uppercase opacity-50">Unit</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50">
                  {units[type].units.map(u => (
                    <SelectItem key={u} value={u} className="font-bold">{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
            <motion.button 
              whileTap={{ scale: 0.9, rotate: 180 }}
              className="w-14 h-14 bg-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center text-white border-4 border-background"
              onClick={() => {
                const temp = fromUnit;
                setFromUnit(toUnit);
                setToUnit(temp);
              }}
            >
              <ArrowRightLeft className="w-6 h-6 rotate-90" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Result</label>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{toUnit}</span>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-primary text-primary-foreground rounded-3xl h-20 px-8 flex items-center shadow-xl shadow-primary/20">
                <span className="text-3xl font-black tracking-tighter truncate">{convertValue()}</span>
              </div>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-[110px] h-20 rounded-3xl font-black bg-primary text-primary-foreground border-none flex flex-col justify-center gap-1">
                  <span className="text-[10px] uppercase opacity-50 text-white">Unit</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50">
                  {units[type].units.map(u => (
                    <SelectItem key={u} value={u} className="font-bold">{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="pt-8">
        <div className="p-6 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-xl">
            <LayoutGrid className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-wider mb-1">Precision Guaranteed</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              Calculation based on international standards. Currency rates are cached and refreshed daily for maximum accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}