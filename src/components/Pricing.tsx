'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Check, Coins } from 'lucide-react';

type BillingPeriod = 'yearly' | 'semiannual' | 'quarterly' | 'monthly';

export default function Pricing() {
  const t = useTranslations('pricing');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly');

  const plans = ['basic', 'standard', 'corporate'];

  const discounts: Record<BillingPeriod, number> = {
    yearly: 0.10,      // 10% discount
    semiannual: 0.07,  // 7% discount
    quarterly: 0.05,   // 5% discount
    monthly: 0,        // no discount
  };

  const periodMultipliers: Record<BillingPeriod, number> = {
    yearly: 12,
    semiannual: 6,
    quarterly: 3,
    monthly: 1,
  };

  const periodLabels: Record<BillingPeriod, string> = {
    yearly: t('periods.yearly'),
    semiannual: t('periods.semiannual'),
    quarterly: t('periods.quarterly'),
    monthly: t('periods.monthly'),
  };

  const periodCreditsLabel: Record<BillingPeriod, string> = {
    yearly: t('periods.yearlyCredits'),
    semiannual: t('periods.semiannualCredits'),
    quarterly: t('periods.quarterlyCredits'),
    monthly: t('periods.monthlyCredits'),
  };

  const getMonthlyPrice = (basePrice: string) => {
    const price = parseInt(basePrice);
    const discount = discounts[billingPeriod];
    return Math.round(price * (1 - discount));
  };

  const getTotalPrice = (basePrice: string) => {
    const monthlyPrice = getMonthlyPrice(basePrice);
    return monthlyPrice * periodMultipliers[billingPeriod];
  };

  const billingOptions: { key: BillingPeriod; discount: string | null }[] = [
    { key: 'yearly', discount: t('discounts.yearly') },
    { key: 'semiannual', discount: t('discounts.semiannual') },
    { key: 'quarterly', discount: t('discounts.quarterly') },
    { key: 'monthly', discount: null },
  ];

  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="billing-tabs">
          {billingOptions.map((option) => (
            <button
              key={option.key}
              className={`billing-tab ${billingPeriod === option.key ? 'active' : ''}`}
              onClick={() => setBillingPeriod(option.key)}
            >
              {periodLabels[option.key]}
              {option.discount && (
                <span className="discount-badge">{option.discount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div
              key={plan}
              className={`pricing-card ${index === 1 ? 'featured' : ''}`}
            >
              {index === 1 && (
                <span className="popular-badge">{t('popular')}</span>
              )}
              <div className="pricing-header">
                <h3>{t(`plans.${plan}.name`)}</h3>
                <div className="pricing-price">
                  <span className="currency">R$</span>
                  <span className="amount">{getMonthlyPrice(t(`plans.${plan}.price`))}</span>
                  <span className="period">/{billingPeriod === 'monthly' ? 'mensal' : 'mês'}</span>
                </div>
                {billingPeriod !== 'monthly' && (
                  <p className="period-total">R$ {getTotalPrice(t(`plans.${plan}.price`))} /{periodLabels[billingPeriod].toLowerCase()}</p>
                )}
                <p className="pricing-description">{t(`plans.${plan}.description`)}</p>
              </div>
              <div className="pricing-credits">
                <Coins size={18} />
                <strong>{t(`plans.${plan}.credits`)}</strong> {periodCreditsLabel[billingPeriod]}
              </div>
              <ul className="pricing-features">
                {(t.raw(`plans.${plan}.features`) as string[]).map((feature: string, i: number) => (
                  <li key={i}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.automateflow.chat/accounts/signup/"
                className="btn btn-primary btn-full"
              >
                {t('cta')}
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          background: var(--bg-primary);
        }

        .billing-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .billing-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--surface-color);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .billing-tab:hover {
          border-color: var(--primary-color);
          color: var(--text-primary);
        }

        .billing-tab.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        .billing-tab.active .discount-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .discount-badge {
          display: inline-block;
          padding: 4px 10px;
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary-color);
          font-size: 0.7rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .pricing-card {
          background: var(--surface-color);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 32px;
          text-align: center;
          transition: all var(--transition-normal);
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .pricing-card.featured {
          border-color: var(--primary-color);
          transform: scale(1.05);
        }

        .pricing-card.featured:hover {
          transform: scale(1.05) translateY(-5px);
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: white;
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .pricing-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .pricing-price {
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
        }

        .currency {
          font-size: 1.5rem;
          color: var(--text-secondary);
        }

        .amount {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .period {
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .period-total {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .pricing-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          min-height: 40px;
        }

        .pricing-credits {
          background: var(--secondary-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--primary-color);
          font-size: 0.95rem;
        }

        .pricing-credits :global(svg) {
          color: var(--primary-color);
        }

        .pricing-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          text-align: left;
        }

        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .pricing-features li :global(svg) {
          color: var(--accent-color);
          flex-shrink: 0;
        }

        .btn-full {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .billing-tabs {
            gap: 6px;
          }

          .billing-tab {
            padding: 10px 14px;
            font-size: 0.85rem;
          }

          .discount-badge {
            font-size: 0.65rem;
            padding: 3px 8px;
          }

          .plans-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }

          .pricing-card.featured {
            transform: scale(1);
          }

          .pricing-card.featured:hover {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 600px) {
          .billing-tabs {
            flex-direction: column;
            gap: 8px;
          }

          .billing-tab {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
