'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/constants'
import { Calendar, Briefcase } from 'lucide-react'

export default function Experience() {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">What I&apos;ve Worked On</p>
          <h2 className="text-4xl font-bold text-white">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/50 via-secondary/30 to-transparent" />

          {/* Experience Items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-14 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[19px] md:left-[27px] top-0 w-4 h-4 rounded-full bg-secondary border-4 border-primary z-10" />

                {/* Content Card */}
                <div className="bg-tertiary/40 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Company Icon */}
                    <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-secondary/20">
                      {exp.icon ? (
                        <img
                          src={exp.icon}
                          alt={exp.companyName}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <Briefcase className="w-7 h-7 text-secondary" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold text-lg">{exp.title}</h3>
                        <span className="text-secondary">@</span>
                        <span className="text-secondary font-medium">{exp.companyName}</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-secondary/70 mb-4">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm">{exp.date}</p>
                      </div>

                      {/* Points */}
                      <div className="text-secondary/80 text-sm leading-relaxed space-y-2">
                        {exp.points.map((point, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-secondary mt-1.5">•</span>
                            <p>{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
