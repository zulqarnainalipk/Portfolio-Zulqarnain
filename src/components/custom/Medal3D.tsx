import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Medal3DProps {
  type: 'gold' | 'silver' | 'bronze' | 'star';
  hovered: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  image?: string;
}

const Medal3D: React.FC<Medal3DProps> = ({ type, hovered, position, rotation, image }) => {
  const medalRef = useRef<THREE.Group>(null);
  
  // Define medal colors
  const colors = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    star: '#00A388' // Primary color for stars
  };
  
  // Load medal texture if image is provided
  const texture = image ? useTexture(image) : null;
  
  // Animation
  useFrame((state, delta) => {
    if (medalRef.current) {
      // Constant slow rotation
      medalRef.current.rotation.y += delta * 0.3;
      
      // Additional rotation speed when hovered
      if (hovered) {
        medalRef.current.rotation.y += delta * 0.8;
      }
    }
  });
  
  return (
    <group ref={medalRef} position={position} rotation={rotation}>
      {/* Medal base */}
      <mesh>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial 
          color={colors[type]} 
          metalness={0.8} 
          roughness={0.2}
          emissive={colors[type]}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>
      
      {/* Medal rim */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial 
          color={colors[type]} 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Medal face with texture or emblem */}
      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[0.9, 32]} />
        {texture ? (
          <meshStandardMaterial 
            map={texture} 
            metalness={0.5} 
            roughness={0.4}
          />
        ) : (
          <meshStandardMaterial 
            color={colors[type]} 
            metalness={0.7} 
            roughness={0.3}
          />
        )}
      </mesh>
      
      {/* Ribbon attachment */}
      <mesh position={[0, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial color={colors[type]} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export default Medal3D;