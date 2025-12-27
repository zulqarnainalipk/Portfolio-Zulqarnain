'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Instagram, Link as LinkIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { socialLinks } from '@/constants'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-8 pt-24 pb-12 lg:pt-0 lg:pb-0">
      {/* Content - Left on Desktop, Bottom on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl w-full lg:w-1/2"
      >
        {/* Introduction */}
        <p className="text-secondary text-lg mb-4">
          <br />
		  Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">
          Zulqarnain Ali
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-6">
          Machine Learning Engineer & AI Researcher
        </h2>

        {/* Description */}
        <p className="text-secondary text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Specializing in Computer Vision, NLP, and Deep Learning.
          Passionate about building AI solutions that make a real-world impact.
          Kaggle Master with expertise in data science and machine learning.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-tertiary/50 p-3 sm:p-4 rounded-xl text-center border border-secondary/10">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">3+</p>
            <p className="text-xs sm:text-sm text-secondary">Years Experience</p>
          </div>
          <div className="bg-tertiary/50 p-3 sm:p-4 rounded-xl text-center border border-secondary/10">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">30+</p>
            <p className="text-xs sm:text-sm text-secondary">Projects</p>
          </div>
          <div className="bg-tertiary/50 p-3 sm:p-4 rounded-xl text-center border border-secondary/10">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">15+</p>
            <p className="text-xs sm:text-sm text-secondary">Competitive Medals</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 sm:px-6 sm:py-3 border border-secondary text-secondary rounded-lg font-medium hover:bg-secondary/10 transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors duration-300 hover:scale-110 transform"
            title="GitHub"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors duration-300 hover:scale-110 transform"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href={socialLinks.kaggle}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#20BEFF] hover:text-[#00b4f5] transition-colors duration-300 hover:scale-110 transform"
            title="Kaggle"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.825 23.859c-.022.092-.117.141-.283.141h-3.139c-.187 0-.351-.082-.493-.248l-5.114-6.592-2.655 2.579.014 3.869c0 .229-.112.392-.472.392H3.596c-.36 0-.54-.152-.54-.457V.458c0-.306.18-.458.54-.458h3.086c.36 0 .472.163.472.392v13.434l7.653-8.892a.565.565 0 0 1 .425-.235h3.323c.18 0 .285.061.314.183.03.123-.036.223-.197.299l-7.253 6.96 7.558 11.23c.09.13.12.261.048.488z"/>
            </svg>
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors duration-300 hover:scale-110 transform"
            title="Instagram"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href={socialLinks.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors duration-300 hover:scale-110 transform"
            title="Linktree"
          >
            <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href={socialLinks.email}
            className="text-secondary hover:text-white transition-colors duration-300 hover:scale-110 transform"
            title="Email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </motion.div>

      {/* Profile Image - Circular - Right on Desktop, Top on Mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-secondary/30 shadow-2xl shadow-secondary/20 bg-tertiary/30">
          <Image
            src="/assets/profile-placeholder.png"
            alt="Zulqarnain Ali - Profile Photo"
            width={320}
            height={320}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </motion.div>
    </section>
  )
}
