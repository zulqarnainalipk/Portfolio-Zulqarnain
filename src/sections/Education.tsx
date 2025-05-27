import React from 'react';
import { portfolioData } from '../data/portfolioData'; // Updated import
import { GraduationCap } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-16 md:py-24 bg-background text-foreground"> {/* Theme-aware styling */}
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary"> {/* Theme-aware styling, increased margin */}
          Education
        </h2>
        <div className="max-w-3xl mx-auto space-y-10"> {/* Added space-y for better separation */}
          {portfolioData.education.map((edu, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl shadow-xl hover:shadow-primary/40 transition-all duration-300 border border-border hover:border-primary/70 hover:scale-[1.02] flex flex-col sm:flex-row items-start" // Theme-aware, added hover, flex layout
            >
              {edu.image && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 p-2 border border-border rounded-lg bg-background flex items-center justify-center">
                  <img 
                    src={edu.image} 
                    alt={`${edu.institution} logo`} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex items-start mb-1">
                  <GraduationCap className="w-7 h-7 mr-3 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-xl md:text-2xl font-semibold text-card-foreground">{edu.degree}</h3>
                </div>
                <div className="pl-10"> {/* Align text with degree title */}
                  <p className="text-lg text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground/80 italic">{edu.duration}</p> {/* Changed period to duration */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
