'use client';

import { useTranslations } from 'next-intl';
import { Clock, Zap, MessageCircle, ArrowRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle">{t('subtitle')}</p>

          <div className="hero-stats">
            <div className="stat">
              <Clock size={20} />
              <span>{t('stats.available')}</span>
            </div>
            <div className="stat">
              <Zap size={20} />
              <span>{t('stats.setup')}</span>
            </div>
            <div className="stat">
              <MessageCircle size={20} />
              <span>{t('stats.unlimited')}</span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-primary">
              {t('cta.trial')}
              <ArrowRight size={18} />
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              {t('cta.howItWorks')}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="chat-preview">
            <div className="chat-header">
              <div className="chat-avatar">🤖</div>
              <div className="chat-info">
                <span className="chat-name">Agente IA</span>
                <span className="chat-status">Online</span>
              </div>
            </div>
            <div className="chat-messages">
              <div className="message bot">
                <p>Olá! 👋 Sou o assistente virtual da AutomateFlow. Como posso ajudar você hoje?</p>
              </div>
              <div className="message user">
                <p>Quero saber mais sobre os planos</p>
              </div>
              <div className="message bot">
                <p>Temos 3 planos incríveis! O Basic é perfeito para começar, com 1.000 mensagens/mês por apenas R$87. Quer conhecer todos?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bg"></div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          overflow: hidden;
        }

        .hero .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--surface-color);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .stat :global(svg) {
          color: var(--primary-color);
        }

        .hero-cta {
          display: flex;
          gap: 16px;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .chat-preview {
          width: 100%;
          max-width: 400px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl), var(--shadow-glow);
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--surface-color);
          border-bottom: 1px solid var(--border-color);
        }

        .chat-avatar {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .chat-info {
          display: flex;
          flex-direction: column;
        }

        .chat-name {
          font-weight: 600;
        }

        .chat-status {
          font-size: 0.75rem;
          color: #22c55e;
        }

        .chat-messages {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: var(--radius-lg);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .message.bot {
          background: var(--surface-color);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }

        .message.user {
          background: var(--gradient-primary);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          background: radial-gradient(ellipse at 70% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: -1;
        }

        @media (max-width: 1024px) {
          .hero .container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-stats {
            justify-content: center;
            flex-wrap: wrap;
          }

          .hero-cta {
            justify-content: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding-top: 100px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-stats {
            flex-direction: column;
            align-items: center;
          }

          .hero-cta {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
