'use client';

import { useTranslations } from 'next-intl';
import { Clapperboard, Images, Circle, CalendarClock, MessageSquareText } from 'lucide-react';

// day index (0 = Mon) → post key; the rest of the week is empty on purpose
const SLOTS: Record<number, { key: string; icon: typeof Clapperboard }> = {
  1: { key: 'p1', icon: Clapperboard },
  2: { key: 'p2', icon: Images },
  3: { key: 'p3', icon: Circle },
  4: { key: 'p4', icon: Clapperboard },
};

export default function ScheduleShowcase() {
  const t = useTranslations('schedule');
  const days = t.raw('calendar.days') as string[];

  return (
    <section id="schedule" className="section schedule-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="schedule-grid" aria-hidden="true">
          <div className="calendar">
            <div className="calendar-header">
              <strong>{t('calendar.title')}</strong>
              <span>{t('calendar.week')}</span>
            </div>
            <div className="calendar-days">
              {days.map((d, i) => {
                const slot = SLOTS[i];
                const Icon = slot?.icon;
                return (
                  <div key={d} className={`calendar-day ${i === 4 ? 'today' : ''}`}>
                    <span className="calendar-day-name">{d}</span>
                    {slot && Icon && (
                      <div className="calendar-post">
                        <Icon size={22} />
                        <span>{t(`calendar.posts.${slot.key}.kind`)}</span>
                        <em>{t(`calendar.posts.${slot.key}.time`)}</em>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="post-card">
            <div className="post-card-thumb"><Clapperboard size={28} /></div>
            <div className="post-card-body">
              <span className="post-card-kind">{t('card.kind')}</span>
              <strong>{t('card.name')}</strong>
              <div className="post-card-row"><CalendarClock size={14} /> {t('card.when')}</div>
              <div className="post-card-row"><MessageSquareText size={14} /> {t('card.automation')}</div>
              <p className="post-card-comment">{t('card.firstComment')}</p>
              <span className="post-card-status">{t('card.status')}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .schedule-section { background: var(--secondary-color); scroll-margin-top: 100px; }
        .schedule-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          max-width: 1160px;
          margin: 48px auto 0;
          align-items: start;
        }
        .calendar, .post-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .calendar-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 28px;
          border-bottom: 1px solid var(--border-color);
          font-size: 1.15rem;
          color: var(--text-primary);
        }
        .calendar-header span { font-size: 0.95rem; color: var(--text-muted); }
        .calendar-days { display: grid; grid-template-columns: repeat(7, 1fr); }
        .calendar-day {
          min-height: 320px;
          padding: 16px 10px;
          border-right: 1px solid var(--border-color);
          display: flex; flex-direction: column; gap: 12px;
        }
        .calendar-day:last-child { border-right: none; }
        .calendar-day.today { background: var(--secondary-color); }
        .calendar-day-name { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); text-align: center; }
        .calendar-post {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          padding: 16px 6px;
          border-radius: var(--radius-lg);
          background: var(--gradient-primary);
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          gap: 4px;
          box-shadow: var(--shadow-md);
        }
        .calendar-post em { font-style: normal; opacity: 0.85; font-weight: 400; }
        .post-card { display: flex; flex-direction: column; }
        .post-card-thumb {
          height: 120px;
          background: var(--gradient-primary);
          color: white;
          display: flex; align-items: center; justify-content: center;
        }
        .post-card-body { padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 8px; }
        .post-card-kind { font-size: 0.75rem; font-weight: 600; color: var(--primary-color); text-transform: uppercase; }
        .post-card-body strong { color: var(--text-primary); }
        .post-card-row { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-secondary); }
        .post-card-comment {
          font-size: 0.8rem; color: var(--text-muted);
          padding: 8px 10px; border-left: 3px solid var(--border-light);
        }
        .post-card-status {
          align-self: flex-start;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(22, 163, 74, 0.12);
          color: #16a34a;
          font-size: 0.75rem;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .schedule-grid { grid-template-columns: 1fr; }
          .calendar-days { grid-template-columns: repeat(4, 1fr); }
          .calendar-day { min-height: 150px; border-bottom: 1px solid var(--border-color); }
        }
      `}</style>
    </section>
  );
}
