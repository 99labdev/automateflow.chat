'use client';

import { useTranslations } from 'next-intl';
import { Instagram, UserCheck, Magnet, Filter } from 'lucide-react';
import McpPrompt from '@/components/McpPrompt';
import IPhone from '@/components/phone/IPhone';
import { IgPostScreen, IgNotification, IgDmThread, IgProfile, IgBrowser } from '@/components/phone/Instagram';
import { LeadCapturePage, FunnelPage, type CaptureCopy, type FunnelCopy } from '@/components/phone/AutomateFlowPages';
import { IosKeyboard } from '@/components/phone/Touch';
import { useSceneClock, typed } from '@/components/phone/useSceneClock';

const USERNAME = 'automateflow';
const FOLLOWER = 'maria.silva';

// One continuous scene, the way AutomateFlow runs it in production:
// comment -> DM with follow gate -> not following yet -> follow on profile ->
// tap again -> 3 link buttons -> lead capture page -> funnel.
const T = {
  sheet: 600,
  commentFocus: 1100,
  commentType: 1300,
  commentPost: 2400,
  reply: 3300,
  notif: 4300,
  notifTap: 5600,
  dm: 6000,
  dmFirst: 6400,
  // follow gate
  gateTap1: 7800,
  gateEcho1: 8000,
  gateTyping1: [8300, 9300] as [number, number],
  notFollowing: 9300,
  headerTap: 10800,
  profileIn: 11100,
  followTap: 12400,
  backTap: 13600,
  profileOut: 13800,
  gateTap2: 14700,
  gateEcho2: 14900,
  gateTyping2: [15200, 16200] as [number, number],
  delivered: 16200,
  // capture
  materialTap: 17500,
  browserIn: 17900,
  nameFocus: 18800,
  nameType: 19000,
  emailFocus: 20300,
  emailType: 20400,
  phoneFocus: 22200,
  phoneType: 22300,
  keyboardDown: 23900,
  submitTap: 24500,
  // funnel
  funnelIn: 25100,
  continue1: 27600,
  step2: 27800,
  continue2: 30800,
  step3: 31000,
  primaryTap: 33000,
  end: 37500,
};

const STAGES = [
  { key: 'commentToDm', icon: Instagram, start: 0 },
  { key: 'requireFollow', icon: UserCheck, start: 7600 },
  { key: 'leadCapture', icon: Magnet, start: 17300 },
  { key: 'funnel', icon: Filter, start: 25000 },
];

