'use client';

import { ChevronLeft, Video, Phone, Plus, Camera, Mic, Sticker, SendHorizontal } from 'lucide-react';

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif";

export type WaMsg = { from: 'them' | 'me'; text: string; at: number; time: string; readAt?: number };

// Subtle doodle wallpaper, tiled.
const WALLPAPER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.05' stroke-width='1.2'%3E%3Ccircle cx='14' cy='16' r='6'/%3E%3Cpath d='M52 10l8 8M60 10l-8 8'/%3E%3Crect x='40' y='44' width='14' height='10' rx='3'/%3E%3Cpath d='M10 56q6-8 12 0t12 0'/%3E%3Ccircle cx='66' cy='66' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

function Checks({ read }: { read: boolean }) {
  return (
    <svg width="19" height="13" viewBox="0 0 16 11" fill={read ? '#53bdeb' : '#8696a0'} aria-hidden="true">
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
        <ChevronLeft size={34} color="#007aff" />
        <span className="wa-back-count">3</span>
        <span className="wa-av"><img src="/logo.png" alt="" /></span>
        <div className="wa-id">
          <strong>{props.name}</strong>
          <span className={isTyping ? 'typing-label' : ''}>{isTyping ? props.typingLabel : props.online}</span>
        </div>
        <Video size={28} color="#007aff" />
        <Phone size={25} color="#007aff" />
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
        <Plus size={30} color="#007aff" />
        <span className="wa-field">
          {/* ponytail: long drafts show their tail, like a single-line composer scrolled to the caret */}
          <span>{props.composerText.length > 26 ? `…${props.composerText.slice(-25)}` : props.composerText}</span>
          {props.composerText && <span className="caret" />}
          <Sticker size={24} className="sticker" color="#007aff" />
        </span>
        {props.composerText ? (
          <span className="send"><SendHorizontal size={20} color="#fff" /></span>
        ) : (
          <>
            <Camera size={28} color="#007aff" />
            <Mic size={28} color="#007aff" />
          </>
        )}
      </div>

      <style jsx>{`
        .wa { position: absolute; inset: 0; display: flex; flex-direction: column; font-family: ${FONT}; color: #111b21; background-color: #efeae2; background-image: ${WALLPAPER}; background-size: 120px; }
        :global([data-theme='dark']) .wa { background-color: #0b141a; color: #e9edef; }
        .wa-head { display: flex; align-items: center; gap: 8px; padding: 62px 18px 10px 6px; background: rgba(246, 246, 246, 0.94); border-bottom: 0.5px solid rgba(0,0,0,0.12); }
        :global([data-theme='dark']) .wa-head { background: rgba(28, 28, 30, 0.94); border-color: rgba(255,255,255,0.08); }
        .wa-back-count { color: #007aff; font-size: 17px; margin: 0 6px 0 -8px; }
        .wa-av { width: 40px; height: 40px; border-radius: 50%; background: #efe9ff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .wa-av img { width: 70%; }
        .wa-id { flex: 1; display: flex; flex-direction: column; line-height: 1.2; min-width: 0; margin-left: 6px; }
        .wa-id strong { font-size: 17px; }
        .wa-id span { font-size: 13px; opacity: 0.6; }
        .wa-id .typing-label { color: #25d366; opacity: 1; }
        .wa-head :global(svg:last-child) { margin-left: 16px; }

        .wa-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; gap: 3px; padding: 10px 14px; }
        .wa-row { display: flex; flex-shrink: 0; animation: waIn 0.28s ease-out; }
        .wa-row.me { justify-content: flex-end; }
        .wa-row.first { margin-top: 8px; }
        .wa-bubble { position: relative; max-width: 80%; padding: 7px 10px 6px 11px; border-radius: 10px; font-size: 17px; line-height: 1.32; box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13); }
        .wa-bubble.them { background: #fff; }
        .wa-bubble.me { background: #d9fdd3; }
        :global([data-theme='dark']) .wa-bubble.them { background: #202c33; }
        :global([data-theme='dark']) .wa-bubble.me { background: #005c4b; }
        .first .wa-bubble.them { border-top-left-radius: 0; }
        .first .wa-bubble.me { border-top-right-radius: 0; }
        .first .wa-bubble.them::before, .first .wa-bubble.me::before { content: ''; position: absolute; top: 0; width: 10px; height: 16px; }
        .first .wa-bubble.them::before { left: -9px; background: inherit; clip-path: polygon(100% 0, 0 0, 100% 100%); }
        .first .wa-bubble.me::before { right: -9px; background: inherit; clip-path: polygon(0 0, 100% 0, 0 100%); }
        .wa-meta { float: right; display: inline-flex; align-items: center; gap: 4px; margin: 8px 0 -4px 10px; font-size: 12px; opacity: 0.55; }
        .wa-bubble.me .wa-meta { opacity: 0.75; }
        .dots { display: inline-flex; gap: 5px; padding: 14px 16px; }
        .dots i { width: 8px; height: 8px; border-radius: 50%; background: #8696a0; animation: waDot 1.2s infinite ease-in-out; }
        .dots i:nth-child(2) { animation-delay: 0.15s; }
        .dots i:nth-child(3) { animation-delay: 0.3s; }

        .wa-input { display: flex; align-items: center; gap: 14px; padding: 8px 14px 40px; background: rgba(246, 246, 246, 0.96); }
        :global([data-theme='dark']) .wa-input { background: rgba(28, 28, 30, 0.96); }
        .wa-field { flex: 1; display: flex; align-items: center; gap: 4px; min-height: 38px; padding: 6px 10px 6px 14px; border-radius: 20px; background: #fff; border: 0.5px solid rgba(0,0,0,0.12); font-size: 17px; overflow: hidden; }
        :global([data-theme='dark']) .wa-field { background: #2c2c2e; border-color: rgba(255,255,255,0.1); }
        .wa-field > span:first-child { flex: 0 1 auto; white-space: nowrap; overflow: hidden; }
        .wa-field :global(.sticker) { margin-left: auto; flex-shrink: 0; }
        .caret { width: 2px; height: 20px; background: #25d366; flex-shrink: 0; animation: waBlink 0.9s step-end infinite; }
        .send { width: 36px; height: 36px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @keyframes waIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes waDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
        @keyframes waBlink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .wa-row, .dots i, .caret { animation: none; } }
      `}</style>
    </div>
  );
}
