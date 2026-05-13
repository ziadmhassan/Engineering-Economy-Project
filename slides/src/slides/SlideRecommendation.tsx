import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer } from '../components/Chrome';
import { AnimatedNumber } from '../components/Counter';
import { INCREMENTAL, fmtUSD, metricsOf, ALTERNATIVES, MARR } from '../data/model';

export const SlideRecommendation = () => {
  const alt3 = ALTERNATIVES[2];
  const alt3Pw = metricsOf(alt3).pw;
  const alt1Pw = metricsOf(ALTERNATIVES[0]).pw;
  const savings = alt3Pw - alt1Pw; // less negative → savings vs Alt 1

  return (
    <>
      <Blueprint />
      <SlideHeader
        index="11"
        eyebrow="RECOMMENDATION"
        title="Adopt"
        highlight="Alternative 3."
      />

      {/* Big stamp */}
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          top: 230,
          right: 96,
          padding: '14px 36px',
          border: '4px solid var(--green)',
          color: 'var(--green)',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 56,
          letterSpacing: 4,
          textShadow: '0 0 30px rgba(25,195,125,0.5)',
          background: 'rgba(25, 195, 125, 0.08)',
        }}
      >
        ✓ APPROVED
      </motion.div>

      {/* Recommendation copy */}
      <div style={{ position: 'absolute', top: 330, left: 96, width: 980 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            marginBottom: 28,
          }}
        >
          Invest in the{' '}
          <span style={{ color: 'var(--green)' }}>in-house edge-AI monitoring system</span>{' '}
          for high-rise construction sites.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: 22,
            color: 'rgba(245,239,224,0.78)',
            lineHeight: 1.55,
          }}
        >
          The incremental investment vs. the manual baseline delivers an IRR of{' '}
          <strong style={{ color: 'var(--amber)' }}>{(INCREMENTAL.irr * 100).toFixed(1)}%</strong>{' '}
          — more than{' '}
          <strong>{(INCREMENTAL.irr / MARR).toFixed(1)}× the MARR</strong> — and a B/C ratio of{' '}
          <strong style={{ color: 'var(--gold)' }}>{INCREMENTAL.bcRatio.toFixed(2)}</strong>.
          PW, AW, and FW all agree. The conclusion holds under ±20% perturbation of initial
          investment and annual cost.
        </motion.div>
      </div>

      {/* KPI strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          left: 96,
          right: 96,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        <Kpi label="5-YR PW SAVINGS" value={Math.abs(savings)} color="var(--green)" delay={1.0} />
        <Kpi label="IRR" value={INCREMENTAL.irr * 100} suffix="%" format={(v) => v.toFixed(1)} color="var(--blue)" delay={1.2} />
        <Kpi label="B / C" value={INCREMENTAL.bcRatio} format={(v) => v.toFixed(2)} color="var(--gold)" delay={1.4} />
      </div>

      <Footer note="11 · DECISION" />
    </>
  );
};

const Kpi = ({
  label,
  value,
  prefix,
  suffix,
  color,
  format,
  delay,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
  format?: (v: number) => string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    style={{
      padding: '20px 24px',
      background: 'rgba(10, 20, 36, 0.7)',
      borderLeft: `3px solid ${color}`,
      borderRadius: 4,
    }}
  >
    <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(245,239,224,0.55)', marginBottom: 8 }}>
      {label}
    </div>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 42,
        fontWeight: 800,
        color,
        textShadow: `0 0 24px ${color}66`,
      }}
    >
      <AnimatedNumber
        to={value}
        delay={delay + 0.1}
        duration={1.4}
        format={(v) => `${prefix || ''}${format ? format(v) : fmtUSD(v)}${suffix || ''}`}
      />
    </div>
  </motion.div>
);
