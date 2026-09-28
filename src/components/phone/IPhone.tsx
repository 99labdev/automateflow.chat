'use client';

import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  /**
   * Status bar glyph colour: 'dark' on app screens (flips with the site's dark theme),
   * 'ink' on always-light web pages, 'light' on dark screens.
   */
  statusTone?: 'dark' | 'ink' | 'light';
  className?: string;
};

// iPhone 17 Pro Max: thin flush aluminium frame (Deep Blue), uniform black
// border, Dynamic Island. Screens are authored at the device's real logical
// size (440x956 pt) and scaled into the frame, so app UIs use true iOS sizes.
export const SCREEN_W = 440;
export const SCREEN_H = 956;
const PHONE_W = 300;
const FRAME = 2.5; // aluminium band
const BORDER = 5; // black display border
const INNER_W = PHONE_W - 2 * (FRAME + BORDER);
const SCALE = INNER_W / SCREEN_W;
const INNER_H = SCREEN_H * SCALE;
const PHONE_H = INNER_H + 2 * (FRAME + BORDER);

export default function IPhone({ children, statusTone = 'dark', className = '' }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
    el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty('--ry', '-5deg');
    tiltRef.current?.style.setProperty('--rx', '2deg');
  };

  return (
    <div className={`phone-stage ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="phone" ref={tiltRef}>
        <span className="key action" />
        <span className="key vol-up" />
        <span className="key vol-down" />
        <span className="key side" />
        <span className="key camera" />
        <div className="display">
          <div className={`viewport tone-${statusTone}`}>
            {children}
            <div className="status-bar">
              <span className="time">9:41</span>
              <span className="glyphs">
                <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="7.5" width="3.2" height="4.5" rx="1" />
                  <rect x="5.2" y="5" width="3.2" height="7" rx="1" />
                  <rect x="10.4" y="2.5" width="3.2" height="9.5" rx="1" />
                  <rect x="15.6" y="0" width="3.2" height="12" rx="1" />
                </svg>
                <svg width="17" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                  <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8 .4 10.6 10.6 0 0 0 .5 3.4l1.2 1.3A8.9 8.9 0 0 1 8 2.2Zm0 3.6c1.4 0 2.8.5 3.8 1.5l1.2-1.3A7.3 7.3 0 0 0 8 4 7.3 7.3 0 0 0 3 6l1.2 1.3c1-.9 2.4-1.5 3.8-1.5Zm0 3.6c-.6 0-1.2.2-1.6.6L8 11.6l1.6-1.6c-.4-.4-1-.6-1.6-.6Z" />
                </svg>
                <span className="battery"><span className="level" /></span>
              </span>
            </div>
            <div className="island"><span className="lens" /></div>
            <div className="home-indicator" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-stage {
          --phone-scale: 1;
          perspective: 1600px;
          width: calc(${PHONE_W}px * var(--phone-scale));
          height: calc(${PHONE_H}px * var(--phone-scale));
          flex-shrink: 0;
        }
        .phone {
          --rx: 2deg;
          --ry: -5deg;
          position: relative;
          width: ${PHONE_W}px;
          height: ${PHONE_H}px;
          padding: ${FRAME}px;
          border-radius: 58px;
          transform-origin: top left;
          transform: scale(var(--phone-scale)) rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
          /* flush Deep Blue aluminium edge */
          background: linear-gradient(145deg, #5d6f8e 0%, #2e3b54 22%, #3d4c69 50%, #25314a 78%, #52627f 100%);
          box-shadow:
            0 60px 90px -30px rgba(30, 20, 80, 0.45),
            0 28px 48px -26px rgba(0, 0, 0, 0.55),
            inset 0 0 0 0.6px rgba(255, 255, 255, 0.28);
        }
        .display {
          width: 100%;
          height: 100%;
          padding: ${BORDER}px;
          border-radius: ${58 - FRAME}px;
          background: #000;
          overflow: hidden; /* the 440pt viewport's layout box is wider than the display */
        }
        .viewport {
          position: relative;
          width: ${SCREEN_W}px;
          height: ${SCREEN_H}px;
          transform: scale(${SCALE});
          transform-origin: top left;
          border-radius: ${(58 - FRAME - BORDER) / SCALE}px;
          overflow: hidden;
          isolation: isolate;
          background: #fff;
          text-align: left; /* don't inherit centred section text */
          -webkit-font-smoothing: antialiased;
        }
        :global([data-theme='dark']) .viewport { background: #000; }
        .viewport::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 90;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(118deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 44%);
        }
        .status-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 62px;
          z-index: 80;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 34px 0 50px;
          font: 600 17px/1 -apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif;
          letter-spacing: -0.3px;
          pointer-events: none;
          transition: color 0.3s;
        }
        .tone-dark .status-bar { color: #000; }
        .tone-light .status-bar { color: #fff; }
        .tone-ink .status-bar { color: #000 !important; }
        .tone-ink .home-indicator { background: #000 !important; }
        :global([data-theme='dark']) .tone-dark .status-bar { color: #fff; }
        .glyphs { display: inline-flex; align-items: center; gap: 6px; }
        .battery { position: relative; width: 27px; height: 13px; border-radius: 4px; border: 1.2px solid currentColor; padding: 1.8px; opacity: 0.95; }
        .battery::after { content: ''; position: absolute; right: -4px; top: 3.8px; width: 1.8px; height: 4.2px; border-radius: 0 1px 1px 0; background: currentColor; opacity: 0.5; }
        .level { display: block; width: 80%; height: 100%; border-radius: 2px; background: currentColor; }
        .island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 126px; height: 37px; border-radius: 20px; background: #000; z-index: 85; }
        .lens { position: absolute; right: 14px; top: 12px; width: 13px; height: 13px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #2c3552 0%, #0b0d18 62%); }
        .home-indicator { position: absolute; bottom: 9px; left: 50%; transform: translateX(-50%); width: 146px; height: 5px; border-radius: 3px; background: #000; z-index: 80; opacity: 0.9; pointer-events: none; }
        :global([data-theme='dark']) .home-indicator, .tone-light .home-indicator { background: #fff; }

        /* buttons sit nearly flush with the frame */
        .key { position: absolute; width: 2px; background: linear-gradient(90deg, #26314a, #6d7c99); border-radius: 1px; }
        .action { left: -1.2px; top: 118px; height: 28px; }
        .vol-up { left: -1.2px; top: 168px; height: 50px; }
        .vol-down { left: -1.2px; top: 230px; height: 50px; }
        .side { right: -1.2px; top: 190px; height: 80px; transform: scaleX(-1); }
        .camera { right: -0.8px; top: 342px; height: 44px; width: 1.4px; opacity: 0.7; transform: scaleX(-1); }

        @media (hover: none), (prefers-reduced-motion: reduce) { .phone { transition: none; } }
        @media (max-width: 1024px) { .phone-stage { --phone-scale: 0.92; } }
        @media (max-width: 480px) { .phone-stage { --phone-scale: 0.86; } }
      `}</style>
    </div>
  );
}
