import React from 'react';
import { motion } from 'framer-motion';

/**
 * Team section displays the collaborators who help bring Hope's looks
 * together. It uses a framed card with a subtle drop shadow and a grid
 * layout that adapts between 2 and 4 columns based on the viewport.
 */
const Team = ({ team }) => {
  return (
    <section id="team" className="py-24 bg-creamBg">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="border border-borderBlack p-8 rounded-md shadow-lg bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-fashion text-4xl md:text-5xl text-fashionRed uppercase text-center mb-8">
            Meet My Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img
                  src={member.imageSrc}
                  alt={member.name}
                  className="w-full h-48 object-cover object-center mb-4 grayscale rounded-md shadow"
                />
                <p className="font-body text-black">{member.name}</p>
              </motion.div>
            ))}
          </div>
          {/* Starburst accent positioned bottom right */}
          <div className="mt-6 flex justify-end">
            <span className="text-fashionRed text-4xl">✹</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
