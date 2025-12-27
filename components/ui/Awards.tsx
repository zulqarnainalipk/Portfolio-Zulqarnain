'use client'

import { motion } from 'framer-motion'
import { awardCategories, awards, certifications } from '@/constants'
import { Award, Medal, Trophy, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react'

interface AwardItem {
  title: string
  organization: string
  year?: number
  years?: string[]
  description: string
  link?: string
}

interface Certification {
  title: string
  issuer: string
  link?: string
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  kaggle: (
    <svg className="w-5 h-5 text-[#20BEFF]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.825 23.859c-.022.092-.117.141-.283.141h-3.139c-.187 0-.351-.082-.493-.248l-5.114-6.592-2.655 2.579.014 3.869c0 .229-.112.392-.472.392H3.596c-.36 0-.54-.152-.54-.457V.458c0-.306.18-.458.54-.458h3.086c.36 0 .472.163.472.392v13.434l7.653-8.892a.565.565 0 0 1 .425-.235h3.323c.18 0 .285.061.314.183.03.123-.036.223-.197.299l-7.253 6.96 7.558 11.23c.09.13.12.261.048.488z"/>
    </svg>
  ),
  competitive: <Medal className="w-5 h-5" />,
  academic: <GraduationCap className="w-5 h-5" />,
  research: <Trophy className="w-5 h-5" />,
}

// Helper function to get year display text
const getYearText = (award: AwardItem): string => {
  if (award.years) {
    return award.years.join(', ')
  }
  return award.year?.toString() || ''
}

// Helper function to check if link is valid
const isValidLink = (link?: string): boolean => {
  return !!link && link !== '#'
}

export default function Awards() {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">Recognition & Achievements</p>
          <h2 className="text-4xl font-bold text-white">Awards & Certifications</h2>
        </motion.div>

        {/* Awards by Category */}
        {awards.map((category, categoryIndex) => {
          const categoryInfo = awardCategories.find(c => c.id === category.category)
          
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-accent">
                  {categoryIcons[category.category]}
                </span>
                <span>{categoryInfo?.title}</span>
              </h3>
              <p className="text-secondary text-sm mb-4">{categoryInfo?.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-xl p-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full"></div>
                    <h4 className="text-base font-semibold text-white mb-1">{award.title}</h4>
                    <p className="text-accent text-sm mb-2">{award.organization}</p>
                    <p className="text-secondary text-sm mb-2">{award.description}</p>
                    <span className="text-white/60 text-sm block mb-2">
                      {getYearText(award)}
                    </span>
                    {isValidLink(award.link) && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors duration-300 text-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            <span>Certifications</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="glass rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm truncate">{cert.title}</h4>
                  <p className="text-accent text-xs">{cert.issuer}</p>
                </div>
                {isValidLink(cert.link) && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 text-accent hover:text-accent-secondary transition-colors duration-300"
                    title="Verify Certificate"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
