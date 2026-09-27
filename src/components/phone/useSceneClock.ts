'use client';

import { useEffect, useRef, useState } from 'react';

const TICK = 50;

/**
 * Drives a looping, time-based scene. Returns elapsed ms (`now`) that only
 * advances while the element is on screen. With reduced motion it pins `now`
 * to the scene's final frame. When a scene ends, `onEnd` runs and time resets;
 * changing `resetKey` restarts the scene.
 */
export function useSceneClock(duration: number, onEnd: () => void, resetKey: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = setInterval(() => setElapsed((e) => e + TICK), TICK);
    return () => clearInterval(id);
  }, [visible, reduced]);

  useEffect(() => {
    setElapsed(0);
  }, [resetKey]);

  useEffect(() => {
    if (!reduced && elapsed >= duration) {
      setElapsed(0);
      onEndRef.current();
    }
  }, [elapsed, duration, reduced]);

  return { ref, now: reduced ? duration : elapsed };
}

/** Portion of `text` typed out at `now`, starting at `start`. */
export function typed(now: number, start: number, text: string, msPerChar = 60) {
  if (now < start) return '';
  return text.slice(0, Math.floor((now - start) / msPerChar) + 1);
}
