import React from 'react';
import { portfolioData } from '../data/portfolioData'; // Updated import
import { BookOpen, FileText } from 'lucide-react';

const Publications = () => {
  return (
    <section id="publications" className="py-16 md:py-24 bg-background text-foreground"> {/* Theme-aware styling */}
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary"> {/* Theme-aware styling */}
          Publications
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-10"> {/* Adjusted gap */}
          {portfolioData.publications.map((pub, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl shadow-xl hover:shadow-primary/40 transition-all duration-300 border border-border hover:border-primary/70 hover:scale-[1.02] flex flex-col md:flex-row items-start space-x-0 md:space-x-6" // Theme-aware, added hover scale, flex for image
            >
              {pub.image && (
                <div className="w-full md:w-1/3 mb-4 md:mb-0 flex-shrink-0">
                  <img 
                    src={pub.image} 
                    alt={pub.title} 
                    className="rounded-lg shadow-lg object-cover w-full h-auto md:max-h-64" 
                  />
                </div>
              )}
              <div className={`flex-grow ${pub.image ? 'md:w-2/3' : 'w-full'}`}> {/* Adjust width if image exists */}
                <div className="flex items-start mb-3">
                  {pub.type === 'book' ? 
                    <BookOpen className="w-7 h-7 mr-3 text-primary flex-shrink-0 mt-1" /> : 
                    <FileText className="w-7 h-7 mr-3 text-primary flex-shrink-0 mt-1" />
                  }
                  <h3 className="text-xl md:text-2xl font-semibold text-card-foreground">{pub.title}</h3>
                </div>
                {pub.description.map((desc, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-2 ml-10"> {/* Adjusted margin for alignment with icon */}
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
