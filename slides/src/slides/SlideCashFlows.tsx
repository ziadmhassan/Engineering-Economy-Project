import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer, Panel } from '../components/Chrome';
import { LineChart } from '../components/Charts';
import { ALTERNATIVES, cashFlowSeries, cumulative, fmtUSD } from '../data/model';

export const SlideCashFlows = () => {
  const series = ALTERNATIVES.map((a) => ({
    label: a.short,
    color: a.color,
    values: cumulative(cashFlowSeries(a)),
  }));

  return (
    <>
      <Blueprint />
      <SlideHeader
        index="08"
        eyebrow="HEAD TO HEAD"
        title="Cumulative outflows,"
        highlight="five years out."
      />

      <div style={{ position: 'absolute', top: 320, left: 96, right: 96 }}>
        <Panel title="Cumulative Cash Flow Comparison" tag="USD · 5-YR · MARR 15%" delay={0.3}>
          <LineChart
            width={1700}
            height={520}
            series={series}
            xLabels={['Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5']}
            yFormat={(v) => fmtUSD(v)}
            delay={0.5}
          />
        </Panel>
      </div>

      {/* Key insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        style={{
          position: 'absolute',
          bottom: 130,
          left: 96,
          right: 96,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        <Insight
          eyebrow="OBSERVATION 01"
          color="var(--red)"
          title="Manual is a straight slide down."
          body="No initial investment, but the steepest annual burn — labor + accident exposure compounds."
        />
        <Insight
          eyebrow="OBSERVATION 02"
          color="var(--blue)"
          title="SaaS is a gentler slope."
          body="No asset on the books — paying for someone else's infrastructure forever."
        />
        <Insight
          eyebrow="OBSERVATION 03"
          color="var(--green)"
          title="In-house dips, then plateaus."
          body="Heavy Y0 spend, then the curve flattens. By Y2 it's already cheapest."
        />
      </motion.div>

      <Footer note="08 · COMPARATIVE CASH FLOW" />
    </>
  );
};

const Insight = ({
  eyebrow,
  color,
  title,
  body,
}: {
  eyebrow: string;
  color: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      padding: '18px 22px',
      background: 'rgba(10, 20, 36, 0.6)',
      borderLeft: `3px solid ${color}`,
      borderRadius: 2,
    }}
  >
    <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color, marginBottom: 6 }}>
      {eyebrow}
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 15, color: 'rgba(245,239,224,0.75)', lineHeight: 1.4 }}>{body}</div>
  </div>
);
