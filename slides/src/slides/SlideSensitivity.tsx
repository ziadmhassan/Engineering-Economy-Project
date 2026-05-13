import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer, Panel } from '../components/Chrome';
import { TornadoChart } from '../components/Charts';
import { SENSITIVITY, metricsOf, ALTERNATIVES, fmtUSD } from '../data/model';

export const SlideSensitivity = () => {
  const baseline = metricsOf(ALTERNATIVES[2]).pw;

  return (
    <>
      <Blueprint />
      <SlideHeader
        index="10"
        eyebrow="SENSITIVITY ANALYSIS"
        title="How fragile"
        highlight="is the recommendation?"
      />

      <div
        className="mono"
        style={{
          position: 'absolute',
          top: 280,
          left: 96,
          color: 'rgba(245,239,224,0.55)',
          letterSpacing: 3,
          fontSize: 13,
        }}
      >
        Each driver perturbed independently · all values are Alt 3 PW @ MARR 15%
      </div>

      <div style={{ position: 'absolute', top: 330, left: 96, right: 96 }}>
        <Panel
          title="Tornado · Δ in Present Worth"
          tag="Alt 3 — In-House Capital"
          delay={0.3}
        >
          <TornadoChart
            width={1700}
            height={420}
            data={SENSITIVITY}
            baseline={baseline}
            format={(v) => fmtUSD(v)}
            delay={0.5}
          />
        </Panel>
      </div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: 130,
          left: 96,
          right: 96,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 28,
        }}
      >
        <div
          style={{
            padding: '20px 26px',
            background: 'rgba(25, 195, 125, 0.08)',
            borderLeft: '4px solid var(--green)',
          }}
        >
          <div className="mono" style={{ color: 'var(--green)', fontSize: 12, letterSpacing: 4, marginBottom: 6 }}>
            ROBUSTNESS
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.35 }}>
            Even with <span style={{ color: 'var(--red)' }}>+20% initial investment</span> or{' '}
            <span style={{ color: 'var(--red)' }}>+20% annual cost</span>, Alt 3 still beats Alt 1.
            Recommendation holds.
          </div>
        </div>
        <div
          style={{
            padding: '20px 26px',
            background: 'rgba(245, 165, 36, 0.06)',
            borderLeft: '4px solid var(--amber)',
          }}
        >
          <div className="mono" style={{ color: 'var(--amber)', fontSize: 12, letterSpacing: 4, marginBottom: 6 }}>
            WATCH POINTS
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.35 }}>
            Annual cost is the dominant driver. Lock-in maintenance contracts at fixed rates
            to keep the curve flat.
          </div>
        </div>
      </motion.div>

      <Footer note="10 · SENSITIVITY" />
    </>
  );
};
