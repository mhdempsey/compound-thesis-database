"use client";

import { motion } from "framer-motion";
import { Thesis } from "@/types/thesis";
import { ThesisCard } from "./ThesisCard";

interface RelatedThesesProps {
  theses: Thesis[];
}

export function RelatedTheses({ theses }: RelatedThesesProps) {
  if (theses.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="py-16 border-t border-charcoal/10"
    >
      <h2 className="font-serif text-2xl font-semibold text-charcoal mb-8">
        Related Theses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {theses.map((thesis, index) => (
          <ThesisCard key={thesis.id} thesis={thesis} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
