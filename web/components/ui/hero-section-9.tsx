"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface HeroSection9Props {
  title: string;
  description?: string;
  stats: Stat[];
  images: string[];
  className?: string;
}

export function HeroSection9({
  title,
  description,
  stats,
  images,
  className,
}: HeroSection9Props) {
  return (
    <div className={cn("grid items-center gap-12 lg:grid-cols-2", className)}>
      {/* Left — text + stats */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold md:text-4xl"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
        <div className="mt-8 grid grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <p className="text-3xl font-extrabold text-brand-teal">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right — image collage */}
      <div className="relative hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          {images[0] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2 overflow-hidden rounded-2xl"
            >
              <img
                src={images[0]}
                alt=""
                className="h-48 w-full object-cover"
              />
            </motion.div>
          )}
          {images[1] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="overflow-hidden rounded-2xl"
            >
              <img
                src={images[1]}
                alt=""
                className="h-40 w-full object-cover"
              />
            </motion.div>
          )}
          {images[2] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="overflow-hidden rounded-2xl"
            >
              <img
                src={images[2]}
                alt=""
                className="h-40 w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
