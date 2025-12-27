'use client'

import { motion } from 'framer-motion'
import { technologies } from '@/constants'

export default function Skills() {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">What I Work With</p>
          <h2 className="text-4xl font-bold text-white">Skills & Technologies</h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-tertiary/50 p-4 rounded-lg border border-secondary/10 hover:border-secondary/30 transition-all duration-300 flex items-center gap-3"
            >
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-white font-medium text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-tertiary/50 rounded-xl p-6 mt-8 border border-secondary/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Specializations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { title: 'Computer Vision' },
              { title: 'NLP' },
              { title: 'Remote Sensing' },
              { title: 'Healthcare AI' },
            ].map((spec, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-primary/50 rounded-lg p-3 text-center hover:bg-secondary/10 transition-all duration-300"
              >
             
                <span className="text-white text-xs font-medium">{spec.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
