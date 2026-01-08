"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Thesis } from "@/types/thesis";
import { ThesisCard } from "@/components/thesis/ThesisCard";

interface ThesisGridProps {
  theses: Thesis[];
}

export function ThesisGrid({ theses }: ThesisGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {theses.map((thesis, index) => (
          <motion.div
            key={thesis.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ThesisCard thesis={thesis} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
