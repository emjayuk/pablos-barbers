'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Card definitions ────────────────────────────────────────────────── */
type PhotoCard = { kind: 'photo'; src: string;  label: string; wide: boolean }
type VideoCard = { kind: 'video'; src: string;  label: string; wide: boolean }
type PhCard    = { kind: 'placeholder';          label: string; wide: boolean }
type Card = PhotoCard | VideoCard | PhCard

const cards: Card[] = [
  { kind: 'photo',       src: '/gallery/photo1.jpg', label: 'Fade & Design', wide: false },
  { kind: 'video',       src: '/gallery/cut1.mp4',   label: 'Fresh Fade',    wide: false },
  { kind: 'photo',       src: '/gallery/photo2.jpg', label: 'Fresh Cut',     wide: false },
  { kind: 'video',       src: '/gallery/cut2.mp4',   label: 'Clean Cut',     wide: false },
  { kind: 'photo',       src: '/gallery/photo3.jpg', label: 'Clean Lines',   wide: false },
  { kind: 'photo',       src: '/gallery/photo4.jpg', label: 'The Art of the Cut', wide: false },
]

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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariant: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
}

/* ── Shared hover overlay ────────────────────────────────────────────── */
function HoverOverlay({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex items-end p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      style={{
        background:
          'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.18) 55%, transparent 100%)',
      }}
    >
      <span
        className="font-display uppercase leading-none"
        style={{ fontSize: 'clamp(1.15rem, 2vw, 1.7rem)', color: 'var(--color-gold)' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-green)' }}
    >

      {/* ── Subtle gold diagonal texture ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(244,161,29,0.025) 0px, rgba(244,161,29,0.025) 1px, transparent 0px, transparent 80px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-24 md:py-32">

        {/* ── Section heading ───────────────────────────────────────── */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20"
        >
          <motion.p
            variants={headingItem}
            className="font-body text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            The Work
          </motion.p>

          <motion.h2
            variants={headingItem}
            className="font-display text-cream leading-none uppercase"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
          >
            Every Cut Tells a Story.
          </motion.h2>
        </motion.div>

        {/* ── Gallery grid — 3 cols desktop, 2 tablet, 1 mobile ────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4 md:gap-5"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.label}
              variants={cardVariant}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                backgroundColor: '#0D0D0D',
                border: '1px solid rgba(244,161,29,0.3)',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: 'inset 0 0 0 2px rgba(244,161,29,0.85)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
            >
              {card.kind === 'photo' && (
                <div className="relative aspect-[3/4]">
                  <Image
                    src={card.src}
                    alt={card.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <HoverOverlay label={card.label} />
                </div>
              )}

              {card.kind === 'video' && (
                <div className="relative aspect-[9/16]">
                  <video
                    src={card.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <HoverOverlay label={card.label} />
                </div>
              )}

              {card.kind === 'placeholder' && (
                <div className="relative aspect-[3/4]">
                  {/* Corner brackets */}
                  <span className="absolute top-3 left-3 w-4 h-4 z-10" style={{ borderTop: '1.5px solid rgba(244,161,29,0.38)', borderLeft: '1.5px solid rgba(244,161,29,0.38)' }} />
                  <span className="absolute top-3 right-3 w-4 h-4 z-10" style={{ borderTop: '1.5px solid rgba(244,161,29,0.38)', borderRight: '1.5px solid rgba(244,161,29,0.38)' }} />
                  <span className="absolute bottom-3 left-3 w-4 h-4 z-10" style={{ borderBottom: '1.5px solid rgba(244,161,29,0.38)', borderLeft: '1.5px solid rgba(244,161,29,0.38)' }} />
                  <span className="absolute bottom-3 right-3 w-4 h-4 z-10" style={{ borderBottom: '1.5px solid rgba(244,161,29,0.38)', borderRight: '1.5px solid rgba(244,161,29,0.38)' }} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <p
                      className="font-display leading-none uppercase"
                      style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'rgba(253,248,238,0.5)' }}
                    >
                      {card.label}
                    </p>
                    <a
                      href="https://instagram.com/pablobarber1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body transition-colors duration-200"
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-gold)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      @pablobarber1
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Instagram note ────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center font-body text-sm mt-12 md:mt-16"
          style={{ color: 'rgba(253,248,238,0.5)' }}
        >
          <a
            href="https://instagram.com/pablobarber1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-gold)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            @pablobarber1
          </a>
        </motion.p>

      </div>
    </section>
  )
}
