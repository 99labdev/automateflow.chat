'use client';

import { useTranslations } from 'next-intl';
import { MousePointer, Settings, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    { key: 'step1', icon: MousePointer, number: '01' },
    { key: 'step2', icon: Settings, number: '02' },
    { key: 'step3', icon: Rocket, number: '03' },
  ];

  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="steps-container">
          {steps.map(({ key, icon: Icon, number }, index) => (
            <div key={key} className="step">
              <div className="step-number">{number}</div>
              <div className="step-icon">
                <Icon size={32} />
              </div>
              <h3 className="step-title">{t(`steps.${key}.title`)}</h3>
              <p className="step-description">{t(`steps.${key}.description`)}</p>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          background: var(--bg-secondary);
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          position: relative;
        }

        .step {
          position: relative;
          text-align: center;
          padding: 40px 24px;
        }

        .step-number {
          font-size: 4rem;
          font-weight: 800;
          color: var(--primary-light);
          line-height: 1;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        .step-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-glow);
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .step-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .step-connector {
          position: absolute;
          top: 50%;
          right: -20px;
          width: 40px;
          height: 2px;
          background: var(--border-color);
        }

        .step-connector::after {
          content: '';
          position: absolute;
          right: 0;
          top: -4px;
          border: 5px solid transparent;
          border-left-color: var(--border-color);
        }

        @media (max-width: 768px) {
          .steps-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .step-connector {
            display: none;
          }

          .step-number {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
