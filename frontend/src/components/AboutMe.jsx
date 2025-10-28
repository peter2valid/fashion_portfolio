import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutMe section that elaborates on Hope's background and preferences. It
 * displays a combination of paragraphs and lists to communicate her
 * modelling journey, reasons and stylistic preferences.
 */
const AboutMe = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-creamBg">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-fashion text-5xl text-fashionRed uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          I'm {data.modelName}
        </motion.h2>
        <motion.div
          className="bg-white border border-borderBlack p-8 rounded-md shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="font-body text-black mb-4 whitespace-pre-line">{data.startedModeling}</p>
          <p className="font-body text-black mb-8 whitespace-pre-line">{data.whyModel}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Modeling types */}
            <div>
              <h3 className="font-fashion text-xl text-fashionRed uppercase mb-2">Modelling Types</h3>
              <ul className="list-disc list-inside font-body text-black space-y-1">
                {data.modelingTypes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {/* Style preferences */}
            <div>
              <h3 className="font-fashion text-xl text-fashionRed uppercase mb-2">Style</h3>
              <p className="font-body text-black mb-2">
                <span className="font-semibold">Description:</span> {data.styleDescription}
              </p>
              <p className="font-body text-black mb-2">
                <span className="font-semibold">Inspiration:</span> {data.styleInspiration}
              </p>
              <p className="font-body text-black mb-2">
                <span className="font-semibold">Website Style:</span> {data.websiteStyle}
              </p>
              <p className="font-body text-black mb-2">
                <span className="font-semibold">Colours:</span> {data.favoriteColors}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
