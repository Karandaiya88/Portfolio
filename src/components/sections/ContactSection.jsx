import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { GitHubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@portfolio.dev',
    href: 'mailto:hello@portfolio.dev',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: '#',
  },
]

const socialLinks = [
  { icon: GitHubIcon, label: 'GitHub', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: TwitterIcon, label: 'Twitter', href: '#' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      {/* Background gradient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7000FF 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00F5FF] font-medium">
              Get In Touch
            </span>
            <h2 className="hero-title mt-3 !text-4xl md:!text-5xl">
              Let's Build
              <br />
              <span className="text-gradient">Something Great</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#7000FF] mt-6 mx-auto rounded-full" />
            <p className="text-[#888] mt-6 max-w-lg mx-auto text-sm leading-relaxed">
              Have a project in mind or want to discuss AI/ML opportunities?
              I'm always open to exploring new challenges and collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Left: Contact info */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="contact-link"
                  data-cursor="pointer"
                >
                  <div
                    className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,245,255,0.06)' }}
                  >
                    <link.icon size={16} className="md:w-5 md:h-5 text-[#00F5FF]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-1">
                      {link.label}
                    </p>
                    <p className="text-sm text-white font-medium">{link.value}</p>
                  </div>
                </a>
              ))}

              {/* Social */}
              <div className="pt-4 md:pt-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-3 md:mb-4">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-[#888] transition-all duration-300 hover:text-[#00F5FF] hover:bg-[rgba(0,245,255,0.06)]"
                      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                      data-cursor="pointer"
                      aria-label={social.label}
                    >
                      <social.icon size={16} className="md:w-5 md:h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Quick message form */}
            <motion.div variants={itemVariants}>
              <form
                className="space-y-4 md:space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  // Form submission logic
                }}
              >
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#444] outline-none transition-all duration-300 focus:border-[rgba(0,245,255,0.3)]"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#444] outline-none transition-all duration-300 focus:border-[rgba(0,245,255,0.3)]"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#444] outline-none resize-none transition-all duration-300 focus:border-[rgba(0,245,255,0.3)]"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  data-cursor="pointer"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="footer mt-24 section-container">
        <p>
          Designed & Crafted with{' '}
          <span className="text-[#00F5FF]">precision</span> ·{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
