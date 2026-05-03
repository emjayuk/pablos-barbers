'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Review data ─────────────────────────────────────────────────────── */
const reviews = [
  {
    name:   'Rochelle Sooserious',
    text:   'Highly recommend, only barber that can do as I ask. Although he is free to use his imagination with styles. Best barber, my no.1 barber shop.',
    stars:  5,
  },
  {
    name:   'Mandy',
    text:   'Love how this shop is open late! Such good vibes and amazing music, everyone has a little sing and dance! Very friendly staff.',
    stars:  5,
  },
  {
    name:   'Neil Codrington',
    text:   'We took our grandson who is autistic and Pablo was fantastic with him, kept him entertained whilst doing a good cut.',
    stars:  5,
  },
  {
    name:   'Mohsin Unar',
    text:   'Professional and friendly staff. Excellent haircut for every hair style. They have a good eye for detail and attention.',
    stars:  5,
  },
  {
    name:   'Sandiso Sibanda',
    text:   'Steve one of the best barbers I know. Great cut for my son. Each time we in Bristol we go to Pablo\'s for a cut.',
    stars:  5,
  },
  {
    name:   'Kieran Lanigan',
    text:   'Went in here for the first time today and it\'s the best hair cut I\'ve had. See you again soon.',
    stars:  5,
  },
] as const

/* ── Animation variants ──────────────────────────────────────────────── */
const headingContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const headingItem: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EXPO_OUT } },
}

const gridContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardVariant: Variants = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EXPO_OUT } },
}

/* ── Star row ────────────────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          style={{ color: 'var(--color-gold)' }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-black)' }}
    >

      {/* ── Subtle gold diagonal texture ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(244,161,29,0.03) 0px, rgba(244,161,29,0.03) 1px, transparent 0px, transparent 64px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-24 md:py-32">

        {/* ── Section heading ───────────────────────────────────────── */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 md:mb-16 text-center"
        >
          <motion.p
            variants={headingItem}
            className="font-body text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            What They Say
          </motion.p>

          <motion.h2
            variants={headingItem}
            className="font-display text-cream leading-none uppercase"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
          >
            Don&apos;t Take Our Word For It.
          </motion.h2>

          {/* ── Google rating summary ──────────────────────────────── */}
          <motion.div
            variants={headingItem}
            className="flex flex-col items-center gap-1 mt-8"
          >
            <span
              className="font-display leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--color-gold)' }}
            >
              4.4★
            </span>
            <span
              className="font-body text-sm tracking-wide"
              style={{ color: 'rgba(253,248,238,0.55)' }}
            >
              Based on 103 Google Reviews
            </span>
          </motion.div>
        </motion.div>

        {/* ── Review cards grid ─────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariant}
              className="flex flex-col gap-5 p-7 md:p-8"
              style={{
                backgroundColor: 'var(--color-green)',
                borderTop: '3px solid var(--color-gold)',
              }}
            >
              {/* Stars */}
              <Stars count={review.stars} />

              {/* Review text */}
              <p
                className="font-body text-sm md:text-base leading-relaxed italic flex-1"
                style={{ color: 'rgba(253,248,238,0.82)' }}
              >
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex flex-col gap-0.5 pt-2" style={{ borderTop: '1px solid rgba(244,161,29,0.18)' }}>
                <span
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'var(--color-gold)' }}
                >
                  {review.name}
                </span>
                <span
                  className="font-body"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'rgba(253,248,238,0.38)' }}
                >
                  — Google Review
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Google CTA ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-14"
        >
          <a
            href="https://www.google.com/maps/place/Pablo's+Barbers/@51.4583,-2.5636,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'rgba(253,248,238,0.45)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
          >
            {/* Google G icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--color-gold)' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            See all reviews on Google
          </a>
        </motion.div>

      </div>
    </section>
  )
}
