import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="navbar"
        style={{
          background: isScrolled
            ? 'rgba(5, 5, 5, 0.85)'
            : 'rgba(5, 5, 5, 0.4)',
        }}
        id="navbar"
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, '#hero')}
            className="text-lg font-bold tracking-tight"
            data-cursor="pointer"
          >
            <span className="text-gradient">{'<'}</span>
            <span className="text-white">Portfolio</span>
            <span className="text-gradient">{'/>'}</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="nav-link"
                data-cursor="pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="btn-primary !py-2 !px-5 !text-xs"
              data-cursor="pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              Let's Talk
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-[999] rounded-2xl p-6 glass"
            style={{ background: 'rgba(5, 5, 5, 0.95)' }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="nav-link text-base py-2"
                  data-cursor="pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
