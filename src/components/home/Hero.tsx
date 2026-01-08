"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { TwitterFeed } from "./TwitterFeed";

export function Hero() {
  return (
    <section className="py-16 md:py-24 border-b border-charcoal/5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main title section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] mb-6">
              Compound Thesis Database
            </h1>
            <p className="font-mono text-sm md:text-base text-charcoal-light max-w-xl leading-relaxed tracking-wide">
              A living document of investment theses, research notes, and market
              perspectives. We publish our thinking to attract founders building
              in areas we find compelling.
            </p>

            {/* Scientific decoration */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-charcoal/20" />
              <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                Research Archive
              </span>
            </div>
          </motion.div>

          {/* Twitter feed section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <TwitterFeed />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
