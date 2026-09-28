'use client';

import {
  Heart, MessageCircle, Send, Bookmark, ChevronLeft, MoreHorizontal, Phone, Video, Camera, Mic,
  Image as ImageIcon, Smile, Instagram as InstagramGlyph, Bell, UserPlus, Grid3x3, Clapperboard, SquareUser, X, Lock, ChevronDown,
} from 'lucide-react';
import { Tap, Caret } from '@/components/phone/Touch';

// Instagram screens for the phone mockups, authored at iPhone points (440 wide).
// Every piece is a pure function of `now` (ms into the scene).

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif";

export function Avatar({ size = 32, ring = false, letter, color }: { size?: number; ring?: boolean; letter?: string; color?: string }) {
  return (
    <span className={`av ${ring ? 'ring' : ''}`} style={{ width: size, height: size, ...(color ? { background: color } : {}) }}>
      {letter ? <span className="letter" style={{ fontSize: size * 0.42 }}>{letter}</span> : <img src="/logo.png" alt="" />}
      <style jsx>{`
        .av { position: relative; flex-shrink: 0; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: #efe9ff; }
        .av img { width: 68%; height: 68%; object-fit: contain; }
        .av.ring { padding: 3px; background: conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75); }
        .av.ring img { width: 100%; height: 100%; border-radius: 50%; background: #f4efff; padding: 12%; border: 3px solid #fff; }
        :global([data-theme='dark']) .av.ring img { border-color: #000; }
        .letter { font: 700 1em ${FONT}; color: #fff; }
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
  caption: string;
  sheetAt: number;
  commentsTitle: string;
  comments: IgComment[];
  typedComment: string;
  focused: boolean;
  keyboardUp: boolean;
  placeholder: string;
  postLabel: string;
  nowLabel: string;
  replyLabel: string;
  postTapAt?: number;
}) {
  const { now, comments } = props;
  return (
    <div className="ig">
      <div className="topbar">
        <ChevronLeft size={30} strokeWidth={2.2} />
        <span className="topbar-title">{props.postLabel}</span>
        <span style={{ width: 30 }} />
      </div>
      <div className="post-head">
        <Avatar ring size={38} />
        <span className="user">{props.username}</span>
        <MoreHorizontal size={22} />
      </div>
      <div className="media"><span className="media-text">{props.mediaText}</span></div>
      <div className="actions">
        <Heart size={27} fill="#ff3040" color="#ff3040" />
        <span className="count">1.234</span>
        <MessageCircle size={27} style={{ transform: 'scaleX(-1)' }} />
        <span className="count">87</span>
        <Send size={25} />
        <span style={{ flex: 1 }} />
        <Bookmark size={25} />
      </div>
      <div className="caption"><strong>{props.username}</strong> {props.caption}</div>

      <div className={`sheet ${now >= props.sheetAt ? 'open' : ''} ${props.keyboardUp ? 'lifted' : ''}`}>
        <span className="handle" />
        <div className="sheet-title">{props.commentsTitle}</div>
        <div className="comments">
          {comments.filter((c) => now >= c.at).map((c, i) => (
            <div key={c.user + i}>
              <div className="comment">
                <Avatar size={36} letter={c.user[0].toUpperCase()} color={LETTER_COLORS[i % LETTER_COLORS.length]} />
                <div className="c-body">
                  <span className="c-user">{c.user} <em>1 min</em></span>
                  <span className="c-text">{c.text}</span>
                  <span className="c-reply-link">{props.replyLabel}</span>
                </div>
                <Heart size={15} />
              </div>
              {c.reply && now >= c.reply.at && (
                <div className="comment reply">
                  <Avatar size={28} />
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
            <Avatar size={36} letter="M" color="#e11d48" />
            <span className="field">
              {props.typedComment ? props.typedComment : <span className="ph">{props.placeholder}</span>}
              {props.focused && <Caret />}
              <span className="publish" style={{ opacity: props.typedComment ? 1 : 0.35 }}>
                <Send size={17} color="#fff" />
                <Tap now={now} at={props.postTapAt} />
              </span>
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ig { position: absolute; inset: 0; padding-top: 62px; background: #fff; color: #000; font-family: ${FONT}; overflow: hidden; }
        :global([data-theme='dark']) .ig { background: #000; color: #f5f5f5; }
        .topbar { height: 50px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; }
        .topbar-title { font-weight: 700; font-size: 18px; }
        .post-head { display: flex; align-items: center; gap: 10px; padding: 8px 14px; }
        .user { flex: 1; font-weight: 600; font-size: 15px; }
        .media { height: 440px; display: flex; align-items: center; justify-content: center; padding: 40px; text-align: center; background: radial-gradient(circle at 30% 20%, #a78bfa, transparent 55%), linear-gradient(150deg, #7c3aed, #4f46e5 55%, #0f0a2e); }
        .media-text { color: #fff; font-weight: 800; font-size: 34px; line-height: 1.12; letter-spacing: -0.5px; text-shadow: 0 2px 20px rgba(0,0,0,0.25); }
        .actions { display: flex; align-items: center; gap: 8px; padding: 12px 14px 6px; }
        .count { font-size: 14px; font-weight: 600; margin-right: 10px; }
        .caption { padding: 2px 14px; font-size: 15px; line-height: 1.35; }

        .sheet {
          position: absolute; left: 0; right: 0; bottom: 0; height: 78%; z-index: 20;
          background: #fff; border-radius: 22px 22px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.18);
          display: flex; flex-direction: column;
          transform: translateY(102%); transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), bottom 0.32s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.32s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        :global([data-theme='dark']) .sheet { background: #262626; }
        .sheet.open { transform: none; }
        /* composer rides on top of the iOS keyboard (~334pt) */
        .sheet.lifted { bottom: 336px; height: 530px; border-radius: 22px 22px 0 0; }
        .sheet.lifted .composer { padding-bottom: 12px; }
        .handle { width: 40px; height: 5px; border-radius: 3px; background: #c7c7c7; margin: 10px auto 8px; }
        .sheet-title { text-align: center; font-weight: 700; font-size: 17px; padding-bottom: 12px; border-bottom: 0.5px solid rgba(128,128,128,0.25); }
        .comments { flex: 1; overflow: hidden; padding: 16px; display: flex; flex-direction: column; gap: 18px; }
        .comment { display: flex; gap: 12px; align-items: flex-start; animation: igIn 0.3s ease-out; }
        .comment.reply { margin: 14px 0 0 48px; }
        .c-body { flex: 1; display: flex; flex-direction: column; gap: 2px; font-size: 15px; line-height: 1.35; min-width: 0; }
        .c-user { font-weight: 600; font-size: 14px; }
        .c-user em { font-style: normal; font-weight: 400; opacity: 0.5; margin-left: 6px; }
        .c-reply-link { font-size: 13px; opacity: 0.5; font-weight: 600; margin-top: 4px; }
        .badge { display: inline-flex; width: 14px; height: 14px; border-radius: 50%; background: #0095f6; color: #fff; font-size: 9px; align-items: center; justify-content: center; vertical-align: 1px; }
        .composer { border-top: 0.5px solid rgba(128,128,128,0.25); padding: 10px 16px 40px; }
        .emojis { display: flex; justify-content: space-between; font-size: 26px; padding-bottom: 12px; }
        .c-input { display: flex; align-items: center; gap: 12px; }
        .field { flex: 1; display: flex; align-items: center; min-height: 44px; padding: 0 6px 0 16px; border-radius: 24px; border: 1px solid rgba(128,128,128,0.4); font-size: 16px; }
        .ph { opacity: 0.5; }
        .publish { position: relative; margin-left: auto; width: 34px; height: 34px; border-radius: 50%; background: #0095f6; display: flex; align-items: center; justify-content: center; }
        @keyframes igIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .sheet { transition: none; } .comment { animation: none; } }
      `}</style>
    </div>
  );
}

