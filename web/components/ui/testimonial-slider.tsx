"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  description: string;
  role?: string;
}

interface TestimonialSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialSlider({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className,
  ...props
}: TestimonialSliderProps) {
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const next = React.useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = React.useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  const testimonial = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div
      className={cn("relative mx-auto max-w-2xl text-center", className)}
      {...props}
    >
      <Quote className="mx-auto mb-6 h-10 w-10 text-brand-lime/40" />

      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={testimonial.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <p className="text-lg leading-relaxed text-foreground/80">
              &ldquo;{testimonial.description}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-lime/30"
              />
              <div className="text-left">
                <p className="font-bold">{testimonial.name}</p>
                {testimonial.role && (
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          aria-label="Önceki"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === current
                  ? "w-6 bg-brand-teal"
                  : "bg-brand-sand/40 hover:bg-brand-sand/60"
              )}
              aria-label={`Yorum ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          aria-label="Sonraki"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
