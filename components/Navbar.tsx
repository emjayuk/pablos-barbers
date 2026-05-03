'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const navLinks = [
  { href: '#about',    label: 'About'    },
  { href: '#services', label: 'Services' },
  { href: '#gallery',  label: 'Gallery'  },
  { href: '#reviews',  label: 'Reviews'  },
  { href: '#find-us',  label: 'Find Us'  },
] as const

/* ── Dropdown variants ───────────────────────────────────────────────── */
const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.32, ease: EXPO_OUT },
  },
}

const dropdownItemVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EXPO_OUT } },
}

/* ── Hamburger icon ──────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-[5px] w-5 h-5" aria-hidden="true">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="block h-[1.5px] w-full origin-center"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="block h-[1.5px] w-full origin-center"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="block h-[1.5px] w-full origin-center"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />
    </div>
  )
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on any nav click */
  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: EXPO_OUT }}
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(244,161,29,0.35)' : '1px solid transparent',
        transition: 'background-color 0.35s ease, border-color 0.35s ease',
      }}
    >
      {/* ── Main bar ──────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 h-16 md:h-[70px] flex items-center justify-between gap-6">

        {/* Logo */}
        <a
          href="#"
          className="shrink-0"
          aria-label="Pablo's Barbers — back to top"
        >
          <Image
            src="/logo.jpg"
            alt="Pablo's Barbers"
            width={50}
            height={50}
            className="rounded-full object-cover"
            style={{ height: '50px', width: 'auto' }}
            priority
          />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs tracking-[0.18em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(253,248,238,0.75)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,248,238,0.75)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: BOOK NOW + hamburger */}
        <div className="flex items-center gap-4">
          <motion.a
            href="https://wa.me/447531329600"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display tracking-[0.18em] uppercase shrink-0"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-black)',
              fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
              padding: '9px 18px',
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.97 }}
          >
            Book Now
          </motion.a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 shrink-0 -mr-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>

      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: 'rgba(13,13,13,0.98)', borderTop: '1px solid rgba(244,161,29,0.2)' }}
            aria-label="Mobile navigation"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ staggerChildren: 0.055, delayChildren: 0.05 }}
              className="flex flex-col px-6 py-4 gap-0"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={dropdownItemVariants}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center font-body text-sm tracking-[0.18em] uppercase py-3.5 transition-colors duration-200"
                    style={{
                      color: 'rgba(253,248,238,0.72)',
                      borderBottom: '1px solid rgba(244,161,29,0.1)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,248,238,0.72)')}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

    </motion.header>
  )
}
