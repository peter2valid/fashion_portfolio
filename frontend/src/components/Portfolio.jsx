import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Introduction from './Introduction.jsx';
import AboutMe from './AboutMe.jsx';
import Team from './Team.jsx';
import ProjectShowcase from './ProjectShowcase.jsx';
import Gallery from './Gallery.jsx';
import VideoShowcase from './VideoShowcase.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';
import hopeData from '../data/hopeData.js';

/**
 * Main portfolio component containing all sections
 */
const Portfolio = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero data={hopeData} />
      <Introduction data={hopeData} />
      <AboutMe data={hopeData} />
      <Team team={hopeData.team} />
      <ProjectShowcase />
      <Gallery />
      <VideoShowcase />
      <Contact data={hopeData} />
      <Footer data={hopeData} />

      {/* Floating Book Hope Button */}
      <motion.a
        href="https://wa.me/254792822887"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-fashionRed text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-body text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        💬 Book Hope
      </motion.a>

      {/* Floating Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white border border-fashionRed text-fashionRed p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </motion.button>

      {/* Background Music (Hidden) */}
      {isMusicPlaying && (
        <audio autoPlay loop>
          <source src="/audio/skyfall.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default Portfolio;

