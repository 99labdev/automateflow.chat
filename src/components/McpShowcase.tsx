'use client';

import { useTranslations } from 'next-intl';
import { MCP_CLIENT_LOGOS } from '@/components/mcpClientLogos';
import { KeyRound, Plug, MessageCircle, ArrowRight } from 'lucide-react';
import McpChatDemo from '@/components/McpChatDemo';

export default function McpShowcase() {
  const t = useTranslations('mcp');
  const steps = [
    { key: 's1', icon: KeyRound },
    { key: 's2', icon: Plug },
    { key: 's3', icon: MessageCircle },
  ];

  return (
    <section id="mcp" className="section mcp-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('badge')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="mcp-grid">
          <McpChatDemo />

          <div className="mcp-steps">
            <h3 className="mcp-steps-title">{t('steps.title')}</h3>
            <ol>
              {steps.map(({ key, icon: Icon }, i) => (
                <li key={key} className="mcp-step">
                  <span className="mcp-step-icon"><Icon size={18} /></span>
                  <div>
                    <strong>{i + 1}. {t(`steps.${key}.title`)}</strong>
                    <p>{t(`steps.${key}.description`)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mcp-clients">
              <span className="mcp-clients-label">{t('clientsLabel')}</span>
              <div className="mcp-marquee" role="list" aria-label={t('clientsLabel')}>
                {/* ponytail: list rendered twice so the -50% translate loops seamlessly */}
                <div className="mcp-marquee-track">
                  {[...MCP_CLIENT_LOGOS, ...MCP_CLIENT_LOGOS].map((logo, i) => (
                    <span
                      key={`${logo.name}-${i}`}
                      className="mcp-logo"
                      role="listitem"
                      title={logo.name}
                      aria-hidden={i >= MCP_CLIENT_LOGOS.length}
                      style={{ '--logo-color': logo.color ?? 'var(--text-primary)' } as React.CSSProperties}
                    >
                      {logo.path ? (
                        <svg viewBox="0 0 24 24" width="28" height="28" role="img" aria-label={logo.name}>
                          <path d={logo.path} fill="currentColor" />
                        </svg>
                      ) : (
                        <span className="mcp-wordmark">{logo.name}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a href="https://app.automateflow.chat/integrations/mcp/" className="btn btn-outline-primary">
              {t('cta')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mcp-section { background: var(--bg-primary); scroll-margin-top: 100px; }
        .mcp-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 1080px;
          margin: 0 auto;
        }
        .mcp-steps-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: var(--text-primary); }
        .mcp-steps ol { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        .mcp-step { display: flex; gap: 14px; align-items: flex-start; }
        .mcp-step-icon {
          flex-shrink: 0;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: white;
          display: flex; align-items: center; justify-content: center;
        }
        .mcp-step strong { display: block; color: var(--text-primary); margin-bottom: 2px; }
        .mcp-step p { color: var(--text-secondary); font-size: 0.95rem; }
        /* grid items default to min-width:auto; without this the marquee's max-content width stretches the grid */
        .mcp-grid > * { min-width: 0; }
        .mcp-clients { margin-bottom: 24px; }
        .mcp-clients-label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; }
        .mcp-marquee {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .mcp-marquee-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          padding: 6px 0;
          animation: mcpMarquee 22s linear infinite;
        }
        .mcp-marquee:hover .mcp-marquee-track { animation-play-state: paused; }
        .mcp-logo {
          display: inline-flex;
          align-items: center;
          color: var(--text-muted);
          opacity: 0.75;
          transition: color var(--transition-fast), opacity var(--transition-fast), transform var(--transition-fast);
        }
        .mcp-logo:hover { color: var(--logo-color); opacity: 1; transform: scale(1.12); }
        .mcp-wordmark { font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; }
        @keyframes mcpMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 20px)); }
        }
        @media (max-width: 768px) {
          .mcp-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mcp-marquee-track { animation: none; }
          .mcp-marquee-track { flex-wrap: wrap; width: auto; }
          .mcp-logo[aria-hidden='true'] { display: none; }
          .mcp-marquee { mask-image: none; -webkit-mask-image: none; }
        }
      `}</style>
    </section>
  );
}
