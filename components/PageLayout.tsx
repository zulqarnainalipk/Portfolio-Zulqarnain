'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import TopNavigation from '@/components/ui/TopNavigation'
import NavigationArrows from '@/components/ui/NavigationArrows'
import { Github, Linkedin, Mail, Instagram, Link as LinkIcon } from 'lucide-react'
import { socialLinks } from '@/constants'

// Dynamically import 3D background with SSR disabled
const MLBackground = dynamic(() => import('@/components/canvas/NeuralNetwork').then(mod => mod.default), {
  ssr: false
})

interface PageLayoutProps {
  children: ReactNode
  showSocialFooter?: boolean
}

export default function PageLayout({ children, showSocialFooter = true }: PageLayoutProps) {
  return (
    <div className="relative z-0 bg-primary w-full min-h-screen overflow-x-hidden">
      {/* 3D Background with Canvas wrapper */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ alpha: true }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <MLBackground />
        </Canvas>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-primary/50 pointer-events-none" />
      </div>

      {/* Navigation */}
      <TopNavigation />
      <NavigationArrows />

      {/* Main Content */}
      <main className="relative z-10 w-full pt-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer with Social Links */}
      {showSocialFooter && (
        <footer className="bg-tertiary/90 backdrop-blur-md border-t border-secondary/20 py-4 px-4 relative z-10 mt-8">
          <div className="max-w-6xl mx-auto">
            {/* Footer Content */}
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Social Links */}
              <div className="flex items-center gap-5">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/70 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/70 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20BEFF]/70 hover:text-[#20BEFF] transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                  title="Kaggle"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.825 23.859c-.022.092-.117.141-.283.141h-3.139c-.187 0-.351-.082-.493-.248l-5.114-6.592-2.655 2.579.014 3.869c0 .229-.112.392-.472.392H3.596c-.36 0-.54-.152-.54-.457V.458c0-.306.18-.458.54-.458h3.086c.360 0 .472.163.472.392v13.434l7.653-8.892a.565.565 0 0 1 .425-.235h3.323c.18 0 .285.061.314.183.03.123-.036.223-.197.299l-7.253 6.96 7.558 11.23c.09.13.12.261.048.488z"/>
                  </svg>
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/70 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/70 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                  title="Linktree"
                >
                  <LinkIcon className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.email}
                  className="text-secondary/70 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              {/* Copyright */}
              <p className="text-secondary/50 text-xs">
                © {new Date().getFullYear()} <span className="text-secondary/70 font-medium">Zulqarnain Ali</span>. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
