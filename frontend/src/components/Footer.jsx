import React from 'react';
import { motion } from 'framer-motion';

/**
 * Footer section wraps up the site with a thank you message and a small
 * portrait. It borrows the tone of the final slide to leave visitors
 * with a lasting impression and includes the year automatically.
 */
const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ntinyari.hope?igsh=Z3EwamR3MGx3cHd0',
      icon: '/images/Instagram_icon.png',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@ntinyarihope?_t=ZS-90qGU1tRCKH&_r=1',
      icon: '/images/tiktok-logo.jpg',
      bgColor: 'bg-black'
    },
    {
      name: 'Email',
      url: 'mailto:ntinyarihope1@gmail.com',
      icon: '/images/gmail-icon.jpg',
      bgColor: 'bg-red-500'
    }
  ];

  return (
    <footer className="py-24 bg-creamBg">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <img
            src="/images/footer.png"
            alt="Thank you portrait of Hope"
            className="w-full md:w-1/3 object-cover rounded-md shadow-lg"
          />
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-signature text-5xl text-fashionRed mb-4">Thank You</h2>
          <p className="font-body text-black mb-6">{data.tagline}</p>
          
          {/* Social Icons */}
          <motion.div
            className="flex gap-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${link.bgColor} rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <img 
                  src={link.icon} 
                  alt={`${link.name} icon`}
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
          
          <p className="font-body text-black">© {currentYear} Hope Ntinyari – All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