/** iOS notification banner for an Instagram DM. */
export function IgNotification({ now, show, title, body, when, tapAt }: { now: number; show: boolean; title: string; body: string; when: string; tapAt?: number }) {
  return (
    <div className={`notif ${show ? 'show' : ''}`}>
      <span className="app-icon"><InstagramGlyph size={24} color="#fff" /></span>
      <div className="n-body">
        <div className="n-top"><strong>{title}</strong><span>{when}</span></div>
        <div className="n-text">{body}</div>
      </div>
      <Tap now={now} at={tapAt} />
      <style jsx>{`
        .notif {
          position: absolute; top: 58px; left: 10px; right: 10px; z-index: 75;
          display: flex; gap: 12px; align-items: center; padding: 14px 16px;
          border-radius: 26px; font-family: ${FONT}; color: #000;
          background: rgba(245, 245, 247, 0.84); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%);
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          transform: translateY(-160%); opacity: 0;
          transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.25, 1.1), opacity 0.3s;
        }
        :global([data-theme='dark']) .notif { background: rgba(40, 40, 44, 0.84); color: #fff; }
        .notif.show { transform: none; opacity: 1; }
        .app-icon { width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%); }
        .n-body { flex: 1; min-width: 0; }
        .n-top { display: flex; justify-content: space-between; font-size: 16px; }
        .n-top span { opacity: 0.5; font-size: 14px; }
        .n-text { font-size: 16px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (prefers-reduced-motion: reduce) { .notif { transition: none; } }
      `}</style>
    </div>
  );
}

