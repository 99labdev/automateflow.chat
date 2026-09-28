'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Plus, SlidersHorizontal, Mic, ChevronDown, ChevronRight } from 'lucide-react';
import { MCP_CLIENT_LOGOS } from '@/components/mcpClientLogos';

type App = 'claude' | 'chatgpt';

// Real AutomateFlow MCP tool names per scene (see app repo automateflow/mcp_server).
const SCENES = [
  { key: 's1', tools: ['create_publication', 'create_automation'] },
  { key: 's2', tools: ['create_lead_capture', 'create_page_link'] },
  { key: 's3', tools: ['create_followup', 'create_followup_step'] },
];

// Timeline (ms). The whole scene is a pure function of elapsed time.
const TYPE_START = 500;
const CHAR_MS = 28;
const SEND_PAUSE = 350;
const THINK_MS = 1100;
const TOOL_GAP = 1100;
const TOOL_RUN = 650;
const WORD_MS = 55;
const HOLD_MS = 3800;
const TICK = 50;

function timeline(promptLen: number, toolCount: number, wordCount: number) {
  const typed = TYPE_START + promptLen * CHAR_MS;
  const sent = typed + SEND_PAUSE;
  const toolsStart = sent + THINK_MS;
  const answerStart = toolsStart + toolCount * TOOL_GAP + 300;
  const end = answerStart + wordCount * WORD_MS + HOLD_MS;
  return { typed, sent, toolsStart, answerStart, end };
}

const logoPath = (name: string) => MCP_CLIENT_LOGOS.find((l) => l.name.startsWith(name))?.path ?? '';

