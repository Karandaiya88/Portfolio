import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, ChevronRight, Lock } from 'lucide-react'
import { GitHubIcon } from '../ui/SocialIcons'

const projects = [
  {
    id: 1,
    title: 'CRPF Tender Evaluator',
    subtitle: 'AI-Powered Government Procurement',
    description:
      'An intelligent AI system for CRPF tender evaluation — extracts eligibility criteria via GPT-4, evaluates bidder documents through an OCR + RAG pipeline, and generates tamper-evident audit reports with human-in-the-loop review.',
    tags: ['FastAPI', 'GPT-4', 'Python', 'PostgreSQL', 'AWS S3', 'Docker'],
    color: '#00F5FF',
    github: 'https://github.com/Karandaiya88/CRPF-Tender-',
    live: 'https://github.com/Karandaiya88/CRPF-Tender-',
    gradient: 'linear-gradient(135deg, #00F5FF15, #7000FF10)',
    isPrivate: false,
  },
  {
    id: 2,
    title: 'Jira Ticket Evaluator',
    subtitle: 'AI Developer Productivity Tool',
    description:
      'An AI-powered tool that evaluates Jira tickets for clarity, completeness, and actionability — helping engineering teams write better tickets and reduce back-and-forth in sprint planning.',
    tags: ['Python', 'LLM', 'Prompt Engineering', 'Jira API'],
    color: '#7000FF',
    github: 'https://github.com/Karandaiya88/jira-ticket-evaluator',
    live: 'https://github.com/Karandaiya88/jira-ticket-evaluator',
    gradient: 'linear-gradient(135deg, #7000FF15, #00F5FF10)',
    isPrivate: false,
  },
  {
    id: 3,
    title: 'Interactive CPU Scheduler',
    subtitle: 'OS Algorithm Visualizer',
    description:
      'A real-time interactive simulator that visualizes CPU scheduling algorithms — FCFS, SJF, Priority, and Round Robin — with live Gantt charts, waiting time stats, and process management for OS learners.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Algorithms', 'Data Structures'],
    color: '#00F5FF',
    github: 'https://github.com/Karandaiya88/Interactive-CPU-Scheduling',
    live: 'https://karandaiya88.github.io/Interactive-CPU-Scheduling/',
    gradient: 'linear-gradient(135deg, #00F5FF15, #7000FF10)',
    isPrivate: false,
  },
  {
    id: 4,
    title: 'Weather App',
    subtitle: 'Real-Time Weather Dashboard',
    description:
      'A clean, responsive weather application that fetches real-time weather data using a public API — displaying temperature, humidity, wind speed, and condition icons for any searched city worldwide.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Weather API', 'REST'],
    color: '#7000FF',
    github: 'https://github.com/Karandaiya88/Weather-App',
    live: 'https://github.com/Karandaiya88/Weather-App',
    gradient: 'linear-gradient(135deg, #7000FF15, #00F5FF10)',
    isPrivate: false,
  },
  {
    id: 5,
    title: 'Internship Portal',
    subtitle: 'Full-Stack Career Platform',
    description:
      'A comprehensive internship management platform connecting students with companies — featuring role-based access, application tracking, profile management, and admin dashboards built with Spring Boot & React.',
    tags: ['Spring Boot', 'React', 'MySQL', 'Java', 'REST APIs'],
    color: '#00F5FF',
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #00F5FF15, #7000FF10)',
    isPrivate: true,
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
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        {/* Decorative glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full blur-2xl opacity-40"
            style={{ background: project.color }}
          />
        </div>

        {/* Private badge */}
        {project.isPrivate && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              color: '#888',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Lock size={10} />
            Private Repo
          </div>
        )}

        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
          <span
            className="text-xs font-mono tracking-wider uppercase opacity-60"
            style={{ color: project.color }}
          >
            Project 0{project.id}
          </span>
          <div className="flex gap-2">
            {!project.isPrivate && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
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
            )}
            {!project.isPrivate && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
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
            )}
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

        {/* View link or private label */}
        {project.isPrivate ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#444]">
            <Lock size={12} /> Private Repository
          </span>
        ) : (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2"
            style={{ color: project.color }}
            data-cursor="pointer"
          >
            View on GitHub <ChevronRight size={14} />
          </a>
        )}
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

        {/* Project grid — 2 cols on md+, 1 col on mobile */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Karandaiya88"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
            data-cursor="pointer"
          >
            <GitHubIcon size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}