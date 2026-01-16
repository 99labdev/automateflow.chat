'use client';

import { useTranslations } from 'next-intl';
import { Bot, Cog, TrendingUp } from 'lucide-react';

export default function WhyChoose() {
  const t = useTranslations('whyChoose');

  const cards = [
    { key: 'agents', icon: Bot },
    { key: 'team', icon: Cog },
    { key: 'roi', icon: TrendingUp },
  ];

  return (
    <section id="why-choose" className="section benefits-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="timeline">
          {cards.map(({ key, icon: Icon }, index) => (
            <div key={key} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Icon size={28} />
                  </div>
                  <h3 className="benefit-title">{t(`cards.${key}.title`)}</h3>
                  <p className="benefit-description">{t(`cards.${key}.description`)}</p>
                </div>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .benefits-section {
          background: var(--secondary-color);
        }

        .timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 3px;
        }

        .timeline-item {
          position: relative;
          width: 50%;
          padding: 20px 40px;
        }

        .timeline-item.left {
          left: 0;
          padding-right: 60px;
        }

        .timeline-item.right {
          left: 50%;
          padding-left: 60px;
        }

        .timeline-dot {
          position: absolute;
          width: 20px;
          height: 20px;
          background: var(--gradient-primary);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          border: 4px solid var(--secondary-color);
          z-index: 1;
        }

        .timeline-item.left .timeline-dot {
          right: -10px;
        }

        .timeline-item.right .timeline-dot {
          left: -10px;
        }

        .timeline-content {
          position: relative;
        }

        .benefit-card {
          background: var(--surface-color);
          padding: 32px 24px;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal);
          border: 1px solid var(--border-color);
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .benefit-icon {
          width: 70px;
          height: 70px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
        }

        .benefit-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .benefit-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 20px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 60px;
            padding-right: 20px;
          }

          .timeline-item.left,
          .timeline-item.right {
            left: 0;
            padding-left: 60px;
            padding-right: 20px;
          }

          .timeline-item.left .timeline-dot,
          .timeline-item.right .timeline-dot {
            left: 10px;
            right: auto;
          }
        }
      `}</style>
    </section>
  );
}
