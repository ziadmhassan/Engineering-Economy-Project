import { motion } from 'framer-motion';

// ─── Bar chart (horizontal or vertical) ─────────────────────────────────────
export const BarChart = ({
  data,
  width,
  height,
  format = (v) => v.toFixed(0),
  delay = 0,
  highlightIndex = -1,
}: {
  data: { label: string; value: number; color?: string }[];
  width: number;
  height: number;
  format?: (v: number) => string;
  delay?: number;
  highlightIndex?: number;
}) => {
  const max = Math.max(0, ...data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const range = max - min || 1;
  const padL = 240;
  const padR = 60;
  const barH = (height - 40) / data.length - 14;
  const rowH = (height - 40) / data.length;
  const zeroX = padL + ((0 - min) / range) * (width - padL - padR);

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* zero axis */}
      <line
        x1={zeroX}
        x2={zeroX}
        y1={20}
        y2={height - 20}
        stroke="rgba(245,239,224,0.3)"
        strokeDasharray="4 4"
      />
      {data.map((d, i) => {
        const y = 20 + i * rowH + (rowH - barH) / 2;
        const barW = ((Math.abs(d.value) / range) * (width - padL - padR));
        const x = d.value >= 0 ? zeroX : zeroX - barW;
        const color = d.color || 'var(--blue)';
        const isHi = i === highlightIndex;
        return (
          <g key={i}>
            <text
              x={padL - 12}
              y={y + barH / 2 + 5}
              fontFamily="var(--font-sans)"
              fontSize={18}
              fontWeight={isHi ? 800 : 600}
              fill={isHi ? 'var(--amber)' : 'rgba(245,239,224,0.9)'}
              textAnchor="end"
            >
              {d.label}
            </text>
            <motion.rect
              x={x}
              y={y}
              height={barH}
              fill={color}
              initial={{ width: 0 }}
              animate={{ width: barW }}
              transition={{ duration: 1.1, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              rx={2}
              style={{ filter: `drop-shadow(0 0 12px ${color})`, opacity: isHi ? 1 : 0.85 }}
            />
            {(() => {
              // Place value label INSIDE the bar when it fits, otherwise on the
              // outer (away-from-axis) side so it never crosses the row labels.
              const fitsInside = barW > 130;
              const labelX = d.value >= 0
                ? (fitsInside ? x + barW - 12 : x + barW + 10)
                : (fitsInside ? x + 12 : zeroX + 10);
              const labelAnchor: 'start' | 'end' =
                d.value >= 0
                  ? (fitsInside ? 'end' : 'start')
                  : (fitsInside ? 'start' : 'start');
              const labelFill = fitsInside ? '#0a1424' : color;
              return (
                <motion.text
                  x={labelX}
                  y={y + barH / 2 + 6}
                  fontFamily="var(--font-mono)"
                  fontSize={18}
                  fontWeight={800}
                  fill={labelFill}
                  textAnchor={labelAnchor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: delay + i * 0.12 + 0.8, duration: 0.4 }}
                >
                  {format(d.value)}
                </motion.text>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
};

// ─── Cumulative line chart for cash flows ───────────────────────────────────
export const LineChart = ({
  series,
  width,
  height,
  xLabels,
  yFormat = (v) => v.toFixed(0),
  delay = 0,
  showZero = true,
}: {
  series: { label: string; color: string; values: number[] }[];
  width: number;
  height: number;
  xLabels: string[];
  yFormat?: (v: number) => string;
  delay?: number;
  showZero?: boolean;
}) => {
  const all = series.flatMap((s) => s.values);
  const min = Math.min(...all, 0);
  const max = Math.max(...all, 0);
  const range = max - min;
  const padL = 90;
  const padR = 110;
  const padT = 24;
  const padB = 56;

  const n = xLabels.length;
  const xAt = (i: number) => padL + (i / (n - 1)) * (width - padL - padR);
  const yAt = (v: number) => padT + (1 - (v - min) / range) * (height - padT - padB);

  const zeroY = yAt(0);

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* horizontal gridlines */}
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line
          key={i}
          x1={padL}
          x2={width - padR}
          y1={padT + p * (height - padT - padB)}
          y2={padT + p * (height - padT - padB)}
          stroke="rgba(245,239,224,0.08)"
          strokeDasharray="3 6"
        />
      ))}
      {/* zero line */}
      {showZero && min < 0 && max > 0 && (
        <line
          x1={padL}
          x2={width - padR}
          y1={zeroY}
          y2={zeroY}
          stroke="rgba(245,239,224,0.35)"
          strokeDasharray="4 4"
        />
      )}
      {/* x-axis */}
      <line x1={padL} x2={width - padR} y1={height - padB} y2={height - padB} stroke="rgba(245,239,224,0.4)" />
      {xLabels.map((lbl, i) => (
        <text
          key={i}
          x={xAt(i)}
          y={height - padB + 28}
          fontFamily="var(--font-mono)"
          fontSize={14}
          fill="rgba(245,239,224,0.55)"
          textAnchor="middle"
        >
          {lbl}
        </text>
      ))}
      {/* y-axis labels */}
      {[max, (max + min) / 2, min].map((v, i) => (
        <text
          key={i}
          x={padL - 12}
          y={yAt(v) + 5}
          fontFamily="var(--font-mono)"
          fontSize={13}
          fill="rgba(245,239,224,0.5)"
          textAnchor="end"
        >
          {yFormat(v)}
        </text>
      ))}

      {series.map((s, sIdx) => {
        const pts = s.values.map((v, i) => `${xAt(i)},${yAt(v)}`).join(' ');
        const totalLength = 3000; // arbitrary high for dasharray reveal
        return (
          <g key={s.label}>
            <motion.polyline
              points={pts}
              fill="none"
              stroke={s.color}
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={totalLength}
              initial={{ strokeDashoffset: totalLength }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4, delay: delay + sIdx * 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: `drop-shadow(0 0 8px ${s.color})` }}
            />
            {s.values.map((v, i) => (
              <motion.circle
                key={i}
                cx={xAt(i)}
                cy={yAt(v)}
                r={5}
                fill="var(--bg)"
                stroke={s.color}
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: delay + sIdx * 0.2 + i * 0.08 + 0.4, duration: 0.3 }}
              />
            ))}
            {/* end label */}
            <motion.text
              x={xAt(n - 1) + 12}
              y={yAt(s.values[n - 1]) + 5}
              fontFamily="var(--font-mono)"
              fontSize={14}
              fontWeight={700}
              fill={s.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + sIdx * 0.2 + 1.4, duration: 0.4 }}
            >
              {s.label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Tornado / Sensitivity chart ─────────────────────────────────────────────
export const TornadoChart = ({
  data,
  width,
  height,
  baseline,
  format = (v) => v.toFixed(0),
  delay = 0,
}: {
  data: { driver: string; low: number; high: number }[];
  width: number;
  height: number;
  baseline: number;
  format?: (v: number) => string;
  delay?: number;
}) => {
  const all = [baseline, ...data.flatMap((d) => [d.low, d.high])];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const padL = 240;
  const padR = 150;
  const rowH = (height - 40) / data.length;
  const barH = rowH * 0.55;
  const xOf = (v: number) => padL + ((v - min) / range) * (width - padL - padR);

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* baseline */}
      <line
        x1={xOf(baseline)}
        x2={xOf(baseline)}
        y1={20}
        y2={height - 20}
        stroke="var(--amber)"
        strokeDasharray="5 5"
        strokeWidth={2}
      />
      <text
        x={xOf(baseline)}
        y={14}
        fontFamily="var(--font-mono)"
        fontSize={12}
        fill="var(--amber)"
        textAnchor="middle"
      >
        BASELINE PW
      </text>
      {data.map((d, i) => {
        const y = 30 + i * rowH + (rowH - barH) / 2;
        // Endpoint that is MORE negative than baseline → "worse" (red, left of baseline)
        // Endpoint that is LESS negative than baseline → "better" (green, right of baseline)
        const worsePW = Math.min(d.low, d.high);
        const betterPW = Math.max(d.low, d.high);
        const xWorse = xOf(worsePW);
        const xBetter = xOf(betterPW);
        const xBase = xOf(baseline);
        const wLeft = Math.max(0, xBase - xWorse);
        const wRight = Math.max(0, xBetter - xBase);
        const pctWorse = (worsePW - baseline) / Math.abs(baseline);
        const pctBetter = (betterPW - baseline) / Math.abs(baseline);
        const fmtPct = (v: number) =>
          `${v >= 0 ? '+' : '−'}${(Math.abs(v) * 100).toFixed(1)}%`;
        return (
          <g key={i}>
            <text
              x={padL - 16}
              y={y + barH / 2 + 5}
              fontFamily="var(--font-sans)"
              fontSize={17}
              fontWeight={600}
              fill="rgba(245,239,224,0.9)"
              textAnchor="end"
            >
              {d.driver}
            </text>
            <motion.rect
              x={xWorse}
              y={y}
              height={barH}
              fill="var(--red)"
              initial={{ width: 0 }}
              animate={{ width: wLeft }}
              transition={{ duration: 0.9, delay: delay + i * 0.12 }}
              style={{ filter: 'drop-shadow(0 0 8px var(--red))' }}
            />
            <motion.rect
              x={xBase}
              y={y}
              height={barH}
              fill="var(--green)"
              initial={{ width: 0 }}
              animate={{ width: wRight }}
              transition={{ duration: 0.9, delay: delay + i * 0.12 + 0.1 }}
              style={{ filter: 'drop-shadow(0 0 8px var(--green))' }}
            />
            {/* Worse-side label: $ value on top line, % delta below */}
            <text
              x={xWorse - 8}
              y={y + barH / 2 - 2}
              fontFamily="var(--font-mono)"
              fontSize={13}
              fill="var(--red)"
              textAnchor="end"
            >
              {format(worsePW)}
            </text>
            <text
              x={xWorse - 8}
              y={y + barH / 2 + 14}
              fontFamily="var(--font-mono)"
              fontSize={11}
              fill="rgba(232, 75, 75, 0.75)"
              textAnchor="end"
            >
              {fmtPct(pctWorse)}
            </text>
            {/* Better-side label: $ value on top line, % delta below */}
            <text
              x={xBetter + 8}
              y={y + barH / 2 - 2}
              fontFamily="var(--font-mono)"
              fontSize={13}
              fill="var(--green)"
              textAnchor="start"
            >
              {format(betterPW)}
            </text>
            <text
              x={xBetter + 8}
              y={y + barH / 2 + 14}
              fontFamily="var(--font-mono)"
              fontSize={11}
              fill="rgba(25, 195, 125, 0.75)"
              textAnchor="start"
            >
              {fmtPct(pctBetter)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
