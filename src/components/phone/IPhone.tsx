'use client';

import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  /** Status bar glyph colour: 'dark' on light screens, 'light' on dark screens. */
  statusTone?: 'dark' | 'light';
  className?: string;
};

// iPhone 16 Pro-style frame. Screens render at a fixed 280x608 design size; the
// whole device scales down on small viewports via the --phone-scale variable.
export default function IPhone({ children, statusTone = 'dark', className = '' }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${x * 10}deg`);
    el.style.setProperty('--rx', `${-y * 8}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty('--ry', '-6deg');
    tiltRef.current?.style.setProperty('--rx', '2deg');
  };

  return (
    <div className={`phone-stage ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="phone" ref={tiltRef}>
        <span className="btn action" />
        <span className="btn vol-up" />
        <span className="btn vol-down" />
        <span className="btn power" />
        <span className="btn camera" />
        <div className="bezel">
          <div className={`screen tone-${statusTone}`}>
            <div className="status-bar">
              <span className="time">9:41</span>
              <span className="glyphs">
                <svg width="16" height="11" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                  <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8 .4 10.6 10.6 0 0 0 .5 3.4l1.2 1.3A8.9 8.9 0 0 1 8 2.2Zm0 3.6c1.4 0 2.8.5 3.8 1.5l1.2-1.3A7.3 7.3 0 0 0 8 4 7.3 7.3 0 0 0 3 6l1.2 1.3c1-.9 2.4-1.5 3.8-1.5Zm0 3.6c-.6 0-1.2.2-1.6.6L8 11.6l1.6-1.6c-.4-.4-1-.6-1.6-.6Z" />
                </svg>
                <span className="battery"><span className="level" /></span>
              </span>
            </div>
            <div className="island" />
            <div className="content">{children}</div>
            <div className="home-indicator" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-stage {
          --phone-scale: 1;
          perspective: 1400px;
          width: calc(300px * var(--phone-scale));
          height: calc(628px * var(--phone-scale));
          flex-shrink: 0;
        }
        .phone {
          --rx: 2deg;
          --ry: -6deg;
          position: relative;
          width: 300px;
          height: 628px;
          transform-origin: top left;
          transform: scale(var(--phone-scale)) rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
          border-radius: 54px;
          padding: 3.5px;
          /* brushed titanium band */
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.18), transparent 8%, transparent 92%, rgba(255, 255, 255, 0.14)),
            linear-gradient(160deg, #8d8a85 0%, #3a3937 18%, #5c5a56 42%, #2a2927 62%, #77746f 84%, #3b3a38 100%);
          box-shadow:
            0 60px 90px -30px rgba(40, 20, 90, 0.45),
            0 30px 50px -25px rgba(0, 0, 0, 0.55),
            inset 0 0 0 0.5px rgba(255, 255, 255, 0.35),
            inset 0 0 2px 1px rgba(0, 0, 0, 0.6);
        }
        .bezel {
          width: 100%;
          height: 100%;
          border-radius: 51px;
          background: #050505;
          padding: 7.5px;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
        }
        .screen {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 44px;
          overflow: hidden;
          background: #fff;
          isolation: isolate;
          text-align: left; /* don't inherit centred section text */
        }
        :global([data-theme='dark']) .screen { background: #000; }
        /* glass reflection */
        .screen::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 50;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(118deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 28%, transparent 42%);
        }
        .status-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50px;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 20px 0 32px;
          font: 600 15px/1 -apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif;
          letter-spacing: -0.2px;
          pointer-events: none;
        }
        .tone-dark .status-bar { color: #000; }
        .tone-light .status-bar { color: #fff; }
        :global([data-theme='dark']) .tone-dark .status-bar { color: #fff; }
        .glyphs { display: inline-flex; align-items: center; gap: 4px; }
        .battery {
          position: relative;
          width: 23px;
          height: 11px;
          border-radius: 4px;
          border: 1px solid currentColor;
          opacity: 0.9;
          padding: 1.5px;
        }
        .battery::after {
          content: '';
          position: absolute;
          right: -3.5px;
          top: 3.5px;
          width: 1.5px;
          height: 4px;
          border-radius: 0 1px 1px 0;
          background: currentColor;
          opacity: 0.5;
        }
        .level { display: block; width: 78%; height: 100%; border-radius: 2px; background: currentColor; }
        .island {
          position: absolute;
          top: 11px;
          left: 50%;
          transform: translateX(-50%);
          width: 92px;
          height: 27px;
          border-radius: 20px;
          background: #000;
          z-index: 45;
        }
        .island::after {
          content: '';
          position: absolute;
          right: 11px;
          top: 9px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #2a3350 0%, #0b0d18 60%);
        }
        .content { position: absolute; inset: 0; }
        .home-indicator {
          position: absolute;
          bottom: 7px;
          left: 50%;
          transform: translateX(-50%);
          width: 108px;
          height: 4.5px;
          border-radius: 3px;
          background: #000;
          z-index: 40;
          opacity: 0.85;
        }
        :global([data-theme='dark']) .home-indicator,
        .tone-light .home-indicator { background: #fff; }

        .btn {
          position: absolute;
          width: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #2c2b29, #8a8781 45%, #3e3d3a);
        }
        .action { left: -2.5px; top: 112px; height: 30px; }
        .vol-up { left: -2.5px; top: 162px; height: 52px; }
        .vol-down { left: -2.5px; top: 226px; height: 52px; }
        .power { right: -2.5px; top: 184px; height: 82px; }
        .camera { right: -2px; top: 330px; height: 46px; border-radius: 3px; opacity: 0.8; }

        @media (hover: none), (prefers-reduced-motion: reduce) {
          .phone { transition: none; }
        }
        @media (max-width: 1024px) {
          .phone-stage { --phone-scale: 0.9; }
        }
        @media (max-width: 480px) {
          .phone-stage { --phone-scale: 0.84; }
        }
      `}</style>
    </div>
  );
}
