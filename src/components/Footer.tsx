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
              <img src="/logo.png" alt="AutomateFlow" className="logo-icon" width={56} height={56} />
              <span className="logo-text">AutomateFlow</span>
            </Link>
            <p className="footer-description">{t('description')}</p>
          </div>

          <div className="footer-social">
            <h4>{t('social')}</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/automateflow" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/automateflow.chat" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="copyright">{t('copyright')}</p>
          <div className="footer-legal">
            <Link href="/terms">{t('legal.terms')}</Link>
            <Link href="/privacy">{t('legal.privacy')}</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 48px 0 24px;
        }

        .footer-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 48px;
          margin-bottom: 32px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--primary-color);
        }

        .footer-logo :global(.logo-icon) {
          width: 56px;
          height: 56px;
        }

        .logo-text {
          color: var(--primary-color);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .footer-description {
          color: var(--text-secondary);
          max-width: 400px;
          line-height: 1.6;
        }

        .footer-social h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
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
          background: var(--secondary-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .social-link:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
        }

        .footer-divider {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 0 0 24px 0;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .footer-legal a {
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: color var(--transition-fast);
        }

        .footer-legal a:hover {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column;
            gap: 32px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
