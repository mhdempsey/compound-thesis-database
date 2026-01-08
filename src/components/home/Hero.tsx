"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-charcoal leading-tight mb-6">
            Investment Theses
          </h1>
          <p className="text-lg md:text-xl text-charcoal-light max-w-2xl">
            Explore our perspectives on transformative technologies and markets
            shaping the future of innovation.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
