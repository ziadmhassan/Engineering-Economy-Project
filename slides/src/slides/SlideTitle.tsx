import { motion } from 'framer-motion';
import { Blueprint } from '../components/Chrome';
import { TEAM } from '../data/model';
import { Typewriter } from '../components/Counter';

export const SlideTitle = () => (
  <>
    <Blueprint />

    {/* drafting cross-marks */}
    <Cross x={96} y={96} />
    <Cross x={1824} y={96} />
    <Cross x={96} y={984} />
    <Cross x={1824} y={984} />

    <div
      style={{
        position: 'absolute',
        top: 110,
        left: 96,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <span className="eyebrow">ENGR 3222 · Engineering Economy · Spring 2026</span>
      <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        ● LIVE
      </span>
    </div>

    <div style={{ position: 'absolute', top: 200, left: 96, right: 96 }}>
      <div className="eyebrow" style={{ color: 'rgba(245, 239, 224, 0.5)', marginBottom: 24 }}>
        Final Project Presentation
      </div>
      <motion.h1
        className="h1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontSize: 132, maxWidth: 1700 }}
      >
        Economic Analysis of
        <br />
        <em>Autonomous Site Monitoring</em>
        <br />
        for High-Rise Construction
      </motion.h1>
    </div>

    {/* Team strip */}
    <div
      style={{
        position: 'absolute',
        bottom: 200,
        left: 96,
        right: 96,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 32,
      }}
    >
      {TEAM.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
          style={{
            padding: '20px 24px',
            borderLeft: '3px solid var(--amber)',
            background: 'rgba(245, 165, 36, 0.05)',
          }}
        >
          <div
            className="mono"
            style={{ color: 'var(--amber)', fontSize: 12, letterSpacing: 3, marginBottom: 6 }}
          >
            ID {m.id}
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>{m.name}</div>
          <div style={{ fontSize: 15, color: 'rgba(245, 239, 224, 0.65)', letterSpacing: 1 }}>
            {m.dept}
          </div>
        </motion.div>
      ))}
    </div>

    <div style={{ position: 'absolute', bottom: 110, left: 96 }}>
      <Typewriter
        text="> initializing economic model · MARR=15% · n=5 yr · cur=USD"
        delay={1.0}
        cps={32}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 18,
          color: 'var(--green)',
          letterSpacing: 1.5,
        }}
      />
    </div>
  </>
);

const Cross = ({ x, y }: { x: number; y: number }) => (
  <svg
    style={{ position: 'absolute', left: x - 12, top: y - 12, width: 24, height: 24 }}
    viewBox="0 0 24 24"
  >
    <line x1="12" y1="0" x2="12" y2="24" stroke="var(--amber)" strokeWidth="1" />
    <line x1="0" y1="12" x2="24" y2="12" stroke="var(--amber)" strokeWidth="1" />
    <circle cx="12" cy="12" r="3" fill="none" stroke="var(--amber)" strokeWidth="1" />
  </svg>
);
