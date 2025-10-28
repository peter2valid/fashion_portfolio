import React from 'react';
import { motion } from 'framer-motion';

/**
 * Contact section summarising Hope's booking details and social handles. It
 * mirrors the look of the "Key Contacts" slide with a simple framed card
 * and call-to-action button.
 */
const Contact = ({ data }) => {
  const socialLinks = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/254792822887',
      icon: '/images/whasapp.icon.png',
      bgColor: 'bg-green-500'
    },
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-fashion text-4xl md:text-5xl text-fashionRed uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Key Contacts
        </motion.h2>
        <motion.div
          className="bg-creamBg border border-borderBlack p-8 rounded-md shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="font-body text-black mb-4">
            <strong>Email for bookings:</strong> {data.email}
          </p>
          {data.social.instagram && (
            <p className="font-body text-black mb-4">
              <strong>Instagram:</strong> {data.social.instagram}
            </p>
          )}
          {data.social.tiktok && (
            <p className="font-body text-black mb-4">
              <strong>TikTok:</strong> {data.social.tiktok}
            </p>
          )}
          {data.whatsapp && (
            <p className="font-body text-black mb-4">
              <strong>WhatsApp:</strong> Available on request
            </p>
          )}
          <p className="font-body text-black mb-6">{data.shortQuote}</p>
          
          {/* Social and Booking Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-3 ${link.bgColor} text-white rounded-full hover:shadow-lg transition-all duration-300 text-sm font-body group relative overflow-hidden`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <img 
                    src={link.icon} 
                    alt={`${link.name} icon`}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="font-medium">{link.name}</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <button className="px-8 py-4 bg-fashionRed text-white font-body uppercase rounded-md shadow hover:bg-red-700 transition-colors duration-200">
            {data.wantsBookingButton === 'Email' ? 'Book Me' : 'Contact'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
