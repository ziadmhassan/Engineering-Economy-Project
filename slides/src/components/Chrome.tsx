import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const Blueprint = ({ children }: { children?: ReactNode }) => (
  <>
    <div className="blueprint-bg" />
    <div className="scanline" />
    {children}
  </>
);

export const SlideHeader = ({
  index,
  total = '13',
  eyebrow,
  title,
  highlight,
}: {
  index: string;
  total?: string;
  eyebrow: string;
  title: string;
  highlight?: string;
}) => (
  <div style={{ position: 'absolute', top: 80, left: 96, right: 96, zIndex: 2 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 24,
        marginBottom: 18,
      }}
    >
      <span
        className="mono"
        style={{ color: 'var(--amber)', fontSize: 16, letterSpacing: 4 }}
      >
        {index} / {total}
      </span>
      <span className="eyebrow">{eyebrow}</span>
    </div>
    <motion.h2
      className="h2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ color: 'var(--paper)', maxWidth: 1500 }}
    >
      {title}
      {highlight && (
        <>
          {' '}
          <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>{highlight}</em>
        </>
      )}
    </motion.h2>
  </div>
);

export const Footer = ({ note }: { note?: string }) => (
  <div
    className="hud"
    style={{
      bottom: 56,
      left: 96,
      right: 96,
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <span>ENGR 3222 · ENGINEERING ECONOMY · SPRING 2026</span>
    {note && <span>{note}</span>}
    <span>AUC · SCHOOL OF SCIENCES & ENGINEERING</span>
  </div>
);

export const Panel = ({
  title,
  tag,
  children,
  style,
  delay = 0,
}: {
  title?: string;
  tag?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) => (
  <motion.div
    className="panel"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ padding: '24px 28px', ...style }}
  >
    <div className="corners">
      <span />
    </div>
    {(title || tag) && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 14,
          marginBottom: 18,
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        {title && (
          <div
            className="mono"
            style={{
              fontSize: 13,
              letterSpacing: 3,
              color: 'rgba(245, 239, 224, 0.5)',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        )}
        {tag && <span className="tag">{tag}</span>}
      </div>
    )}
    {children}
  </motion.div>
);
