import React from 'react';
import { portfolioData } from '../data/portfolioData'; // Corrected import
import { User, MapPin, Mail, Phone, Info } from 'lucide-react'; // Added Info icon for section title

const About = () => {
  const { professionalSummary, personalInfo } = portfolioData;

  return (
    <section id="about" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
            <Info size={40} className="mr-3" /> About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A brief introduction to my professional journey and expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            {personalInfo.profileImage && (
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.name} 
                className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl border-4 border-primary"
              />
            )}
          </div>
          <div className="lg:col-span-3">
            <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed text-left">
              {professionalSummary.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center space-x-3 bg-secondary p-4 rounded-lg shadow-md">
                <User className="w-6 h-6 text-primary" />
                <span className="text-secondary-foreground">{personalInfo.name}</span>
              </div>
              <div className="flex items-center space-x-3 bg-secondary p-4 rounded-lg shadow-md">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-secondary-foreground">{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3 bg-secondary p-4 rounded-lg shadow-md">
                <Mail className="w-6 h-6 text-primary" />
                <a href={`mailto:${personalInfo.email}`} className="text-secondary-foreground hover:text-primary transition duration-300">{personalInfo.email}</a>
              </div>
              <div className="flex items-center space-x-3 bg-secondary p-4 rounded-lg shadow-md">
                <Phone className="w-6 h-6 text-primary" />
                <span className="text-secondary-foreground">{personalInfo.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
