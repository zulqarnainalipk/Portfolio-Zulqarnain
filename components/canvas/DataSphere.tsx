'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function DataOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[1, 32, 32]}
      position={[-3, 1, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? '#00d8ff' : '#915eff'}
        emissive={hovered ? '#00d8ff' : '#915eff'}
        emissiveIntensity={hovered ? 0.3 : 0.1}
        distort={0.3}
        speed={1.5}
        roughness={0.3}
        metalness={0.5}
        transparent
        opacity={0.15}
      />
    </Sphere>
  )
}

function FloatingDataParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 40
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10
    positions[i + 1] = (Math.random() - 0.5) * 10
    positions[i + 2] = (Math.random() - 0.5) * 5
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d8ff"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  )
}

function DataSphere() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#915eff" />
      <pointLight position={[-10, -10, -10]} intensity={0.25} color="#00d8ff" />
      <DataOrb />
      <FloatingDataParticles />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </>
  )
}

export default DataSphere
