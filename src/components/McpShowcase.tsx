'use client';

import { useTranslations } from 'next-intl';
import { CalendarCheck, MessageSquareText, ClipboardList, KeyRound, Plug, MessageCircle, ArrowRight } from 'lucide-react';

export default function McpShowcase() {
  const t = useTranslations('mcp');
  const clients = t.raw('clients') as string[];
  const tools = [
    { key: 'publication', icon: CalendarCheck },
    { key: 'automation', icon: MessageSquareText },
    { key: 'capture', icon: ClipboardList },
  ];
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
          <div className="mcp-chat" aria-hidden="true">
            <div className="mcp-bubble user">{t('chat.user')}</div>
            {tools.map(({ key, icon: Icon }, i) => (
              <div key={key} className="mcp-tool" style={{ animationDelay: `${0.6 + i * 0.6}s` }}>
                <Icon size={16} />
                <span>{t(`chat.tools.${key}`)}</span>
                <span className="mcp-check">✓</span>
              </div>
            ))}
            <div className="mcp-bubble assistant" style={{ animationDelay: '2.6s' }}>{t('chat.assistant')}</div>
          </div>

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
              {clients.map((c) => <span key={c} className="mcp-client">{c}</span>)}
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
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 1000px;
          margin: 0 auto;
        }
        .mcp-chat {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mcp-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 90%;
          animation: mcpIn 0.5s ease-out both;
        }
        .mcp-bubble.user {
          background: var(--gradient-primary);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .mcp-bubble.assistant {
          background: var(--secondary-color);
          color: var(--text-primary);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .mcp-tool {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.8rem;
          color: var(--text-secondary);
          animation: mcpIn 0.4s ease-out both;
        }
        .mcp-tool :global(svg) { color: var(--primary-color); flex-shrink: 0; }
        .mcp-check { margin-left: auto; color: #16a34a; font-weight: 700; }
        @keyframes mcpIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
        .mcp-clients { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 24px; }
        .mcp-clients-label { font-size: 0.85rem; color: var(--text-muted); margin-right: 4px; }
        .mcp-client {
          padding: 4px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .mcp-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mcp-bubble, .mcp-tool { animation: none; }
        }
      `}</style>
    </section>
  );
}