/**
 * A DM message. With `buttons` it renders as Instagram's button template
 * (text + stacked buttons in one card), which is what AutomateFlow sends.
 * `taps` lists the moments each button is tapped.
 */
export type IgDm = { from: 'them' | 'me'; text: string; at: number; buttons?: string[]; taps?: { button: number; at: number }[] };

/** Instagram Direct conversation, seen from the follower's side. */
export function IgDmThread(props: {
  now: number;
  name: string;
  status: string;
  messages: IgDm[];
  typing?: [number, number][];
  placeholder: string;
  divider?: string;
  headerTapAt?: number;
}) {
  const { now, messages } = props;
  const shown = messages.filter((m) => now >= m.at);
  const isTyping = (props.typing ?? []).some(([a, b]) => now >= a && now < b);
  return (
    <div className="dm">
      <div className="dm-head">
        <ChevronLeft size={32} strokeWidth={2.2} />
        <span className="who">
          <Avatar size={36} />
          <span className="dm-id">
            <strong>{props.name}</strong>
            <span>{props.status}</span>
          </span>
          <Tap now={now} at={props.headerTapAt} />
        </span>
        <Phone size={25} />
        <Video size={28} />
      </div>
      <div className="dm-body">
        {props.divider && <div className="divider">{props.divider}</div>}
        {shown.map((m, i) => {
          const lastOfGroup = m.from === 'them' && shown[i + 1]?.from !== 'them' && !(isTyping && i === shown.length - 1);
          return (
            <div key={i} className={`row ${m.from}`}>
              {m.from === 'them' && <span className="av-slot">{lastOfGroup && <Avatar size={28} />}</span>}
              {m.buttons ? (
                <div className="tpl">
                  <div className="tpl-text">{m.text}</div>
                  {m.buttons.map((b, bi) => {
                    const tap = m.taps?.find((tp) => tp.button === bi && now >= tp.at - 150 && now <= tp.at + 600);
                    return (
                      <div key={b} className={`tpl-btn ${tap ? 'pressed' : ''}`}>
                        {b}
                        <Tap now={now} at={tap?.at} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`bubble ${m.from}`}>{m.text}</div>
              )}
            </div>
          );
        })}
        {isTyping && (
          <div className="row them">
            <span className="av-slot"><Avatar size={28} /></span>
            <div className="bubble them typing"><i /><i /><i /></div>
          </div>
        )}
      </div>
      <div className="dm-input">
        <span className="cam"><Camera size={22} color="#fff" /></span>
        <span className="ph">{props.placeholder}</span>
        <Mic size={24} />
        <ImageIcon size={24} />
        <Smile size={24} />
      </div>

      <style jsx>{`
        .dm { position: absolute; inset: 0; padding-top: 62px; display: flex; flex-direction: column; background: #fff; color: #000; font-family: ${FONT}; }
        :global([data-theme='dark']) .dm { background: #000; color: #f5f5f5; }
        .dm-head { display: flex; align-items: center; gap: 14px; padding: 6px 18px 12px 8px; border-bottom: 0.5px solid rgba(128,128,128,0.2); }
        .who { position: relative; flex: 1; display: flex; align-items: center; gap: 10px; min-width: 0; }
        .dm-id { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
        .dm-id strong { font-size: 17px; }
        .dm-id span { font-size: 13px; opacity: 0.55; }
        .dm-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; gap: 6px; padding: 14px 14px 10px; }
        .divider { text-align: center; font-size: 13px; opacity: 0.5; font-weight: 600; margin-bottom: 10px; }
        .row { display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0; animation: dmIn 0.3s ease-out; }
        .row.me { justify-content: flex-end; }
        .av-slot { width: 28px; flex-shrink: 0; }
        .bubble { max-width: 74%; padding: 10px 15px; border-radius: 22px; font-size: 16px; line-height: 1.35; }
        .bubble.them { background: #efefef; }
        :global([data-theme='dark']) .bubble.them { background: #262626; }
        .bubble.me { color: #fff; background: linear-gradient(180deg, #a334fa 0%, #7a3cf2 45%, #3b82f6 100%); }
        .tpl { width: 74%; border-radius: 20px; overflow: hidden; background: #efefef; }
        :global([data-theme='dark']) .tpl { background: #262626; }
        .tpl-text { padding: 12px 15px 13px; font-size: 16px; line-height: 1.35; }
        .tpl-btn { position: relative; text-align: center; padding: 12px; font-size: 15.5px; font-weight: 600; border-top: 1px solid rgba(128,128,128,0.22); transition: background 0.15s; }
        .tpl-btn.pressed { background: rgba(128,128,128,0.2); }
        .typing { display: inline-flex; gap: 5px; padding: 15px 17px; }
        .typing i { width: 8px; height: 8px; border-radius: 50%; background: #8e8e8e; animation: dmDot 1.2s infinite ease-in-out; }
        .typing i:nth-child(2) { animation-delay: 0.15s; }
        .typing i:nth-child(3) { animation-delay: 0.3s; }
        .dm-input { margin: 4px 12px 40px; display: flex; align-items: center; gap: 14px; padding: 6px 16px 6px 6px; border-radius: 26px; background: #efefef; }
        :global([data-theme='dark']) .dm-input { background: #262626; }
        .cam { width: 38px; height: 38px; border-radius: 50%; background: #3797f0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ph { flex: 1; min-width: 0; font-size: 16px; opacity: 0.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        @keyframes dmIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes dmDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .row, .typing i { animation: none; } }
      `}</style>
    </div>
  );
}

/** Instagram profile of the business account, with the Follow button. */
export function IgProfile(props: {
  now: number;
  username: string;
  name: string;
  bio: string;
  stats: { value: string; label: string }[];
  followLabel: string;
  followingLabel: string;
  messageLabel: string;
  followTapAt: number;
  backTapAt?: number;
}) {
  const { now } = props;
  const following = now >= props.followTapAt + 150;
  return (
    <div className="profile">
      <div className="p-head">
        <span className="back"><ChevronLeft size={32} strokeWidth={2.2} /><Tap now={now} at={props.backTapAt} /></span>
        <strong>{props.username}</strong>
        <span style={{ flex: 1 }} />
        <Bell size={26} />
        <MoreHorizontal size={26} />
      </div>
      <div className="p-top">
        <Avatar ring size={88} />
        <div className="stats">
          {props.stats.map((s) => (
            <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
          ))}
        </div>
      </div>
      <div className="p-name">{props.name}</div>
      <div className="p-bio">{props.bio}</div>
      <div className="p-actions">
        <span className={`btn ${following ? 'following' : 'follow'}`}>
          {following ? <>{props.followingLabel} <ChevronDown size={16} /></> : props.followLabel}
          <Tap now={now} at={props.followTapAt} />
        </span>
        <span className="btn secondary">{props.messageLabel}</span>
        <span className="btn icon"><UserPlus size={18} /></span>
      </div>
      <div className="tabs">
        <span className="active"><Grid3x3 size={26} /></span>
        <span><Clapperboard size={26} /></span>
        <span><SquareUser size={26} /></span>
      </div>
      <div className="grid">
        {Array.from({ length: 9 }).map((_, i) => <span key={i} className={`tile t${i % 5}`} />)}
      </div>
      <style jsx>{`
        .profile { position: absolute; inset: 0; padding-top: 62px; background: #fff; color: #000; font-family: ${FONT}; overflow: hidden; }
        :global([data-theme='dark']) .profile { background: #000; color: #f5f5f5; }
        .p-head { display: flex; align-items: center; gap: 18px; padding: 6px 16px 10px 8px; font-size: 20px; }
        .back { position: relative; display: inline-flex; }
        .p-top { display: flex; align-items: center; gap: 14px; padding: 10px 16px; }
        .stats { flex: 1; display: flex; justify-content: space-around; text-align: center; }
        .stats div { display: flex; flex-direction: column; }
        .stats strong { font-size: 17px; }
        .stats span { font-size: 13px; }
        .p-name { padding: 4px 18px 0; font-size: 15px; font-weight: 600; }
        .p-bio { padding: 2px 18px; font-size: 15px; line-height: 1.35; }
        .p-actions { display: flex; gap: 8px; padding: 14px 18px; }
        .btn { position: relative; flex: 1; height: 36px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; font-size: 15px; font-weight: 600; transition: background 0.2s, color 0.2s; }
        .btn.follow { background: #0095f6; color: #fff; }
        .btn.following, .btn.secondary, .btn.icon { background: #efefef; color: inherit; }
        :global([data-theme='dark']) .btn.following, :global([data-theme='dark']) .btn.secondary, :global([data-theme='dark']) .btn.icon { background: #262626; }
        .btn.icon { flex: 0 0 38px; }
        .tabs { display: flex; justify-content: space-around; border-top: 0.5px solid rgba(128,128,128,0.2); margin-top: 10px; }
        .tabs span { flex: 1; display: flex; justify-content: center; padding: 12px 0; opacity: 0.45; }
        .tabs .active { opacity: 1; border-bottom: 1.5px solid currentColor; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .tile { aspect-ratio: 3 / 4; }
        .t0 { background: linear-gradient(150deg, #7c3aed, #4f46e5); }
        .t1 { background: linear-gradient(150deg, #f97316, #db2777); }
        .t2 { background: linear-gradient(150deg, #0ea5e9, #6366f1); }
        .t3 { background: linear-gradient(150deg, #10b981, #0ea5e9); }
        .t4 { background: linear-gradient(150deg, #1f2937, #7c3aed); }
      `}</style>
    </div>
  );
}

/** Instagram's in-app browser chrome around a web page. */
export function IgBrowser({ title, domain, children }: { title: string; domain: string; children: React.ReactNode }) {
  return (
    <div className="browser">
      <div className="b-bar">
        <X size={28} />
        <div className="b-title">
          <strong>{title}</strong>
          <span><Lock size={11} /> {domain}</span>
        </div>
        <MoreHorizontal size={26} />
      </div>
      <div className="b-page">{children}</div>
      <style jsx>{`
        .browser { position: absolute; inset: 0; display: flex; flex-direction: column; background: #fff; font-family: ${FONT}; color: #000; }
        .b-bar { display: flex; align-items: center; gap: 12px; padding: 62px 16px 10px; background: #fff; border-bottom: 0.5px solid rgba(0,0,0,0.12); }
        .b-title { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; line-height: 1.25; }
        .b-title strong { font-size: 15px; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .b-title span { font-size: 12px; opacity: 0.55; display: inline-flex; align-items: center; gap: 3px; }
        .b-page { position: relative; flex: 1; overflow: hidden; }
      `}</style>
    </div>
  );
}
