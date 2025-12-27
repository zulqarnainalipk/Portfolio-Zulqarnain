'use client'

import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface StarsProps {
  radius?: number
  count?: number
  factor?: number
  fade?: boolean
  speed?: number
}

function Stars({
  radius = 400,
  count = 1500,
  factor = 4,
  fade = true,
  speed = 0.5,
  ...props
}: StarsProps) {
  const ref = useRef<THREE.Points>(null)
  
  // Generate star positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [count, radius])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (25 / speed)
      ref.current.rotation.y -= delta / (35 / speed)
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#915eff"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  )
}

export default Stars
