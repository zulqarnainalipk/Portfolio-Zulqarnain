'use client'

import { motion } from 'framer-motion'
import { projects } from '@/constants'
import { Github, ExternalLink } from 'lucide-react'

// Reorder projects - put strongest project first
const reorderedProjects = [
  projects[1], // SepsisGuard - Healthcare AI (strongest)
  projects[0], // Zeffy - AutoML Pipeline
  projects[2], // Aerosol Optical Depth
  projects[3], // PII Data Detection
]

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="relative w-full py-16 md:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent font-mono text-sm mb-2">My Recent Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
        </motion.div>

        {/* Projects Grid - Tighter Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {reorderedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="glass rounded-xl overflow-hidden group"
            >
              {/* Project Image Placeholder - Reduced Height */}
              <div className="h-40 bg-tertiary flex items-center justify-center relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-secondary/20"></div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className={`px-2 py-0.5 text-xs rounded-md font-medium ${
                        tag.color === 'blue-text-gradient' 
                          ? 'bg-blue-500/20 text-blue-400'
                          : tag.color === 'green-text-gradient'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-pink-500/20 text-pink-400'
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors duration-300 text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://github.com/zulqarnainalipk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-accent text-accent hover:bg-accent/10 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
