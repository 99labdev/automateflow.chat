'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, CreditCard, X, Headphones } from 'lucide-react';

export default function CTA() {
  const t = useTranslations('cta');

  const features = [
    { key: 0, icon: CreditCard },
    { key: 1, icon: X },
    { key: 2, icon: Headphones },
  ];

  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">{t('title')}</h2>
          <p className="cta-subtitle">{t('subtitle')}</p>

          <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-primary btn-large">
            {t('button')}
            <ArrowRight size={20} />
          </a>

          <div className="cta-features">
            {features.map(({ key, icon: Icon }) => (
              <div key={key} className="cta-feature">
                <Icon size={18} />
                <span>{(t.raw('features') as string[])[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-bg"></div>

      <style jsx>{`
        .cta-section {
          position: relative;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 16px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 1.125rem;
        }

        .cta-features {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 32px;
        }

        .cta-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .cta-feature :global(svg) {
          color: var(--primary-color);
        }

        .cta-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 1.75rem;
          }

          .cta-features {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
