import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideTitle } from './slides/SlideTitle';
import { SlideProblem } from './slides/SlideProblem';
import { SlideAlternatives } from './slides/SlideAlternatives';
import { SlideAltDetail } from './slides/SlideAltDetail';
import { SlideCashFlows } from './slides/SlideCashFlows';
import { SlideMeasures } from './slides/SlideMeasures';
import { SlideIncremental } from './slides/SlideIncremental';
import { SlideSensitivity } from './slides/SlideSensitivity';
import { SlideRecommendation } from './slides/SlideRecommendation';
import { SlideThanks } from './slides/SlideThanks';
import { ALTERNATIVES } from './data/model';

const SLIDES = [
  { id: 'title', Component: SlideTitle, label: 'Cover' },
  { id: 'problem', Component: SlideProblem, label: 'Motivation' },
  { id: 'alts', Component: SlideAlternatives, label: 'Alternatives' },
  { id: 'alt-1', Component: () => <SlideAltDetail alt={ALTERNATIVES[0]} index={0} />, label: 'Alt 1' },
  { id: 'alt-2', Component: () => <SlideAltDetail alt={ALTERNATIVES[1]} index={1} />, label: 'Alt 2' },
  { id: 'alt-3', Component: () => <SlideAltDetail alt={ALTERNATIVES[2]} index={2} />, label: 'Alt 3' },
  { id: 'cashflows', Component: SlideCashFlows, label: 'Cash Flows' },
  { id: 'measures', Component: SlideMeasures, label: 'PW · AW · FW' },
  { id: 'incremental', Component: SlideIncremental, label: 'Payback · IRR · B/C' },
  { id: 'sensitivity', Component: SlideSensitivity, label: 'Sensitivity' },
  { id: 'recommendation', Component: SlideRecommendation, label: 'Recommendation' },
  { id: 'thanks', Component: SlideThanks, label: 'Q & A' },
] as const;

export const App = () => {
  const [index, setIndex] = useState(() => {
    const h = parseInt(window.location.hash.replace('#', ''), 10);
    return Number.isFinite(h) && h >= 0 && h < SLIDES.length ? h : 0;
  });
  const [direction, setDirection] = useState(1);

  const go = useCallback((delta: number) => {
    setDirection(delta > 0 ? 1 : -1);
    setIndex((i) => Math.max(0, Math.min(SLIDES.length - 1, i + delta)));
  }, []);

  const goTo = useCallback(
    (target: number) => {
      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [index],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        go(+1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') {
        goTo(0);
      } else if (e.key === 'End') {
        goTo(SLIDES.length - 1);
      } else if (/^[1-9]$/.test(e.key)) {
        goTo(parseInt(e.key, 10) - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, goTo]);

  useEffect(() => {
    window.location.hash = String(index);
  }, [index]);

  const Current = SLIDES[index].Component;

  return (
    <div className="stage">
      <Frame>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={SLIDES[index].id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </Frame>

      <div className="counter">
        {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        <span style={{ marginLeft: 12, color: 'rgba(245,239,224,0.4)' }}>
          {SLIDES[index].label}
        </span>
      </div>

      <nav className="nav-dots" aria-label="slide navigation">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
            className={i === index ? 'active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>

      <div className="help">
        <kbd>←</kbd> <kbd>→</kbd> navigate · <kbd>1-9</kbd> jump · <kbd>F</kbd> fullscreen
      </div>
    </div>
  );
};

// Maintains the 16:9 aspect ratio and scales the 1920x1080 virtual canvas.
const Frame = ({ children }: { children: React.ReactNode }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const apply = () => {
      const el = frameRef.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const scale = Math.min(el.clientWidth / 1920, el.clientHeight / 1080);
      inner.style.transform = `scale(${scale})`;
    };
    apply();
    window.addEventListener('resize', apply);
    // Fullscreen toggle
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', apply);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="slide-frame" ref={frameRef}>
      <div className="slide-inner" ref={innerRef}>
        {children}
      </div>
    </div>
  );
};
