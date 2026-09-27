'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import IPhone from '@/components/phone/IPhone';
import { IgDmThread } from '@/components/phone/Instagram';
import { useSceneClock } from '@/components/phone/useSceneClock';

// One conversation per scene: creator's automation greets, follower replies, automation answers.
const SCENE = { greeting: 400, reply: 1900, typing: [2500, 3700] as [number, number], answer: 3700, end: 8500 };
const CONVERSATIONS = 3;

export default function Hero() {
  const t = useTranslations('hero');
  const tPhone = useTranslations('agentsShowcase.phone');
  const [conversation, setConversation] = useState(0);
  const { ref, now } = useSceneClock(SCENE.end, () => setConversation((c) => (c + 1) % CONVERSATIONS), conversation);
  const c = (k: string) => t(`conversations.c${conversation + 1}.${k}`);
  const pillars = t.raw('pillars') as string[];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">{t('title')}</span>
              <span className="text-highlight">{t('titleHighlight')}</span>
            </h1>
            <p className="hero-subtitle">{t('subtitle')}</p>

            <div className="hero-buttons">
              <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-white">
                {t('cta.trial')}
                <ArrowRight size={18} />
              </a>
              <a href="#mcp" className="btn btn-outline-white">
                {t('cta.mcp')}
              </a>
            </div>

            <ul className="hero-pillars">
              {pillars.map((p) => (
                <li key={p} className="hero-pillar">{p}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual" ref={ref} aria-hidden="true">
            <IPhone>
              <IgDmThread
                now={now}
                name="automateflow"
                status={t('chatDemo.status')}
                messages={[
                  { from: 'them', text: c('greeting'), at: SCENE.greeting },
                  { from: 'me', text: c('userMessage'), at: SCENE.reply },
                  {
                    from: 'them',
                    text: c('response'),
                    at: SCENE.answer,
                    ...(conversation === 0 ? { buttons: [t('chatDemo.button')] } : {}),
                  },
                ]}
                typing={[SCENE.typing]}
                placeholder={tPhone('message')}
              />
            </IPhone>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 140px 0 100px;
          background: var(--gradient-primary);
          color: white;
          overflow: hidden;
          position: relative;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="30" cy="5" r="1" fill="white" opacity="0.05"/><circle cx="50" cy="15" r="1" fill="white" opacity="0.1"/><circle cx="70" cy="8" r="1" fill="white" opacity="0.05"/><circle cx="90" cy="12" r="1" fill="white" opacity="0.1"/></svg>') repeat;
          animation: float 20s infinite linear;
        }

        @keyframes float {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 640px;
        }

        .hero-title {
          font-size: 3.25rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          color: white;
          text-align: left;
        }

        .hero-title-main,
        .text-highlight {
          display: block;
        }

        .text-highlight {
          color: white;
          opacity: 0.85;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .btn-white {
          background: var(--surface-color);
          color: var(--primary-dark);
          padding: 14px 32px;
          border-radius: var(--radius-lg);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-md);
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-outline-white {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          padding: 14px 32px;
          border-radius: var(--radius-lg);
          font-weight: 600;
          transition: all var(--transition-normal);
        }

        .btn-outline-white:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
        }

        .hero-pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-pillar {
          padding: 6px 14px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          opacity: 0.95;
        }

        .hero-visual {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-title {
            font-size: 2.5rem;
            text-align: center;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-pillars {
            justify-content: center;
          }

          .hero-visual {
            justify-content: center;
            margin-top: 40px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 0 80px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-white,
          .btn-outline-white {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-section::before {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
