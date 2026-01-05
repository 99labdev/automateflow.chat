'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const t = useTranslations('terms');

  const sections = [
    'acceptance',
    'services',
    'accounts',
    'usage',
    'payment',
    'intellectual',
    'liability',
    'termination',
    'changes',
    'contact',
  ];

  return (
    <main>
      <Header />
      <section className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>{t('title')}</h1>
            <p className="last-updated">{t('lastUpdated')}</p>
          </div>

          <div className="legal-content">
            <p className="intro">{t('intro')}</p>

            {sections.map((section, index) => (
              <div key={section} className="legal-section">
                <h2>
                  <span className="section-number">{index + 1}.</span>
                  {t(`sections.${section}.title`)}
                </h2>
                <p>{t(`sections.${section}.content`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />

      <style jsx>{`
        .legal-page {
          padding: 140px 0 100px;
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .legal-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .legal-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .last-updated {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 48px;
          box-shadow: var(--shadow-md);
        }

        .intro {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .legal-section {
          margin-bottom: 32px;
        }

        .legal-section:last-child {
          margin-bottom: 0;
        }

        .legal-section h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-number {
          color: var(--primary-color);
          font-weight: 700;
        }

        .legal-section p {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .legal-page {
            padding: 120px 0 60px;
          }

          .legal-header h1 {
            font-size: 2rem;
          }

          .legal-content {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}
