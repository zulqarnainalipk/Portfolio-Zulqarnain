'use client'

import { motion } from 'framer-motion'
import { contactInfo } from '@/constants'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! I will get back to you soon.')
  }

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">Get In Touch</p>
          <h2 className="text-4xl font-bold text-white">Contact</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-5">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-secondary text-xs">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-accent transition-colors text-sm">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-secondary text-xs">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-accent transition-colors text-sm">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-secondary text-xs">Location</p>
                  <p className="text-white text-sm">{contactInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
              <a
                href={`https://${contactInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-5">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-secondary text-xs mb-1.5 block">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-secondary text-xs mb-1.5 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-secondary text-xs mb-1.5 block">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="text-secondary text-xs mb-1.5 block">Message</label>
                <textarea
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                  rows={4}
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-accent hover:bg-accent/80 text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
