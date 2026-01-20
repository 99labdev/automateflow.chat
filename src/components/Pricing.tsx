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

        <div className="custom-plan-section">
          <div className="custom-plan-content">
            <div className="custom-plan-text">
              <h3>{t('customPlan.title')}</h3>
              <p>{t('customPlan.description')}</p>
            </div>
            <a
              href="https://wa.me/5584981297116?text=Olá! Gostaria de saber mais sobre planos personalizados."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('customPlan.cta')}
            </a>
          </div>
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

        .custom-plan-section {
          margin-top: 48px;
          padding: 32px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%);
          border: 2px solid rgba(139, 92, 246, 0.3);
          border-radius: var(--radius-xl);
        }

        .custom-plan-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .custom-plan-text h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .custom-plan-text p {
          font-size: 1rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all var(--transition-fast);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .btn-whatsapp:hover {
          background: #128C7E;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
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

        @media (max-width: 768px) {
          .custom-plan-content {
            flex-direction: column;
            text-align: center;
          }

          .custom-plan-text {
            margin-bottom: 16px;
          }

          .btn-whatsapp {
            width: 100%;
            justify-content: center;
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
