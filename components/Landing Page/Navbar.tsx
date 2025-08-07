"use client";

import { Link } from "next-view-transitions";
import React from "react";
import ThemeToggle from "../ThemeToggle";
import { motion } from "motion/react";
import { GitHub } from "@/lib/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Navlinks = [
  {
    label: "Projects",
    href: "/user/my-projects"
  },
  {
    label: "Submit",
    href: "/user/submit"
  }
];

const Navbar = () => {
  return (
    <nav className="w-full border-b border-dashed dark:border-zinc-700 border-zinc-300">
      <div className="max-w-5xl mx-auto p-3 flex justify-between items-center">
        <div className="flex gap-4 text-sm font-semibold text-muted-foreground">
          {Navlinks.map((link, index) => (
            <motion.p
              initial={{
                y: -8,
                opacity: 0,
                filter: "blur(6px)"
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 0.3 * index
              }}
              key={index}
            >
              <Link
                href={link.href}
                className="dark:hover:text-zinc-200 hover:text-zinc-800"
              >
                {link.label}
              </Link>
            </motion.p>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={
                  "https://github.com/techno-bharati/Project-Submission-Platform"
                }
                target="_blank"
                className="p-2 hover:bg-muted-foreground/10 rounded-sm"
              >
                <GitHub className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Proudly Open Source</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
