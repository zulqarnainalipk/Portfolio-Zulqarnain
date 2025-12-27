'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { volunteer, topmateReviews } from '@/constants'
import { Users, Heart, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function Community() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % topmateReviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + topmateReviews.length) % topmateReviews.length)
  }

  return (
    <section className="w-full py-16 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto flex-grow">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary font-mono text-sm mb-2">Giving Back</p>
          <h2 className="text-4xl font-bold text-white">Community</h2>
        </motion.div>

        {/* Volunteer Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {volunteer.map((vol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-tertiary/50 p-6 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
              
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-1">{vol.title}</h3>
                  <p className="text-secondary text-sm mb-1">{vol.organization}</p>
                  <p className="text-secondary/60 text-sm mb-3">{vol.date}</p>
                  <p className="text-secondary text-sm leading-relaxed">{vol.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Topmate Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">Topmate Mentorship Reviews</h3>

          <div className="relative">
            {/* Review Carousel */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-tertiary/50 p-8 rounded-2xl border border-secondary/20"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Quote Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-secondary" />
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-grow">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < topmateReviews[currentReview].rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-500'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-secondary text-lg leading-relaxed mb-6">
                        &quot;{topmateReviews[currentReview].review}&quot;
                      </p>

                      {/* Reviewer Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {topmateReviews[currentReview].reviewer.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{topmateReviews[currentReview].reviewer}</p>
                          <p className="text-secondary/60 text-sm">{topmateReviews[currentReview].role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={prevReview}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-tertiary/50 border border-secondary/30 hover:border-secondary hover:bg-tertiary transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2 flex-grow">
                {topmateReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentReview
                        ? 'bg-secondary w-8'
                        : 'bg-secondary/30 w-2 hover:bg-secondary/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-tertiary/50 border border-secondary/30 hover:border-secondary hover:bg-tertiary transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Review Counter */}
            <p className="text-secondary/50 text-sm mt-4 text-center">
              {currentReview + 1} of {topmateReviews.length} reviews
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
