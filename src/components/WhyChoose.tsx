'use client';

import { useTranslations } from 'next-intl';
import { TrendingUp, Star, PiggyBank, Users } from 'lucide-react';

export default function WhyChoose() {
  const t = useTranslations('whyChoose');

  const cards = [
    { key: 'revenue', icon: TrendingUp },
    { key: 'experience', icon: Star },
    { key: 'roi', icon: PiggyBank },
    { key: 'team', icon: Users },
  ];

  return (
    <section className="section why-choose">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="grid-4">
          {cards.map(({ key, icon: Icon }) => (
            <div key={key} className="card why-card">
              <div className="card-icon">
                <Icon size={28} />
              </div>
              <h3 className="card-title">{t(`cards.${key}.title`)}</h3>
              <p className="card-description">{t(`cards.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-choose {
          background: var(--bg-secondary);
        }

        .why-card {
          text-align: center;
        }

        .card-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          background: var(--primary-light);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .card-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
