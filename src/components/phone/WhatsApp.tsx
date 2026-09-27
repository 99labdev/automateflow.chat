'use client';

import { ChevronLeft, Video, Phone, Plus, Camera, Mic, Sticker, SendHorizontal } from 'lucide-react';

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif";

export type WaMsg = { from: 'them' | 'me'; text: string; at: number; time: string; readAt?: number };

// Subtle doodle wallpaper, tiled.
const WALLPAPER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.05' stroke-width='1.2'%3E%3Ccircle cx='14' cy='16' r='6'/%3E%3Cpath d='M52 10l8 8M60 10l-8 8'/%3E%3Crect x='40' y='44' width='14' height='10' rx='3'/%3E%3Cpath d='M10 56q6-8 12 0t12 0'/%3E%3Ccircle cx='66' cy='66' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

function Checks({ read }: { read: boolean }) {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill={read ? '#53bdeb' : '#8696a0'} aria-hidden="true">
      <path d="M11.07.65a.46.46 0 0 0-.68.08L4.2 8.37 1.8 6.1a.47.47 0 0 0-.68 0l-.31.31a.45.45 0 0 0 0 .68l3 3a.72.72 0 0 0 1.02-.03L11.21 1.35a.46.46 0 0 0 0-.65l-.14-.05Z" />
      <path d="M15.07.65a.46.46 0 0 0-.68.08L8.2 8.37l-1.4-1.27-.31.31 2 2a.72.72 0 0 0 1.02-.03L15.21 1.35a.46.46 0 0 0 0-.65l-.14-.05Z" />
    </svg>
  );
}

