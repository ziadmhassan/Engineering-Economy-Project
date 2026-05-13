// ENGR 3222 — Engineering Economy · Spring 2026 · Term Project
// Project: Economic Analysis of Autonomous Site Monitoring Systems
// Currency: USD · MARR: 15% (per syllabus rule for USD revenues)
// Market: United States (mid-size U.S. metro contractor)
// Horizon: 5 years
//
// Numbers mirror the canonical financial model at:
//   /Users/bavlyremon/Projects/engeco/financial-model/inputs.py
// Edit there to keep the Excel and slides in lockstep.

export const MARR = 0.15;
export const N = 5;
export const CURRENCY = 'USD';

// ─── Factor tables ──────────────────────────────────────────────────────────
export const PA = (i: number, n: number) => ((1 + i) ** n - 1) / (i * (1 + i) ** n);
export const PF = (i: number, n: number) => 1 / (1 + i) ** n;
export const AP = (i: number, n: number) => (i * (1 + i) ** n) / ((1 + i) ** n - 1);

// ─── Cash flow assumptions (USD, US market) ─────────────────────────────────
// Anchored to: 20-story Class-A commercial high-rise, $50M total project value,
// ~$10M active construction value/year. Sources (see financial-model/sources.md):
// BLS OES May 2024, Liberty Mutual WSI 2024, CII RT-153, Procore/OpenSpace/Buildots
// pricing, Skydio/NVIDIA Jetson/Axis camera vendor pricing, AWS Pricing Calculator.

export type Alternative = {
  id: 'manual' | 'saas' | 'inhouse';
  name: string;
  short: string;
  color: string;
  initial: number;
  annualCost: number;
  salvage: number;
  costBreakdown: { item: string; amount: number; note?: string }[];
  initialBreakdown: { item: string; amount: number; note?: string }[];
};

export const ALTERNATIVES: Alternative[] = [
  {
    id: 'manual',
    name: 'Manual Baseline',
    short: 'Alt 1 · Status Quo',
    color: 'var(--red)',
    initial: 10_000,
    annualCost: 555_000,
    salvage: 0,
    initialBreakdown: [
      { item: 'Site safety office, tablets, basic kit', amount: 10_000, note: 'one-time fitout' },
    ],
    costBreakdown: [
      { item: '3× Safety/Quality Supervisors (loaded)', amount: 390_000, note: 'BLS OES 2024 · loaded ≈ $130k each' },
      { item: 'Accident-related cost (1.5 × $50k)', amount: 75_000, note: 'Liberty Mutual WSI 2024' },
      { item: 'Preventable rework (0.5% × $10M)', amount: 50_000, note: 'CII RT-153' },
      { item: 'Schedule-slip penalties', amount: 40_000, note: 'AGC Outlook 2024' },
    ],
  },
  {
    id: 'saas',
    name: 'SaaS Lease',
    short: 'Alt 2 · Rent',
    color: 'var(--blue)',
    initial: 25_000,
    annualCost: 376_000,
    salvage: 0,
    initialBreakdown: [
      { item: 'Setup, training, integration', amount: 25_000, note: 'one-time onboarding' },
    ],
    costBreakdown: [
      { item: 'SaaS subscription (Procore + OpenSpace)', amount: 180_000, note: '$15k/mo bundled' },
      { item: 'Hardware lease (cameras + sensors)', amount: 36_000, note: '$3k/mo HW lease' },
      { item: '1× Oversight Supervisor', amount: 130_000, note: 'reduced field staff' },
      { item: 'Residual accident cost (0.4 × $50k)', amount: 20_000, note: 'Buildots reduction' },
      { item: 'Residual rework (0.1% × $10M)', amount: 10_000, note: 'CII RT-153' },
    ],
  },
  {
    id: 'inhouse',
    name: 'In-House Capital',
    short: 'Alt 3 · Buy/Build',
    color: 'var(--green)',
    initial: 380_000,
    annualCost: 225_000,
    salvage: 80_000,
    initialBreakdown: [
      { item: '30× Edge-AI IP cameras (Axis + Jetson)', amount: 60_000, note: '30 × $2,000' },
      { item: '80× IoT sensors', amount: 20_000, note: '80 × $250' },
      { item: '2× Edge compute servers (Jetson Orin AGX)', amount: 30_000 },
      { item: 'Networking, cabling, installation', amount: 40_000 },
      { item: 'Custom software dev (2× eng × 6 mo)', amount: 180_000, note: 'in-house ML/data' },
      { item: 'PM, training, 10% contingency', amount: 50_000 },
    ],
    costBreakdown: [
      { item: '1× ML/IT engineer (loaded)', amount: 145_000, note: 'Glassdoor 2024' },
      { item: 'AWS cloud + DB + licensing', amount: 30_000, note: '$2.5k/mo' },
      { item: 'Hardware maintenance & replacement', amount: 25_000, note: '~7% of HW initial cost' },
      { item: 'Residual accident cost (0.3 × $50k)', amount: 15_000, note: 'Buildots reduction' },
      { item: 'Residual rework (0.1% × $10M)', amount: 10_000, note: 'CII RT-153' },
    ],
  },
];

