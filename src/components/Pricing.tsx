'use client';

import { useTranslations } from 'next-intl';
import { Check, Coins, Crown, SlidersHorizontal } from 'lucide-react';

export default function Pricing() {
  const t = useTranslations('pricing');

  const plans = ['basic', 'standard', 'corporate'];

  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

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
                  <span className="amount">{t(`plans.${plan}.price`)}</span>
                  <span className="period">/mês</span>
                </div>
                <p className="pricing-description">{t(`plans.${plan}.description`)}</p>
              </div>
              <div className="pricing-credits">
                <Coins size={18} />
                <strong>{t(`plans.${plan}.credits`)}</strong> {t('periods.monthlyCredits')}
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

          <div className="pricing-card enterprise-card">
            <span className="enterprise-badge">
              <Crown size={14} />
              {t('enterprise.badge')}
            </span>
            <div className="pricing-header">
              <h3>{t('enterprise.name')}</h3>
              <div className="pricing-price">
                <span className="amount">{t('enterprise.priceLabel')}</span>
              </div>
              <p className="pricing-description">{t('enterprise.description')}</p>
            </div>
            <div className="pricing-credits">
              <SlidersHorizontal size={18} />
              {t('enterprise.customResources')}
            </div>
            <ul className="pricing-features">
              {(t.raw('enterprise.features') as string[]).map((feature: string, i: number) => (
                <li key={i}>
                  <Check size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/5584981297116?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20Enterprise."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('enterprise.cta')}
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          background: var(--bg-primary);
        }

        .pricing-section :global(.container) {
          max-width: 1600px;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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

        .enterprise-card {
          border-color: var(--primary-color);
        }

        .enterprise-badge {
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
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-whatsapp:hover {
          background: #128C7E;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }

        @media (max-width: 1280px) {
          .plans-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .pricing-card.featured {
            transform: scale(1);
          }

          .pricing-card.featured:hover {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
        }


      `}</style>
    </section>
  );
}
