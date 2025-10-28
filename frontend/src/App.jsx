import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Introduction from './components/Introduction.jsx';
import AboutMe from './components/AboutMe.jsx';
import Team from './components/Team.jsx';
import ProjectShowcase from './components/ProjectShowcase.jsx';
import Gallery from './components/Gallery.jsx';
import VideoShowcase from './components/VideoShowcase.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import hopeData from './data/hopeData.js';

/**
 * The main application component with routing for portfolio and admin sections
 */
function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleAdminLogin = () => {
    const email = prompt('Admin Email:');
    const password = prompt('Admin Password:');
    if (email === 'hope@portfolio.com' && password === 'hope123') {
      setIsAuthenticated(true);
      setShowAdmin(true);
      alert('Admin access granted! Admin panel is now visible.');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setShowAdmin(false);
  };

  return (
    <ErrorBoundary>
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

        {/* Admin Button - Hidden but accessible */}
        <motion.button
          onClick={isAuthenticated ? handleAdminLogout : handleAdminLogin}
          className="fixed top-6 left-6 z-50 bg-fashionRed text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-body"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {isAuthenticated ? 'Logout' : 'Admin'}
        </motion.button>

        {/* Background Music (Hidden) */}
        {isMusicPlaying && (
          <audio autoPlay loop>
            <source src="/audio/skyfall.mp3" type="audio/mpeg" />
          </audio>
        )}

        {/* Admin Panel - Only visible when authenticated */}
        {showAdmin && isAuthenticated && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Admin Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-signature text-3xl text-fashionRed">Admin Panel</h2>
                  <p className="font-body text-black text-sm">Manage your portfolio content</p>
                </div>
                <button
                  onClick={handleAdminLogout}
                  className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors font-body"
                >
                  Logout
                </button>
              </div>

              {/* Admin Content */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.button
                    className="p-4 bg-fashionRed text-white rounded-lg hover:bg-red-700 transition-colors text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://sanity.io', '_blank')}
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-body font-medium">Sanity Studio</div>
                    <div className="text-xs opacity-80">Edit content</div>
                  </motion.button>

                  <motion.button
                    className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const url = prompt('Enter image URL to add to gallery:');
                      if (url) {
                        alert(`Image URL: ${url}\n\nTo add this to your gallery, use Sanity Studio to create a new gallery item with this URL.`);
                      }
                    }}
                  >
                    <div className="text-2xl mb-2">🖼️</div>
                    <div className="font-body font-medium">Add Image</div>
                    <div className="text-xs opacity-80">Quick add</div>
                  </motion.button>

                  <motion.button
                    className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const url = prompt('Enter video URL to add to videos:');
                      if (url) {
                        alert(`Video URL: ${url}\n\nTo add this to your videos, use Sanity Studio to create a new video item with this URL.`);
                      }
                    }}
                  >
                    <div className="text-2xl mb-2">🎥</div>
                    <div className="font-body font-medium">Add Video</div>
                    <div className="text-xs opacity-80">Quick add</div>
                  </motion.button>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-fashion text-xl text-fashionRed mb-4">How to Manage Content</h3>
                  <div className="space-y-3 text-sm font-body text-black">
                    <div className="flex items-start space-x-3">
                      <span className="bg-fashionRed text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                      <div>
                        <strong>Click "Sanity Studio"</strong> to open the full content management system
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-fashionRed text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                      <div>
                        <strong>Add Projects:</strong> Create new project entries with images, descriptions, and client names
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-fashionRed text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                      <div>
                        <strong>Add Gallery Images:</strong> Upload photos to showcase your portfolio
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-fashionRed text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                      <div>
                        <strong>Add Videos:</strong> Upload runway moments and behind-the-scenes content
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Content Status */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-fashion text-xl text-fashionRed mb-4">Content Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="font-bold text-green-600">Portfolio</div>
                      <div className="text-gray-600">Static content loaded</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded">
                      <div className="font-bold text-yellow-600">Projects</div>
                      <div className="text-gray-600">Using fallback data</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded">
                      <div className="font-bold text-yellow-600">Gallery</div>
                      <div className="text-gray-600">Using fallback data</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
