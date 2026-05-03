'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

/* ── Animation variants ──────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.25,
    },
  },
}

// Cubic bezier typed as 4-tuple — required by Framer Motion v12
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const lineVariants: Variants = {
  hidden: { y: 90, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.95,
      ease: EXPO_OUT,
    },
  },
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      aria-label="Pablo's Barbers hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-black)' }}
    >

      {/* ── 3D scene — barber pole + gold particles ──────────────────── */}
      <HeroScene />

      {/* ── Animated ambient background ────────────────────────────────
          Three slow-drifting radial orbs in brand colours + diagonal
          stripe ghost pattern. All pointer-events-none so they never
          block interaction.
      ─────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Green orb — top left, drifts slowly */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(320px, 55vw, 750px)',
            height: 'clamp(320px, 55vw, 750px)',
            background: 'radial-gradient(circle, rgba(27,67,50,0.65) 0%, transparent 68%)',
            top: '-12%',
            left: '-8%',
          }}
          animate={{ x: [0, 45, 0], y: [0, 28, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Gold orb — bottom right, offset timing */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(220px, 38vw, 520px)',
            height: 'clamp(220px, 38vw, 520px)',
            background: 'radial-gradient(circle, rgba(244,161,29,0.2) 0%, transparent 70%)',
            bottom: '-8%',
            right: '-4%',
          }}
          animate={{ x: [0, -35, 0], y: [0, -22, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />

        {/* Red accent — mid-right, slow pulse */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(160px, 26vw, 380px)',
            height: 'clamp(160px, 26vw, 380px)',
            background: 'radial-gradient(circle, rgba(193,18,31,0.14) 0%, transparent 70%)',
            top: '38%',
            right: '18%',
          }}
          animate={{ scale: [1, 1.45, 1], opacity: [1, 0.55, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Diagonal stripe ghost — Jamaican flag echoes */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(244,161,29,0.04) 0px, rgba(244,161,29,0.04) 1px, transparent 0px, transparent 64px)',
          }}
        />

        {/* Bottom vignette — deepens contrast for legibility */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '55%',
            background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 100%)',
          }}
        />

        {/* Top-edge fade */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: '20%',
            background: 'linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-20 max-w-[1400px] mx-auto text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Display heading — PABLO'S BARBERS */}
          <h1 className="leading-none" aria-label="Pablo's Barbers">

            {/* Line 1: PABLO'S */}
            <div className="overflow-hidden">
              <motion.span
                variants={lineVariants}
                className="type-display text-cream block"
              >
                PABLO&apos;S
              </motion.span>
            </div>

            {/* Line 2: BARBERS — slight negative margin to tighten stacking */}
            <div className="overflow-hidden -mt-1 sm:-mt-3 md:-mt-4">
              <motion.span
                variants={lineVariants}
                className="type-display text-cream block"
              >
                BARBERS
              </motion.span>
            </div>
          </h1>

          {/* Line 3: tagline — smaller gold Bebas Neue */}
          <div className="overflow-hidden mt-3 md:mt-5">
            <motion.p
              variants={lineVariants}
              className="font-display text-gold tracking-widest block uppercase"
              style={{ fontSize: 'clamp(1.1rem, 3.2vw, 2.75rem)', lineHeight: 1 }}
            >
              Bristol&apos;s Finest Since Day One
            </motion.p>
          </div>

          {/* Subtext */}
          <div className="overflow-hidden mt-5 md:mt-7">
            <motion.p
              variants={lineVariants}
              className="font-body text-base sm:text-lg md:text-xl max-w-md"
              style={{ color: 'rgba(253,248,238,0.68)', lineHeight: 1.65 }}
            >
              Jamaican roots. Bristol soul. Every cut a masterpiece.
            </motion.p>
          </div>

          {/* CTA button — fades in after text stagger completes */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 md:mt-12"
          >
            <motion.a
              href="https://wa.me/447531329600"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-display tracking-[0.18em] uppercase cursor-pointer select-none"
              style={{
                backgroundColor: '#F4A11D',
                color: '#0D0D0D',
                fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
                padding: 'clamp(14px, 2vw, 22px) clamp(28px, 4vw, 44px)',
              }}
              /* Subtle pulsing gold glow — the "alive" feel */
              animate={{
                boxShadow: [
                  '0 0 0px rgba(244,161,29,0)',
                  '0 0 28px rgba(244,161,29,0.38)',
                  '0 0 0px rgba(244,161,29,0)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                backgroundColor: '#F4A11D',
                color: '#0D0D0D',
                scale: 1.04,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.96 }}
            >
              {/* WhatsApp icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book Now
            </motion.a>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      {/* Outer wrapper fades in after everything else has loaded */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
        aria-hidden="true"
      >
        {/* Inner wrapper bounces continuously */}
        <motion.div
          className="flex flex-col items-center gap-2 cursor-default"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="font-body uppercase"
            style={{
              color: 'rgba(253,248,238,0.38)',
              fontSize: '0.625rem',
              letterSpacing: '0.3em',
            }}
          >
            Scroll
          </span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            style={{ color: 'var(--color-gold)' }}
          >
            <path
              d="M7 1L7 15M7 15L1 9M7 15L13 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  )
}
