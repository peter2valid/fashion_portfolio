import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../data/sanityData';
import { urlFor } from '../lib/sanity';

/**
 * Project showcase section. It wraps each project in a bordered card
 * featuring a faded background image, a client label and a bold red
 * elliptical outline around the project title to echo the inspiration
 * slides. Animations fade the content in when it scrolls into view.
 */
const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Use fallback data if Sanity fails
        const data = await getProjects().catch(() => []);
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
        // Set fallback projects if Sanity fails
        setProjects([
          {
            _id: 'fallback-1',
            title: 'Fashion Project 1',
            clientName: 'Sample Client',
            description: 'A beautiful fashion project showcasing Hope\'s modeling skills.',
            imageUrl: '/images/project1.png',
            imageAlt: 'Fashion Project 1',
            tags: ['Fashion', 'Modeling']
          },
          {
            _id: 'fallback-2', 
            title: 'Fashion Project 2',
            clientName: 'Another Client',
            description: 'Another stunning fashion project.',
            imageUrl: '/images/project2.png',
            imageAlt: 'Fashion Project 2',
            tags: ['Fashion', 'Portrait']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-creamBg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-fashionRed"></div>
            <p className="font-body text-black mt-4">Loading projects...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-24 bg-creamBg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-red-600">Error loading projects: {error}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24 bg-creamBg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-black">No projects available at the moment.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-creamBg">
      <div className="max-w-5xl mx-auto px-6">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className="relative border border-borderBlack p-8 rounded-lg shadow-xl overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Project number overlay */}
            <motion.div
              className="absolute top-4 right-4 z-20 bg-fashionRed text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>

            {/* Background image with hover effects */}
            {project.imageUrl && (
              <motion.img
                src={project.imageUrl.startsWith('/') ? project.imageUrl : urlFor(project.imageUrl).width(800).height(600).url()}
                alt={project.imageAlt || project.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-70 transition-all duration-500"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}

            {/* Overlay content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Client label */}
              <motion.div 
                className="self-start mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <p className="font-body text-black uppercase text-xs tracking-wider">Client</p>
                <p className="font-body text-black text-base font-medium">{project.clientName}</p>
              </motion.div>

              {/* Title inside red oval */}
              <motion.div 
                className="relative inline-block px-12 py-6 border-4 border-fashionRed rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-fashion text-5xl md:text-6xl text-fashionRed uppercase tracking-tight">
                  {project.title}
                </h3>
                {/* Enhanced starburst accent */}
                <motion.span 
                  className="absolute top-0 right-0 -mt-4 -mr-4 text-fashionRed text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✹
                </motion.span>
              </motion.div>

              {/* Project description */}
              {project.description && (
                <motion.div
                  className="mt-6 max-w-2xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                >
                  <p className="font-body text-black text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <motion.div
                  className="mt-4 flex flex-wrap gap-2 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-fashionRed/10 text-fashionRed text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;