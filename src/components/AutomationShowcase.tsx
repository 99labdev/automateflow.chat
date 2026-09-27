'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Instagram, UserCheck, Shuffle } from 'lucide-react';
import McpPrompt from '@/components/McpPrompt';
import IPhone from '@/components/phone/IPhone';
import { IgPostScreen, IgNotification, IgDmThread, type IgComment, type IgDm } from '@/components/phone/Instagram';
import { useSceneClock, typed } from '@/components/phone/useSceneClock';

const USERNAME = 'automateflow';
const FOLLOWER = 'maria.silva';

// Scene timings (ms). Each tab plays its own scene on a loop.
const T = {
  sheet: 900,
  typeStart: 1500,
  commentSent: 2500,
  reply: 3300,
  notif: 4300,
  dm: 5900,
  firstDm: 6300,
  press: 7600,
  followReply: 7900,
  typing: [8100, 9100] as [number, number],
  delivered: 9100,
};
const DURATIONS = [10500, 12800, 7800];

export default function AutomationShowcase() {
  const t = useTranslations('agentsShowcase');
  const a = (k: string) => t(`automationSection.${k}`);
  const [active, setActive] = useState(0);
  const { ref, now } = useSceneClock(DURATIONS[active], () => {}, active);

  const automations = [
    { key: 'commentToDm', icon: Instagram },
    { key: 'requireFollow', icon: UserCheck },
    { key: 'variations', icon: Shuffle },
  ];

  const linkButtons = t.raw('automationSection.linkButtons') as string[];
  const replyVariations = t.raw('automationSection.replyVariations') as string[];
  const comment = a('comment1').toUpperCase();

  let comments: IgComment[];
  let composerText = '';
  if (active === 2) {
    comments = [
      { user: 'ana.lima', text: a('comment1'), at: 900, reply: { text: replyVariations[0], at: 2600 } },
      { user: 'leo.art', text: a('comment2'), at: 1500, reply: { text: replyVariations[1], at: 3400 } },
      { user: 'bia.cria', text: `${a('comment1')} 🙏`, at: 2100, reply: { text: replyVariations[2], at: 4200 } },
    ];
  } else {
    comments = [
      { user: 'joao.dev', text: a('comment2'), at: 0 },
      { user: FOLLOWER, text: comment, at: T.commentSent, reply: { text: a('commentReply'), at: T.reply } },
    ];
    composerText = now < T.commentSent ? typed(now, T.typeStart, comment, 140) : '';
  }

  const dmMessages: IgDm[] =
    active === 0
      ? [{ from: 'them', text: a('dmText'), at: T.firstDm, buttons: linkButtons }]
      : [
          { from: 'them', text: a('dmGreeting'), at: T.firstDm, buttons: [a('followButton')], pressedAt: T.press },
          { from: 'me', text: a('followButton'), at: T.followReply },
          { from: 'them', text: a('dmText'), at: T.delivered, buttons: linkButtons },
        ];

  const showDm = active !== 2 && now >= T.dm;
  const notifBody = active === 0 ? a('dmText') : a('dmGreeting');

  return (
    <section id="instagram-automation" className="section instagram-automation-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{a('step')}</span></div>
        <h2 className="section-title">{a('title')}</h2>
        <p className="section-subtitle">{a('subtitle')}</p>
        <div className="text-center"><McpPrompt text={a('prompt')} /></div>

        <div className="automation-grid">
          <div className="agent-demo" ref={ref} aria-hidden="true">
            <IPhone>
              <IgPostScreen
                now={now}
                username={USERNAME}
                mediaText={a('postText')}
                likes={`1.234 ${a('likes')}`}
                sheetAt={active === 2 ? 600 : T.sheet}
                commentsTitle={a('commentsTitle')}
                comments={comments}
                composer={{ typedText: composerText }}
                placeholder={a('commentPlaceholder')}
                postLabel={a('postLabel')}
                nowLabel={a('now')}
              />
              <div className={`dm-layer ${showDm ? 'in' : ''}`}>
                <IgDmThread
                  now={now}
                  name={USERNAME}
                  status={a('dmActive')}
                  messages={dmMessages}
                  typing={active === 1 ? [T.typing] : []}
                  placeholder={a('dmPlaceholder')}
                />
              </div>
              <IgNotification
                show={active !== 2 && now >= T.notif && now < T.dm}
                title={USERNAME}
                body={notifBody}
                when={a('now')}
              />
            </IPhone>
          </div>

          <div className="agents-tabs">
            {automations.map(({ key, icon: Icon }, index) => (
              <button
                key={key}
                className={`agent-tab ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
              >
                <div className="agent-tab-icon"><Icon size={24} /></div>
                <div className="agent-tab-content">
                  <h3 className="agent-tab-title">{t(`automations.${key}.title`)}</h3>
                  <p className="agent-tab-desc">{t(`automations.${key}.description`)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .instagram-automation-section { background: var(--bg-primary); overflow: hidden; scroll-margin-top: 100px; }
        .automation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .agent-demo { display: flex; justify-content: center; }
        .dm-layer { position: absolute; inset: 0; z-index: 20; transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .dm-layer.in { transform: none; }

        .agents-tabs { display: flex; flex-direction: column; gap: 16px; }
        .agent-tab {
          display: flex; align-items: center; gap: 16px; padding: 20px 24px; text-align: left; cursor: pointer;
          background: var(--surface-color); border: 2px solid var(--border-color); border-radius: var(--radius-xl);
          transition: all 0.3s ease;
        }
        .agent-tab:hover { border-color: var(--primary-color); transform: translateX(-8px); }
        .agent-tab.active { border-color: var(--primary-color); background: var(--secondary-color); box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15); }
        .agent-tab-icon {
          width: 50px; height: 50px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          background: var(--primary-color); color: white; transition: transform 0.3s ease;
        }
        .agent-tab.active .agent-tab-icon { transform: scale(1.1); }
        .agent-tab-content { flex: 1; }
        .agent-tab-title { font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
        .agent-tab-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.4; }

        @media (max-width: 1024px) {
          .automation-grid { grid-template-columns: 1fr; gap: 40px; }
          .agent-demo { order: -1; }
          .agent-tab:hover { transform: translateX(8px); }
        }
        @media (max-width: 768px) {
          .agent-tab { padding: 16px; }
          .agent-tab-icon { width: 44px; height: 44px; }
          .agent-tab-title { font-size: 1rem; }
          .agent-tab-desc { font-size: 0.8rem; }
        }
        @media (prefers-reduced-motion: reduce) { .dm-layer { transition: none; } }
      `}</style>
    </section>
  );
}
