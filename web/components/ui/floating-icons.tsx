"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Star,
  Trophy,
  Zap,
  Heart,
  Sparkles,
} from "lucide-react";

const icons = [
  { Icon: Calculator, color: "text-blue-400", x: "5%", y: "15%", size: 28, delay: 0 },
  { Icon: Star, color: "text-amber-400", x: "90%", y: "10%", size: 24, delay: 0.5 },
  { Icon: Brain, color: "text-purple-400", x: "85%", y: "65%", size: 30, delay: 1 },
  { Icon: Puzzle, color: "text-orange-400", x: "8%", y: "70%", size: 26, delay: 1.5 },
  { Icon: BookOpen, color: "text-emerald-400", x: "15%", y: "40%", size: 22, delay: 0.8 },
  { Icon: Trophy, color: "text-yellow-400", x: "92%", y: "38%", size: 20, delay: 1.2 },
  { Icon: Zap, color: "text-cyan-400", x: "75%", y: "80%", size: 18, delay: 0.3 },
  { Icon: Heart, color: "text-rose-400", x: "25%", y: "85%", size: 20, delay: 1.8 },
  { Icon: Sparkles, color: "text-indigo-300", x: "50%", y: "5%", size: 22, delay: 0.6 },
];

export function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map(({ Icon, color, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute opacity-20 ${color}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.2, 0.15, 0],
            scale: [0.5, 1, 1.1, 1, 0.5],
            y: [0, -15, -5, -20, 0],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
}
