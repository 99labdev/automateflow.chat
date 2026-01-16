'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Users, Target, TrendingUp, CheckCircle } from 'lucide-react';

export default function CRMShowcase() {
  const t = useTranslations('crmShowcase');
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animation every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const primaryColor = '#8b5cf6';

  const features = [
    {
      key: 'pipeline',
      icon: Target,
      color: primaryColor,
    },
    {
      key: 'leads',
      icon: Users,
      color: primaryColor,
    },
    {
      key: 'analytics',
      icon: TrendingUp,
      color: primaryColor,
    },
    {
      key: 'tasks',
      icon: CheckCircle,
      color: primaryColor,
    },
  ];

  return (
    <section id="crm-showcase" className="section crm-showcase-section">
      <div className="container">
        <div className="crm-section">
          <h3 className="crm-title">{t('title')}</h3>
          <p className="crm-subtitle">{t('subtitle')}</p>

          <div className="crm-grid">
            <div className="features-tabs">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.key}
                    className={`feature-tab ${index === 0 ? 'active' : ''}`}
                    style={{ '--feature-color': feature.color } as React.CSSProperties}
                  >
                    <div className="feature-tab-icon">
                      <Icon size={24} />
                    </div>
                    <div className="feature-tab-content">
                      <h3 className="feature-tab-title">{t(`features.${feature.key}.title`)}</h3>
                      <p className="feature-tab-desc">{t(`features.${feature.key}.description`)}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="kanban-demo">
              <div className="kanban-header">
                <div className="kanban-header-left">
                  <div className="kanban-logo">
                    <img src="/logo.png" alt="AutomateFlow" width="24" height="24" />
                  </div>
                  <span className="kanban-header-title">Pipeline de Vendas</span>
                </div>
                <div className="kanban-header-stats">
                  <div className="stat-item">
                    <span className="stat-value">R$ 19.500</span>
                    <span className="stat-label">Total</span>
                  </div>
                </div>
              </div>
              <div key={animationKey} className="kanban-board">
                {/* Column 1: Novos Leads */}
                <div className="kanban-column">
                  <div className="kanban-column-header">
                    <div className="kanban-column-dot"></div>
                    <span className="kanban-column-title">{t('kanban.newLeads')}</span>
                    <span className="kanban-column-count">3</span>
                  </div>
                  <div className="kanban-cards">
                    <div className="kanban-card card-1 animate-card-1">
                      <div className="card-header">
                        <div className="card-avatar avatar-male">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">João Silva</span>
                          <span className="card-source">
                            <span className="source-dot instagram"></span>
                            Instagram
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 2.500</div>
                        <div className="card-date">Hoje</div>
                      </div>
                    </div>
                    <div className="kanban-card card-2">
                      <div className="card-header">
                        <div className="card-avatar avatar-female">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">Ana Costa</span>
                          <span className="card-source">
                            <span className="source-dot whatsapp"></span>
                            WhatsApp
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 1.800</div>
                        <div className="card-date">Ontem</div>
                      </div>
                    </div>
                    <div className="kanban-card card-3">
                      <div className="card-header">
                        <div className="card-avatar avatar-male">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">Pedro Lima</span>
                          <span className="card-source">
                            <span className="source-dot webchat"></span>
                            Webchat
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 3.200</div>
                        <div className="card-date">2 dias</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kanban-divider"></div>

                {/* Column 2: Em Negociação */}
                <div className="kanban-column">
                  <div className="kanban-column-header">
                    <div className="kanban-column-dot"></div>
                    <span className="kanban-column-title">{t('kanban.negotiating')}</span>
                    <span className="kanban-column-count">2</span>
                  </div>
                  <div className="kanban-cards">
                    <div className="kanban-card card-4">
                      <div className="card-header">
                        <div className="card-avatar avatar-female">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">Maria Santos</span>
                          <span className="card-source">
                            <span className="source-dot instagram"></span>
                            Instagram
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 4.500</div>
                        <div className="card-date">3 dias</div>
                      </div>
                    </div>
                    <div className="kanban-card card-moving animate-card-move">
                      <div className="card-header">
                        <div className="card-avatar avatar-male">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">João Silva</span>
                          <span className="card-source">
                            <span className="source-dot instagram"></span>
                            Instagram
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 2.500</div>
                        <div className="card-date">Hoje</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kanban-divider"></div>

                {/* Column 3: Fechado */}
                <div className="kanban-column">
                  <div className="kanban-column-header">
                    <div className="kanban-column-dot"></div>
                    <span className="kanban-column-title">{t('kanban.closed')}</span>
                    <span className="kanban-column-count">2</span>
                  </div>
                  <div className="kanban-cards">
                    <div className="kanban-card card-5">
                      <div className="card-header">
                        <div className="card-avatar avatar-male">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">Carlos Oliveira</span>
                          <span className="card-source">
                            <span className="source-dot whatsapp"></span>
                            WhatsApp
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 5.000</div>
                        <div className="card-badge success">
                          <CheckCircle size={12} />
                          <span>{t('kanban.won')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="kanban-card card-destination animate-card-arrive">
                      <div className="card-header">
                        <div className="card-avatar avatar-male">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="card-info">
                          <span className="card-name">João Silva</span>
                          <span className="card-source">
                            <span className="source-dot instagram"></span>
                            Instagram
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-value">R$ 2.500</div>
                        <div className="card-badge success">
                          <CheckCircle size={12} />
                          <span>{t('kanban.won')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .crm-showcase-section {
          background: var(--bg-primary);
          overflow: hidden;
          padding-top: 0;
        }

        .crm-section {
          padding-top: 60px;
          border-top: 1px solid var(--border-color);
        }

        .crm-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .crm-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .crm-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: center;
        }

        .features-tabs {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-tab {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: var(--surface-color);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-xl);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .feature-tab:hover {
          border-color: var(--feature-color);
          transform: translateX(8px);
        }

        .feature-tab.active {
          border-color: var(--feature-color);
          background: var(--secondary-color);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }

        .feature-tab-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--feature-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .feature-tab.active .feature-tab-icon {
          transform: scale(1.1);
        }

        .feature-tab-content {
          flex: 1;
        }

        .feature-tab-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .feature-tab-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .kanban-demo {
          display: flex;
          flex-direction: column;
          padding: 0;
          background: var(--surface-color);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }

        .kanban-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
          border-bottom: 1px solid var(--border-color);
        }

        .kanban-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .kanban-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kanban-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .kanban-header-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .kanban-header-stats {
          display: flex;
          gap: 20px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #8b5cf6;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .kanban-board {
          display: flex;
          gap: 0;
          width: 100%;
          padding: 24px;
        }

        .kanban-divider {
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, var(--border-color) 20%, var(--border-color) 80%, transparent 100%);
          margin: 0 20px;
          flex-shrink: 0;
        }

        .kanban-column {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .kanban-column-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--surface-color) 100%);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .kanban-column-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
        }

        .kanban-column-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }

        .kanban-column-count {
          font-size: 0.85rem;
          font-weight: 600;
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.15);
          padding: 4px 10px;
          border-radius: 12px;
        }

        .kanban-cards {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 280px;
        }

        .kanban-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .kanban-card:hover {
          border-color: #8b5cf6;
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
          transform: translateY(-2px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .card-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          color: white;
        }

        .card-avatar svg {
          width: 20px;
          height: 20px;
        }

        .card-avatar.avatar-male,
        .card-avatar.avatar-female {
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          color: white;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .card-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-source {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .source-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .source-dot.instagram {
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
        }

        .source-dot.whatsapp {
          background: #25D366;
        }

        .source-dot.webchat {
          background: #8b5cf6;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }

        .card-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #8b5cf6;
        }

        .card-date {
          font-size: 0.7rem;
          color: var(--text-secondary);
          background: var(--bg-primary);
          padding: 4px 8px;
          border-radius: 6px;
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .card-badge.success {
          background: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
        }

        /* Animation for card moving from column 1 to column 2 */
        .animate-card-1 {
          animation: fadeOutCard 0.5s ease forwards;
          animation-delay: 2s;
        }

        @keyframes fadeOutCard {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.95);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
            height: 0;
            padding: 0;
            margin: 0;
            border: none;
          }
        }

        .animate-card-move {
          opacity: 0;
          animation: cardAppear 0.5s ease forwards;
          animation-delay: 2.5s;
        }

        @keyframes cardAppear {
          0% {
            opacity: 0;
            transform: translateX(-100%) scale(0.9);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-50%) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Animation for card moving from column 2 to column 3 */
        .card-moving {
          animation: fadeOutCardMove 0.5s ease forwards;
          animation-delay: 5s;
        }

        @keyframes fadeOutCardMove {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.95);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
            height: 0;
            padding: 0;
            margin: 0;
            border: none;
          }
        }

        .animate-card-arrive {
          opacity: 0;
          animation: cardArrive 0.5s ease forwards;
          animation-delay: 5.5s;
        }

        @keyframes cardArrive {
          0% {
            opacity: 0;
            transform: translateX(-100%) scale(0.9);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-50%) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @media (max-width: 1024px) {
          .crm-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .kanban-demo {
            order: -1;
          }

          .feature-tab:hover {
            transform: translateX(-8px);
          }

          .crm-section {
            padding-top: 40px;
          }

          .crm-title {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .feature-tab {
            padding: 16px;
          }

          .feature-tab-icon {
            width: 44px;
            height: 44px;
          }

          .feature-tab-title {
            font-size: 1rem;
          }

          .feature-tab-desc {
            font-size: 0.8rem;
          }

          .crm-title {
            font-size: 1.5rem;
          }

          .crm-subtitle {
            font-size: 1rem;
          }

          .kanban-board {
            flex-direction: column;
          }

          .kanban-column {
            width: 100%;
          }

          .kanban-cards {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
