import React from 'react';
import { portfolioData } from '../data/portfolioData'; // Updated import
import { HeartHandshake } from 'lucide-react'; 

const Volunteering = () => {
  // Ensure volunteering data exists and is not empty
  if (!portfolioData.volunteering || portfolioData.volunteering.length === 0) {
    return null; 
  }

  return (
    <section id="volunteering" className="py-16 md:py-24 bg-background text-foreground"> {/* Theme-aware styling */}
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary"> {/* Theme-aware styling, increased margin */}
          Volunteering Experience
        </h2>
        <div className="max-w-3xl mx-auto space-y-10"> {/* Adjusted space-y */}
          {portfolioData.volunteering.map((item, index) => (
            <div 
              key={index} 
              className="bg-card p-6 md:p-8 rounded-xl shadow-xl hover:shadow-primary/40 transition-all duration-300 border border-border hover:border-primary/70 hover:scale-[1.02]" // Theme-aware, added hover
            >
              <div className="flex items-start mb-3"> {/* items-start for better alignment */}
                <HeartHandshake className="w-7 h-7 md:w-8 md:h-8 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-card-foreground">{item.role}</h3>
                  <p className="text-md text-muted-foreground">{item.organization}</p> {/* Added organization */}
                  <p className="text-sm text-muted-foreground/80 italic">{item.duration}</p> {/* Changed period to duration */}
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-10 md:pl-12 mt-2"> {/* Adjusted padding and margin */}
                {item.description.map((detail, i) => ( // Changed details to description
                  <li key={i} className="leading-relaxed">
                    {detail}
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

export default Volunteering;
