import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer, Panel } from '../components/Chrome';
import { MARR, N } from '../data/model';

export const SlideAssumptions = () => {
  return (
    <>
      <Blueprint />
      <SlideHeader
        index="03"
        eyebrow="PROJECT CONTEXT"
        title="The Scenario"
        highlight="Mid-Size U.S. Metro Contractor"
      />

      <div style={{ position: 'absolute', top: 320, left: 96, right: 96, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: 620 }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Strategic Question */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: '48px 40px',
              background: 'linear-gradient(180deg, var(--panel) 0%, var(--bg-2) 100%)',
              border: '1px solid var(--line-2)',
              borderRadius: 8,
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                lineHeight: 1.25,
                color: 'var(--paper)',
                marginBottom: 20,
              }}
            >
              Should the contractor automate site monitoring?
            </div>
            <div
              className="mono"
              style={{
                fontSize: 14,
                letterSpacing: 2,
                color: 'rgba(245,239,224,0.6)',
                textTransform: 'uppercase',
                borderLeft: '4px solid var(--primary)',
                paddingLeft: 12,
              }}
            >
              Evaluating: Capital cost vs. recurring labor & rework savings
            </div>
          </motion.div>

          {/* Key analysis assumptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: '0 0 auto' }}
          >
            <div
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: 3,
                color: 'rgba(245,239,224,0.5)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Analysis Parameters
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <ParamBox label="MARR" value={`${MARR * 100}%`} accent="var(--amber)" />
              <ParamBox label="Currency" value="Constant USD" accent="var(--blue)" />
              <ParamBox label="Horizon" value="5 years" accent="var(--green)" />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Anchor project specs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: '0 0 auto' }}
          >
            <Panel title="Anchor: 20-Story Commercial Building" style={{ padding: '28px 32px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  rowGap: 28,
                  columnGap: 24,
                }}
              >
                <SpecRow label="Total Project Value" value="$50M" color="var(--amber)" />
                <SpecRow label="Annual Active Construction" value="$10M" color="var(--green)" />
                <SpecRow label="On-Site Headcount" value="~180 workers" color="var(--blue)" />
                <SpecRow label="Study Horizon" value={`${N} years`} color="var(--amber)" />
              </div>
            </Panel>
          </motion.div>

          {/* Industry context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
          >
            <Panel title="Why This Matters" style={{ padding: '28px 32px', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, flex: '1 1 auto' }}>
                <ImpactBox
                  icon="⚠"
                  label="Labor Scarcity"
                  detail="OHS specialists: +double-digit wage inflation since 2021"
                  color="var(--red)"
                />
                <ImpactBox
                  icon="🛡"
                  label="Safety Risk"
                  detail="Construction over-indexes on disabling injuries (Liberty Mutual 2024)"
                  color="var(--red)"
                />
                <ImpactBox
                  icon="🔧"
                  label="Preventable Rework"
                  detail="5% of contract value; 10–20% preventable with monitoring (CII)"
                  color="var(--amber)"
                />
              </div>
            </Panel>
          </motion.div>
        </div>
      </div>

      <Footer note="03 · ASSUMPTIONS" />
    </>
  );
};

const SpecRow = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div>
    <div className="mono" style={{ fontSize: 13, letterSpacing: 2, color: 'rgba(245,239,224,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color }}>
      {value}
    </div>
  </div>
);

const ImpactBox = ({
  icon,
  label,
  detail,
  color,
}: {
  icon: string;
  label: string;
  detail: string;
  color: string;
}) => (
  <div
    style={{
      padding: '24px 20px',
      background: 'rgba(245,239,224,0.03)',
      border: `1px solid ${color}33`,
      borderRadius: 4,
    }}
  >
    <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color, marginBottom: 10 }}>{label}</div>
    <div className="mono" style={{ fontSize: 13, color: 'rgba(245,239,224,0.65)', lineHeight: 1.5 }}>
      {detail}
    </div>
  </div>
);

const ParamBox = ({ label, value, accent }: { label: string; value: string; accent: string }) => (
  <div
    style={{
      padding: '24px 20px',
      background: 'rgba(245,239,224,0.03)',
      border: `1px solid ${accent}44`,
      borderRadius: 4,
      textAlign: 'center',
    }}
  >
    <div className="mono" style={{ fontSize: 13, letterSpacing: 2, color: 'rgba(245,239,224,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: accent }}>
      {value}
    </div>
  </div>
);
