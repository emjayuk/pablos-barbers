'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Stats data ──────────────────────────────────────────────────────── */
const stats = [
  { number: '4.4★', label: 'Google Rating' },
  { number: '103+', label: 'Happy Clients' },
  { number: '8pm',  label: 'Open Late' },
] as const

/* ── Stat row variants — staggered reveal ────────────────────────────── */
const statsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const statItem: Variants = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: EXPO_OUT } },
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-green)' }}
    >

      {/* ── Subtle texture — prevents the green field feeling flat ─────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(244,161,29,0.025) 0px, rgba(244,161,29,0.025) 1px, transparent 0px, transparent 80px)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-24 items-center">

          {/* ── Left: photo placeholder ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: EXPO_OUT }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Gold-bordered frame with corner accent marks */}
            <div
              className="relative w-full aspect-[4/5] overflow-hidden"
              style={{ border: '1px solid rgba(244,161,29,0.45)' }}
            >
              <Image
                src="/gallery/pablo-hero.jpg"
                alt="Pablo — master barber at Pablo's Barbers, Bristol"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                style={{ objectPosition: 'center top' }}
                priority
              />

              {/* Corner brackets — top left */}
              <span
                className="absolute top-0 left-0 w-7 h-7 z-10"
                style={{
                  borderTop: '2px solid var(--color-gold)',
                  borderLeft: '2px solid var(--color-gold)',
                }}
              />
              {/* Corner brackets — top right */}
              <span
                className="absolute top-0 right-0 w-7 h-7 z-10"
                style={{
                  borderTop: '2px solid var(--color-gold)',
                  borderRight: '2px solid var(--color-gold)',
                }}
              />
              {/* Corner brackets — bottom left */}
              <span
                className="absolute bottom-0 left-0 w-7 h-7 z-10"
                style={{
                  borderBottom: '2px solid var(--color-gold)',
                  borderLeft: '2px solid var(--color-gold)',
                }}
              />
              {/* Corner brackets — bottom right */}
              <span
                className="absolute bottom-0 right-0 w-7 h-7 z-10"
                style={{
                  borderBottom: '2px solid var(--color-gold)',
                  borderRight: '2px solid var(--color-gold)',
                }}
              />
            </div>
          </motion.div>

          {/* ── Right: text content ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: EXPO_OUT, delay: 0.12 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-6"
          >

            {/* Eyebrow */}
            <p
              className="font-body text-xs tracking-[0.35em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              Our Story
            </p>

            {/* Heading */}
            <h2
              className="font-display text-cream leading-none uppercase"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
            >
              More Than a Haircut.<br />It&apos;s a Vibe.
            </h2>

            {/* Thin gold rule — separates heading from body */}
            <div
              className="w-16"
              style={{ height: '2px', backgroundColor: 'rgba(244,161,29,0.5)' }}
            />

            {/* Body paragraphs */}
            <div className="flex flex-col gap-4">
              <p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: 'rgba(253,248,238,0.78)' }}
              >
                Pablo&apos;s Barbers has been cutting, shaping and styling Bristol for years.
                Rooted in Jamaican culture and built on community, every chair in this shop
                tells a story.
              </p>
              <p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: 'rgba(253,248,238,0.78)' }}
              >
                Whether you&apos;re after a clean fade, intricate designs, braids or a fresh
                shape-up — Pablo and the team bring precision, passion and good vibes to
                every single cut.
              </p>
              {/* Closing line — weighted heavier, feels like a sign-off */}
              <p
                className="font-body text-base md:text-lg leading-relaxed font-semibold"
                style={{ color: 'rgba(253,248,238,0.95)' }}
              >
                Walk in as a stranger. Leave as family.
              </p>
            </div>

            {/* ── Stats row ─────────────────────────────────────────── */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 mt-2"
              style={{ borderTop: '1px solid rgba(244,161,29,0.2)' }}
              variants={statsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statItem}
                  className="flex flex-col gap-1"
                >
                  <span
                    className="font-display leading-none"
                    style={{
                      fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="font-body text-xs tracking-wider uppercase"
                    style={{ color: 'rgba(253,248,238,0.55)' }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
