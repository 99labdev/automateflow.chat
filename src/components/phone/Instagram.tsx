'use client';

import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, MoreHorizontal, Phone, Video, Camera, Mic, Image as ImageIcon, Smile, Instagram as InstagramGlyph } from 'lucide-react';

// Presentational Instagram screens for the phone mockups. Every piece is a pure
// function of `now` (ms into the scene) so scenes can be scrubbed, looped and
// frozen on their final frame.

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif";

function Avatar({ size = 28, ring = false, letter, color }: { size?: number; ring?: boolean; letter?: string; color?: string }) {
  return (
    <span className={`av ${ring ? 'ring' : ''}`} style={{ width: size, height: size, ...(color ? { background: color } : {}) }}>
      {letter ? <span className="letter">{letter}</span> : <img src="/logo.png" alt="" />}
      <style jsx>{`
        .av { position: relative; flex-shrink: 0; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: #efe9ff; }
        .av img { width: 70%; height: 70%; object-fit: contain; }
        .av.ring { padding: 2px; background: conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75); }
        .av.ring img { width: 100%; height: 100%; border-radius: 50%; background: #fff; padding: 3px; border: 2px solid #fff; }
        .letter { font: 700 11px ${FONT}; color: #fff; }
      `}</style>
    </span>
  );
}

const LETTER_COLORS = ['#f97316', '#0ea5e9', '#10b981', '#e11d48', '#8b5cf6'];

export type IgComment = { user: string; text: string; at: number; reply?: { text: string; at: number } };

