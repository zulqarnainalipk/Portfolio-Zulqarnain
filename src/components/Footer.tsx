import React from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react'; // Removed Github
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { name, email, phone, linkedin } = portfolioData.personalInfo;

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href={`https://linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
          <a
            href={`mailto:${email}`}
            className="text-secondary-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail size={28} />
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`} // Remove spaces for tel link
            className="text-secondary-foreground hover:text-primary transition-colors"
            aria-label="Phone"
          >
            <Phone size={28} />
          </a>
        </div>
        <p className="text-md">
          &copy; {currentYear} {name}. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with React, Three.js, TailwindCSS, and ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
