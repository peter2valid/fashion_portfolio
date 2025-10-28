import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero section featuring Hope seated on a director's chair with overlaying
 * signature and serif headings. The text and image overlap to recreate
 * the look of the provided reference slide. Animations bring the text
 * elements to life on load.
 */
const Hero = ({ data }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <motion.img
        src="/images/hero.png"
        alt="Hope sitting on a director's chair wearing a red hat"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-start md:items-center gap-12">
        {/* Text container */}
        <div className="flex-1">
          <motion.h1
            className="font-signature text-4xl md:text-5xl text-black mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {data.modelName}
          </motion.h1>
          <motion.h2
            className="font-fashion text-6xl md:text-8xl text-fashionRed uppercase tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            My Portfolio
          </motion.h2>
          <motion.p
            className="font-body text-black text-sm md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {data.websiteUrl}
          </motion.p>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center text-fashionRed"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-sm font-body mb-2">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-fashionRed rounded-full flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-1 h-3 bg-fashionRed rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
