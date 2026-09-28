'use client';

import { Magnet, Send, Check, Video, ListChecks, Star, GraduationCap, ArrowRight, Play } from 'lucide-react';
import { Tap, Caret } from '@/components/phone/Touch';

// Replicas of AutomateFlow's public pages at phone width, mirroring the real
// templates (app repo: templates/lead_captures/landing.html and
// templates/funnels/public/funnel_landing.html), including their <=480px rules.

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

export type CaptureCopy = {
  title: string;
  description: string;
  message: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  submit: string;
};

export function LeadCapturePage(props: {
  now: number;
  copy: CaptureCopy;
  values: { name: string; email: string; phone: string };
  focus: 'name' | 'email' | 'phone' | null;
  submitTapAt: number;
  lifted: boolean;
}) {
  const { now, copy, values, focus } = props;
  const complete = Boolean(values.name && values.email && values.phone.length >= 13);
  const textFields = [
    { key: 'name' as const, label: copy.nameLabel, placeholder: copy.namePlaceholder },
    { key: 'email' as const, label: copy.emailLabel, placeholder: copy.emailPlaceholder },
  ];
  return (
    <div className={`lc-page ${props.lifted ? 'lifted' : ''}`}>
      <div className="lc-card">
        <div className="lc-content">
          <div className="lc-header">
            <div className="lc-avatar"><Magnet size={24} color="#fff" /></div>
            <div>
              <h5 className="lc-title">{copy.title}</h5>
              <p className="lc-subtitle">{copy.description}</p>
            </div>
          </div>
          <div className="lc-body">
            <p className="lc-message">{copy.message}</p>
            {textFields.map(({ key, label, placeholder }) => (
              <div key={key} className="lc-field">
                <label className="lc-label">{label} <span className="req">*</span></label>
                <div className={`lc-input ${focus === key ? 'focus' : ''}`}>
                  {values[key] ? values[key] : <span className="ph">{placeholder}</span>}
                  {focus === key && <Caret color="#7c3aed" />}
                </div>
              </div>
            ))}
            <div className="lc-field">
              <label className="lc-label">{copy.phoneLabel} <span className="req">*</span></label>
              <div className={`lc-input tel ${focus === 'phone' ? 'focus' : ''}`}>
                <span className="dial">🇧🇷 <span className="chev">▾</span> +55</span>
                {values.phone ? values.phone : <span className="ph">{copy.phonePlaceholder}</span>}
                {focus === 'phone' && <Caret color="#7c3aed" />}
              </div>
            </div>
          </div>
          <div className="lc-footer">
            <span className={`lc-btn ${complete ? '' : 'disabled'}`}>
              <Send size={16} style={{ marginRight: 8 }} />
              {copy.submit}
              <Tap now={now} at={props.submitTapAt} />
            </span>
          </div>
        </div>
        <p className="powered-by">Powered by <a>AutomateFlow</a></p>
      </div>
      <style jsx>{`
        .lc-page {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 16px;
          background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #f5f3ff 100%);
          font-family: 'Inter', sans-serif; color: #111827;
          transition: transform 0.32s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .lc-page.lifted { transform: translateY(-190px); }
        .lc-card { width: 95%; max-width: 380px; }
        .lc-content { background: #fff; border-radius: 12px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); overflow: hidden; }
        .lc-header { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); padding: 20px; display: flex; align-items: center; gap: 16px; }
        .lc-avatar { width: 44px; height: 44px; border-radius: 12px; background: rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .lc-title { color: #fff; font-weight: 600; font-size: 17.6px; margin: 0; }
        .lc-subtitle { font-size: 14.4px; color: #fff; opacity: 0.9; margin: 0; }
        .lc-body { padding: 20px; background: #f9fafb; }
        .lc-message { color: #6b7280; margin: 0 0 20px; line-height: 1.5; font-size: 15.2px; text-align: center; }
        .lc-field { margin-bottom: 12px; }
        .lc-field:last-child { margin-bottom: 0; }
        .lc-label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 6px; }
        .req { color: #ef4444; }
        .lc-input {
          display: flex; align-items: center; width: 100%; min-height: 51px; padding: 14px 16px;
          border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; background: #fff; color: #111827;
          transition: all 0.3s ease; white-space: nowrap; overflow: hidden;
        }
        .lc-input.focus { border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
        .lc-input.tel { padding-left: 12px; }
        .dial { display: inline-flex; align-items: center; gap: 5px; padding-right: 10px; margin-right: 10px; border-right: 1px solid #e5e7eb; color: #374151; font-size: 16px; }
        .chev { font-size: 10px; opacity: 0.6; }
        .ph { color: #9ca3af; }
        .lc-footer { padding: 14px 20px 20px; background: #fff; border-top: 1px solid #e5e7eb; }
        .lc-btn {
          position: relative; width: 100%; padding: 14px 24px; border-radius: 8px; font-weight: 500; font-size: 15.2px;
          display: flex; align-items: center; justify-content: center; white-space: nowrap; color: #fff;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
          transition: opacity 0.3s ease;
        }
        .lc-btn.disabled { opacity: 0.6; box-shadow: none; }
        .powered-by { text-align: center; font-size: 12px; color: #9ca3af; margin-top: 24px; }
        .powered-by a { font-weight: 600; color: #6b7280; }
        @media (prefers-reduced-motion: reduce) { .lc-page { transition: none; } }
      `}</style>
    </div>
  );
}

