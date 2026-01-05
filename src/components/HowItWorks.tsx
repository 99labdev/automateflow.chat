'use client';

import { useTranslations } from 'next-intl';
import { Settings, MessageSquare, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    { key: 'step1', icon: Settings },
    { key: 'step2', icon: MessageSquare },
    { key: 'step3', icon: BarChart3 },
  ];

  return (
    <section id="how-it-works" className="section how-it-works-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="steps-grid">
          {steps.map(({ key, icon: Icon }, index) => (
            <div key={key} className="step-card">
              <div className="step-number">{index + 1}</div>
              <h3 className="step-title">{t(`steps.${key}.title`)}</h3>
              <p className="step-description">{t(`steps.${key}.description`)}</p>
              <div className="step-icon">
                <Icon size={48} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-it-works-section {
          background: var(--secondary-color);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .step-card {
          background: var(--surface-color);
          padding: 40px 24px;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal);
          border: 1px solid var(--border-color);
          position: relative;
          height: 100%;
        }

        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .step-number {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 24px 0 12px;
          color: var(--text-primary);
        }

        .step-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .step-icon {
          color: var(--primary-light);
        }

        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
