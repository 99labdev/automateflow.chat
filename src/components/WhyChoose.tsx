'use client';

import { useTranslations } from 'next-intl';
import { Rocket, Heart, TrendingUp, Users } from 'lucide-react';

export default function WhyChoose() {
  const t = useTranslations('whyChoose');

  const cards = [
    { key: 'revenue', icon: Rocket },
    { key: 'experience', icon: Heart },
    { key: 'roi', icon: TrendingUp },
    { key: 'team', icon: Users },
  ];

  return (
    <section className="section benefits-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="grid-4">
          {cards.map(({ key, icon: Icon }) => (
            <div key={key} className="benefit-card">
              <div className="benefit-icon">
                <Icon size={28} />
              </div>
              <h3 className="benefit-title">{t(`cards.${key}.title`)}</h3>
              <p className="benefit-description">{t(`cards.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .benefits-section {
          background: var(--secondary-color);
        }

        .benefit-card {
          background: var(--surface-color);
          padding: 40px 24px;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal);
          border: 1px solid var(--border-color);
          height: 100%;
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
          margin: 0 auto 24px;
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
      `}</style>
    </section>
  );
}
