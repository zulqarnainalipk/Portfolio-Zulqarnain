import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Medal3D from './Medal3D';

interface MedalDisplayProps {
  medals: {
    title: string;
    type: string;
    image?: string;
    onClick: () => void;
  }[];
}

const MedalDisplay: React.FC<MedalDisplayProps> = ({ medals }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate positions in a semi-circle arrangement
  const getPosition = (index: number, total: number): [number, number, number] => {
    const radius = 3;
    const angleStep = Math.PI / (total > 1 ? total - 1 : 1);
    const angle = -Math.PI / 2 + index * angleStep;
    
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    
    return [x, 0, z];
  };
  
  // Get medal type for 3D rendering
  const getMedalType = (type: string): 'gold' | 'silver' | 'bronze' | 'star' => {
    if (type.includes('gold') || type.includes('winner') || type.includes('1st')) return 'gold';
    if (type.includes('silver') || type.includes('2nd')) return 'silver';
    if (type.includes('bronze') || type.includes('3rd')) return 'bronze';
    if (type.includes('star')) return 'star';
    return 'bronze'; // Default
  };

  return (
    <div className="h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden bg-secondary/30 shadow-xl border border-border">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -5, -5]} intensity={0.5} color="#00A388" />
          
          {medals.map((medal, index) => (
            <group 
              key={index}
              onClick={() => medal.onClick()}
              onPointerOver={() => setHoveredIndex(index)}
              onPointerOut={() => setHoveredIndex(null)}
            >
              <Medal3D 
                type={getMedalType(medal.type)} 
                hovered={hoveredIndex === index}
                position={getPosition(index, medals.length)}
                rotation={[0, 0, 0]}
                image={medal.image}
              />
            </group>
          ))}
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MedalDisplay;