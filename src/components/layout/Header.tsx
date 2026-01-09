"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
            <Image
              src="/compound-logo.svg"
              alt="Compound"
              width={160}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-charcoal/50 hover:text-charcoal transition-colors"
            >
              Archive
            </Link>
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
