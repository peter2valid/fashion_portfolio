import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getVideos } from '../data/sanityData';
import { urlFor } from '../lib/sanity';

/**
 * Video showcase section featuring Hope's runway moments.
 * Displays a large centered video with smooth animations on scroll.
 */
const VideoShowcase = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Use fallback data if Sanity fails
        const data = await getVideos().catch(() => []);
        setVideos(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
        // Set fallback videos if Sanity fails
        setVideos([
          {
            _id: 'fallback-video-1',
            title: 'Runway Moments',
            description: 'Beautiful runway moments showcasing Hope\'s modeling talent.',
            videoUrl: '/videos/hope-runway.mp4',
            thumbnailUrl: '/images/hero.png',
            thumbnailAlt: 'Runway Moments',
            category: 'Runway',
            date: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section id="video" className="py-24 bg-creamBg text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-fashionRed"></div>
            <p className="font-body text-black mt-4">Loading videos...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="video" className="py-24 bg-creamBg text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-red-600">Error loading videos: {error}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section id="video" className="py-24 bg-creamBg text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="font-fashion text-4xl md:text-5xl text-fashionRed uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Runway Moments 🎬
          </motion.h2>
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-black">No videos available at the moment.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="video" className="py-24 bg-creamBg text-center">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-fashion text-4xl md:text-5xl text-fashionRed uppercase mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Runway Moments 🎬
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video._id}
              className="max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Video thumbnail or video element */}
              {video.videoUrl ? (
                <motion.video
                  autoPlay={index === 0}
                  loop
                  muted
                  controls
                  playsInline
                  className="w-full h-auto"
                  poster={video.thumbnailUrl ? (video.thumbnailUrl.startsWith('/') ? video.thumbnailUrl : urlFor(video.thumbnailUrl).width(800).url()) : undefined}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              ) : video.thumbnailUrl ? (
                <motion.img
                  src={video.thumbnailUrl.startsWith('/') ? video.thumbnailUrl : urlFor(video.thumbnailUrl).width(800).url()}
                  alt={video.thumbnailAlt || video.title}
                  className="w-full h-64 object-cover"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                />
              ) : null}

              {/* Video info */}
              <div className="p-6">
                <motion.h3
                  className="font-fashion text-2xl text-fashionRed uppercase mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  {video.title}
                </motion.h3>
                
                {video.description && (
                  <motion.p
                    className="font-body text-black text-sm mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  >
                    {video.description}
                  </motion.p>
                )}

                {video.category && (
                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  >
                    <span className="px-3 py-1 bg-fashionRed/10 text-fashionRed text-xs font-medium rounded-full">
                      {video.category}
                    </span>
                    {video.date && (
                      <span className="font-body text-black text-xs">
                        {new Date(video.date).toLocaleDateString()}
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;



