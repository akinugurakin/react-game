"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgramCard {
  title: string;
  category: string;
  image: string;
}

interface PulseFitHeroProps {
  title: string;
  subtitle?: string;
  programs: ProgramCard[];
  className?: string;
  children?: React.ReactNode;
}

export function PulseFitHero({
  title,
  subtitle,
  programs,
  className,
  children,
}: PulseFitHeroProps) {
  return (
    <div className={cn("text-center", className)}>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      )}
      {/* Horizontal scrolling program cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-12 flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
      >
        {programs.map((program, index) => (
          <div
            key={index}
            className="group relative min-w-[220px] flex-shrink-0 overflow-hidden rounded-2xl"
          >
            <img
              src={program.image}
              alt={program.title}
              className="h-64 w-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {program.category}
              </span>
              <h3 className="text-sm font-bold text-white">{program.title}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
