import React from 'react';
import { portfolioData } from '../data/portfolioData'; // Updated import
import { FlaskConical } from 'lucide-react'; // Changed to Lucide icon

const LabExperience = () => {
  // Ensure labExperience data exists before trying to map
  if (!portfolioData.labExperience || portfolioData.labExperience.length === 0) {
    return null; // Or some fallback UI if the section is mandatory but data is missing
  }

  return (
    <section id="lab-experience" className="py-16 md:py-24 bg-background text-foreground"> {/* Theme-aware styling */}
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary"> {/* Theme-aware styling, increased margin */}
          Lab Experience
        </h2>
        <div className="max-w-3xl mx-auto space-y-10"> {/* Adjusted space-y */}
          {portfolioData.labExperience.map((lab, index) => (
            <div 
              key={index} 
              className="bg-card p-6 md:p-8 rounded-xl shadow-xl hover:shadow-primary/40 transition-all duration-300 border border-border hover:border-primary/70 hover:scale-[1.02]" // Theme-aware, added hover
            >
              <div className="flex items-start mb-3"> {/* items-start for better alignment if text wraps */}
                <FlaskConical className="w-7 h-7 md:w-8 md:h-8 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-card-foreground">{lab.title}</h3>
                  <p className="text-md text-muted-foreground">{lab.institution}</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-10 md:pl-12"> {/* Adjusted padding */}
                {lab.description.map((desc, i) => (
                  <li key={i} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabExperience;
