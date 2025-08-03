"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { motion, stagger, useAnimate } from "motion/react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

const Hero = () => {
  const [scope, animate] = useAnimate();

  const router = useRouter();

  const startAnimating = () => {
    animate(
      "#hero",
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)"
      },
      {
        duration: 0.3,
        delay: stagger(0.2)
      }
    );
  };

  useEffect(() => {
    startAnimating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={scope} className="w-full h-full px-3">
      <div className="max-w-6xl h-full mx-auto border-x border-dashed dark:border-zinc-700 border-zinc-300 flex flex-col">
        <div className="max-w-5xl h-full mx-auto">
          <div className="w-full h-1/2 flex flex-col justify-center items-center px-2">
            <motion.h1
              id="hero"
              initial={{
                y: 8,
                opacity: 0,
                filter: "blur(8px)"
              }}
              className="text-3xl md:text-4xl lg:text-5xl text-center"
            >
              Showcase Your Projects <br className="sm:hidden block" /> to the{" "}
              <br className="hidden sm:block" /> College Community
            </motion.h1>
            <motion.p
              id="hero"
              initial={{
                y: 8,
                opacity: 0,
                filter: "blur(8px)"
              }}
              className="max-w-xl mt-4 text-center text-xs sm:text-sm px-5 text-muted-foreground"
            >
              Easily upload, share, and explore projects from fellow students.
              <span className="italic">
                Whether it&apos;s a web app, research paper—this is your space
                to shine.
              </span>
            </motion.p>
            <motion.div
              id="hero"
              initial={{
                y: 8,
                opacity: 0,
                filter: "blur(8px)"
              }}
              className="w-full flex justify-center gap-2 mt-5"
            >
              <Button
                onClick={() => router.push("/submit")}
                variant={"secondary"}
              >
                Submit
              </Button>
              <Button
                onClick={() => router.push("/projects")}
                variant={"outline"}
              >
                Explore projects
              </Button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Hero;
