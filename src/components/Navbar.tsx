import React, { useState } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ThemeSwitcher from './custom/ThemeSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#hero" className="flex-shrink-0 flex items-center group">
              <Code className="h-10 w-10 text-primary transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {portfolioData.personalInfo.name.split(' ')[0]}
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-md font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <ThemeSwitcher />
          </div>
          <div className="md:hidden flex items-center">
            <div className="mr-2">
              <ThemeSwitcher />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background shadow-lg py-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-primary hover:bg-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
