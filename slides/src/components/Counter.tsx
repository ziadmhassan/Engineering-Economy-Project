import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export const AnimatedNumber = ({
  to,
  from = 0,
  duration = 1.4,
  decimals = 0,
  prefix = '',
  suffix = '',
  format,
  delay = 0,
  style,
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  format?: (v: number) => string;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => {
    if (format) return format(v);
    return `${prefix}${v.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(mv, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [to, duration, delay, mv]);

  return (
    <motion.span className={className} style={style}>
      {rounded}
    </motion.span>
  );
};

// reveal text by word
export const RevealWords = ({
  text,
  delay = 0,
  stagger = 0.04,
  style,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const words = text.split(' ');
  return (
    <span className={className} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * stagger, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
};

// typewriter line
export const Typewriter = ({
  text,
  cps = 32,
  delay = 0,
  style,
  caret = true,
}: {
  text: string;
  cps?: number;
  delay?: number;
  style?: React.CSSProperties;
  caret?: boolean;
}) => {
  const [n, setN] = useState(0);
  const [t0] = useState(() => performance.now());
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const elapsed = (performance.now() - t0) / 1000 - delay;
      const target = Math.max(0, Math.min(text.length, Math.floor(elapsed * cps)));
      setN(target);
      if (target < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, cps, delay, t0]);
  const blink = Math.floor((Date.now() / 300) % 2) === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {caret && <span style={{ opacity: blink ? 1 : 0.2 }}>▮</span>}
    </span>
  );
};
