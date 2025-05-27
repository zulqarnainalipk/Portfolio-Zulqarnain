import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { portfolioData } from '../data/portfolioData'; // Corrected import
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { personalInfo } = portfolioData; // Destructure personalInfo from portfolioData

  return (
    <section id="hero" className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-transparent">
      {/* The main app background canvas will serve this section. No need for a separate one here. */}
      {/* However, if specific 3D elements for Hero are needed, they can be added to the main App canvas
           and conditionally rendered or animated based on the active section.
           For now, this section will rely on the global Stars background from App.tsx.
           The MeshDistortMaterial Sphere is a good candidate for a hero-specific 3D element.
           Let's add a placeholder for where such a specific 3D component might go, controlled by App.tsx state.
      */}
      {/* Example for a hero-specific 3D element to be integrated into the main Canvas later:
      <Canvas className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 5, 2]} intensity={1} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
              color="#00A388" // Emerald green
              attach="material"
              distort={0.55}
              speed={1.5}
            />
          </Sphere>
        </Suspense>
      </Canvas>
      */}

      <div className="relative z-10 text-center p-4 md:p-8 mt-[-4rem] sm:mt-0"> {/* Adjusted margin for better centering */}
        {personalInfo.profileImage && ( // Check if profileImage exists
          <img 
            src={personalInfo.profileImage} 
            alt={personalInfo.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-primary shadow-lg" // Use primary color
          />
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-foreground">
          {personalInfo.name}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-primary mb-6 font-semibold"> {/* Use primary color */}
          {personalInfo.position}
        </p>
        <p className="text-lg md:text-xl italic text-muted-foreground mb-10 max-w-2xl mx-auto">
          "{personalInfo.quote}"
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Get in Touch
          </a>
          <a 
            href={`https://linkedin.com/in/${personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#about" aria-label="Scroll to about section">
          <ChevronDown className="w-10 h-10 text-primary animate-bounce" /> {/* Use primary color */}
        </a>
      </div>
    </section>
  );
};

export default Hero;
