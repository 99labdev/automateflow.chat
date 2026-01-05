'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, Headphones, UserPlus, Check } from 'lucide-react';

export default function Agents() {
  const t = useTranslations('agents');

  const agents = [
    { key: 'sales', icon: ShoppingCart, color: '#8b5cf6' },
    { key: 'support', icon: Headphones, color: '#22c55e' },
    { key: 'sdr', icon: UserPlus, color: '#f59e0b' },
  ];

  return (
    <section id="agents" className="section agents">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="grid-3">
          {agents.map(({ key, icon: Icon, color }) => (
            <div key={key} className="card agent-card">
              <div className="agent-icon" style={{ background: `${color}20`, color }}>
                <Icon size={32} />
              </div>
              <h3 className="agent-title">{t(`${key}.title`)}</h3>
              <p className="agent-description">{t(`${key}.description`)}</p>
              <ul className="agent-features">
                {(t.raw(`${key}.features`) as string[]).map((feature: string, index: number) => (
                  <li key={index}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .agents {
          background: var(--bg-primary);
        }

        .agent-card {
          padding: 32px;
        }

        .agent-icon {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .agent-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .agent-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .agent-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .agent-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .agent-features li :global(svg) {
          color: var(--primary-color);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
