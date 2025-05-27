import React from 'react';
import { portfolioData } from '../data/portfolioData'; // Updated import
import { Send, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { personalInfo } = portfolioData; // Destructure for easier access

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // For a real form, you'd send this data to a backend or email service.
    // Example: Netlify forms, Formspree, or a custom serverless function.
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("Form data:", data);
    alert("Thank you for your message! I will get back to you soon.");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background text-foreground"> {/* Theme-aware styling */}
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary"> {/* Theme-aware styling, increased margin */}
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Information Card */}
          <div className="bg-card p-6 md:p-8 rounded-xl shadow-xl border border-border hover:shadow-primary/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-card-foreground mb-6">Contact Information</h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-md text-foreground hover:text-primary transition duration-300">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${personalInfo.phone}`} className="text-md text-foreground hover:text-primary transition duration-300">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a 
                    href={`https://linkedin.com/in/${personalInfo.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-md text-foreground hover:text-primary transition duration-300"
                  >
                    {personalInfo.linkedin}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" /> 
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-md text-foreground">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send a Message Card */}
          <div className="bg-card p-6 md:p-8 rounded-xl shadow-xl border border-border hover:shadow-primary/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-card-foreground mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                <input 
                  type="text" name="name" id="name" required 
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground/50 focus:ring-primary focus:border-primary transition duration-300" 
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                <input 
                  type="email" name="email" id="email" required 
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground/50 focus:ring-primary focus:border-primary transition duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                <textarea 
                  name="message" id="message" rows={4} required 
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground/50 focus:ring-primary focus:border-primary transition duration-300"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
                >
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
