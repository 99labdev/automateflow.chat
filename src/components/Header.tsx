'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const changeLocale = (locale: 'en' | 'pt' | 'es') => {
    router.replace(pathname, { locale });
    setLangMenuOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">AutomateFlow</span>
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#agents" className="nav-link">{t('agents')}</a>
          <a href="#how-it-works" className="nav-link">{t('howItWorks')}</a>
          <a href="#pricing" className="nav-link">{t('plans')}</a>
          <a href="#faq" className="nav-link">{t('faq')}</a>
        </nav>

        <div className="header-actions">
          <div className="lang-selector">
            <button
              className="lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <Globe size={18} />
            </button>
            {langMenuOpen && (
              <div className="lang-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="lang-option"
                    onClick={() => changeLocale(lang.code as 'en' | 'pt' | 'es')}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="https://app.automateflow.chat/accounts/login/" className="nav-link login-link">
            {t('login')}
          </a>
          <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-primary btn-sm">
            {t('startFree')}
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(15, 15, 35, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .logo-icon {
          font-size: 1.75rem;
        }

        .logo-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 500;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .lang-selector {
          position: relative;
        }

        .lang-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .lang-btn:hover {
          background: var(--surface-color);
          color: var(--primary-color);
        }

        .lang-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          min-width: 150px;
          box-shadow: var(--shadow-lg);
        }

        .lang-option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .lang-option:hover {
          background: var(--surface-color);
          color: var(--text-primary);
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .theme-toggle:hover {
          background: var(--surface-color);
          color: var(--primary-color);
        }

        .login-link {
          margin-left: 8px;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.875rem;
        }

        .mobile-menu-btn {
          display: none;
          color: var(--text-primary);
        }

        @media (max-width: 992px) {
          .nav {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            justify-content: flex-start;
            padding: 32px;
            gap: 24px;
            background: var(--bg-primary);
            transform: translateX(-100%);
            transition: transform var(--transition-normal);
          }

          .nav-open {
            transform: translateX(0);
          }

          .nav-link {
            font-size: 1.25rem;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .login-link {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
