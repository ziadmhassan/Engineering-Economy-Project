import { motion } from 'framer-motion';
import { Blueprint } from '../components/Chrome';
import { TEAM } from '../data/model';

export const SlideThanks = () => (
  <>
    <Blueprint />

    {/* huge typography */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.5em' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="eyebrow"
        style={{ marginBottom: 36, fontSize: 18 }}
      >
        ◆ END OF PRESENTATION · 7:00 ◆
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h1"
        style={{ fontSize: 240, letterSpacing: -8 }}
      >
        Q <em style={{ color: 'var(--amber)' }}>&</em> A
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{
          marginTop: 40,
          fontSize: 28,
          color: 'rgba(245,239,224,0.75)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-display)',
        }}
      >
        "Three alternatives. One verdict. We're ready for your questions."
      </motion.div>

      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 600 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, var(--amber), transparent)',
          marginTop: 60,
          boxShadow: '0 0 16px rgba(245,165,36,0.5)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          marginTop: 40,
          display: 'flex',
          gap: 64,
          fontSize: 18,
          color: 'rgba(245,239,224,0.7)',
        }}
      >
        {TEAM.map((m) => (
          <div key={m.id} style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--paper)' }}>{m.name}</div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: 2, color: 'var(--amber)', marginTop: 2 }}>
              {m.id}
            </div>
          </div>
        ))}
      </motion.div>
    </div>

    <div
      className="mono"
      style={{
        position: 'absolute',
        bottom: 90,
        left: 96,
        right: 96,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12,
        letterSpacing: 3,
        color: 'rgba(245,239,224,0.4)',
      }}
    >
      <span>ENGR 3222 · ENGINEERING ECONOMY · SPRING 2026</span>
      <span>THANK YOU.</span>
      <span>AUC · 14-MAY-2026</span>
    </div>
  </>
);
