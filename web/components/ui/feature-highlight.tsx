"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureLine {
  text: string;
  emoji?: string;
}

interface FeatureHighlightProps {
  title: string;
  lines: FeatureLine[];
  className?: string;
}

export function FeatureHighlight({
  title,
  lines,
  className,
}: FeatureHighlightProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold md:text-4xl"
      >
        {title}
      </motion.h2>
      <div className="space-y-4">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.12 }}
            className="text-lg leading-relaxed text-foreground/80"
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
