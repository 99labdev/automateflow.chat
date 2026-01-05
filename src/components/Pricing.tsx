'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const t = useTranslations('pricing');
  const [isYearly, setIsYearly] = useState(false);

  const plans = ['basic', 'standard', 'corporate'];

  const getPrice = (basePrice: string) => {
    const price = parseInt(basePrice);
    return isYearly ? Math.round(price * 0.8) : price;
  };

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="billing-toggle">
          <span className={!isYearly ? 'active' : ''}>{t('monthly')}</span>
          <button
            className={`toggle ${isYearly ? 'yearly' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <span className="toggle-handle"></span>
          </button>
          <span className={isYearly ? 'active' : ''}>
            {t('yearly')}
            <span className="discount-badge">{t('yearlyDiscount')}</span>
          </span>
        </div>

        <div className="grid-3 plans-grid">
          {plans.map((plan) => (
            <div
              key={plan}
              className={`card plan-card ${plan === 'standard' ? 'popular' : ''}`}
            >
              {plan === 'standard' && (
                <span className="popular-badge">{t('popular')}</span>
              )}
              <h3 className="plan-name">{t(`plans.${plan}.name`)}</h3>
              <p className="plan-description">{t(`plans.${plan}.description`)}</p>
              <div className="plan-price">
                <span className="currency">R$</span>
                <span className="amount">{getPrice(t(`plans.${plan}.price`))}</span>
                <span className="period">{t('perMonth')}</span>
              </div>
              <ul className="plan-features">
                {(t.raw(`plans.${plan}.features`) as string[]).map((feature: string, index: number) => (
                  <li key={index}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.automateflow.chat/accounts/signup/"
                className={`btn ${plan === 'standard' ? 'btn-primary' : 'btn-secondary'} btn-full`}
              >
                {t('cta')}
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pricing {
          background: var(--bg-primary);
        }

        .billing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
        }

        .billing-toggle span {
          color: var(--text-muted);
          font-weight: 500;
          transition: color var(--transition-fast);
        }

        .billing-toggle span.active {
          color: var(--text-primary);
        }

        .toggle {
          width: 56px;
          height: 28px;
          background: var(--surface-color);
          border-radius: var(--radius-full);
          position: relative;
          cursor: pointer;
        }

        .toggle-handle {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          background: var(--gradient-primary);
          border-radius: 50%;
          transition: transform var(--transition-normal);
        }

        .toggle.yearly .toggle-handle {
          transform: translateX(28px);
        }

        .discount-badge {
          display: inline-block;
          margin-left: 8px;
          padding: 4px 8px;
          background: var(--primary-light);
          color: var(--primary-color);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-full);
        }

        .plans-grid {
          align-items: stretch;
        }

        .plan-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .plan-card.popular {
          border-color: var(--primary-color);
          transform: scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 16px;
          background: var(--gradient-primary);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-full);
        }

        .plan-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .plan-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          margin-bottom: 32px;
        }

        .currency {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .amount {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .period {
          color: var(--text-muted);
          margin-left: 4px;
        }

        .plan-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .plan-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .plan-features li :global(svg) {
          color: var(--primary-color);
          flex-shrink: 0;
        }

        .btn-full {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .plan-card.popular {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