export default function McpChatDemo() {
  const t = useTranslations('mcp.demo');
  const [app, setApp] = useState<App>('claude');
  const [scene, setScene] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { key, tools } = SCENES[scene];
  const prompt = t(`scenes.${key}.prompt`);
  const answerWords = t(`scenes.${key}.answer`).split(' ');
  const params = t.raw(`scenes.${key}.params`) as string[];
  const tl = timeline(prompt.length, tools.length, answerWords.length);
  const now = reduced ? tl.end : elapsed;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = setInterval(() => setElapsed((e) => e + TICK), TICK);
    return () => clearInterval(id);
  }, [visible, reduced]);

  // Auto-advance to the next scene once this one has been held on screen.
  useEffect(() => {
    if (elapsed >= tl.end) {
      setScene((s) => (s + 1) % SCENES.length);
      setElapsed(0);
    }
  }, [elapsed, tl.end]);

  const play = (next: { app?: App; scene?: number }) => {
    if (next.app) setApp(next.app);
    if (next.scene !== undefined) setScene(next.scene);
    setElapsed(0);
  };

  const typedChars = Math.max(0, Math.min(prompt.length, Math.floor((now - TYPE_START) / CHAR_MS)));
  const isSent = now >= tl.sent;
  const inputText = isSent ? '' : prompt.slice(0, typedChars);
  const thinking = isSent && now < tl.toolsStart;
  const toolState = tools.map((_, i) => {
    const start = tl.toolsStart + i * TOOL_GAP;
    if (now < start) return 'hidden';
    return now < start + TOOL_RUN ? 'running' : 'done';
  });
  const shownWords = now < tl.answerStart ? 0 : Math.min(answerWords.length, Math.floor((now - tl.answerStart) / WORD_MS) + 1);
  const streaming = shownWords > 0 && shownWords < answerWords.length;
  const claude = app === 'claude';

  return (
    <div className="demo" ref={rootRef}>
      <div className="demo-tabs" role="tablist">
        {(['claude', 'chatgpt'] as App[]).map((a) => (
          <button key={a} role="tab" aria-selected={app === a} className={`demo-tab ${app === a ? 'active' : ''}`} onClick={() => play({ app: a })}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d={logoPath(a === 'claude' ? 'Claude' : 'OpenAI')} fill="currentColor" />
            </svg>
            {a === 'claude' ? 'Claude' : 'ChatGPT'}
          </button>
        ))}
      </div>

      <div className={`win ${app}`} aria-hidden="true">
        <div className="win-bar">
          {claude ? (
            <span className="win-title">{t(`scenes.${key}.chip`)} <ChevronDown size={14} /></span>
          ) : (
            <span className="win-title">ChatGPT <ChevronDown size={14} /></span>
          )}
          <span className="win-connector"><img src="/logo.png" alt="" width={14} height={14} />AutomateFlow</span>
        </div>

        <div className="win-body">
          {isSent && <div className="msg-user">{prompt}</div>}

          {isSent && (
            <div className="msg-ai">
              {claude && (
                <svg className={`spark ${thinking || streaming ? 'spin' : ''}`} viewBox="0 0 24 24" width="22" height="22">
                  <path d={logoPath('Claude')} fill="#D97757" />
                </svg>
              )}
              <div className="msg-ai-content">
                {thinking && <span className="thinking">{claude ? t('claude.thinking') : t('chatgpt.thinking')}</span>}

                {tools.map((tool, i) =>
                  toolState[i] === 'hidden' ? null : claude ? (
                    <div key={tool} className="tool-claude">
                      <div className="tool-head">
                        <img src="/logo.png" alt="" width={14} height={14} />
                        <span className="tool-name">{tool}</span>
                        <span className="tool-result">{toolState[i] === 'done' ? t(`scenes.${key}.tools.t${i + 1}`) : ''}</span>
                        {toolState[i] === 'running' ? <span className="spinner" /> : <span className="ok">✓</span>}
                        {i === 0 ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </div>
                      {i === 0 && (
                        <pre className="tool-params">{params.join('\n')}</pre>
                      )}
                    </div>
                  ) : (
                    <div key={tool} className="tool-gpt">
                      <img src="/logo.png" alt="" width={14} height={14} />
                      <span className={toolState[i] === 'running' ? 'shimmer' : ''}>
                        {t('chatgpt.calledTool')} <code>{tool}</code>
                      </span>
                      {toolState[i] === 'done' && <span className="tool-result">· {t(`scenes.${key}.tools.t${i + 1}`)}</span>}
                      <ChevronRight size={13} />
                    </div>
                  ),
                )}

                {shownWords > 0 && <p className="answer">{answerWords.slice(0, shownWords).join(' ')}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="win-input">
          <span className={`input-text ${inputText ? '' : 'placeholder'}`}>
            {inputText || (claude ? t('claude.placeholder') : t('chatgpt.placeholder'))}
            {!isSent && typedChars > 0 && <span className="caret" />}
          </span>
          <div className="input-row">
            <span className="input-icons"><Plus size={16} />{claude ? <SlidersHorizontal size={15} /> : <Mic size={15} />}</span>
            <span className={`send ${inputText ? 'ready' : ''}`}><ArrowUp size={15} /></span>
          </div>
        </div>
      </div>

      <div className="demo-chips">
        <span className="demo-chips-label">{t('tryLabel')}</span>
        {SCENES.map((s, i) => (
          <button key={s.key} className={`demo-chip ${scene === i ? 'active' : ''}`} onClick={() => play({ scene: i })}>
            {t(`scenes.${s.key}.chip`)}
          </button>
        ))}
      </div>

      <style jsx>{`
        /* min-width: 0 so the parent grid cell can shrink below the chat's content width on mobile */
        .demo { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .demo-tabs { display: inline-flex; align-self: flex-start; gap: 4px; padding: 4px; border-radius: var(--radius-full); background: var(--secondary-color); border: 1px solid var(--border-color); }
        .demo-tab { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); transition: all var(--transition-fast); }
        .demo-tab.active { background: var(--card-bg); color: var(--text-primary); box-shadow: var(--shadow-sm); }

        .win { border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; height: 460px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; box-shadow: var(--shadow-xl); transition: background var(--transition-normal); }
        .win.claude { background: #faf9f5; color: #141413; border: 1px solid #e8e6dc; }
        .win.chatgpt { background: #ffffff; color: #0d0d0d; border: 1px solid #e5e5e5; }
        :global([data-theme='dark']) .win.claude { background: #262624; color: #faf9f5; border-color: #3a3935; }
        :global([data-theme='dark']) .win.chatgpt { background: #212121; color: #ececec; border-color: #333; }

        .win-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; font-size: 0.85rem; }
        .win-title { display: inline-flex; align-items: center; gap: 4px; font-weight: 600; }
        .win.claude .win-title { font-family: Georgia, 'Times New Roman', serif; font-weight: 500; }
        .win-connector { display: inline-flex; align-items: center; gap: 6px; font-size: 0.72rem; padding: 3px 8px; border-radius: var(--radius-full); border: 1px solid currentColor; opacity: 0.55; }
        .win-connector img, .tool-head img, .tool-gpt img { border-radius: 3px; }

        .win-body { flex: 1; overflow: hidden; padding: 4px 18px 8px; display: flex; flex-direction: column; justify-content: flex-end; gap: 14px; font-size: 0.88rem; line-height: 1.55; }
        .msg-user { align-self: flex-end; max-width: 85%; padding: 10px 14px; animation: pop 0.25s ease-out; }
        .win.claude .msg-user { background: #f0eee6; border-radius: 14px; }
        .win.chatgpt .msg-user { background: #f4f4f4; border-radius: 18px; }
        :global([data-theme='dark']) .win.claude .msg-user { background: #141413; }
        :global([data-theme='dark']) .win.chatgpt .msg-user { background: #303030; }

        .msg-ai { display: flex; gap: 10px; align-items: flex-start; }
        .msg-ai-content { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .spark { flex-shrink: 0; margin-top: 2px; }
        .spark.spin { animation: sparkSpin 1.6s ease-in-out infinite; }
        .thinking { opacity: 0.6; font-style: italic; }
        .win.chatgpt .thinking { font-style: normal; animation: shimmer 1.4s linear infinite; }

        .tool-claude { border-radius: 10px; border: 1px solid rgba(0,0,0,0.1); overflow: hidden; animation: pop 0.25s ease-out; }
        :global([data-theme='dark']) .tool-claude { border-color: rgba(255,255,255,0.12); }
        .tool-head { display: flex; align-items: center; gap: 8px; padding: 7px 10px; font-size: 0.78rem; }
        .tool-name { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight: 600; }
        .tool-result { opacity: 0.65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; }
        .tool-params { margin: 0; padding: 8px 12px; font: 0.72rem/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; background: rgba(0,0,0,0.035); border-top: 1px solid rgba(0,0,0,0.06); white-space: pre-wrap; }
        :global([data-theme='dark']) .tool-params { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); }
        .ok { color: #16a34a; font-weight: 700; }
        .spinner { width: 12px; height: 12px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; opacity: 0.5; animation: spinnerRot 0.7s linear infinite; }

        .tool-gpt { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; opacity: 0.7; animation: pop 0.25s ease-out; }
        .tool-gpt code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.76rem; }
        .shimmer { animation: shimmer 1.4s linear infinite; }

        .answer { margin: 2px 0 0; }

        .win-input { margin: 0 14px 14px; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }
        .win.claude .win-input { background: #ffffff; border: 1px solid #e8e6dc; border-radius: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .win.chatgpt .win-input { background: #ffffff; border: 1px solid #e5e5e5; border-radius: 26px; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
        :global([data-theme='dark']) .win.claude .win-input { background: #30302e; border-color: #3a3935; }
        :global([data-theme='dark']) .win.chatgpt .win-input { background: #303030; border-color: #3a3a3a; }
        .input-text { font-size: 0.86rem; min-height: 1.4em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .input-text.placeholder { opacity: 0.45; }
        .caret { display: inline-block; width: 1.5px; height: 1em; margin-left: 1px; vertical-align: text-bottom; background: currentColor; animation: blink 0.9s step-end infinite; }
        .input-row { display: flex; justify-content: space-between; align-items: center; }
        .input-icons { display: inline-flex; gap: 10px; opacity: 0.55; }
        .send { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0.35; transition: opacity var(--transition-fast); }
        .win.claude .send { background: #D97757; color: #fff; border-radius: 8px; }
        .win.chatgpt .send { background: #0d0d0d; color: #fff; }
        :global([data-theme='dark']) .win.chatgpt .send { background: #ececec; color: #0d0d0d; }
        .send.ready { opacity: 1; }

        .demo-chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .demo-chips-label { font-size: 0.8rem; color: var(--text-muted); }
        .demo-chip { padding: 6px 12px; border-radius: var(--radius-full); border: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-secondary); background: var(--card-bg); transition: all var(--transition-fast); }
        .demo-chip:hover { border-color: var(--primary-color); color: var(--primary-color); }
        .demo-chip.active { border-color: var(--primary-color); background: var(--secondary-color); color: var(--primary-color); font-weight: 600; }

        @keyframes pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes sparkSpin { 0%, 100% { transform: rotate(0) scale(1); } 50% { transform: rotate(180deg) scale(0.85); } }
        @keyframes spinnerRot { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        @keyframes blink { 50% { opacity: 0; } }

        @media (max-width: 768px) {
          .win { height: 440px; }
          .win-body { padding: 4px 12px 8px; font-size: 0.84rem; }
          .win-input { margin: 0 10px 10px; }
          .win-connector { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .msg-user, .tool-claude, .tool-gpt, .spark.spin, .spinner, .shimmer, .thinking, .caret { animation: none; }
        }
      `}</style>
    </div>
  );
}