export function WaThread(props: {
  now: number;
  name: string;
  online: string;
  typingLabel: string;
  messages: WaMsg[];
  typing?: [number, number][];
  composerText: string;
}) {
  const { now, messages } = props;
  const shown = messages.filter((m) => now >= m.at);
  const isTyping = (props.typing ?? []).some(([a, b]) => now >= a && now < b);
  return (
    <div className="wa">
      <div className="wa-head">
        <ChevronLeft size={26} color="#007aff" />
        <span className="wa-back-count">3</span>
        <span className="wa-av"><img src="/logo.png" alt="" /></span>
        <div className="wa-id">
          <strong>{props.name}</strong>
          <span className={isTyping ? 'typing-label' : ''}>{isTyping ? props.typingLabel : props.online}</span>
        </div>
        <Video size={22} color="#007aff" />
        <Phone size={19} color="#007aff" />
      </div>

      <div className="wa-body">
        {shown.map((m, i) => {
          const first = shown[i - 1]?.from !== m.from;
          return (
            <div key={i} className={`wa-row ${m.from} ${first ? 'first' : ''}`}>
              <div className={`wa-bubble ${m.from}`}>
                <span className="wa-text">{m.text}</span>
                <span className="wa-meta">
                  {m.time}
                  {m.from === 'me' && <Checks read={m.readAt !== undefined && now >= m.readAt} />}
                </span>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="wa-row them first">
            <div className="wa-bubble them dots"><i /><i /><i /></div>
          </div>
        )}
      </div>

      <div className="wa-input">
        <Plus size={24} color="#007aff" />
        <span className="wa-field">
          {/* ponytail: long drafts show their tail, like a single-line composer scrolled to the caret */}
          <span>{props.composerText.length > 30 ? `…${props.composerText.slice(-29)}` : props.composerText}</span>
          {props.composerText && <span className="caret" />}
          <Sticker size={18} className="sticker" color="#007aff" />
        </span>
        {props.composerText ? (
          <span className="send"><SendHorizontal size={16} color="#fff" /></span>
        ) : (
          <>
            <Camera size={22} color="#007aff" />
            <Mic size={22} color="#007aff" />
          </>
        )}
      </div>

      <style jsx>{`
        .wa { position: absolute; inset: 0; display: flex; flex-direction: column; font-family: ${FONT}; color: #111b21; background-color: #efeae2; background-image: ${WALLPAPER}; }
        :global([data-theme='dark']) .wa { background-color: #0b141a; color: #e9edef; }
        .wa-head { display: flex; align-items: center; gap: 6px; padding: 50px 12px 8px 4px; background: rgba(246, 246, 246, 0.94); border-bottom: 0.5px solid rgba(0,0,0,0.12); }
        :global([data-theme='dark']) .wa-head { background: rgba(28, 28, 30, 0.94); border-color: rgba(255,255,255,0.08); }
        .wa-back-count { color: #007aff; font-size: 15px; margin: 0 4px 0 -6px; }
        .wa-av { width: 32px; height: 32px; border-radius: 50%; background: #efe9ff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .wa-av img { width: 70%; }
        .wa-id { flex: 1; display: flex; flex-direction: column; line-height: 1.2; min-width: 0; margin-left: 4px; }
        .wa-id strong { font-size: 14.5px; }
        .wa-id span { font-size: 11.5px; opacity: 0.6; }
        .wa-id .typing-label { color: #25d366; opacity: 1; }
        .wa-head :global(svg:last-child) { margin-left: 10px; }

        .wa-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; padding: 8px 10px; }
        .wa-row { display: flex; animation: waIn 0.28s ease-out; }
        .wa-row.me { justify-content: flex-end; }
        .wa-row.first { margin-top: 6px; }
        .wa-bubble { position: relative; max-width: 80%; padding: 6px 8px 5px 9px; border-radius: 8px; font-size: 13px; line-height: 1.35; box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13); }
        .wa-bubble.them { background: #fff; }
        .wa-bubble.me { background: #d9fdd3; }
        :global([data-theme='dark']) .wa-bubble.them { background: #202c33; }
        :global([data-theme='dark']) .wa-bubble.me { background: #005c4b; }
        .first .wa-bubble.them { border-top-left-radius: 0; }
        .first .wa-bubble.me { border-top-right-radius: 0; }
        .first .wa-bubble.them::before, .first .wa-bubble.me::before { content: ''; position: absolute; top: 0; width: 8px; height: 13px; }
        .first .wa-bubble.them::before { left: -7px; background: inherit; clip-path: polygon(100% 0, 0 0, 100% 100%); }
        .first .wa-bubble.me::before { right: -7px; background: inherit; clip-path: polygon(0 0, 100% 0, 0 100%); }
        .wa-meta { float: right; display: inline-flex; align-items: center; gap: 3px; margin: 6px 0 -3px 8px; font-size: 10px; opacity: 0.55; }
        .wa-bubble.me .wa-meta { opacity: 0.75; }
        .dots { display: inline-flex; gap: 4px; padding: 11px 13px; }
        .dots i { width: 6px; height: 6px; border-radius: 50%; background: #8696a0; animation: waDot 1.2s infinite ease-in-out; }
        .dots i:nth-child(2) { animation-delay: 0.15s; }
        .dots i:nth-child(3) { animation-delay: 0.3s; }

        .wa-input { display: flex; align-items: center; gap: 10px; padding: 7px 10px 28px; background: rgba(246, 246, 246, 0.96); }
        :global([data-theme='dark']) .wa-input { background: rgba(28, 28, 30, 0.96); }
        .wa-field { flex: 1; display: flex; align-items: center; gap: 4px; min-height: 30px; padding: 5px 8px 5px 12px; border-radius: 18px; background: #fff; border: 0.5px solid rgba(0,0,0,0.12); font-size: 13px; overflow: hidden; }
        :global([data-theme='dark']) .wa-field { background: #2c2c2e; border-color: rgba(255,255,255,0.1); }
        .wa-field > span:first-child { flex: 0 1 auto; white-space: nowrap; overflow: hidden; }
        .wa-field :global(.sticker) { margin-left: auto; flex-shrink: 0; }
        .caret { width: 1.5px; height: 15px; background: #25d366; flex-shrink: 0; animation: waBlink 0.9s step-end infinite; }
        .send { width: 30px; height: 30px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @keyframes waIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes waDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-3px); opacity: 1; } }
        @keyframes waBlink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .wa-row, .dots i, .caret { animation: none; } }
      `}</style>
    </div>
  );
}
