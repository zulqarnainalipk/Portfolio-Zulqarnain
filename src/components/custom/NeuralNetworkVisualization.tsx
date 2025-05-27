import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { enhancedSkillCategories } from '../../data/enhancedPortfolioData';

interface NodeProps {
  position: [number, number, number];
  color: string;
  name: string;
  skills: string[];
  connections: string[];
  onHover: (id: string | null) => void;
  id: string;
  activeNode: string | null;
  connectionsMap: Record<string, [number, number, number]>;
  pulse: boolean;
}

// Neural Network Node
const Node: React.FC<NodeProps> = ({ 
  position, 
  color, 
  name, 
  skills, 
  connections, 
  onHover,
  id,
  activeNode,
  connectionsMap,
  pulse
}) => {
  const nodeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const initialY = position[1];
  const isHovered = activeNode === id;
  const isConnected = activeNode !== null && connections.includes(activeNode);
  const opacity = activeNode === null || isHovered || isConnected ? 1 : 0.4;
  
  // Floating animation
  useFrame(({ clock }) => {
    if (nodeRef.current) {
      nodeRef.current.position.y = initialY + Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.1;
    }
    
    // Particle system animation
    if (particlesRef.current && (pulse || isHovered)) {
      particlesRef.current.rotation.y += 0.01;
      const particles = particlesRef.current.geometry as THREE.BufferGeometry;
      const positions = particles.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        const time = clock.getElapsedTime();
        
        // Pulse effect
        const distance = Math.sqrt(x * x + y * y + z * z);
        const pulseFactor = Math.sin(time * 2 + distance * 3) * 0.05;
        
        positions[i] = x * (1 + pulseFactor);
        positions[i + 1] = y * (1 + pulseFactor);
        positions[i + 2] = z * (1 + pulseFactor);
      }
      
      particles.attributes.position.needsUpdate = true;
    }
  });
  
  // Create particle system
  const particles = useMemo(() => {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.3 + Math.random() * 0.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return geometry;
  }, []);
  
  // Connection lines
  const connectionLines = useMemo(() => {
    return connections.map((connId) => {
      const targetPos = connectionsMap[connId];
      if (!targetPos) return null;
      
      // Only render connections for hovered node or when no node is hovered
      const shouldDisplay = activeNode === null || 
                          isHovered || 
                          (activeNode === connId && connections.includes(activeNode));
      
      const lineOpacity = shouldDisplay ? 0.6 : 0.1;
      const lineColor = isHovered ? color : "#888888";
      
      return (
        <Line
          key={`${id}-${connId}`}
          points={[position, targetPos]}
          color={lineColor}
          lineWidth={1}
          opacity={lineOpacity}
          transparent
          dashed={false}
        />
      );
    });
  }, [connections, position, connectionsMap, activeNode, isHovered, id, color]);

  const handlePointerOver = (e: any) => {
    if (e.stopPropagation) e.stopPropagation();
    onHover(id);
  };
  
  const handlePointerOut = () => {
    onHover(null);
  };

  const nodeScale = isHovered ? 1.2 : 1;
  
  return (
    <group position={position}>
      {/* Connection lines */}
      {connectionLines}
      
      {/* Node sphere */}
      <mesh 
        ref={nodeRef} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={[nodeScale, nodeScale, nodeScale]}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.6} 
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Particle system around node */}
      <points ref={particlesRef}>
        <primitive object={particles} attach="geometry" />
        <pointsMaterial 
          size={0.03} 
          color={color} 
          transparent 
          opacity={isHovered ? 0.8 : 0.3}
          sizeAttenuation 
        />
      </points>
      
      {/* Node name */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.15}
        color={`rgba(255, 255, 255, ${opacity})`}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {name}
      </Text>
      
      {/* Skills popup on hover */}
      {isHovered && (
        <Html position={[0, 0, 0]} center style={{ width: '250px', transform: 'translateY(-50px)' }}>
          <div className="bg-background/90 backdrop-blur-md p-3 rounded-lg shadow-xl border border-primary">
            <h3 className="text-lg font-bold mb-2" style={{color}}>
              {name}
            </h3>
            <ul className="text-sm space-y-1">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: color}}></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
};

// Neural Network Graph
const NeuralNetwork: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulseNodes, setPulseNodes] = useState<boolean>(true);
  
  // Create a map of node IDs to positions for connections
  const connectionsMap = useMemo(() => {
    const map: Record<string, [number, number, number]> = {};
    enhancedSkillCategories.forEach(category => {
      map[category.id] = category.position;
    });
    return map;
  }, []);

  // Toggle pulse animation periodically
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPulseNodes(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1"/>
      
      {/* Neural network nodes */}
      {enhancedSkillCategories.map((category) => (
        <Node 
          key={category.id}
          id={category.id}
          position={category.position}
          color={category.color}
          name={category.name}
          skills={category.skills}
          connections={category.connections}
          onHover={setActiveNode}
          activeNode={activeNode}
          connectionsMap={connectionsMap}
          pulse={pulseNodes}
        />
      ))}
      
      <OrbitControls 
        enableZoom={true} 
        minDistance={5}
        maxDistance={15}
        autoRotate 
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
};

// Main component with Canvas
const NeuralNetworkVisualization = () => {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-lg overflow-hidden bg-secondary/30 shadow-2xl border border-border">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <NeuralNetwork />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkVisualization;