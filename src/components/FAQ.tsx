'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Bot, MessageSquare, BookOpen, Coins, UserCheck, Clock, Shield, RefreshCw } from 'lucide-react';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { key: 'q1', icon: Bot },
    { key: 'q2', icon: MessageSquare },
    { key: 'q3', icon: BookOpen },
    { key: 'q4', icon: Coins },
    { key: 'q5', icon: UserCheck },
    { key: 'q6', icon: Clock },
    { key: 'q7', icon: Shield },
    { key: 'q8', icon: RefreshCw },
  ];

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="faq-container">
          {questions.map(({ key, icon: Icon }, index) => (
            <div
              key={key}
              className={`accordion-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="accordion-header"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="accordion-icon">
                  <Icon size={20} />
                </div>
                <span className="accordion-title">{t(`questions.${key}.question`)}</span>
                <span className="accordion-arrow">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div className="accordion-body">
                <p>{t(`questions.${key}.answer`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          background: var(--secondary-color);
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .accordion-item {
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .accordion-item:hover {
          border-color: var(--border-light);
        }

        .accordion-item.open {
          border-color: var(--primary-color);
          box-shadow: var(--shadow-md);
        }

        .accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .accordion-header:hover {
          color: var(--primary-color);
        }

        .accordion-icon {
          flex-shrink: 0;
          color: var(--primary-color);
        }

        .accordion-title {
          flex: 1;
        }

        .accordion-arrow {
          flex-shrink: 0;
          color: var(--text-muted);
          transition: transform var(--transition-normal);
        }

        .accordion-item.open .accordion-arrow {
          transform: rotate(180deg);
          color: var(--primary-color);
        }

        .accordion-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-normal);
        }

        .accordion-item.open .accordion-body {
          max-height: 300px;
        }

        .accordion-body p {
          padding: 0 24px 20px 60px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}