export type FunnelCopy = {
  videoTitle: string;
  tutorialTitle: string;
  tutorialItems: { title: string; body: string }[];
  offerTitle: string;
  offerBody: string;
  primaryLabel: string;
  secondaryLabel: string;
  getAccess: string;
  joinCommunity: string;
  back: string;
  continue: string;
};

export function FunnelPage(props: {
  now: number;
  copy: FunnelCopy;
  step: 1 | 2 | 3;
  continueTapAt?: number;
  primaryTapAt?: number;
}) {
  const { now, copy, step } = props;
  const icons = [Video, ListChecks, Star];
  const Icon = icons[step - 1];
  return (
    <div className="fn-page">
      <main className="fn-main">
        <div className="steps">
          {[1, 2, 3].map((n) => (
            <div key={n} className="step-wrap">
              <div className={`step-item ${step === n ? 'active' : ''} ${step > n ? 'completed' : ''}`}>
                <span className="step-circle">{step > n ? <Check size={16} strokeWidth={3} /> : n}</span>
              </div>
              {n < 3 && <div className={`step-connector ${step > n ? 'active' : ''}`} />}
            </div>
          ))}
        </div>

        <div className="card" key={step}>
          <div className="avatar-lg"><Icon size={32} /></div>
          {step === 1 && (
            <>
              <h1 className="h1">{copy.videoTitle}</h1>
              <div className="video">
                <span className="yt"><Play size={22} fill="#fff" color="#fff" /></span>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h1 className="h1">{copy.tutorialTitle}</h1>
              {copy.tutorialItems.map((it) => (
                <div key={it.title} className="item">
                  <h2>{it.title}</h2>
                  <p>{it.body}</p>
                </div>
              ))}
            </>
          )}
          {step === 3 && (
            <>
              <h1 className="h1">{copy.offerTitle}</h1>
              <p className="body">{copy.offerBody}</p>
              <div className="social-links">
                <div className={`social-card ${props.primaryTapAt !== undefined && now >= props.primaryTapAt ? 'hover' : ''}`}>
                  <span className="social-icon"><GraduationCap size={28} /></span>
                  <span className="social-info"><h5>{copy.primaryLabel}</h5><p>{copy.getAccess}</p></span>
                  <span className="social-arrow"><ArrowRight size={18} /></span>
                  <Tap now={now} at={props.primaryTapAt} />
                </div>
                <div className="social-card">
                  <span className="social-icon">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
                  </span>
                  <span className="social-info"><h5>{copy.secondaryLabel}</h5><p>{copy.joinCommunity}</p></span>
                  <span className="social-arrow"><ArrowRight size={18} /></span>
                </div>
              </div>
            </>
          )}
          <div className="nav">
            {step !== 1 && <span className="btn-primary">{copy.back}</span>}
            {step !== 3 && (
              <span className="btn-primary">
                {copy.continue}
                <Tap now={now} at={props.continueTapAt} />
              </span>
            )}
          </div>
        </div>
        <p className="footer">Powered by <a>AutomateFlow</a></p>
      </main>
      <style jsx>{`
        .fn-page { position: absolute; inset: 0; overflow: hidden; background: #faf8ff; font-family: 'Inter', sans-serif; color: #1f2937; }
        .fn-main { max-width: 448px; margin: 0 auto; padding: 32px 16px; }
        .steps { display: flex; align-items: flex-start; padding: 0 16px; margin-bottom: 32px; }
        .step-wrap { display: contents; }
        .step-item { display: flex; flex-direction: column; align-items: center; flex: 0 0 auto; }
        .step-circle {
          width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          background: #faf8ff; border: 2px solid #e5e7eb; font-weight: 600; color: #6b7280; transition: all 0.3s ease;
        }
        .step-item.active .step-circle { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-color: #8b5cf6; color: #fff; }
        .step-item.completed .step-circle { background: #8b5cf6; border-color: #8b5cf6; color: #fff; }
        .step-connector { flex: 1; height: 2px; background: #e5e7eb; margin: 19px 8px 0; transition: all 0.3s ease; }
        .step-connector.active { background: #8b5cf6; }

        .card {
          background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 24px;
          box-shadow: 0 4px 6px -1px rgb(139 92 246 / 0.15), 0 2px 4px -2px rgb(139 92 246 / 0.1);
          display: flex; flex-direction: column; gap: 16px; animation: fnFade 0.6s ease-out;
        }
        .avatar-lg { width: 80px; height: 80px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); animation: fnUp 0.6s ease-out; }
        .h1 { font-size: 20px; font-weight: 700; color: #1f2937; text-align: center; margin: 0; animation: fnUp 0.6s ease-out 0.1s both; }
        .body { color: #4b5563; text-align: center; margin: 0; font-size: 16px; line-height: 1.5; }
        .video {
          position: relative; aspect-ratio: 16 / 9; border-radius: 12px; overflow: hidden;
          background: radial-gradient(circle at 70% 30%, #7c3aed 0%, transparent 60%), linear-gradient(135deg, #111827, #312e81);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center;
        }
        .yt { width: 68px; height: 48px; border-radius: 12px; background: #ff0000; display: flex; align-items: center; justify-content: center; }
        .item { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 16px; animation: fnUp 0.6s ease-out 0.1s both; }
        .item h2 { font-size: 16px; font-weight: 600; color: #1f2937; margin: 0 0 4px; }
        .item p { font-size: 14px; color: #4b5563; margin: 0; line-height: 1.45; }
        .social-links { display: flex; flex-direction: column; gap: 16px; }
        .social-card {
          position: relative; display: flex; align-items: center; padding: 20px 24px; background: #fff;
          border: 2px solid #e5e7eb; border-radius: 16px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-card.hover { transform: translateY(-4px) scale(1.02); border-color: #8b5cf6; box-shadow: 0 20px 25px -5px rgb(139 92 246 / 0.25), 0 8px 10px -6px rgb(139 92 246 / 0.15); }
        .social-icon { width: 56px; height: 56px; border-radius: 14px; margin-right: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
        .social-info { flex: 1; text-align: left; }
        .social-info h5 { color: #1f2937; font-weight: 600; font-size: 17.6px; margin: 0; }
        .social-info p { color: #6b7280; font-size: 14.4px; margin: 0; }
        .social-arrow { color: #e5e7eb; }
        .social-card.hover .social-arrow { color: #8b5cf6; }
        .nav { display: flex; gap: 12px; margin-top: 8px; }
        .btn-primary {
          position: relative; flex: 1; display: inline-flex; align-items: center; justify-content: center;
          padding: 16px 32px; border-radius: 14px; color: #fff; font-weight: 600; font-size: 16px;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          box-shadow: 0 4px 6px -1px rgb(139 92 246 / 0.15), 0 2px 4px -2px rgb(139 92 246 / 0.1);
        }
        .footer { text-align: center; font-size: 12px; color: #9ca3af; padding-top: 16px; }
        .footer a { font-weight: 600; color: #6b7280; }
        @keyframes fnFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fnUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .card, .avatar-lg, .h1, .item { animation: none; } }
      `}</style>
    </div>
  );
}
