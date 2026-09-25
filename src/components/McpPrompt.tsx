'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

export default function McpPrompt({ text }: { text: string }) {
  const t = useTranslations('mcp');

  return (
    <div className="mcp-prompt">
      <span className="mcp-prompt-label">
        <Sparkles size={14} />
        {t('promptLabel')}
      </span>
      <code className="mcp-prompt-text">&ldquo;{text}&rdquo;</code>

      <style jsx>{`
        .mcp-prompt {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 12px;
          margin: 24px auto 0;
          padding: 10px 16px;
          border: 1px dashed var(--border-light);
          border-radius: var(--radius-full);
          background: var(--secondary-color);
          max-width: 100%;
        }

        .mcp-prompt-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          white-space: nowrap;
        }

        .mcp-prompt-text {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .mcp-prompt {
            border-radius: var(--radius-lg);
          }
        }
      `}</style>
    </div>
  );
}
