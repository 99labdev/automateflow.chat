'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              {t('title')} <span className="text-highlight">{t('titleHighlight')}</span>
            </h1>
            <p className="hero-subtitle">{t('subtitle')}</p>

            <div className="hero-buttons">
              <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-white">
                {t('cta.trial')}
                <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn btn-outline-white">
                {t('cta.howItWorks')}
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">{t('stats.available')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5 min</span>
                <span className="stat-label">{t('stats.setup')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">{t('stats.unlimited')}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="chat-demo">
              <div className="chat-header">
                <div className="chat-avatar"></div>
                <div className="chat-info">
                  <span className="chat-name">Agente AutomateFlow</span>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              <div className="chat-messages">
                <div className="message received">
                  <p>Olá! Como posso ajudar você hoje?</p>
                  <span className="time">10:30</span>
                </div>
                <div className="message sent">
                  <p>Quero saber mais sobre os planos</p>
                  <span className="time">10:32</span>
                </div>
                <div className="message received">
                  <p>Perfeito! Temos planos ideais para cada tipo de negócio. Qual é o seu segmento?</p>
                  <span className="time">10:32</span>
                </div>
              </div>
            </div>
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
          max-width: 560px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          color: white;
        }

        .text-highlight {
          color: white;
          opacity: 0.9;
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
          background: white;
          color: var(--primary-color);
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

        .hero-stats {
          display: flex;
          gap: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          opacity: 0.8;
          margin-top: 4px;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .chat-demo {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 24px;
          box-shadow: var(--shadow-xl);
          max-width: 400px;
          width: 100%;
          animation: slideInRight 1s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .chat-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .chat-avatar {
          width: 44px;
          height: 44px;
          background: var(--gradient-primary);
          border-radius: 50%;
          margin-right: 12px;
        }

        .chat-info {
          display: flex;
          flex-direction: column;
        }

        .chat-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .chat-status {
          font-size: 0.8rem;
          color: #22c55e;
        }

        .chat-messages {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 85%;
          position: relative;
        }

        .message.received {
          background: #f3f4f6;
          color: var(--text-primary);
          margin-right: auto;
          border-bottom-left-radius: 4px;
        }

        .message.sent {
          background: var(--gradient-primary);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 4px;
        }

        .message p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .message .time {
          font-size: 0.7rem;
          opacity: 0.7;
          display: block;
          text-align: right;
          margin-top: 4px;
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
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .chat-demo {
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

          .hero-stats {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
