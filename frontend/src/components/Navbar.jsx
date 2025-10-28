import React from 'react';
import { motion } from 'framer-motion';

/**
 * A simple navigation bar that anchors to each major section of the page.
 * The nav is positioned at the top and stays visible as the user scrolls.
 */
const Navbar = () => {
  const navItems = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#about', label: 'About' },
    { href: '#team', label: 'Team' },
    { href: '#projects', label: 'Projects' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#video', label: 'Video' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto flex justify-end gap-6 text-sm font-body">
        {navItems.map((item, index) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="relative hover:text-fashionRed transition-colors duration-200 group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            {item.label}
            <motion.div
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-fashionRed group-hover:w-full transition-all duration-300"
              whileHover={{ width: '100%' }}
            />
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
