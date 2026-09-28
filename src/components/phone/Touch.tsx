'use client';

// Touch feedback and the iOS keyboard, shared by every phone scene.
// Sizes are in iPhone points (screens are authored at 440x956).

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif";

/**
 * Finger-tap indicator, centred on its (position: relative) parent.
 * Visible for ~600ms after `at`, like a screen recording with touches shown.
 */
export function Tap({ now, at }: { now: number; at: number | undefined }) {
  if (at === undefined || now < at - 150 || now > at + 600) return null;
  return (
    <span className="tap" key={at}>
      <style jsx>{`
        .tap {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 54px;
          height: 54px;
          margin: -27px 0 0 -27px;
          border-radius: 50%;
          background: rgba(120, 120, 128, 0.45);
          border: 2px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
          pointer-events: none;
          z-index: 70;
          animation: tapPress 0.75s ease-out forwards;
        }
        @keyframes tapPress {
          0% { transform: scale(1.35); opacity: 0; }
          20% { transform: scale(1); opacity: 1; }
          45% { transform: scale(0.82); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </span>
  );
}

const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

/** iOS keyboard sliding up from the bottom while `show` is true. */
export function IosKeyboard({ show, spaceLabel, returnLabel }: { show: boolean; spaceLabel: string; returnLabel: string }) {
  return (
    <div className={`kb ${show ? 'show' : ''}`}>
      <div className="suggest"><span>“”</span><span className="sep" /><span /><span className="sep" /><span /></div>
      <div className="row">{[...ROWS[0]].map((k) => <span key={k} className="k">{k}</span>)}</div>
      <div className="row mid">{[...ROWS[1]].map((k) => <span key={k} className="k">{k}</span>)}</div>
      <div className="row">
        <span className="k fn wide">⇧</span>
        {[...ROWS[2]].map((k) => <span key={k} className="k">{k}</span>)}
        <span className="k fn wide">⌫</span>
      </div>
      <div className="row">
        <span className="k fn w123">123</span>
        <span className="k fn emoji">☺</span>
        <span className="k space">{spaceLabel}</span>
        <span className="k fn ret">{returnLabel}</span>
      </div>
      <div className="bottom"><span>🌐</span><span>🎙</span></div>
      <style jsx>{`
        .kb {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 60;
          padding: 6px 4px 0; font-family: ${FONT};
          background: #d1d4db; color: #000;
          transform: translateY(100%); transition: transform 0.32s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        :global([data-theme='dark']) .kb { background: #2b2b2e; color: #fff; }
        .kb.show { transform: none; }
        .suggest { display: flex; align-items: center; justify-content: space-around; height: 40px; font-size: 16px; opacity: 0.6; }
        .suggest span { flex: 1; text-align: center; }
        .suggest .sep { flex: 0 0 1px; height: 22px; background: currentColor; opacity: 0.3; }
        .row { display: flex; justify-content: center; gap: 6px; margin-bottom: 11px; }
        .row.mid { padding: 0 20px; }
        .k {
          flex: 1; max-width: 38px; height: 46px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 23px; background: #fff; box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
        }
        :global([data-theme='dark']) .k { background: #6b6b6f; }
        .k.fn { background: #abb0ba; font-size: 18px; }
        :global([data-theme='dark']) .k.fn { background: #464649; }
        .k.wide { max-width: 50px; flex: 1.3; }
        .k.w123 { max-width: 50px; font-size: 16px; }
        .k.emoji { max-width: 50px; }
        .k.space { max-width: none; flex: 5; font-size: 16px; }
        .k.ret { max-width: 96px; flex: 2.2; font-size: 16px; }
        .bottom { display: flex; justify-content: space-between; padding: 4px 26px 34px; font-size: 22px; opacity: 0.6; }
        @media (prefers-reduced-motion: reduce) { .kb { transition: none; } }
      `}</style>
    </div>
  );
}

/** Blinking text caret. */
export function Caret({ color = '#0a84ff' }: { color?: string }) {
  return (
    <span className="caret" style={{ background: color }}>
      <style jsx>{`
        .caret { display: inline-block; width: 2px; height: 1.15em; margin-left: 1px; vertical-align: text-bottom; animation: caretBlink 1s step-end infinite; }
        @keyframes caretBlink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .caret { animation: none; } }
      `}</style>
    </span>
  );
}
