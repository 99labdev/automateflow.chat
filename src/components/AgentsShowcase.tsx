'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Timer, Brain, Settings, BookOpen } from 'lucide-react';
import IPhone from '@/components/phone/IPhone';
import { IgDmThread } from '@/components/phone/Instagram';
import { WaThread } from '@/components/phone/WhatsApp';
import { useSceneClock, typed } from '@/components/phone/useSceneClock';

const AGENTS = [
  { key: 'multichannel', icon: Timer }, // follow-up runs in Instagram DM
  { key: 'aimodels', icon: Brain },
  { key: 'integrations', icon: Settings },
  { key: 'leadcapture', icon: BookOpen },
];

const CHAR_MS = 55;
const TYPE_START = 1300;

// WhatsApp scene: agent greets, the customer types and sends, the agent types back.
function waTimeline(replyLen: number) {
  const sent = TYPE_START + replyLen * CHAR_MS + 300;
  return { sent, read: sent + 700, typing: [sent + 900, sent + 2300] as [number, number], answer: sent + 2300, end: sent + 6300 };
}

// Instagram follow-up scene: a timed message lands, the follower replies, the offer follows.
const IG = { first: 500, reply: 2100, typing: [2700, 3900] as [number, number], answer: 3900, end: 8500 };

export default function AgentsShowcase() {
  const t = useTranslations('agentsShowcase');
  const [active, setActive] = useState(0);
  const { key } = AGENTS[active];
  const msg = (n: number) => t(`agents.${key}.${key}Msg${n}`);
  const isFollowUp = key === 'multichannel';
  const wa = waTimeline(msg(2).length);
  const { ref, now } = useSceneClock(isFollowUp ? IG.end : wa.end, () => {}, active);

  return (
    <section id="agents-showcase" className="section agents-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="agents-grid">
          <div className="agents-tabs">
            {AGENTS.map(({ key: k, icon: Icon }, index) => (
              <button key={k} className={`agent-tab ${active === index ? 'active' : ''}`} onClick={() => setActive(index)}>
                <div className="agent-tab-icon"><Icon size={24} /></div>
                <div className="agent-tab-content">
                  <h3 className="agent-tab-title">{t(`agents.${k}.title`)}</h3>
                  <p className="agent-tab-desc">{t(`agents.${k}.description`)}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="agent-demo" ref={ref} aria-hidden="true">
            <IPhone>
              {isFollowUp ? (
                <IgDmThread
                  now={now}
                  name="automateflow"
                  status={t('automationSection.dmActive')}
                  divider={`${t('phone.today')} 18:00`}
                  messages={[
                    { from: 'them', text: msg(1), at: IG.first },
                    { from: 'me', text: msg(2), at: IG.reply },
                    { from: 'them', text: msg(3), at: IG.answer, buttons: [t('phone.followupButton')] },
                  ]}
                  typing={[IG.typing]}
                  placeholder={t('phone.message')}
                />
              ) : (
                <WaThread
                  now={now}
                  name={t('phone.agentName')}
                  online={t('phone.online')}
                  typingLabel={t('phone.typing')}
                  messages={[
                    { from: 'them', text: msg(1), at: 500, time: '9:41' },
                    { from: 'me', text: msg(2), at: wa.sent, time: '9:42', readAt: wa.read },
                    { from: 'them', text: msg(3), at: wa.answer, time: '9:42' },
                  ]}
                  typing={[wa.typing]}
                  composerText={now < wa.sent ? typed(now, TYPE_START, msg(2), CHAR_MS) : ''}
                />
              )}
            </IPhone>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agents-section { background: var(--bg-primary); overflow: hidden; }
        .agents-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .agent-demo { display: flex; justify-content: center; }

        .agents-tabs { display: flex; flex-direction: column; gap: 16px; }
        .agent-tab {
          display: flex; align-items: center; gap: 16px; padding: 20px 24px; text-align: left; cursor: pointer;
          background: var(--surface-color); border: 2px solid var(--border-color); border-radius: var(--radius-xl);
          transition: all 0.3s ease;
        }
        .agent-tab:hover { border-color: var(--primary-color); transform: translateX(8px); }
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
          .agents-grid { grid-template-columns: 1fr; gap: 40px; }
          .agent-demo { order: -1; }
        }
        @media (max-width: 768px) {
          .agent-tab { padding: 16px; }
          .agent-tab-icon { width: 44px; height: 44px; }
          .agent-tab-title { font-size: 1rem; }
          .agent-tab-desc { font-size: 0.8rem; }
        }
      `}</style>
    </section>
  );
}
