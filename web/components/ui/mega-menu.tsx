"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type MegaMenuItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      href?: string;
    }[];
  }[];
  href?: string;
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const [isHover, setIsHover] = React.useState<number | null>(null);

    const handleHover = (menuLabel: string | null) => {
      setOpenMenu(menuLabel);
    };

    const linkClass =
      "relative flex cursor-pointer items-center justify-center gap-1 rounded-full py-1.5 px-4 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground group";

    return (
      <ul
        ref={ref}
        className={cn("relative flex items-center space-x-0", className)}
        {...props}
      >
        {items.map((navItem) => {
          const hasSubmenu = !!navItem.subMenus;
          const isActive = isHover === navItem.id || openMenu === navItem.label;

          // Submenu'su olmayan item — doğrudan Link
          if (!hasSubmenu && navItem.href) {
            return (
              <li
                key={navItem.label}
                className="relative"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <Link href={navItem.href} className={linkClass}>
                  {isActive && (
                    <motion.div
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 size-full bg-muted/80"
                      style={{ borderRadius: 99 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.label}</span>
                </Link>
              </li>
            );
          }

          // Submenu'lu item — dropdown
          return (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => handleHover(navItem.label)}
              onMouseLeave={() => handleHover(null)}
            >
              {navItem.href ? (
                <Link
                  href={navItem.href}
                  className={linkClass}
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 size-full bg-muted/80"
                      style={{ borderRadius: 99 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.label}</span>
                  <ChevronDown
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 transition-transform duration-200",
                      openMenu === navItem.label && "rotate-180"
                    )}
                  />
                </Link>
              ) : (
                <button
                  className={linkClass}
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 size-full bg-muted/80"
                      style={{ borderRadius: 99 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.label}</span>
                  <ChevronDown
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 transition-transform duration-200",
                      openMenu === navItem.label && "rotate-180"
                    )}
                  />
                </button>
              )}

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div className="absolute left-0 top-full w-auto pt-2 z-50">
                    <motion.div
                      className="w-max rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="flex w-fit shrink-0 gap-8">
                        {navItem.subMenus.map((sub) => (
                          <div className="w-full" key={sub.title}>
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              {sub.title}
                            </h3>
                            <ul className="space-y-1">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <Link
                                      href={item.href || "#"}
                                      className="flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-150 hover:bg-muted/80 group"
                                    >
                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all duration-200 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                                        <Icon className="h-4 w-4" />
                                      </div>
                                      <div className="leading-5">
                                        <p className="text-sm font-medium text-foreground">
                                          {item.label}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export default MegaMenu;
