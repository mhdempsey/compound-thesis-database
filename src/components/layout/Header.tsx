"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/80 backdrop-blur-md"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl font-semibold text-charcoal hover:text-charcoal/80 transition-colors"
          >
            Compound Theses
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors"
            >
              All Theses
            </Link>
            <a
              href="https://compound.vc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors"
            >
              About Compound
            </a>
          </nav>
        </div>
      </Container>
    </motion.header>
  );
}
