'use client';

import { useTranslations } from 'next-intl';
import { Handshake, Headphones, Search } from 'lucide-react';

export default function Agents() {
  const t = useTranslations('agents');

  const agents = [
    { key: 'sales', icon: Handshake, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { key: 'support', icon: Headphones, gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)' },
    { key: 'sdr', icon: Search, gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
  ];

  return (
    <section id="agents" className="section agents-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="grid-3">
          {agents.map(({ key, icon: Icon, gradient }) => (
            <div key={key} className="agent-card">
              <div className="agent-icon" style={{ background: gradient }}>
                <Icon size={32} />
              </div>
              <h3 className="agent-title">{t(`${key}.title`)}</h3>
              <p className="agent-description">{t(`${key}.description`)}</p>
              <ul className="agent-features">
                {(t.raw(`${key}.features`) as string[]).map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .agents-section {
          background: var(--bg-primary);
        }

        .agent-card {
          background: var(--surface-color);
          padding: 32px;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal);
          border: 1px solid var(--border-color);
          height: 100%;
        }

        .agent-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .agent-icon {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: white;
        }

        .agent-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .agent-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .agent-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .agent-features li {
          padding: 8px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          position: relative;
          padding-left: 24px;
        }

        .agent-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}
