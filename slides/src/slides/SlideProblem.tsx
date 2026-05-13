import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer } from '../components/Chrome';
import { AnimatedNumber } from '../components/Counter';

const STATS = [
  {
    label: 'of U.S. occupational fatalities are in construction',
    value: 21,
    suffix: '%',
    note: 'BLS Census of Fatal Occupational Injuries 2022',
    accent: 'var(--red)',
  },
  {
    label: 'U.S. construction worker deaths in 2022',
    value: 1069,
    suffix: '',
    note: 'BLS CFOI · #1 industry for fatal injuries',
    accent: 'var(--red)',
  },
  {
    label: 'of contract value lost to rework on average',
    value: 5,
    suffix: '%',
    note: 'CII RT-153 · ~10–20% preventable with monitoring',
    accent: 'var(--amber)',
  },
  {
    label: 'avg. cost of one disabling site injury',
    value: 50,
    prefix: '$',
    suffix: 'k',
    note: 'Liberty Mutual Workplace Safety Index 2024',
    accent: 'var(--red)',
  },
];

export const SlideProblem = () => (
  <>
    <Blueprint />
    <SlideHeader
      index="02"
      eyebrow="THE PROBLEM"
      title="Manual supervision is"
      highlight="expensive — and unsafe."
    />

    <div
      style={{
        position: 'absolute',
        top: 320,
        left: 96,
        right: 96,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
      }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
          style={{
            padding: '32px 28px',
            background: 'linear-gradient(180deg, var(--panel) 0%, var(--bg-2) 100%)',
            border: '1px solid var(--line-2)',
            borderTop: `3px solid ${s.accent}`,
            borderRadius: 6,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="h1"
            style={{
              fontSize: 110,
              color: s.accent,
              lineHeight: 0.95,
              letterSpacing: -3,
              textShadow: `0 0 30px ${s.accent}55`,
            }}
          >
            <AnimatedNumber
              to={s.value}
              prefix={s.prefix || ''}
              suffix={s.suffix || ''}
              duration={1.6}
              delay={0.5 + i * 0.12}
            />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>
              {s.label}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                color: 'rgba(245, 239, 224, 0.5)',
                letterSpacing: 1.5,
              }}
            >
              {s.note}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Thesis */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      style={{
        position: 'absolute',
        bottom: 130,
        left: 96,
        right: 96,
        padding: '20px 28px',
        background: 'rgba(245, 165, 36, 0.06)',
        borderLeft: '4px solid var(--amber)',
      }}
    >
      <div className="mono" style={{ fontSize: 13, color: 'var(--amber)', letterSpacing: 4, marginBottom: 8 }}>
        THESIS
      </div>
      <div className="h3" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>
        Can edge-AI cameras and IoT sensors{' '}
        <span style={{ color: 'var(--green)' }}>justify their initial investment</span> against{' '}
        recurring labor, accident, and rework losses{' '}
        <span style={{ color: 'rgba(245,239,224,0.6)' }}>— at MARR = 15% over 5 years?</span>
      </div>
    </motion.div>
    <Footer note="02 · DIAGNOSIS" />
  </>
);
