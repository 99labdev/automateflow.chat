'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">AutomateFlow</span>
            </Link>
            <p className="footer-description">{t('description')}</p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>{t('product.title')}</h4>
            <a href="#agents">{t('product.agents')}</a>
            <a href="#pricing">{t('product.pricing')}</a>
            <a href="#how-it-works">{t('product.integrations')}</a>
          </div>

          <div className="footer-links">
            <h4>{t('company.title')}</h4>
            <a href="#">{t('company.about')}</a>
            <a href="#">{t('company.blog')}</a>
            <a href="#">{t('company.careers')}</a>
          </div>

          <div className="footer-links">
            <h4>{t('legal.title')}</h4>
            <a href="#">{t('legal.terms')}</a>
            <a href="#">{t('legal.privacy')}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('copyright')}</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 60px 0 24px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .logo-icon {
          font-size: 1.75rem;
        }

        .logo-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-description {
          color: var(--text-secondary);
          margin-bottom: 20px;
          max-width: 300px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .social-link:hover {
          background: var(--primary-color);
          color: white;
        }

        .footer-links h4 {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .footer-links a {
          display: block;
          color: var(--text-secondary);
          padding: 8px 0;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--primary-color);
        }

        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }

          .footer-brand {
            grid-column: span 2;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-brand {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  );
}
