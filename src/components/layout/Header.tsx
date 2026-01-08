"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-charcoal/5 bg-cream/90 backdrop-blur-md"
    >
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            {/* Logo mark */}
            <div className="w-6 h-6 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:border-charcoal/40 transition-colors">
              <div className="w-2 h-2 rounded-full bg-charcoal/60" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-charcoal/70 group-hover:text-charcoal transition-colors">
              Compound
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-charcoal/50 hover:text-charcoal transition-colors"
            >
              Archive
            </Link>
            <a
              href="https://twitter.com/compoundarxiv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-charcoal/50 hover:text-charcoal transition-colors"
            >
              @compoundarxiv
            </a>
            <a
              href="https://compound.vc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-charcoal/50 hover:text-charcoal transition-colors flex items-center gap-1.5"
            >
              <span>About</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>
        </div>
      </Container>
    </motion.header>
  );
}
