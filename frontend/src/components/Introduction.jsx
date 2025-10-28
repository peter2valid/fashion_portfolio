import React from 'react';
import { motion } from 'framer-motion';

/**
 * Introduction section inspired by the second slide. It pairs a heading and
 * paragraph with a portrait, separated into two columns on larger screens.
 * A small decorative starburst accent echoes the original design.
 */
const Introduction = ({ data }) => {
  return (
    <section id="introduction" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Text side */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-fashion text-5xl md:text-6xl text-fashionRed uppercase mb-4">Introduction</h2>
          {/* Starburst accent */}
          <div className="mb-4 flex items-center">
            <span className="w-6 h-6 mr-2 text-fashionRed text-3xl leading-none">✹</span>
            <span className="font-body text-black text-base uppercase">Get to know me</span>
          </div>
          <p className="font-body text-black text-lg leading-relaxed whitespace-pre-line">
            {data.introduction}
          </p>
        </motion.div>
        {/* Portrait image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/hero.png"
            alt="Portrait of Ntinyari Hope"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
