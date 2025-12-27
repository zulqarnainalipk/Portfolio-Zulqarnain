'use client'

import { motion } from 'framer-motion'
import { research } from '@/constants'
import { FileText, ExternalLink } from 'lucide-react'

export default function Research() {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">Academic Contributions</p>
          <h2 className="text-4xl font-bold text-white">Research</h2>
        </motion.div>

        {/* Research Papers */}
        <div className="space-y-5 mt-12">
          {research.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 3 }}
              className="bg-tertiary/50 p-5 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-secondary transition-colors duration-300">
                      {paper.title}
                    </h3>
                    <span className="text-secondary text-sm font-mono whitespace-nowrap">
                      {paper.year}
                    </span>
                  </div>

                  <p className="text-secondary text-sm mb-2">
                    <span className="text-white">Authors:</span> {paper.authors}
                  </p>

                  <p className="text-secondary text-sm mb-3 leading-relaxed">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-secondary text-xs px-2.5 py-1 bg-primary/50 rounded-full border border-secondary/20">
                      {paper.journal}
                    </span>
                    
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-secondary hover:text-white transition-colors duration-300 text-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Paper</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Research Interests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'AI Consciousness',
                description: 'Exploring the boundaries between AI systems and conscious behavior',
                icon: '🧠'
              },
              {
                title: 'Explainable AI',
                description: 'Making machine learning models more transparent and interpretable',
                icon: '💡'
              },
              {
                title: 'Medical Imaging',
                description: 'Applying deep learning to diagnose diseases from medical images',
                icon: '🏥'
              },
            ].map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-tertiary/50 p-5 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
              >
                <span className="text-3xl mb-3 block">{interest.icon}</span>
                <h4 className="text-white font-semibold mb-2">{interest.title}</h4>
                <p className="text-secondary text-sm">{interest.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
