'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="faq-container">
          {questions.map((q, index) => (
            <div
              key={q}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{t(`questions.${q}.question`)}</span>
                <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>{t(`questions.${q}.answer`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq {
          background: var(--bg-secondary);
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .faq-item.open {
          border-color: var(--border-light);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .faq-question:hover {
          color: var(--primary-color);
        }

        .faq-question :global(svg) {
          flex-shrink: 0;
          color: var(--text-muted);
          transition: transform var(--transition-normal);
        }

        .faq-item.open .faq-question :global(svg) {
          transform: rotate(180deg);
          color: var(--primary-color);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-normal);
        }

        .faq-item.open .faq-answer {
          max-height: 200px;
        }

        .faq-answer p {
          padding: 0 24px 20px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
