import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import {
  Code2, Database, Server, Brain, Bot, Terminal,
  Globe, GitBranch, Container, Layers, Cpu, Zap,
} from 'lucide-react'
import SkillOrbit from '../canvas/SkillOrbit'

const skillCategories = [
  {
    title: 'Backend & Engineering',
    color: '#00F5FF',
    skills: [
      { name: 'Java', icon: Code2 },
      { name: 'Spring Boot', icon: Server },
      { name: 'MySQL', icon: Database },
      { name: 'REST APIs', icon: Globe },
      { name: 'Docker', icon: Container },
      { name: 'Git', icon: GitBranch },
    ],
  },
  {
    title: 'AI / ML & Agentic AI',
    color: '#7000FF',
    skills: [
      { name: 'Python', icon: Terminal },
      { name: 'TensorFlow', icon: Brain },
      { name: 'LangChain', icon: Bot },
      { name: 'Agentic AI', icon: Cpu },
      { name: 'RAG Systems', icon: Layers },
      { name: 'Prompt Engineering', icon: Zap },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding relative grid-bg" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#00F5FF] font-medium">
            Tech Arsenal
          </span>
          <h2 className="hero-title mt-3 !text-4xl md:!text-5xl">
            Skills &
            <br />
            <span className="text-gradient">Technologies</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#7000FF] mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: 3D Skill Orbit - Hidden on mobile, shown on lg+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block h-[400px] md:h-[450px] relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-[#00F5FF] animate-spin" />
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <Preload all />
                <SkillOrbit />
              </Canvas>
            </Suspense>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[rgba(0,245,255,0.2)] rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[rgba(112,0,255,0.2)] rounded-br-lg" />
          </motion.div>

          {/* Right: Skill categories - Full width on mobile, right on lg+ */}
          <div className="space-y-8 lg:space-y-10 lg:col-start-2">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h3 className="text-sm font-semibold mb-4 lg:mb-5 flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: category.color }}
                  />
                  <span style={{ color: category.color }}>{category.title}</span>
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="skill-tag justify-center text-center"
                      data-cursor="pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <skill.icon size={16} className="shrink-0" />
                      <span className="text-xs">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="p-4 lg:p-5 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.03), rgba(112,0,255,0.03))',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <p className="text-xs text-[#888] leading-relaxed">
                <span className="text-white font-medium">Always learning.</span>{' '}
                Currently exploring advanced multi-agent architectures, autonomous planning systems,
                and the intersection of reinforcement learning with agentic AI frameworks.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
