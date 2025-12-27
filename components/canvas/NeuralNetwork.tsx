'use client'

import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  basePosition: THREE.Vector3
  size: number
  brightness: number
  phase: number
}

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { viewport, mouse } = useThree()
  
  const particleCount = 80
  const connectionDistance = 3.5
  
  // Create particles
  const { particles, positions, colors, linePositions } = useMemo(() => {
    const particles: Particle[] = []
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const linePositions: number[] = []
    
    // Calculate spread based on viewport
    const spreadX = viewport.width * 0.8
    const spreadY = viewport.height * 0.8
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 0.5 + Math.random() * 0.5
      
      const particle: Particle = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spreadX,
          (Math.random() - 0.5) * spreadY,
          (Math.random() - 0.5) * 5
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.002
        ),
        basePosition: new THREE.Vector3(
          (Math.random() - 0.5) * spreadX,
          (Math.random() - 0.5) * spreadY,
          (Math.random() - 0.5) * 5
        ),
        size: 0.05 + Math.random() * 0.08,
        brightness: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2
      }
      particles.push(particle)
      
      // Initial positions
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
      
      // Colors - blue to cyan gradient
      const colorMix = Math.random()
      colors[i * 3] = 0.1 + colorMix * 0.3      // R
      colors[i * 3 + 1] = 0.5 + colorMix * 0.5  // G
      colors[i * 3 + 2] = 0.9 + (1 - colorMix) * 0.1  // B
    }
    
    return { particles, positions, colors, linePositions }
  }, [viewport])
  
  // Update connections
  const updateConnections = useCallback(() => {
    const lines: number[] = []
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position)
        
        if (dist < connectionDistance) {
          const opacity = 1 - (dist / connectionDistance)
          
          // Only add if visible enough
          if (opacity > 0.1) {
            lines.push(
              particles[i].position.x, particles[i].position.y, particles[i].position.z,
              particles[j].position.x, particles[j].position.y, particles[j].position.z,
              opacity
            )
          }
        }
      }
    }
    
    return lines
  }, [particles])
  
  const connectionsRef = useRef<number[]>([])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const mouseEffect = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0)
    
    // Update particle positions
    particles.forEach((particle, i) => {
      // Gentle floating motion with Perlin-like smooth movement
      const waveX = Math.sin(time * 0.3 + particle.phase) * 0.5
      const waveY = Math.cos(time * 0.25 + particle.phase * 1.3) * 0.5
      const waveZ = Math.sin(time * 0.2 + particle.phase * 0.7) * 0.3
      
      // Mouse attraction/repulsion
      const mouseDist = particle.position.clone().sub(mouseEffect)
      const mouseForce = Math.max(0, 1 - mouseDist.length() / 3) * 0.02
      
      // Update velocity with mouse influence
      particle.velocity.x += (Math.random() - 0.5) * 0.0001 + mouseForce * (mouse.x > 0.5 ? -0.01 : 0.01)
      particle.velocity.y += (Math.random() - 0.5) * 0.0001 + mouseForce * (mouse.y > 0.5 ? -0.01 : 0.01)
      
      // Apply velocity
      particle.position.add(particle.velocity)
      
      // Add wave motion to base position
      const targetX = particle.basePosition.x + waveX
      const targetY = particle.basePosition.y + waveY
      const targetZ = particle.basePosition.z + waveZ
      
      // Smooth interpolation towards target
      particle.position.x += (targetX - particle.position.x) * 0.02
      particle.position.y += (targetY - particle.position.y) * 0.02
      particle.position.z += (targetZ - particle.position.z) * 0.02
      
      // Dampen velocity
      particle.velocity.multiplyScalar(0.98)
      
      // Update geometry arrays
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
    })
    
    // Update point geometry
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      
      // Pulse effect on colors
      const colorAttr = pointsRef.current.geometry.attributes.color
      particles.forEach((particle, i) => {
        const pulse = 0.7 + Math.sin(time * 2 + particle.phase) * 0.3
        const brightness = particle.brightness * pulse
        
        colorAttr.setX(i, 0.1 * brightness)
        colorAttr.setY(i, 0.6 * brightness)
        colorAttr.setZ(i, 1.0 * brightness)
      })
      colorAttr.needsUpdate = true
    }
    
    // Update connections
    connectionsRef.current = updateConnections()
    
    if (linesRef.current) {
      const lineGeometry = linesRef.current.geometry
      const posAttr = lineGeometry.attributes.position
      const customAttr = lineGeometry.attributes.opacity
      
      // Resize buffer if needed
      if (posAttr.count !== connectionsRef.current.length / 6) {
        lineGeometry.setDrawRange(0, connectionsRef.current.length / 2)
      }
      
      // Update line positions and opacities
      for (let i = 0; i < connectionsRef.current.length; i += 6) {
        posAttr.setXYZ(i / 6, connectionsRef.current[i], connectionsRef.current[i + 1], connectionsRef.current[i + 2])
        posAttr.setXYZ(i / 6 + 1, connectionsRef.current[i + 3], connectionsRef.current[i + 4], connectionsRef.current[i + 5])
      }
      
      posAttr.needsUpdate = true
      
      // Update opacities via custom attribute if it exists
      for (let i = 0; i < connectionsRef.current.length; i += 6) {
        if (customAttr) {
          customAttr.setX(i / 6, connectionsRef.current[i + 6])
        }
      }
      if (customAttr) customAttr.needsUpdate = true
    }
  })
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      // Recalculate base positions on resize
      const spreadX = viewport.width * 0.8
      const spreadY = viewport.height * 0.8
      
      particles.forEach((particle) => {
        particle.basePosition.x = (Math.random() - 0.5) * spreadX
        particle.basePosition.y = (Math.random() - 0.5) * spreadY
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [viewport, particles])
  
  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * particleCount}
            array={new Float32Array(particleCount * particleCount * 6)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

function FloatingDataElements() {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  
  // Floating geometric elements representing data flow
  const elements = useMemo(() => {
    const items = []
    const count = 8
    
    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 1.2,
          (Math.random() - 0.5) * viewport.height * 1.2,
          -3 + Math.random() * 2
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.3 + Math.random() * 0.4,
        speed: 0.2 + Math.random() * 0.3,
        shape: Math.random() > 0.5 ? 'box' : 'sphere'
      })
    }
    
    return items
  }, [viewport])
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      groupRef.current.children.forEach((child, i) => {
        const item = elements[i]
        child.rotation.x += item.speed * 0.01
        child.rotation.y += item.speed * 0.015
        
        // Floating motion
        child.position.y += Math.sin(time * item.speed + i) * 0.003
      })
    }
  })
  
  return (
    <group ref={groupRef}>
      {elements.map((item, i) => (
        <mesh key={i} position={item.position} rotation={item.rotation} scale={item.scale}>
          {item.shape === 'box' ? (
            <boxGeometry args={[0.5, 0.5, 0.5]} />
          ) : (
            <icosahedronGeometry args={[0.35, 0]} />
          )}
          <meshBasicMaterial
            color="#00aaff"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create a gradient plane
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(30, 30)
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle color shift
      const time = state.clock.elapsedTime
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      const hue = (time * 0.02) % 1
      material.color.setHSL(0.6 + hue * 0.05, 0.8, 0.05)
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -10]} geometry={geometry}>
      <meshBasicMaterial transparent opacity={0.3} />
    </mesh>
  )
}

export default function MLBackground() {
  return (
    <group>
      <ParticleNetwork />
      <FloatingDataElements />
    </group>
  )
}
