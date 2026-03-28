"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MenuToggleIconProps {
  isOpen: boolean;
  className?: string;
  onClick?: () => void;
}

export function MenuToggleIcon({
  isOpen,
  className,
  onClick,
}: MenuToggleIconProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted",
        className
      )}
      aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
    >
      <div className="flex h-5 w-6 flex-col justify-between">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="h-0.5 w-full rounded-full bg-current"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="h-0.5 w-full rounded-full bg-current"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="h-0.5 w-full rounded-full bg-current"
        />
      </div>
    </button>
  );
}
