'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsOpen(false)
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden md:flex w-full z-50 px-6 py-4">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Name on Left */}
          <div 
            className="text-lg font-bold cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="gradient-text">Zulqarnain Ali</span>
          </div>

          {/* Right Side: Contact & Download CV */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm uppercase tracking-wider transition-all duration-300 ${
                activeSection === 'contact' 
                  ? 'text-white font-semibold' 
                  : 'text-secondary hover:text-white'
              }`}
            >
              Contact Us
            </button>
            
            {/* Download CV Button */}
            <a 
              href="/assets/Zulqarnain_CV.pdf" 
              download
              className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Download CV
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden w-full z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Full Name Logo - Always Visible */}
          <div 
            className="text-lg font-bold cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="gradient-text">Zulqarnain Ali</span>
          </div>

          {/* Hamburger Button */}
          <button 
            className="w-10 h-10 flex items-center justify-center glass rounded-full text-white"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-4 right-4 glass rounded-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {['About', 'Experience', 'Skills', 'Projects', 'Research', 'Awards', 'Community'].map((title) => (
                <button
                  key={title}
                  onClick={() => scrollToSection(title.toLowerCase())}
                  className={`text-left text-lg uppercase tracking-wider ${
                    activeSection === title.toLowerCase() 
                      ? 'text-white font-semibold' 
                      : 'text-secondary'
                  }`}
                >
                  {title}
                </button>
              ))}
              
              {/* Mobile Download CV */}
              <a 
                href="/assets/Zulqarnain_CV.pdf" 
                download
                className="px-4 py-3 bg-accent text-white rounded-lg text-center font-medium mt-2"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  )
}