export function IgPostScreen(props: {
  now: number;
  username: string;
  mediaText: string;
  likes: string;
  sheetAt: number;
  commentsTitle: string;
  comments: IgComment[];
  composer?: { typedText: string };
  placeholder: string;
  postLabel: string;
  nowLabel: string;
}) {
  const { now, sheetAt, comments } = props;
  const sheetOpen = now >= sheetAt;
  return (
    <div className="ig">
      <div className="topbar">
        <ChevronLeft size={24} />
        <span className="topbar-title">{props.postLabel}</span>
        <span style={{ width: 24 }} />
      </div>
      <div className="post-head">
        <Avatar ring size={32} />
        <span className="user">{props.username}</span>
        <MoreHorizontal size={18} />
      </div>
      <div className="media">
        <span className="media-text">{props.mediaText}</span>
      </div>
      <div className="actions">
        <Heart size={22} className="liked" fill="#ff3040" color="#ff3040" />
        <MessageCircle size={22} style={{ transform: 'scaleX(-1)' }} />
        <Send size={21} />
        <span style={{ flex: 1 }} />
        <Bookmark size={21} />
      </div>
      <div className="likes">{props.likes}</div>

      <div className={`sheet ${sheetOpen ? 'open' : ''}`}>
        <span className="handle" />
        <div className="sheet-title">{props.commentsTitle}</div>
        <div className="comments">
          {comments.filter((c) => now >= c.at).map((c, i) => (
            <div key={c.user + i} className="comment-block">
              <div className="comment">
                <Avatar size={30} letter={c.user[0].toUpperCase()} color={LETTER_COLORS[i % LETTER_COLORS.length]} />
                <div className="c-body">
                  <span className="c-user">{c.user} <em>1 min</em></span>
                  <span className="c-text">{c.text}</span>
                </div>
                <Heart size={12} className="c-heart" />
              </div>
              {c.reply && now >= c.reply.at && (
                <div className="comment reply">
                  <Avatar size={24} />
                  <div className="c-body">
                    <span className="c-user">{props.username} <span className="badge">✓</span> <em>{props.nowLabel}</em></span>
                    <span className="c-text">{c.reply.text}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="composer">
          <div className="emojis">❤️ 🙌 🔥 👏 😢 😍 😮 😂</div>
          <div className="c-input">
            <Avatar size={30} letter="M" color="#e11d48" />
            <span className={`field ${props.composer?.typedText ? '' : 'ph'}`}>
              {props.composer?.typedText || props.placeholder}
              {props.composer?.typedText && <span className="caret" />}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ig { position: absolute; inset: 0; padding-top: 50px; background: #fff; color: #000; font-family: ${FONT}; overflow: hidden; }
        :global([data-theme='dark']) .ig { background: #000; color: #f5f5f5; }
        .topbar { height: 40px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; }
        .topbar-title { font-weight: 700; font-size: 15px; }
        .post-head { display: flex; align-items: center; gap: 8px; padding: 6px 12px; }
        .user { flex: 1; font-weight: 600; font-size: 13px; }
        .media { height: 280px; display: flex; align-items: center; justify-content: center; padding: 28px; text-align: center; background: radial-gradient(circle at 30% 20%, #a78bfa, transparent 55%), linear-gradient(150deg, #7c3aed, #4f46e5 55%, #0f0a2e); }
        .media-text { color: #fff; font-weight: 800; font-size: 22px; line-height: 1.15; letter-spacing: -0.3px; text-shadow: 0 2px 20px rgba(0,0,0,0.25); }
        .actions { display: flex; align-items: center; gap: 14px; padding: 10px 12px 4px; }
        .likes { padding: 0 12px; font-size: 13px; font-weight: 600; }

        .sheet {
          position: absolute; left: 0; right: 0; bottom: 0; height: 74%;
          background: #fff; border-radius: 16px 16px 0 0; box-shadow: 0 -10px 30px rgba(0,0,0,0.18);
          display: flex; flex-direction: column;
          transform: translateY(102%); transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        :global([data-theme='dark']) .sheet { background: #262626; }
        .sheet.open { transform: none; }
        .handle { width: 36px; height: 4px; border-radius: 2px; background: #c7c7c7; margin: 8px auto 6px; }
        .sheet-title { text-align: center; font-weight: 700; font-size: 14px; padding-bottom: 8px; border-bottom: 0.5px solid rgba(128,128,128,0.25); }
        .comments { flex: 1; overflow: hidden; padding: 10px 12px; display: flex; flex-direction: column; gap: 12px; }
        .comment { display: flex; gap: 9px; align-items: flex-start; animation: igIn 0.3s ease-out; }
        .comment.reply { margin: 8px 0 0 38px; }
        .c-body { flex: 1; display: flex; flex-direction: column; gap: 1px; font-size: 12.5px; line-height: 1.35; min-width: 0; }
        .c-user { font-weight: 600; font-size: 12px; }
        .c-user em { font-style: normal; font-weight: 400; opacity: 0.5; margin-left: 4px; }
        .badge { display: inline-flex; width: 11px; height: 11px; border-radius: 50%; background: #0095f6; color: #fff; font-size: 7px; align-items: center; justify-content: center; vertical-align: 1px; }
        .composer { border-top: 0.5px solid rgba(128,128,128,0.25); padding: 8px 12px 22px; }
        .emojis { display: flex; justify-content: space-between; font-size: 18px; padding-bottom: 8px; }
        .c-input { display: flex; align-items: center; gap: 9px; }
        .field { flex: 1; padding: 8px 12px; border-radius: 20px; border: 0.5px solid rgba(128,128,128,0.4); font-size: 13px; }
        .field.ph { opacity: 0.5; }
        .caret { display: inline-block; width: 1.5px; height: 14px; background: #0095f6; margin-left: 1px; vertical-align: -2px; animation: igBlink 0.9s step-end infinite; }
        @keyframes igIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes igBlink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .sheet { transition: none; } .comment { animation: none; } }
      `}</style>
    </div>
  );
}

/** iOS notification banner for an Instagram DM. */
export function IgNotification({ show, title, body, when }: { show: boolean; title: string; body: string; when: string }) {
  return (
    <div className={`notif ${show ? 'show' : ''}`}>
      <span className="app-icon"><InstagramGlyph size={17} color="#fff" /></span>
      <div className="n-body">
        <div className="n-top"><strong>{title}</strong><span>{when}</span></div>
        <div className="n-text">{body}</div>
      </div>
      <style jsx>{`
        .notif {
          position: absolute; top: 44px; left: 8px; right: 8px; z-index: 30;
          display: flex; gap: 9px; align-items: center; padding: 10px 12px;
          border-radius: 20px; font-family: ${FONT}; color: #000;
          background: rgba(245, 245, 247, 0.82); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
          transform: translateY(-140%); opacity: 0;
          transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.25, 1.1), opacity 0.3s;
        }
        :global([data-theme='dark']) .notif { background: rgba(40, 40, 44, 0.82); color: #fff; }
        .notif.show { transform: none; opacity: 1; }
        .app-icon { width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%); }
        .n-body { flex: 1; min-width: 0; }
        .n-top { display: flex; justify-content: space-between; font-size: 12.5px; }
        .n-top span { opacity: 0.5; font-size: 11px; }
        .n-text { font-size: 12.5px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (prefers-reduced-motion: reduce) { .notif { transition: none; } }
      `}</style>
    </div>
  );
}

export type IgDm = { from: 'them' | 'me'; text: string; at: number; buttons?: string[]; pressedAt?: number };

/** Instagram Direct conversation, seen from the follower's side. */
export function IgDmThread(props: {
  now: number;
  name: string;
  status: string;
  messages: IgDm[];
  typing?: [number, number][];
  placeholder: string;
  divider?: string;
}) {
  const { now, messages } = props;
  const shown = messages.filter((m) => now >= m.at);
  const isTyping = (props.typing ?? []).some(([a, b]) => now >= a && now < b);
  return (
    <div className="dm">
      <div className="dm-head">
        <ChevronLeft size={26} />
        <Avatar size={30} />
        <div className="dm-id">
          <strong>{props.name}</strong>
          <span>{props.status}</span>
        </div>
        <Phone size={20} />
        <Video size={22} />
      </div>
      <div className="dm-body">
        {props.divider && <div className="divider">{props.divider}</div>}
        {shown.map((m, i) => {
          const lastOfGroup = m.from === 'them' && shown[i + 1]?.from !== 'them' && !(isTyping && i === shown.length - 1);
          return (
            <div key={i} className={`row ${m.from}`}>
              {m.from === 'them' && <span className="av-slot">{lastOfGroup && <Avatar size={24} />}</span>}
              <div className="stack">
                <div className={`bubble ${m.from} ${m.buttons ? 'has-buttons' : ''}`}>{m.text}</div>
                {m.buttons?.map((b, bi) => (
                  <div key={b} className={`tpl-btn ${m.pressedAt !== undefined && now >= m.pressedAt && bi === 0 ? 'pressed' : ''}`}>{b}</div>
                ))}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="row them">
            <span className="av-slot"><Avatar size={24} /></span>
            <div className="bubble them typing"><i /><i /><i /></div>
          </div>
        )}
      </div>
      <div className="dm-input">
        <span className="cam"><Camera size={17} color="#fff" /></span>
        <span className="ph">{props.placeholder}</span>
        <Mic size={19} />
        <ImageIcon size={19} />
        <Smile size={19} />
      </div>

      <style jsx>{`
        .dm { position: absolute; inset: 0; padding-top: 50px; display: flex; flex-direction: column; background: #fff; color: #000; font-family: ${FONT}; }
        :global([data-theme='dark']) .dm { background: #000; color: #f5f5f5; }
        .dm-head { display: flex; align-items: center; gap: 8px; padding: 6px 12px 10px 6px; border-bottom: 0.5px solid rgba(128,128,128,0.2); }
        .dm-id { flex: 1; display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
        .dm-id strong { font-size: 14px; }
        .dm-id span { font-size: 11.5px; opacity: 0.55; }
        .dm-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; padding: 10px 10px 8px; }
        .divider { text-align: center; font-size: 11px; opacity: 0.5; font-weight: 600; margin-bottom: 8px; }
        .row { display: flex; align-items: flex-end; gap: 6px; animation: dmIn 0.3s ease-out; }
        .row.me { justify-content: flex-end; }
        .av-slot { width: 24px; flex-shrink: 0; }
        .stack { display: flex; flex-direction: column; gap: 3px; max-width: 76%; }
        .row.me .stack { align-items: flex-end; }
        .bubble { padding: 8px 12px; border-radius: 20px; font-size: 13px; line-height: 1.35; }
        .bubble.them { background: #efefef; }
        :global([data-theme='dark']) .bubble.them { background: #262626; }
        .bubble.me { color: #fff; background: linear-gradient(180deg, #a334fa 0%, #7a3cf2 45%, #3b82f6 100%); }
        .bubble.has-buttons { border-radius: 20px 20px 20px 6px; }
        .tpl-btn { text-align: center; padding: 8px 12px; border-radius: 14px; font-size: 12.5px; font-weight: 600; color: #0095f6; background: #efefef; transition: transform 0.15s, background 0.15s; }
        :global([data-theme='dark']) .tpl-btn { background: #262626; }
        .tpl-btn.pressed { transform: scale(0.95); background: #dbdbdb; }
        :global([data-theme='dark']) .tpl-btn.pressed { background: #3a3a3a; }
        .typing { display: inline-flex; gap: 4px; padding: 12px 14px; }
        .typing i { width: 6px; height: 6px; border-radius: 50%; background: #8e8e8e; animation: dmDot 1.2s infinite ease-in-out; }
        .typing i:nth-child(2) { animation-delay: 0.15s; }
        .typing i:nth-child(3) { animation-delay: 0.3s; }
        .dm-input { margin: 4px 10px 26px; display: flex; align-items: center; gap: 10px; padding: 5px 12px 5px 5px; border-radius: 22px; background: #efefef; }
        :global([data-theme='dark']) .dm-input { background: #262626; }
        .cam { width: 30px; height: 30px; border-radius: 50%; background: #3797f0; display: flex; align-items: center; justify-content: center; }
        .ph { flex: 1; min-width: 0; font-size: 13px; opacity: 0.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        @keyframes dmIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes dmDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-3px); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .row, .typing i { animation: none; } }
      `}</style>
    </div>
  );
}
