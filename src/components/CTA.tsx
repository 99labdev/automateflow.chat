'use client';

import { useTranslations } from 'next-intl';
import { Rocket } from 'lucide-react';

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">{t('title')}</h2>
          <p className="cta-subtitle">{t('subtitle')}</p>

          <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-white btn-large">
            <Rocket size={20} />
            {t('button')}
          </a>

          <p className="cta-note">
            {(t.raw('features') as string[]).join(' • ')}
          </p>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 100px 0;
          background: var(--gradient-primary);
          color: white;
          text-align: center;
        }

        .cta-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: white;
        }

        .cta-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .btn-white {
          background: var(--surface-color);
          color: var(--primary-dark);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          border-radius: var(--radius-lg);
          font-weight: 600;
          font-size: 1.1rem;
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-lg);
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .btn-large {
          padding: 18px 48px;
          font-size: 1.125rem;
        }

        .cta-note {
          margin-top: 24px;
          font-size: 0.95rem;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 2rem;
          }

          .cta-section {
            padding: 80px 0;
          }
        }
      `}</style>
    </section>
  );
}
