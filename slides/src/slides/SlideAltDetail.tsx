import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer, Panel } from '../components/Chrome';
import { AnimatedNumber } from '../components/Counter';
import { Alternative, metricsOf, cashFlowSeries, cumulative, fmtUSD, fmtFull, MARR } from '../data/model';
import { LineChart } from '../components/Charts';

export const SlideAltDetail = ({ alt, index }: { alt: Alternative; index: number }) => {
  const m = metricsOf(alt);
  const cf = cashFlowSeries(alt);
  const cum = cumulative(cf);
  const num = (5 + index).toString().padStart(2, '0'); // 05, 06, 07

  return (
    <>
      <Blueprint />
      <SlideHeader
        index={num}
        eyebrow={`${alt.short.toUpperCase()} · DETAIL`}
        title={alt.name}
      />

      {/* Top-right summary box */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: 80,
          right: 96,
          padding: '20px 28px',
          background: 'rgba(10, 20, 36, 0.85)',
          border: `1px solid ${alt.color}`,
          borderRadius: 6,
          minWidth: 360,
          textAlign: 'right',
        }}
      >
        <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(245,239,224,0.55)' }}>
          PRESENT WORTH @ MARR 15%
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 48,
            fontWeight: 800,
            color: alt.color,
            marginTop: 4,
            textShadow: `0 0 24px ${alt.color}55`,
          }}
        >
          <AnimatedNumber
            to={m.pw}
            duration={1.4}
            delay={0.6}
            format={(v) => fmtUSD(v)}
          />
        </div>
      </motion.div>

      {/* 3-COLUMN LAYOUT */}
      <div style={{ position: 'absolute', top: 320, left: 96, right: 96, height: 576, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        
        <Panel title="Initial Investment (Y0)" delay={0.3} style={{ padding: '24px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: '1 1 auto' }}>
            <ItemTable items={alt.initialBreakdown} accent={alt.color} />
          </div>
          <div style={{ flex: '0 0 auto', marginTop: 16 }}>
            <Total label="TOTAL" value={alt.initial} accent={alt.color} />
          </div>
        </Panel>

        <Panel title="Annual Cost (Y1–5)" delay={0.5} style={{ padding: '24px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: '1 1 auto' }}>
            <ItemTable items={alt.costBreakdown} accent={alt.color} />
          </div>
          <div style={{ flex: '0 0 auto', marginTop: 16 }}>
            <Total label="TOTAL" value={alt.annualCost} accent={alt.color} />
            {alt.salvage > 0 && (
              <Total label="Y5 SALVAGE" value={-alt.salvage} accent="var(--green)" />
            )}
          </div>
        </Panel>

        <Panel title="Cumulative Cash Flow" tag="USD" delay={0.7} style={{ padding: '24px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: '1 1 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <LineChart
                width={500}
                height={420}
                series={[
                  { label: alt.short, color: alt.color, values: cum },
                ]}
                xLabels={['Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5']}
                yFormat={(v) => fmtUSD(v)}
                delay={0.9}
              />
            </div>
          </div>
        </Panel>

      </div>

      <Footer note={`${num} · ${alt.short.toUpperCase()}`} />
    </>
  );
};

const ItemTable = ({
  items,
  accent,
}: {
  items: { item: string; amount: number; note?: string }[];
  accent: string;
}) => (
  <div>
    {items.map((it, i) => (
      <div
        key={i}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid rgba(245,239,224,0.07)',
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{it.item}</div>
          {it.note && (
            <div
              className="mono"
              style={{ fontSize: 12, color: 'rgba(245,239,224,0.5)', letterSpacing: 1, marginTop: 4 }}
            >
              {it.note}
            </div>
          )}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 22,
            fontWeight: 700,
            color: accent,
          }}
        >
          {it.amount === 0 ? '—' : fmtFull(it.amount)}
        </div>
      </div>
    ))}
  </div>
);

const Total = ({
  label,
  value,
  accent,
  suffix,
}: {
  label: string;
  value: number;
  accent: string;
  suffix?: string;
}) => (
  <div
    style={{
      marginTop: 8,
      paddingTop: 8,
      borderTop: `1px solid ${accent}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    }}
  >
    <span className="mono" style={{ fontSize: 14, letterSpacing: 3, color: 'rgba(245,239,224,0.6)' }}>
      {label}
    </span>
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 26,
        fontWeight: 800,
        color: accent,
      }}
    >
      {fmtFull(Math.abs(value))} {suffix && <span style={{ fontSize: 14 }}>{suffix}</span>}
    </span>
  </div>
);
