import { motion } from 'framer-motion';
import { Blueprint, SlideHeader, Footer, Panel } from '../components/Chrome';
import { AnimatedNumber } from '../components/Counter';
import { INCREMENTAL, MARR, fmtUSD, pct } from '../data/model';

export const SlideIncremental = () => {
  const { simplePayback, irr, bcRatio, deltaCapex, annualSavings, pwBenefits } = INCREMENTAL;

  return (
    <>
      <Blueprint />
      <SlideHeader
        index="09"
        eyebrow="INCREMENTAL ANALYSIS · ALT 3 vs ALT 1"
        title="Payback. IRR."
        highlight="Benefit / Cost."
      />

      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 96,
          right: 96,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }}
      >
        <BigStat
          eyebrow="01 · PAYBACK PERIOD"
          value={simplePayback}
          format={(v) => v.toFixed(2)}
          unit=" yrs"
          color="var(--green)"
          delay={0.4}
          verdict={`Capital recovered in under ${Math.ceil(simplePayback * 12)} months.`}
          formula="Payback = Δ Initial Investment ÷ Annual Savings"
        />
        <BigStat
          eyebrow="02 · INTERNAL RATE OF RETURN"
          value={irr * 100}
          format={(v) => v.toFixed(1)}
          unit="%"
          color="var(--amber)"
          delay={0.55}
          verdict={`IRR ≫ MARR (${(MARR * 100).toFixed(0)}%) — accept the investment.`}
          formula="NPV(IRR) = 0"
        />
        <BigStat
          eyebrow="03 · BENEFIT / COST RATIO"
          value={bcRatio}
          format={(v) => v.toFixed(2)}
          unit=""
          color="var(--blue)"
          delay={0.7}
          verdict={`B/C > 1 → benefits outweigh costs by ${pct(bcRatio - 1, 0)}.`}
          formula="B/C = PW(Benefits) ÷ PW(Costs)"
        />
      </div>

      {/* Working numbers panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 130,
          left: 96,
          right: 96,
          padding: '22px 28px',
          background: 'rgba(10, 20, 36, 0.7)',
          border: '1px solid var(--line-2)',
          borderRadius: 6,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
        }}
      >
        <Working label="Δ Initial Capital" value={fmtUSD(deltaCapex)} />
        <Working label="Annual Savings" value={`${fmtUSD(annualSavings)} / yr`} />
        <Working label="PW of Benefits" value={fmtUSD(pwBenefits)} />
        <Working label="Decision Rule" value="IRR > 15% MARR" highlight />
      </motion.div>

      <Footer note="09 · PAYBACK · IRR · B/C" />
    </>
  );
};

const BigStat = ({
  eyebrow,
  value,
  format,
  unit,
  color,
  verdict,
  formula,
  delay,
}: {
  eyebrow: string;
  value: number;
  format: (v: number) => string;
  unit: string;
  color: string;
  verdict: string;
  formula: string;
  delay: number;
}) => (
  <Panel style={{ padding: '32px 32px 28px', minHeight: 380 }} delay={delay}>
    <div
      className="mono"
      style={{ fontSize: 12, letterSpacing: 3, color, marginBottom: 14 }}
    >
      {eyebrow}
    </div>
    <div
      className="h1"
      style={{
        fontSize: 132,
        color,
        lineHeight: 1,
        letterSpacing: -3,
        textShadow: `0 0 32px ${color}66`,
        marginBottom: 6,
        display: 'flex',
        alignItems: 'baseline',
      }}
    >
      <AnimatedNumber to={value} duration={1.6} delay={delay + 0.2} format={(v) => format(v)} />
      <span style={{ fontSize: 56, marginLeft: 6 }}>{unit}</span>
    </div>
    <div
      className="mono"
      style={{
        fontSize: 12,
        letterSpacing: 1.5,
        color: 'rgba(245,239,224,0.5)',
        marginBottom: 18,
      }}
    >
      {formula}
    </div>
    <div style={{ fontSize: 17, lineHeight: 1.4, color: 'rgba(245,239,224,0.9)' }}>
      {verdict}
    </div>
  </Panel>
);

const Working = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div>
    <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(245,239,224,0.5)', marginBottom: 6 }}>
      {label.toUpperCase()}
    </div>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 22,
        fontWeight: 700,
        color: highlight ? 'var(--green)' : 'var(--paper)',
      }}
    >
      {value}
    </div>
  </div>
);
