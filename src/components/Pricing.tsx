'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Check, Coins } from 'lucide-react';

export default function Pricing() {
  const t = useTranslations('pricing');
  const [isYearly, setIsYearly] = useState(false);

  const plans = ['basic', 'standard', 'corporate'];

  const getPrice = (basePrice: string) => {
    const price = parseInt(basePrice);
    return isYearly ? Math.round(price * 0.8) : price;
  };

  return (
    <section id="pricing" className="section pricing-section">
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
                  <span className="amount">{getPrice(t(`plans.${plan}.price`))}</span>
                  <span className="period">{t('perMonth')}</span>
                </div>
                <p className="pricing-description">{t(`plans.${plan}.description`)}</p>
              </div>
              <div className="pricing-credits">
                <Coins size={18} />
                <strong>{t(`plans.${plan}.credits`)}</strong> créditos por mês
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
          background: var(--border-color);
          border-radius: var(--radius-full);
          position: relative;
          cursor: pointer;
          transition: background var(--transition-normal);
        }

        .toggle.yearly {
          background: var(--primary-color);
        }

        .toggle-handle {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          background: var(--surface-color);
          border-radius: 50%;
          transition: transform var(--transition-normal);
          box-shadow: var(--shadow-sm);
        }

        .toggle.yearly .toggle-handle {
          transform: translateX(28px);
        }

        .discount-badge {
          display: inline-block;
          margin-left: 8px;
          padding: 4px 10px;
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary-color);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-full);
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
          margin-bottom: 12px;
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
      `}</style>
    </section>
  );
}