// ─── Derived metrics ────────────────────────────────────────────────────────
export type Metrics = {
  pw: number;
  aw: number;
  fw: number;
};

export const metricsOf = (a: Alternative, i = MARR, n = N): Metrics => {
  const pw = -(a.initial + a.annualCost * PA(i, n)) + a.salvage * PF(i, n);
  const aw = pw * AP(i, n);
  const fw = pw * (1 + i) ** n;
  return { pw, aw, fw };
};

export const cashFlowSeries = (a: Alternative): number[] => {
  const arr: number[] = [-a.initial];
  for (let t = 1; t <= N; t++) {
    const last = t === N ? -a.annualCost + a.salvage : -a.annualCost;
    arr.push(last);
  }
  return arr;
};

export const cumulative = (cf: number[]): number[] => {
  const out: number[] = [];
  let s = 0;
  for (const v of cf) {
    s += v;
    out.push(s);
  }
  return out;
};

// ─── Incremental analysis: Alt 3 vs Alt 1 ───────────────────────────────────
export const INCREMENTAL = (() => {
  const a1 = ALTERNATIVES[0];
  const a3 = ALTERNATIVES[2];
  const deltaCapex = a3.initial - a1.initial;
  const annualSavings = a1.annualCost - a3.annualCost;
  const salvage = a3.salvage;
  const pwBenefits = annualSavings * PA(MARR, N) + salvage * PF(MARR, N);
  const pwCosts = deltaCapex;
  const bcRatio = pwBenefits / pwCosts;
  const simplePayback = deltaCapex / annualSavings;

  const npvAt = (i: number) =>
    -deltaCapex + annualSavings * PA(i, N) + salvage * PF(i, N);
  let lo = 0.01;
  let hi = 10;
  for (let k = 0; k < 100; k++) {
    const m = (lo + hi) / 2;
    npvAt(m) > 0 ? (lo = m) : (hi = m);
  }
  const irr = (lo + hi) / 2;

  return { deltaCapex, annualSavings, salvage, pwBenefits, pwCosts, bcRatio, simplePayback, irr };
})();

// ─── Sensitivity bands (evaluated on Alt 3 PW) ──────────────────────────────
type SensRow = { driver: string; low: number; high: number; baseline: number };

export const SENSITIVITY: SensRow[] = (() => {
  const a3 = ALTERNATIVES[2];
  const base = metricsOf(a3).pw;

  const flex = (mut: (alt: Alternative) => Alternative) => {
    const modified = mut({ ...a3 });
    return metricsOf(modified).pw;
  };

  return [
    {
      driver: 'Initial Investment ±20%',
      baseline: base,
      low: flex((x) => ({ ...x, initial: a3.initial * 0.8 })),
      high: flex((x) => ({ ...x, initial: a3.initial * 1.2 })),
    },
    {
      driver: 'Annual Cost ±20%',
      baseline: base,
      low: flex((x) => ({ ...x, annualCost: a3.annualCost * 0.8 })),
      high: flex((x) => ({ ...x, annualCost: a3.annualCost * 1.2 })),
    },
    {
      driver: 'MARR ±5 pp',
      baseline: base,
      low: -(a3.initial + a3.annualCost * PA(0.10, N)) + a3.salvage * PF(0.10, N),
      high: -(a3.initial + a3.annualCost * PA(0.20, N)) + a3.salvage * PF(0.20, N),
    },
    {
      driver: 'Salvage ±50%',
      baseline: base,
      low: flex((x) => ({ ...x, salvage: a3.salvage * 0.5 })),
      high: flex((x) => ({ ...x, salvage: a3.salvage * 1.5 })),
    },
  ];
})();

// ─── Format helpers ─────────────────────────────────────────────────────────
export const fmtUSD = (v: number, decimals = 0): string => {
  const abs = Math.abs(v);
  const sign = v < 0 ? '−' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(decimals + 1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}k`;
  return `${sign}$${abs.toFixed(0)}`;
};

export const fmtFull = (v: number): string => {
  const sign = v < 0 ? '−' : '';
  return `${sign}$${Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

export const pct = (v: number, decimals = 1): string => `${(v * 100).toFixed(decimals)}%`;

export const TEAM = [
  { name: 'Ziad Hassan', id: '900213728', dept: 'Computer Engineering' },
  { name: 'Ahmed Anton', id: '900253324', dept: 'Construction Engineering' },
];
