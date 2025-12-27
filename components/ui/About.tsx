'use client'

import { motion } from 'framer-motion'
import { education } from '@/constants'

// About section content
const aboutContent = {
  description: "I'm a passionate Machine Learning Engineer and AI Researcher with expertise in Computer Vision, Natural Language Processing, and Deep Learning. Currently pursuing my degree in Software Engineering at NED University, I've established myself as a Kaggle Master with 15+ medals in various competitions. My work focuses on building AI solutions that can make a real-world impact, particularly in healthcare and environmental applications.",
  stats: {
    yearsExperience: '3+',
    projectsCompleted: '30+',
    kaggleMedals: '15+'
  }
}

export default function About() {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">Get To Know</p>
          <h2 className="text-4xl font-bold text-white">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              My Journey in AI & ML
            </h3>
            <p className="text-secondary leading-relaxed mb-6">
              {aboutContent.description}
            </p>
            
            {/* Stats/Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-tertiary p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-secondary">{aboutContent.stats.yearsExperience}</p>
                <p className="text-xs text-secondary">Years Experience</p>
              </div>
              <div className="bg-tertiary p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-secondary">{aboutContent.stats.projectsCompleted}</p>
                <p className="text-xs text-secondary">Projects</p>
              </div>
              <div className="bg-tertiary p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-secondary">{aboutContent.stats.kaggleMedals}</p>
                <p className="text-xs text-secondary">Kaggle Medals</p>
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="bg-tertiary/50 p-6 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary text-xl">🎓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{edu.school}</h4>
                      <p className="text-secondary text-sm">{edu.degree}</p>
                      <p className="text-secondary/60 text-xs mt-1">{edu.date}</p>
                      {edu.gpa && (
                        <p className="text-secondary text-sm mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