export default function AutomationShowcase() {
  const t = useTranslations('agentsShowcase');
  const a = (k: string) => t(`automationSection.${k}`);
  const f = (k: string) => t(`automationSection.flow.${k}`);
  const { ref, now, seek } = useSceneClock(T.end, () => {}, 0);

  const stage = STAGES.reduce((cur, s, i) => (now >= s.start ? i : cur), 0);
  const keyword = a('comment1').toUpperCase();
  const buttons = t.raw('automationSection.flow.buttons') as string[];
  const followButton = f('followButton');
  const capture = t.raw('automationSection.flow.capture') as CaptureCopy;
  const values = t.raw('automationSection.flow.values') as { name: string; email: string; phone: string };
  const funnel = t.raw('automationSection.flow.funnel') as FunnelCopy;
  const profile = t.raw('automationSection.flow.profile') as {
    name: string; bio: string; stats: { value: string; label: string }[]; follow: string; following: string; message: string;
  };

  const commentFocused = now >= T.commentFocus && now < T.commentPost;
  const formField = now >= T.keyboardDown ? null : now >= T.phoneFocus ? 'phone' : now >= T.emailFocus ? 'email' : now >= T.nameFocus ? 'name' : null;
  const keyboardUp = commentFocused || formField !== null;
  const inBrowser = now >= T.browserIn;
  const funnelStep: 1 | 2 | 3 = now >= T.step3 ? 3 : now >= T.step2 ? 2 : 1;

  return (
    <section id="instagram-automation" className="section instagram-automation-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{a('step')}</span></div>
        <h2 className="section-title">{a('title')}</h2>
        <p className="section-subtitle">{a('subtitle')}</p>
        <div className="text-center"><McpPrompt text={a('prompt')} /></div>

        <div className="automation-grid">
          <div className="agent-demo" ref={ref} aria-hidden="true">
            <IPhone statusTone={inBrowser ? 'ink' : 'dark'}>
              <IgPostScreen
                now={now}
                username={USERNAME}
                mediaText={a('postText')}
                caption={f('caption')}
                sheetAt={T.sheet}
                commentsTitle={a('commentsTitle')}
                comments={[
                  { user: 'joao.dev', text: a('comment2'), at: 0 },
                  { user: FOLLOWER, text: keyword, at: T.commentPost, reply: { text: a('commentReply'), at: T.reply } },
                ]}
                typedComment={now < T.commentPost ? typed(now, T.commentType, keyword, 160) : ''}
                focused={commentFocused}
                keyboardUp={commentFocused}
                placeholder={a('commentPlaceholder')}
                postLabel={a('postLabel')}
                nowLabel={a('now')}
                replyLabel={f('reply')}
                postTapAt={T.commentPost - 100}
              />

              <div className={`layer from-right ${now >= T.dm ? 'in' : ''}`}>
                <IgDmThread
                  now={now}
                  name={USERNAME}
                  status={a('dmActive')}
                  headerTapAt={T.headerTap}
                  placeholder={a('dmPlaceholder')}
                  typing={[T.gateTyping1, T.gateTyping2]}
                  messages={[
                    { from: 'them', text: f('dmMessage'), at: T.dmFirst, buttons: [followButton], taps: [{ button: 0, at: T.gateTap1 }, { button: 0, at: T.gateTap2 }] },
                    { from: 'me', text: followButton, at: T.gateEcho1 },
                    { from: 'them', text: f('notFollowing'), at: T.notFollowing },
                    { from: 'me', text: followButton, at: T.gateEcho2 },
                    { from: 'them', text: f('delivered'), at: T.delivered, buttons, taps: [{ button: 0, at: T.materialTap }] },
                  ]}
                />
              </div>

              <div className={`layer from-right ${now >= T.profileIn && now < T.profileOut ? 'in' : ''}`}>
                <IgProfile
                  now={now}
                  username={USERNAME}
                  name={profile.name}
                  bio={profile.bio}
                  stats={profile.stats}
                  followLabel={profile.follow}
                  followingLabel={profile.following}
                  messageLabel={profile.message}
                  followTapAt={T.followTap}
                  backTapAt={T.backTap}
                />
              </div>

              <div className={`layer from-bottom ${inBrowser ? 'in' : ''}`}>
                <IgBrowser title={f('browserTitle')} domain="app.automateflow.chat">
                  <div className={`page ${now < T.funnelIn ? 'shown' : ''}`}>
                    <LeadCapturePage
                      now={now}
                      copy={capture}
                      focus={formField}
                      lifted={formField !== null}
                      submitTapAt={T.submitTap}
                      values={{
                        name: typed(now, T.nameType, values.name, 90),
                        email: typed(now, T.emailType, values.email, 70),
                        phone: typed(now, T.phoneType, values.phone, 90),
                      }}
                    />
                  </div>
                  <div className={`page ${now >= T.funnelIn ? 'shown' : ''}`}>
                    <FunnelPage
                      now={now}
                      copy={funnel}
                      step={funnelStep}
                      continueTapAt={funnelStep === 1 ? T.continue1 : funnelStep === 2 ? T.continue2 : undefined}
                      primaryTapAt={T.primaryTap}
                    />
                  </div>
                </IgBrowser>
              </div>

              <IosKeyboard show={keyboardUp} spaceLabel={f('keyboard.space')} returnLabel={f('keyboard.return')} />

              <IgNotification
                now={now}
                show={now >= T.notif && now < T.dm}
                title={USERNAME}
                body={f('dmMessage')}
                when={a('now')}
                tapAt={T.notifTap}
              />
            </IPhone>
          </div>

          <div className="agents-tabs">
            {STAGES.map(({ key, icon: Icon, start }, index) => (
              <button key={key} className={`agent-tab ${stage === index ? 'active' : ''}`} onClick={() => seek(start)}>
                <div className="agent-tab-icon"><Icon size={24} /></div>
                <div className="agent-tab-content">
                  <h3 className="agent-tab-title">{t(`automations.${key}.title`)}</h3>
                  <p className="agent-tab-desc">{t(`automations.${key}.description`)}</p>
                </div>
                <span className="stage-progress" style={{ transform: `scaleX(${stage === index ? Math.min(1, (now - start) / ((STAGES[index + 1]?.start ?? T.end) - start)) : stage > index ? 1 : 0})` }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .instagram-automation-section { background: var(--bg-primary); overflow: hidden; scroll-margin-top: 100px; }
        .automation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .agent-demo { display: flex; justify-content: center; }
        .layer { position: absolute; inset: 0; transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .layer.from-right { transform: translateX(100%); z-index: 20; }
        .layer.from-bottom { transform: translateY(100%); z-index: 40; }
        .layer.from-right + .layer.from-right { z-index: 30; }
        .layer.in { transform: none; }
        .page { position: absolute; inset: 0; opacity: 0; transition: opacity 0.35s ease; }
        .page.shown { opacity: 1; }

        .agents-tabs { display: flex; flex-direction: column; gap: 16px; }
        .agent-tab {
          position: relative; overflow: hidden;
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
        .stage-progress { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--gradient-primary); transform-origin: left; transition: transform 0.1s linear; }

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
        @media (prefers-reduced-motion: reduce) { .layer, .page { transition: none; } }
      `}</style>
    </section>
  );
}
