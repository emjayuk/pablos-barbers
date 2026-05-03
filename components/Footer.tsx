'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
}

const navLinks = [
  { href: '#about',    label: 'About'    },
  { href: '#services', label: 'Services' },
  { href: '#gallery',  label: 'Gallery'  },
  { href: '#reviews',  label: 'Reviews'  },
  { href: '#find-us',  label: 'Find Us'  },
] as const

const contactLinks = [
  {
    emoji: '📱',
    label: 'Book via WhatsApp',
    href:  'https://wa.me/447531329600',
    external: true,
  },
  {
    emoji: '📞',
    label: '0117 329 1293',
    href:  'tel:01173291293',
    external: false,
  },
  {
    emoji: '📸',
    label: '@pablobarber1',
    href:  'https://instagram.com/pablobarber1',
    external: true,
  },
] as const

/* ── Component ───────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-black)',
        borderTop: '3px solid var(--color-gold)',
      }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-16 md:pt-20 pb-10 md:pb-12"
      >

        {/* ── Three columns ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center sm:text-left">

          {/* ── Left: brand ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-3 items-center sm:items-start">
            <span
              className="font-display leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-gold)' }}
            >
              Pablo&apos;s Barbers
            </span>
            <p
              className="font-body italic"
              style={{ fontSize: '0.9rem', color: 'rgba(253,248,238,0.65)' }}
            >
              Bristol&apos;s Finest Since Day One
            </p>
            <p
              className="font-body"
              style={{ fontSize: '0.8rem', color: 'rgba(253,248,238,0.45)', lineHeight: 1.6 }}
            >
              126 Stapleton Rd, St Jude&apos;s<br />
              Bristol BS5 0PS
            </p>
          </div>

          {/* ── Centre: quick links ──────────────────────────────────── */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <span
              className="font-display leading-none"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'var(--color-gold)', letterSpacing: '0.15em' }}
            >
              Quick Links
            </span>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm transition-colors duration-200"
                      style={{ color: 'rgba(253,248,238,0.62)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,248,238,0.62)')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Right: contact ───────────────────────────────────────── */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <span
              className="font-display leading-none"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'var(--color-gold)', letterSpacing: '0.15em' }}
            >
              Get In Touch
            </span>
            <ul className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="font-body text-sm transition-colors duration-200 flex items-center gap-2 justify-center sm:justify-start"
                    style={{ color: 'rgba(253,248,238,0.62)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,248,238,0.62)')}
                  >
                    <span aria-hidden="true">{link.emoji}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div
          className="mt-12 md:mt-16 pt-6 flex flex-col gap-1.5 items-center"
          style={{ borderTop: '1px solid rgba(244,161,29,0.2)' }}
        >
          <p
            className="font-body text-center"
            style={{ fontSize: '0.75rem', color: 'rgba(253,248,238,0.55)' }}
          >
            &copy; 2026 Pablo&apos;s Barbers, Bristol. All rights reserved.
          </p>
        </div>

      </motion.div>
    </footer>
  )
}
