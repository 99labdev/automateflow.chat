'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';
import { Users, Target, TrendingUp, CheckCircle } from 'lucide-react';

export default function CRMShowcase() {
  const t = useTranslations('crmShowcase');
  const [animationKey, setAnimationKey] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<number>(0);

  // Calculate column stats based on animation phase
  // Synced with CSS animations to reflect VISIBLE cards only
  const columnStats = useMemo(() => {
    const formatCurrency = (value: number) => {
      return value.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    };

    // CSS Animation timeline (8s cycle, restarts every 10s):
    // card-moving-out: visible 0-30% (0-2.4s), hidden 50-80% (4-6.4s), back 90% (7.2s)
    // card-arriving: hidden 0-30% (0-2.4s), visible 50%+ (4s+)
    // card-moving-out-2 (4s delay): visible until 7.2s, hidden 8-10.4s
    // card-arriving-2 (4s delay): visible 0-4s, hidden 4-6.4s, visible 6.4s+

    switch (animationPhase) {
      case 0:
        // 0-2.4s: Initial state
        // newLeads: Consultoria Digital + E-commerce Setup = 2 visible
        // negotiating: Plataforma SaaS (HIDDEN by card-arriving) + Integração API = 1 visible
        // closed: Sistema CRM = 1 visible
        return {
          newLeads: { count: 2, value: formatCurrency(5700) },
          negotiating: { count: 1, value: formatCurrency(2500) },
          closed: { count: 1, value: formatCurrency(7500) },
          totalCount: 4,
          total: formatCurrency(15700),
        };
      case 1:
        // 2.4s-4s: Plataforma SaaS appears, Consultoria Digital fading
        // newLeads: E-commerce Setup = 1 visible (Consultoria Digital hidden at 4s)
        // negotiating: Plataforma SaaS + Integração API = 2 visible
        // closed: Sistema CRM = 1 visible
        return {
          newLeads: { count: 1, value: formatCurrency(3200) },
          negotiating: { count: 2, value: formatCurrency(11000) },
          closed: { count: 1, value: formatCurrency(7500) },
          totalCount: 4,
          total: formatCurrency(21700),
        };
      case 2:
        // 4s-6.4s: Sistema CRM hidden (card-arriving-2 starts)
        // newLeads: E-commerce Setup = 1 visible
        // negotiating: Plataforma SaaS + Integração API = 2 visible
        // closed: Sistema CRM (HIDDEN) = 0 visible
        return {
          newLeads: { count: 1, value: formatCurrency(3200) },
          negotiating: { count: 2, value: formatCurrency(11000) },
          closed: { count: 0, value: formatCurrency(0) },
          totalCount: 3,
          total: formatCurrency(14200),
        };
      case 3:
        // 6.4s-7.2s: Sistema CRM reappears, Consultoria Digital returning
        // newLeads: E-commerce Setup (+ Consultoria Digital returning) = 1-2 visible
        // negotiating: Plataforma SaaS + Integração API = 2 visible
        // closed: Sistema CRM = 1 visible
        return {
          newLeads: { count: 1, value: formatCurrency(3200) },
          negotiating: { count: 2, value: formatCurrency(11000) },
          closed: { count: 1, value: formatCurrency(7500) },
          totalCount: 4,
          total: formatCurrency(21700),
        };
      case 4:
        // 7.2s-8s: Consultoria Digital back, Integração API fading
        // newLeads: Consultoria Digital + E-commerce Setup = 2 visible
        // negotiating: Plataforma SaaS + Integração API (fading) = 2 visible
        // closed: Sistema CRM = 1 visible
        return {
          newLeads: { count: 2, value: formatCurrency(5700) },
          negotiating: { count: 2, value: formatCurrency(11000) },
          closed: { count: 1, value: formatCurrency(7500) },
          totalCount: 5,
          total: formatCurrency(24200),
        };
      case 5:
        // 8s-10s: Integração API hidden
        // newLeads: Consultoria Digital + E-commerce Setup = 2 visible
        // negotiating: Plataforma SaaS = 1 visible (Integração API hidden)
        // closed: Sistema CRM = 1 visible
        return {
          newLeads: { count: 2, value: formatCurrency(5700) },
          negotiating: { count: 1, value: formatCurrency(8500) },
          closed: { count: 1, value: formatCurrency(7500) },
          totalCount: 4,
          total: formatCurrency(21700),
        };
      default:
        return {
          newLeads: { count: 2, value: formatCurrency(5700) },
          negotiating: { count: 2, value: formatCurrency(11000) },
          closed: { count: 1, value: formatCurrency(7500) },
          totalCount: 5,
          total: formatCurrency(24200),
        };
    }
  }, [animationPhase]);

  // Sync animation phases with CSS animations
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Reset to initial
    setAnimationPhase(0);

    // Phase 1: 2.4s - Plataforma SaaS appears (card-arriving 30%)
    timers.push(setTimeout(() => setAnimationPhase(1), 2400));

    // Phase 2: 4s - Sistema CRM hidden (card-arriving-2 starts after 4s delay)
    timers.push(setTimeout(() => setAnimationPhase(2), 4000));

    // Phase 3: 6.4s - Sistema CRM reappears (card-arriving-2 at 30% = 2.4s after delay)
    timers.push(setTimeout(() => setAnimationPhase(3), 6400));

    // Phase 4: 7.2s - Consultoria Digital returns (card-moving-out at 90%)
    timers.push(setTimeout(() => setAnimationPhase(4), 7200));

    // Phase 5: 8s - Integração API hidden (card-moving-out-2 at 50% = 4s after 4s delay)
    timers.push(setTimeout(() => setAnimationPhase(5), 8000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [animationKey]);

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
                  <div className="kanban-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                  </div>
                  <div className="kanban-header-text">
                    <span className="kanban-header-title">{t('kanban.title')}</span>
                    <span className="kanban-header-subtitle">{t('kanban.subtitle')}</span>
                  </div>
                </div>
                <div className="kanban-header-actions">
                  <button className="kanban-btn-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                    {t('kanban.listButton')}
                  </button>
                  <button className="kanban-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    {t('kanban.newDealButton')}
                  </button>
                </div>
              </div>

              <div className="kanban-stats">
                <div className="kanban-stat-card">
                  <div className="stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number stat-animated">{columnStats.totalCount}</span>
                    <span className="stat-label">{t('kanban.totalDeals')}</span>
                  </div>
                </div>
                <div className="kanban-stat-card">
                  <div className="stat-icon money">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" x2="12" y1="2" y2="22" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number stat-animated">R$ {columnStats.total},00</span>
                    <span className="stat-label">{t('kanban.totalValue')}</span>
                  </div>
                </div>
              </div>

              <div key={animationKey} className="kanban-board">
                {/* Column 1: Novos Leads */}
                <div className="kanban-column">
                  <div className="kanban-column-header color-purple">
                    <span className="kanban-column-icon">📋</span>
                    <span className="kanban-column-title">{t('kanban.newLeads')}</span>
                  </div>
                  <div className="kanban-column-stats stat-animated">{columnStats.newLeads.count} {columnStats.newLeads.count === 1 ? t('kanban.deal') : t('kanban.deals')} • R$ {columnStats.newLeads.value}</div>
                  <div className="kanban-cards">
                    <div className="kanban-card card-moving-out">
                      <div className="card-title-row">
                        <span className="card-title">{t('kanban.cards.digitalConsulting')}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" x2="21" y1="14" y2="3" />
                        </svg>
                      </div>
                      <div className="card-value">R$ 2.500,00</div>
                      <div className="card-footer-new">
                        <span className="card-source-tag instagram">Instagram</span>
                        <span className="card-date">16/01</span>
                      </div>
                    </div>
                    <div className="kanban-card">
                      <div className="card-title-row">
                        <span className="card-title">{t('kanban.cards.ecommerceSetup')}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" x2="21" y1="14" y2="3" />
                        </svg>
                      </div>
                      <div className="card-value">R$ 3.200,00</div>
                      <div className="card-footer-new">
                        <span className="card-source-tag whatsapp">WhatsApp</span>
                        <span className="card-date">15/01</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Em Negociação */}
                <div className="kanban-column">
                  <div className="kanban-column-header color-yellow">
                    <span className="kanban-column-icon">💬</span>
                    <span className="kanban-column-title">{t('kanban.negotiating')}</span>
                  </div>
                  <div className="kanban-column-stats stat-animated">{columnStats.negotiating.count} {columnStats.negotiating.count === 1 ? t('kanban.deal') : t('kanban.deals')} • R$ {columnStats.negotiating.value}</div>
                  <div className="kanban-cards">
                    <div className="kanban-card card-arriving">
                      <div className="card-title-row">
                        <span className="card-title">{t('kanban.cards.saasPlatform')}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" x2="21" y1="14" y2="3" />
                        </svg>
                      </div>
                      <div className="card-value">R$ 8.500,00</div>
                      <div className="card-footer-new">
                        <span className="card-source-tag instagram">Instagram</span>
                        <span className="card-date">12/01</span>
                      </div>
                    </div>
                    <div className="kanban-card card-moving-out-2">
                      <div className="card-title-row">
                        <span className="card-title">{t('kanban.cards.apiIntegration')}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" x2="21" y1="14" y2="3" />
                        </svg>
                      </div>
                      <div className="card-value">R$ 2.500,00</div>
                      <div className="card-footer-new">
                        <span className="card-source-tag whatsapp">WhatsApp</span>
                        <span className="card-date">10/01</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Fechado */}
                <div className="kanban-column">
                  <div className="kanban-column-header color-green">
                    <span className="kanban-column-icon">✅</span>
                    <span className="kanban-column-title">{t('kanban.closed')}</span>
                  </div>
                  <div className="kanban-column-stats stat-animated">{columnStats.closed.count} {columnStats.closed.count === 1 ? t('kanban.deal') : t('kanban.deals')} • R$ {columnStats.closed.value}</div>
                  <div className="kanban-cards">
                    <div className="kanban-card card-won card-arriving-2">
                      <div className="card-title-row">
                        <span className="card-title">{t('kanban.cards.crmSystem')}</span>
                        <CheckCircle size={14} className="check-icon" />
                      </div>
                      <div className="card-value">R$ 7.500,00</div>
                      <div className="card-footer-new">
                        <span className="card-badge-won">{t('kanban.won')}</span>
                        <span className="card-date">05/01</span>
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
          scroll-margin-top: 100px;
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
          padding: 16px 20px;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
        }

        .kanban-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .kanban-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kanban-header-text {
          display: flex;
          flex-direction: column;
        }

        .kanban-header-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }

        .kanban-header-subtitle {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .kanban-header-actions {
          display: flex;
          gap: 8px;
        }

        .kanban-btn-secondary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: white;
          color: #374151;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .kanban-btn-secondary:hover {
          background: #f3f4f6;
        }

        .kanban-btn-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: white;
          color: #8b5cf6;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .kanban-btn-primary:hover {
          background: #f3f4f6;
        }

        .kanban-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 16px 20px;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .kanban-stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--surface-color);
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }

        .stat-icon.money {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .stat-animated {
          transition: all 0.4s ease-out;
        }

        .kanban-board {
          display: flex;
          gap: 12px;
          width: 100%;
          padding: 16px;
          overflow: hidden;
        }

        .kanban-column {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kanban-column-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 600;
        }

        .kanban-column-header.color-purple {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%);
          color: #8b5cf6;
        }

        .kanban-column-header.color-yellow {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%);
          color: #f59e0b;
        }

        .kanban-column-header.color-green {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%);
          color: #22c55e;
        }

        .kanban-column-icon {
          font-size: 0.9rem;
        }

        .kanban-column-title {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .kanban-column-stats {
          font-size: 0.7rem;
          color: var(--text-secondary);
          padding: 0 4px;
        }

        .kanban-cards {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 120px;
        }

        .kanban-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .kanban-card:hover {
          border-color: #8b5cf6;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
          transform: translateY(-2px);
        }

        .kanban-card.card-won {
          border-left: 3px solid #22c55e;
        }

        /* Card transition animations */
        .card-moving-out {
          animation: moveToNext 8s ease-in-out infinite;
        }

        .card-arriving {
          animation: arriveFromPrev 8s ease-in-out infinite;
        }

        .card-moving-out-2 {
          animation: moveToNext 8s ease-in-out infinite;
          animation-delay: 4s;
        }

        .card-arriving-2 {
          animation: arriveFromPrev 8s ease-in-out infinite;
          animation-delay: 4s;
        }

        @keyframes moveToNext {
          0%, 30% {
            opacity: 1;
            transform: translateX(0);
          }
          40% {
            opacity: 0.5;
            transform: translateX(30px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
          }
          50%, 80% {
            opacity: 0;
            transform: translateX(100%);
          }
          90%, 100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes arriveFromPrev {
          0%, 30% {
            opacity: 0;
            transform: translateX(-100%);
          }
          40% {
            opacity: 0.5;
            transform: translateX(-30px);
          }
          50%, 100% {
            opacity: 1;
            transform: translateX(0);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
          }
        }

        .card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .card-title-row svg {
          color: var(--text-secondary);
          opacity: 0.5;
        }

        .check-icon {
          color: #22c55e !important;
          opacity: 1 !important;
        }

        .card-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: #8b5cf6;
          margin-bottom: 8px;
        }

        .card-meta {
          margin-bottom: 10px;
        }

        .card-owner {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .card-footer-new {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid var(--border-color);
        }

        .card-source-tag {
          font-size: 0.65rem;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .card-source-tag.instagram {
          background: linear-gradient(45deg, rgba(240, 148, 51, 0.15), rgba(188, 24, 136, 0.15));
          color: #e1306c;
        }

        .card-source-tag.whatsapp {
          background: rgba(37, 211, 102, 0.15);
          color: #25D366;
        }

        .card-source-tag.webchat {
          background: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
        }

        .card-badge-won {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .card-date {
          font-size: 0.65rem;
          color: var(--text-secondary);
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

          .kanban-stats {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 12px 16px;
          }

          .kanban-stat-card {
            padding: 14px;
            gap: 10px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
          }

          .stat-number {
            font-size: 1.1rem;
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
