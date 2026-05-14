import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer, Panel } from '../components/Chrome';
import { BarChart } from '../components/Charts';
import { AnimatedNumber } from '../components/Counter';
import { ALTERNATIVES, metricsOf, fmtUSD, MARR, N } from '../data/model';

export const SlideMeasures = () => {
  const rows = ALTERNATIVES.map((a) => ({ a, m: metricsOf(a) }));
  const best = rows.reduce((p, c) => (c.m.pw > p.m.pw ? c : p));
  const bestIdx = rows.indexOf(best);

  return (
    <>
      <Blueprint />
      <SlideHeader
        index="09"
        eyebrow="MEASURES OF WORTH"
        title="Present, Annual,"
        highlight="and Future Worth."
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
        MARR = {(MARR * 100).toFixed(0)}% · n = {N} yr · all values shown as costs (negative PW = net outflow)
      </div>

      <div style={{ position: 'absolute', top: 330, left: 96, right: 96, height: 420, display: 'flex', gap: 32 }}>
        {/* Bar chart: PW comparison */}
        <div style={{ flex: '1 1 auto', width: '60%' }}>
          <Panel title="Present Worth of Total Cost" tag="HIGHER IS BETTER" delay={0.3} style={{ height: '100%', padding: '24px 32px' }}>
            <BarChart
              width={900}
              height={300}
              data={rows.map((r) => ({
                label: r.a.short,
                value: r.m.pw,
                color: r.a.color,
              }))}
              format={(v) => fmtUSD(v)}
              delay={0.5}
              highlightIndex={bestIdx}
            />
          </Panel>
        </div>

        {/* RIGHT: PW/AW/FW table */}
        <div style={{ flex: '0 0 auto', width: 660, display: 'flex', flexDirection: 'column' }}>
          <Panel title="Worth Equivalents" tag="i = 15%" delay={0.4} style={{ height: '100%', padding: '24px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr 1fr 1fr',
                rowGap: 16,
                columnGap: 18,
                alignItems: 'center',
              }}
            >
              <Header>Alt.</Header>
              <Header right>PW</Header>
              <Header right>AW</Header>
              <Header right>FW</Header>

              {rows.map((r) => (
                <Row
                  key={r.a.id}
                  a={r.a}
                  pw={r.m.pw}
                  aw={r.m.aw}
                  fw={r.m.fw}
                  best={r.a.id === best.a.id}
                />
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Winner ribbon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          bottom: 130,
          left: 96,
          right: 96,
          padding: '24px 32px',
          background: `linear-gradient(90deg, ${best.a.color}22, transparent)`,
          borderLeft: `4px solid ${best.a.color}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div className="mono" style={{ color: best.a.color, fontSize: 13, letterSpacing: 4, marginBottom: 6 }}>
            ✓ HIGHEST (LEAST-NEGATIVE) PW
          </div>
          <div className="h3" style={{ fontSize: 36, fontWeight: 800 }}>
            {best.a.name} — by{' '}
            <span style={{ color: best.a.color }}>
              <AnimatedNumber
                to={Math.abs(best.m.pw - rows[0].m.pw)}
                duration={1.4}
                delay={1.8}
                format={(v) => fmtUSD(v)}
              />
            </span>{' '}
            over Alt 1.
          </div>
        </div>
        <div
          className="mono"
          style={{
            color: 'rgba(245,239,224,0.45)',
            fontSize: 13,
            letterSpacing: 2,
            textAlign: 'right',
          }}
        >
          PW(15%, 5) = −Initial − A·(P/A, i, n) + S·(P/F, i, n)<br />
          (P/A, 15%, 5) = 3.3522 · (P/F, 15%, 5) = 0.4972
        </div>
      </motion.div>

      <Footer note="09 · MEASURES OF WORTH" />
    </>
  );
};

const Header = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
  <div
    className="mono"
    style={{
      fontSize: 11,
      letterSpacing: 3,
      color: 'rgba(245,239,224,0.5)',
      paddingBottom: 8,
      borderBottom: '1px solid var(--line-2)',
      textAlign: right ? 'right' : 'left',
    }}
  >
    {children}
  </div>
);

const Row = ({
  a,
  pw,
  aw,
  fw,
  best,
}: {
  a: typeof ALTERNATIVES[number];
  pw: number;
  aw: number;
  fw: number;
  best: boolean;
}) => (
  <>
    <div
      style={{
        padding: '14px 0',
        borderBottom: '1px solid rgba(245,239,224,0.06)',
        color: best ? a.color : 'var(--paper)',
        fontWeight: best ? 800 : 600,
      }}
    >
      {best && '★ '}
      {a.short.replace('Alt ', 'A')}
    </div>
    <Cell value={pw} accent={a.color} best={best} />
    <Cell value={aw} accent={a.color} best={best} />
    <Cell value={fw} accent={a.color} best={best} />
  </>
);

const Cell = ({ value, accent, best }: { value: number; accent: string; best: boolean }) => (
  <div
    style={{
      padding: '14px 0',
      borderBottom: '1px solid rgba(245,239,224,0.06)',
      fontFamily: 'var(--font-mono)',
      fontSize: 18,
      fontWeight: best ? 800 : 500,
      color: best ? accent : 'rgba(245, 239, 224, 0.88)',
      textAlign: 'right',
    }}
  >
    {fmtUSD(value)}
  </div>
);
