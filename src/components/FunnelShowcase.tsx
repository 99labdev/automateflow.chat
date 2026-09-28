'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Link2 } from 'lucide-react';

export default function FunnelShowcase() {
  const t = useTranslations('funnel');
  const fields = t.raw('capture.fields') as string[];
  const links = t.raw('links.items') as string[];

  return (
    <section id="funnel" className="section funnel-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="funnel-flow" aria-hidden="true">
          <div className="screen">
            <span className="screen-label">{t('capture.label')}</span>
            <strong className="screen-title">{t('capture.title')}</strong>
            {fields.map((f) => <div key={f} className="field">{f}</div>)}
            <div className="screen-btn">{t('capture.button')}</div>
          </div>

          <ArrowRight className="funnel-arrow" size={28} />

          <div className="screen">
            <span className="screen-label">{t('vsl.label')}</span>
            <div className="video">
              <Play size={28} />
              <span>{t('vsl.duration')}</span>
            </div>
            <strong className="screen-title">{t('vsl.title')}</strong>
            <div className="screen-btn">{t('vsl.button')}</div>
          </div>

          <ArrowRight className="funnel-arrow" size={28} />

          <div className="screen">
            <span className="screen-label">{t('links.label')}</span>
            <div className="avatar" />
            <strong className="screen-title">{t('links.handle')}</strong>
            {links.map((l) => (
              <div key={l} className="link"><Link2 size={14} /> {l}</div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .funnel-section { background: var(--bg-primary); scroll-margin-top: 100px; }
        .funnel-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 48px;
        }
        .screen {
          width: 260px;
          padding: 20px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          display: flex; flex-direction: column; gap: 10px;
        }
        .screen-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--primary-color); }
        .screen-title { color: var(--text-primary); font-size: 0.95rem; line-height: 1.3; }
        .field {
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .screen-btn {
          margin-top: 4px;
          padding: 10px;
          border-radius: var(--radius-md);
          background: var(--gradient-primary);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
        }
        .video {
          height: 110px;
          border-radius: var(--radius-lg);
          background: var(--text-primary);
          color: white;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
          font-size: 0.75rem;
        }
        .avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--gradient-primary); align-self: center; }
        .link {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--text-primary);
        }
        .funnel-flow :global(.funnel-arrow) { color: var(--primary-color); flex-shrink: 0; }
        @media (max-width: 768px) {
          .funnel-flow { flex-direction: column; }
          .screen { width: 100%; max-width: 320px; }
          .funnel-flow :global(.funnel-arrow) { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  );
}
