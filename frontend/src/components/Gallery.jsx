import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGallery } from '../data/sanityData';
import { urlFor } from '../lib/sanity';

/**
 * Gallery section displaying Hope's portfolio photos from Sanity CMS.
 * Features a responsive grid layout with hover effects and smooth animations.
 */
const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        // Use fallback data if Sanity fails
        const data = await getGallery().catch(() => []);
        setGallery(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching gallery:', err);
        // Set fallback gallery if Sanity fails
        setGallery([
          {
            _id: 'fallback-gallery-1',
            title: 'Portfolio Shot 1',
            imageUrl: '/images/hero.png',
            imageAlt: 'Portfolio Shot 1',
            category: 'Portfolio',
            featured: true
          },
          {
            _id: 'fallback-gallery-2',
            title: 'Portfolio Shot 2', 
            imageUrl: '/images/footer.png',
            imageAlt: 'Portfolio Shot 2',
            category: 'Portfolio',
            featured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-fashionRed"></div>
            <p className="font-body text-black mt-4">Loading gallery...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-red-600">Error loading gallery: {error}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (gallery.length === 0) {
    return (
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="font-fashion text-4xl md:text-5xl text-fashionRed uppercase text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Gallery
          </motion.h2>
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-black">No gallery images available at the moment.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-fashion text-4xl md:text-5xl text-fashionRed uppercase text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={item._id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item)}
            >
              <motion.img
                src={item.imageUrl.startsWith('/') ? item.imageUrl : urlFor(item.imageUrl).width(600).height(800).url()}
                alt={item.imageAlt || item.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              {/* Image info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <h3 className="font-fashion text-xl text-white mb-1">
                  {item.title}
                </h3>
                {item.category && (
                  <span className="px-2 py-1 bg-fashionRed text-white text-xs font-medium rounded">
                    {item.category}
                  </span>
                )}
              </motion.div>

              {/* Featured badge */}
              {item.featured && (
                <motion.div
                  className="absolute top-4 right-4 bg-fashionRed text-white px-2 py-1 rounded-full text-xs font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  Featured
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Modal for selected image */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl.startsWith('/') ? selectedImage.imageUrl : urlFor(selectedImage.imageUrl).width(1200).url()}
                alt={selectedImage.imageAlt || selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl hover:bg-gray-200 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <h3 className="font-fashion text-2xl mb-2">{selectedImage.title}</h3>
                {selectedImage.category && (
                  <span className="px-3 py-1 bg-fashionRed text-white text-sm font-medium rounded">
                    {selectedImage.category}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
