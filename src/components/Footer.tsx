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
              <a href="https://chat.whatsapp.com/BLIQBWPD94DBchhfR6cFkO" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
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
