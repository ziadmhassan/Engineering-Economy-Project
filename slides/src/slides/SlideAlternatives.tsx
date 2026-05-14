import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer } from '../components/Chrome';
import { ALTERNATIVES, fmtUSD } from '../data/model';

const SUMMARY = [
  {
    title: 'Pros',
    items: {
      manual: ['Zero capital outlay', 'Familiar workflow', 'No technology risk'],
      saas: ['Predictable monthly cost', 'No initial investment, no IT burden', 'Vendor SLA & support'],
      inhouse: ['Owned, depreciable asset', 'Lowest long-run cost', 'Full data sovereignty'],
    },
  },
  {
    title: 'Cons',
    items: {
      manual: ['Highest recurring cost', 'Human error & blind spots', 'Accident liability'],
      saas: ['Vendor lock-in', 'No asset on books', 'Higher 5-yr total'],
      inhouse: ['Large up-front initial investment', 'Internal maintenance burden', 'Tech obsolescence risk'],
    },
  },
];

export const SlideAlternatives = () => (
  <>
    <Blueprint />
    <SlideHeader
      index="04"
      eyebrow="THE THREE ALTERNATIVES"
      title="Three paths."
      highlight="One decision."
    />

    <div
      style={{
        position: 'absolute',
        top: 320,
        left: 96,
        right: 96,
        height: 560,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        alignItems: 'stretch',
      }}
    >
      {ALTERNATIVES.map((a, i) => (
        <motion.div
          key={a.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
          style={{
            position: 'relative',
            padding: '32px 32px 28px',
            borderRadius: 8,
            background:
              'linear-gradient(180deg, rgba(18, 35, 64, 0.85) 0%, rgba(10, 20, 36, 0.95) 100%)',
            border: `1px solid var(--line-2)`,
            borderTop: `4px solid ${a.color}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="mono" style={{ color: a.color, fontSize: 13, letterSpacing: 3, marginBottom: 6 }}>
            {a.short.toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 44,
              color: 'var(--paper)',
              lineHeight: 1,
              letterSpacing: -1.5,
              marginBottom: 22,
            }}
          >
            {a.name}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <Box
              label="INITIAL INVESTMENT"
              value={a.initial === 0 ? '—' : fmtUSD(a.initial)}
              accent={a.color}
            />
            <Box label="ANNUAL COST" value={fmtUSD(a.annualCost)} accent={a.color} />
          </div>

          <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {SUMMARY.map((sec) => (
              <div key={sec.title} style={{ flex: '1 1 auto' }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: 3,
                    color:
                      sec.title === 'Pros' ? 'var(--green)' : 'var(--red)',
                    marginBottom: 8,
                  }}
                >
                  {sec.title.toUpperCase()}
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(sec.items as any)[a.id].map((it: string, j: number) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 17,
                        lineHeight: 1.5,
                        paddingLeft: 18,
                        position: 'relative',
                        color: 'rgba(245, 239, 224, 0.9)',
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: sec.title === 'Pros' ? 'var(--green)' : 'var(--red)',
                        }}
                      >
                        {sec.title === 'Pros' ? '+' : '−'}
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
    <Footer note="04 · ALTERNATIVES" />
  </>
);

const Box = ({ label, value, accent }: { label: string; value: string; accent: string }) => (
  <div
    style={{
      padding: '12px 14px',
      background: 'rgba(10, 20, 36, 0.7)',
      border: '1px solid var(--line)',
      borderRadius: 4,
    }}
  >
    <div
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: 2,
        color: 'rgba(245,239,224,0.5)',
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 24,
        fontWeight: 700,
        color: accent,
      }}
    >
      {value}
    </div>
  </div>
);
