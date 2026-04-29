import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import { GitHubIcon, LinkedinIcon } from '../ui/SocialIcons'
import TechSphere from '../canvas/TechSphere'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-[#00F5FF] animate-spin" />
    </div>
  )
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToAbout = () => {
    const el = document.querySelector('#about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7000FF 0%, transparent 70%)' }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<CanvasLoader />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Preload all />
            <TechSphere mousePosition={mousePosition} />
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div className="section-container relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase"
              style={{
                background: 'rgba(0, 245, 255, 0.06)',
                border: '1px solid rgba(0, 245, 255, 0.15)',
                color: '#00F5FF',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
              Available for Opportunities
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={itemVariants} className="hero-title mb-6">
            Building the Future
            <br />
            <span className="text-gradient">with Agentic AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="hero-subtitle mb-10">
            B.Tech Graduate turned AI/ML & Backend Specialist. I craft intelligent systems
            powered by Agentic AI, Spring Boot, and cutting-edge machine learning —
            transforming ideas into autonomous, scalable solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-12">
            <a href="#projects" className="btn-primary justify-center" data-cursor="pointer">
              <FileText size={16} className="sm:w-5 sm:h-5" />
              View Projects
            </a>
            <a href="#contact" className="btn-outline justify-center" data-cursor="pointer">
              Let's Connect
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <span className="text-xs text-[#555] uppercase tracking-widest">Find me on</span>
            <div className="w-6 sm:w-8 h-px bg-[#333]" />
            <div className="flex gap-3">
              {[
                { icon: GitHubIcon, href: '#', label: 'GitHub' },
                { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,245,255,0.08)] hover:text-[#00F5FF]"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#888' }}
                  data-cursor="pointer"
                  aria-label={social.label}
                >
                  <social.icon size={14} className="sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555] z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        data-cursor="pointer"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={14} />
      </motion.button>
    </section>
  )
}
