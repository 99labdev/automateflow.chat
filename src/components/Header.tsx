'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe, Bot } from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
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
          <Bot className="logo-icon" size={28} />
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
              className="icon-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Change language"
            >
              <Globe size={20} />
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

          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
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
            aria-label="Toggle menu"
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
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        [data-theme="dark"] .header {
          background: rgba(31, 41, 55, 0.95);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .logo :global(.logo-icon) {
          color: var(--primary-color);
        }

        .logo-text {
          color: var(--primary-color);
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
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: var(--primary-color);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        .nav-link:hover::after {
          width: 80%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lang-selector {
          position: relative;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          background: var(--secondary-color);
          color: var(--primary-color);
          transform: scale(1.1);
        }

        .lang-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          min-width: 160px;
          box-shadow: var(--shadow-lg);
        }

        .lang-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          font-size: 0.9rem;
        }

        .lang-option:hover {
          background: var(--secondary-color);
          color: var(--text-primary);
        }

        .login-link {
          margin-left: 8px;
          font-weight: 500;
        }

        .btn-sm {
          padding: 10px 20px;
          font-size: 0.9rem;
          border-radius: var(--radius-md);
        }

        .mobile-menu-btn {
          display: none;
          color: var(--text-primary);
        }

        @media (max-width: 992px) {
          .nav {
            position: fixed;
            top: 76px;
            left: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            justify-content: flex-start;
            padding: 32px;
            gap: 24px;
            background: var(--bg-primary);
            border-top: 1px solid var(--border-color);
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
