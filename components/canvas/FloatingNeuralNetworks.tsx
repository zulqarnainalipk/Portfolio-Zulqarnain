'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface NeuralClusterProps {
  position: [number, number, number]
  velocity: [number, number, number]
  scale: number
  rotationSpeed: number
  nodeConfig: {
    layers: number[]
    layerSpacing: number
    nodeSpacing: number
  }
}

function NeuralSpark({ start, end, progress }: { start: [number, number, number], end: [number, number, number], progress: number }) {
  const t = progress
  
  const x = start[0] + (end[0] - start[0]) * t
  const y = start[1] + (end[1] - start[1]) * t
  const z = start[2] + (end[2] - start[2]) * t
  
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#00d8ff" />
    </mesh>
  )
}

function NeuralNode({ position, scale }: { position: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.25
      meshRef.current.scale.setScalar(pulse * scale)
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12 * scale, 12, 12]} />
      <meshStandardMaterial
        color="#00d8ff"
        emissive="#00d8ff"
        emissiveIntensity={1.2}
        transparent
        opacity={0.95}
      />
    </mesh>
  )
}

function NeuralConnection({ start, end, active, scale }: { start: [number, number, number], end: [number, number, number], active: boolean, scale: number }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])
  
  return (
    <Line
      points={points}
      color={active ? '#00d8ff' : '#3a4a5c'}
      lineWidth={active ? 1.2 * scale : 0.4 * scale}
      transparent
      opacity={active ? 0.9 : 0.25}
    />
  )
}

function NeuralCluster({ position: initialPosition, velocity, scale, rotationSpeed, nodeConfig }: NeuralClusterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const position = useRef(initialPosition)
  
  // Create neural network structure based on config
  const { nodes, connections } = useMemo(() => {
    const { layers, layerSpacing, nodeSpacing } = nodeConfig
    const nodeList: { position: [number, number, number], layer: number }[] = []
    
    let currentY = (layers.length - 1) * nodeSpacing / 2
    
    layers.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        nodeList.push({
          position: [
            (layerIndex - 1) * layerSpacing,
            currentY - i * nodeSpacing,
            0
          ],
          layer: layerIndex
        })
      }
    })
    
    const connList: { start: [number, number, number], end: [number, number, number] }[] = []
    
    nodeList.forEach(node1 => {
      nodeList.forEach(node2 => {
        if (node2.layer === node1.layer + 1) {
          connList.push({
            start: node1.position,
            end: node2.position
          })
        }
      })
    })
    
    return { nodes: nodeList, connections: connList }
  }, [nodeConfig])
  
  const sparkProgress = useRef(0)
  const activeIndex = useRef(0)
  const offset = useRef(Math.random() * 100)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Floating movement with velocity
      position.current[0] += velocity[0] * delta * 0.3
      position.current[1] += velocity[1] * delta * 0.3
      
      // Bounce off boundaries
      if (position.current[0] > 8 || position.current[0] < -8) {
        position.current[0] = Math.max(-8, Math.min(8, position.current[0]))
      }
      if (position.current[1] > 5 || position.current[1] < -5) {
        position.current[1] = Math.max(-5, Math.min(5, position.current[1]))
      }
      
      groupRef.current.position.set(...position.current)
      
      // Rotation
      groupRef.current.rotation.z += rotationSpeed * delta
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + offset.current) * 0.1
    }
    
    // Animate sparks
    sparkProgress.current += delta * 0.6
    if (sparkProgress.current > 1) {
      sparkProgress.current = 0
      activeIndex.current = (activeIndex.current + 1) % connections.length
    }
  })
  
  const activeConnection = connections[activeIndex.current]
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NeuralNode
          key={i}
          position={node.position}
          scale={scale}
        />
      ))}
      
      {connections.map((conn, i) => {
        const isActive = activeConnection && 
                         conn.start[0] === activeConnection.start[0] && 
                         conn.start[1] === activeConnection.start[1]
        
        return (
          <group key={i}>
            <NeuralConnection
              start={conn.start}
              end={conn.end}
              active={isActive}
              scale={scale}
            />
            {isActive && (
              <NeuralSpark
                start={conn.start}
                end={conn.end}
                progress={sparkProgress.current}
              />
            )}
          </group>
        )
      })}
    </group>
  )
}

export default function FloatingNeuralNetworks() {
  // Create diverse neural networks with different sizes and movement patterns
  const clusters = useMemo(() => {
    const result: NeuralClusterProps[] = []
    const count = 8
    
    const nodeConfigs = [
      { layers: [2, 3, 2], layerSpacing: 1.0, nodeSpacing: 0.5 },
      { layers: [3, 4, 3], layerSpacing: 1.2, nodeSpacing: 0.6 },
      { layers: [4, 5, 4], layerSpacing: 1.4, nodeSpacing: 0.7 },
      { layers: [2, 4, 2], layerSpacing: 0.9, nodeSpacing: 0.45 },
      { layers: [3, 3, 3], layerSpacing: 1.1, nodeSpacing: 0.55 },
      { layers: [2, 3, 4], layerSpacing: 1.3, nodeSpacing: 0.65 },
      { layers: [4, 4, 2], layerSpacing: 1.15, nodeSpacing: 0.58 },
      { layers: [3, 2, 3], layerSpacing: 0.95, nodeSpacing: 0.48 },
    ]
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const speed = 0.3 + Math.random() * 0.4
      
      result.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3
        ],
        velocity: [
          Math.cos(angle) * speed,
          Math.sin(angle) * speed * 0.7,
          (Math.random() - 0.5) * 0.1
        ],
        scale: 0.4 + Math.random() * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        nodeConfig: nodeConfigs[i % nodeConfigs.length]
      })
    }
    
    return result
  }, [])
  
  return (
    <>
      {clusters.map((cluster, i) => (
        <NeuralCluster
          key={i}
          position={cluster.position}
          velocity={cluster.velocity}
          scale={cluster.scale}
          rotationSpeed={cluster.rotationSpeed}
          nodeConfig={cluster.nodeConfig}
        />
      ))}
    </>
  )
}
