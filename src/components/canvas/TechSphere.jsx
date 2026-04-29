import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Timer } from 'three'
import * as THREE from 'three'

// Initialize a shared timer for the scene (prevents multiple timer instances if not needed, but typical react would useMemo. Since we want a simple fix replacing state.clock, we will add useMemo)

function ParticleRing({ count = 120, radius = 2.8 }) {
  const points = useRef()
  const timer = useMemo(() => new Timer(), [])

  // Generate particle positions once on mount
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      // Use deterministic values instead of Math.random for purity
      const r = radius + (Math.sin(i * 0.1) - 0.5) * 0.4
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = (Math.cos(i * 0.15) - 0.5) * 0.8
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    return positions
  }, [count, radius])

  useFrame(() => {
    timer.update()
    if (points.current) {
      const elapsedTime = timer.getElapsed()
      points.current.rotation.y = elapsedTime * 0.08
      points.current.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00F5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingIcosahedron() {
  const meshRef = useRef()
  const timer = useMemo(() => new THREE.Timer(), [])

  useFrame(() => {
    timer.update()
    if (meshRef.current) {
      meshRef.current.rotation.x = timer.getElapsed() * 0.15
      meshRef.current.rotation.y = timer.getElapsed() * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={0.4} position={[2.2, 1.2, -1]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#7000FF"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron() {
  const meshRef = useRef()
  const timer = useMemo(() => new THREE.Timer(), [])

  useFrame(() => {
    timer.update()
    if (meshRef.current) {
      meshRef.current.rotation.x = timer.getElapsed() * -0.12
      meshRef.current.rotation.z = timer.getElapsed() * 0.18
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={0.3} position={[-2.5, -1, 1]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#00F5FF"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function TechSphere({ mousePosition }) {
  const mainSphere = useRef()
  const glowSphere = useRef()
  const timer = useMemo(() => new THREE.Timer(), [])

  useFrame(() => {
    timer.update()
    if (mainSphere.current) {
      // Mouse-reactive rotation
      const targetX = mousePosition.y * 0.3
      const targetY = mousePosition.x * 0.3
      mainSphere.current.rotation.x += (targetX - mainSphere.current.rotation.x) * 0.05
      mainSphere.current.rotation.y += (targetY - mainSphere.current.rotation.y) * 0.05
    }
    if (glowSphere.current) {
      glowSphere.current.rotation.x = timer.getElapsed() * 0.1
      glowSphere.current.rotation.y = timer.getElapsed() * 0.15
    }
  })

  return (
    <group>
      {/* Main distorted sphere */}
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere ref={mainSphere} args={[1.6, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#0a0a0a"
            emissive="#00F5FF"
            emissiveIntensity={0.12}
            roughness={0.2}
            metalness={0.9}
            distort={0.35}
            speed={1.5}
            wireframe={false}
          />
        </Sphere>
      </Float>

      {/* Wireframe overlay sphere */}
      <Sphere ref={glowSphere} args={[1.75, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00F5FF"
          wireframe
          transparent
          opacity={0.04}
        />
      </Sphere>

      {/* Particle ring */}
      <ParticleRing />

      {/* Floating secondary shapes */}
      <FloatingIcosahedron />
      <FloatingOctahedron />

      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00F5FF" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#7000FF" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#00F5FF"
      />
    </group>
  )
}
