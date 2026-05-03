'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.95, ease: EXPO_OUT } },
}

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.95, ease: EXPO_OUT, delay: 0.12 } },
}

/* ── Reusable info block ─────────────────────────────────────────────── */
function InfoBlock({
  emoji,
  label,
  children,
}: {
  emoji: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p
        className="font-display leading-none flex items-center gap-2"
        style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', color: 'var(--color-gold)', letterSpacing: '0.12em' }}
      >
        <span aria-hidden="true">{emoji}</span>
        {label}
      </p>
      <div
        className="font-body text-base md:text-lg leading-relaxed"
        style={{ color: 'rgba(253,248,238,0.82)' }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function FindUs() {
  return (
    <section
      id="find-us"
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
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EXPO_OUT }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20"
        >
          <p
            className="font-body text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            Come See Us
          </p>

          <h2
            className="font-display text-cream leading-none uppercase"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
          >
            We&apos;re Right Here<br />in Bristol.
          </h2>
        </motion.div>

        {/* ── Two-column layout ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* ── Left: info ────────────────────────────────────────── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-8"
          >

            <InfoBlock emoji="📍" label="Address">
              <address className="not-italic">
                126 Stapleton Rd, St Jude&apos;s<br />
                Bristol BS5 0PS
              </address>
            </InfoBlock>

            <div
              className="w-full"
              style={{ height: '1px', backgroundColor: 'rgba(244,161,29,0.2)' }}
            />

            <InfoBlock emoji="🕐" label="Opening Hours">
              <p>Monday – Saturday: <span style={{ color: 'rgba(253,248,238,0.95)' }}>9am – 9pm</span></p>
              <p className="mt-0.5">Sunday: <span style={{ color: 'rgba(253,248,238,0.95)' }}>Closed</span></p>
            </InfoBlock>

            <div
              className="w-full"
              style={{ height: '1px', backgroundColor: 'rgba(244,161,29,0.2)' }}
            />

            <InfoBlock emoji="📞" label="Phone">
              <a
                href="tel:01173291293"
                className="transition-colors duration-200 hover:text-gold"
                style={{ color: 'rgba(253,248,238,0.82)' }}
              >
                0117 329 1293
              </a>
            </InfoBlock>

            <InfoBlock emoji="📸" label="Instagram">
              <a
                href="https://instagram.com/pablobarber1"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{
                  color: 'rgba(253,248,238,0.82)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                @pablobarber1
              </a>
            </InfoBlock>

            {/* WhatsApp CTA */}
            <div className="mt-2">
              <motion.a
                href="https://wa.me/447531329600"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display tracking-[0.18em] uppercase cursor-pointer select-none"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-black)',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
                  padding: 'clamp(14px, 2vw, 18px) clamp(28px, 4vw, 44px)',
                  display: 'inline-flex',
                }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.96 }}
              >
                {/* WhatsApp icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book Now via WhatsApp
              </motion.a>
            </div>

          </motion.div>

          {/* ── Right: map ────────────────────────────────────────── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="w-full min-h-[350px] lg:min-h-0"
            style={{ border: '2px solid var(--color-gold)', borderRadius: '2px', overflow: 'hidden' }}
          >
            <iframe
              src="https://maps.google.com/maps?q=126+Stapleton+Rd,+Bristol+BS5+0PS&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pablo's Barbers location on Google Maps"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
