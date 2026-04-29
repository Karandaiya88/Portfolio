import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Brain, Cpu, Rocket } from 'lucide-react'

const highlights = [
  {
    icon: Brain,
    title: 'AI/ML Engineer',
    desc: 'Deep expertise in machine learning models, neural networks, and intelligent data pipelines.',
    color: '#7000FF',
  },
  {
    icon: Cpu,
    title: 'Agentic AI',
    desc: 'Building autonomous AI agents with LangChain, RAG systems, and multi-agent orchestration.',
    color: '#00F5FF',
  },
  {
    icon: Code2,
    title: 'Backend Architect',
    desc: 'Scalable microservices with Spring Boot, REST APIs, and robust database architectures.',
    color: '#00F5FF',
  },
  {
    icon: Rocket,
    title: 'Full-Stack Vision',
    desc: 'End-to-end product thinking — from React frontends to production-grade AI backends.',
    color: '#7000FF',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative grid-bg" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00F5FF] font-medium">
              About Me
            </span>
            <h2 className="hero-title mt-3 !text-4xl md:!text-5xl">
              From Student to
              <br />
              <span className="text-gradient">AI Specialist</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#7000FF] mt-6 rounded-full" />
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left: bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-[#aaa] text-base leading-relaxed">
                I'm a <span className="text-white font-medium">B.Tech Computer Science graduate</span> who
                discovered the transformative power of artificial intelligence early in my academic journey.
                What started as curiosity about neural networks evolved into a deep specialization in
                <span className="text-[#7000FF] font-medium"> Agentic AI</span> — building systems that don't
                just predict, but <span className="text-white font-medium">think, plan, and act autonomously</span>.
              </p>
              <p className="text-[#aaa] text-base leading-relaxed">
                My backend roots in <span className="text-[#00F5FF]">Java & Spring Boot</span> give me the
                engineering discipline to build production-grade AI systems. I bridge the gap between
                cutting-edge ML research and reliable, scalable software architecture.
              </p>
              <p className="text-[#aaa] text-base leading-relaxed">
                Currently focused on <span className="text-white font-medium">multi-agent systems</span>,
                <span className="text-[#7000FF]"> RAG pipelines</span>, and building the next generation of
                intelligent applications that augment human capabilities.
              </p>

              {/* Stats */}
              <div className="flex gap-8 pt-6">
                {[
                  { value: '10+', label: 'Projects' },
                  { value: '5+', label: 'AI Models' },
                  { value: '3+', label: 'Years Coding' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-[#555] uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: highlight cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  variants={itemVariants}
                  className="p-5 rounded-xl transition-all duration-500 group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                  whileHover={{
                    borderColor: h.color + '30',
                    boxShadow: `0 0 30px ${h.color}15`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: h.color + '10' }}
                  >
                    <h.icon size={18} style={{ color: h.color }} />
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-2">{h.title}</h3>
                  <p className="text-xs text-[#666] leading-relaxed">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
