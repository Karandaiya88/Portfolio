import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Timer } from 'three'
import * as THREE from 'three'

const skills = [
  { name: 'Java', color: '#00F5FF' },
  { name: 'Spring Boot', color: '#00F5FF' },
  { name: 'MySQL', color: '#00F5FF' },
  { name: 'AI/ML', color: '#7000FF' },
  { name: 'Agentic AI', color: '#7000FF' },
  { name: 'Python', color: '#00F5FF' },
  { name: 'React', color: '#00F5FF' },
  { name: 'TensorFlow', color: '#7000FF' },
  { name: 'Docker', color: '#00F5FF' },
  { name: 'REST APIs', color: '#00F5FF' },
  { name: 'LangChain', color: '#7000FF' },
  { name: 'Git', color: '#00F5FF' },
]

function SkillNode({ position, color, index }) {
  const meshRef = useRef()
  const timer = useMemo(() => new Timer(), [])

  useFrame(() => {
    timer.update()
    if (meshRef.current) {
      const t = timer.getElapsed() + index * 0.5
      meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.15
      meshRef.current.position.x = position[0] + Math.cos(t * 0.4) * 0.08
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.15, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* <Text
        ref={textRef}
        position={[0, -0.28, 0]}
        fontSize={0.13}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSnk-DKQRDA.woff2"
        outlineWidth={0.005}
        outlineColor="#050505"
      >
        {name}
      </Text> */}
    </group>
  )
}

function ConnectionLines({ positions }) {
  const lineRef = useRef()
  
  const linePositions = useMemo(() => {
    const pts = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.sqrt(
          (positions[i][0] - positions[j][0]) ** 2 +
          (positions[i][1] - positions[j][1]) ** 2 +
          (positions[i][2] - positions[j][2]) ** 2
        )
        if (dist < 2.5) {
          pts.push(positions[i][0], positions[i][1], positions[i][2])
          pts.push(positions[j][0], positions[j][1], positions[j][2])
        }
      }
    }
    return new Float32Array(pts)
  }, [positions])

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

export default function SkillOrbit() {
  const groupRef = useRef()
  const timer = useMemo(() => new Timer(), [])

  // Distribute skills in a 3D arrangement
  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      const r = 2
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi) * 0.7,
        r * Math.cos(phi) * 0.6,
      ]
    })
  }, [])

  useFrame(() => {
    timer.update()
    if (groupRef.current) {
      groupRef.current.rotation.y = timer.getElapsed() * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <ConnectionLines positions={positions} />
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={positions[i]}
          name={skill.name}
          color={skill.color}
          index={i}
        />
      ))}
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#00F5FF" />
      <pointLight position={[-3, -3, -3]} intensity={0.3} color="#7000FF" />
    </group>
  )
}
