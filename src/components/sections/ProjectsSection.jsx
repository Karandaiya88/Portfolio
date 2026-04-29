import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { GitHubIcon } from '../ui/SocialIcons'

const projects = [
  {
    id: 1,
    title: 'TalentTrail',
    subtitle: 'AI-Powered Career Platform',
    description:
      'An intelligent career guidance platform that uses agentic AI to create personalized learning paths, skill assessments, and job matching for aspiring tech professionals.',
    tags: ['Spring Boot', 'React', 'AI/ML', 'MySQL', 'LangChain'],
    color: '#00F5FF',
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #00F5FF15, #7000FF10)',
  },
  {
    id: 2,
    title: 'Gesture Tool',
    subtitle: 'Computer Vision Interface',
    description:
      'A real-time hand gesture recognition system built with computer vision and deep learning, enabling touchless interaction with digital interfaces using custom-trained neural networks.',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'MediaPipe', 'CNN'],
    color: '#7000FF',
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #7000FF15, #00F5FF10)',
  },
  {
    id: 3,
    title: 'Agentic RAG System',
    subtitle: 'Autonomous Knowledge Engine',
    description:
      'A multi-agent retrieval-augmented generation system that autonomously researches, synthesizes, and presents information from diverse data sources with intelligent query decomposition.',
    tags: ['LangChain', 'Python', 'Vector DB', 'GPT-4', 'FastAPI'],
    color: '#00F5FF',
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #00F5FF15, #7000FF10)',
  },
  {
    id: 4,
    title: 'Smart API Gateway',
    subtitle: 'Microservices Architecture',
    description:
      'A production-grade API gateway with intelligent rate limiting, JWT-based auth, request routing, and real-time analytics dashboard for monitoring microservice health.',
    tags: ['Spring Boot', 'Java', 'Docker', 'Redis', 'Kafka'],
    color: '#7000FF',
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #7000FF15, #00F5FF10)',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(relX)
    y.set(relY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group"
      data-cursor="pointer"
    >
      {/* Card image / gradient area */}
      <div
        className="h-48 md:h-56 relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full blur-2xl opacity-40"
            style={{ background: project.color }}
          />
        </div>
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
          <span
            className="text-xs font-mono tracking-wider uppercase opacity-60"
            style={{ color: project.color }}
          >
            Project 0{project.id}
          </span>
          <div className="flex gap-2">
            <a
              href={project.github}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
              }}
              data-cursor="pointer"
              aria-label={`${project.title} GitHub`}
            >
              <GitHubIcon size={14} />
            </a>
            <a
              href={project.live}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
              }}
              data-cursor="pointer"
              aria-label={`${project.title} Live`}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: project.color }}>
          {project.subtitle}
        </p>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-[#666] leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#888',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View more */}
        <a
          href={project.live}
          className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2"
          style={{ color: project.color }}
          data-cursor="pointer"
        >
          View Details <ChevronRight size={14} />
        </a>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#00F5FF] font-medium">
            Selected Work
          </span>
          <h2 className="hero-title mt-3 !text-4xl md:!text-5xl">
            Featured
            <br />
            <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#7000FF] mt-6 rounded-full" />
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
