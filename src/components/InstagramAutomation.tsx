'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, UserCheck } from 'lucide-react';

export default function InstagramAutomation() {
  const t = useTranslations('agentsShowcase');
  const [activeAutomation, setActiveAutomation] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animation every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const primaryColor = '#8b5cf6';

  const automations = [
    {
      key: 'commentToDm',
      icon: MessageCircle,
      color: primaryColor,
    },
    {
      key: 'autoReply',
      icon: Send,
      color: primaryColor,
    },
    {
      key: 'leadCapture',
      icon: UserCheck,
      color: primaryColor,
    },
    {
      key: 'engagement',
      icon: Heart,
      color: primaryColor,
    },
  ];

  return (
    <section className="section instagram-automation-section">
      <div className="container">
        <div className="automation-section">
          <h3 className="automation-title">{t('automationSection.title')}</h3>
          <p className="automation-subtitle">{t('automationSection.subtitle')}</p>

          <div className="automation-grid">
            <div className="agent-demo">
              <div className="iphone-mockup">
                <div className="iphone-frame">
                  <div className="iphone-screen">
                    <div className="dynamic-island"></div>
                    <div className="status-bar">
                      <span className="status-time">9:41</span>
                      <div className="status-icons">
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                          <path d="M1 4.5C1 3.67 1.67 3 2.5 3h1C4.33 3 5 3.67 5 4.5v5c0 .83-.67 1.5-1.5 1.5h-1C1.67 11 1 10.33 1 9.5v-5zM6 3.5C6 2.67 6.67 2 7.5 2h1C9.33 2 10 2.67 10 3.5v6c0 .83-.67 1.5-1.5 1.5h-1C6.67 10 6 9.33 6 8.5v-5zM11 2.5c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-1c-.83 0-1.5-.67-1.5-1.5v-7z"/>
                        </svg>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                          <path d="M8 2.4c2.5 0 4.8 1 6.5 2.6.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0C12 4.8 10.1 4 8 4S4 4.8 2.6 6.1c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1C3.2 3.4 5.5 2.4 8 2.4zm0 3c1.6 0 3.1.6 4.2 1.7.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0-.8-.8-1.9-1.2-3.1-1.2s-2.3.4-3.1 1.2c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1C4.9 6 6.4 5.4 8 5.4zm0 3c.8 0 1.5.3 2 .9.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0-.2-.2-.5-.4-.9-.4s-.7.2-.9.4c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1.5-.6 1.2-.9 2-.9z"/>
                        </svg>
                        <div className="battery-icon">
                          <div className="battery-level"></div>
                        </div>
                      </div>
                    </div>

                    {/* Instagram Animation Container */}
                    <div key={animationKey} className="instagram-animation-container">
                      {/* Screen 1: Instagram Post */}
                      <div className="instagram-demo screen-post">
                        <div className="instagram-header">
                          <div className="instagram-user">
                            <div className="instagram-avatar">
                              <img src="/logo.png" alt="AutomateFlow" width="32" height="32" className="avatar-logo" />
                            </div>
                            <span className="instagram-username">automateflow</span>
                          </div>
                        </div>

                        <div className="instagram-post-image">
                          <div className="post-gradient">
                            <span className="post-emoji">🚀</span>
                            <span className="post-text">{t('automationSection.postText')}</span>
                          </div>
                        </div>

                        <div className="instagram-actions">
                          <div className="instagram-actions-left">
                            <Heart size={22} />
                            <MessageCircle size={22} />
                            <Send size={22} />
                          </div>
                          <Bookmark size={22} />
                        </div>

                        <div className="instagram-likes">
                          <span>1.234 {t('automationSection.likes')}</span>
                        </div>

                        <div className="instagram-comments">
                          <div className="comment animate-comment" style={{ animationDelay: '0.8s' }}>
                            <div className="comment-avatar avatar-male">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                            <span className="comment-user">hudsonbrendon</span>
                            <span className="comment-text">{t('automationSection.comment1')}</span>
                          </div>
                          <div className="comment comment-reply animate-comment" style={{ animationDelay: '2s' }}>
                            <div className="comment-avatar">
                              <img src="/logo.png" alt="AutomateFlow" />
                            </div>
                            <span className="comment-user">automateflow</span>
                            <span className="comment-text">{t('automationSection.commentReply')}</span>
                          </div>
                          <div className="comment animate-comment" style={{ animationDelay: '3.2s' }}>
                            <div className="comment-avatar avatar-female">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                            <span className="comment-user">mariamayse</span>
                            <span className="comment-text">{t('automationSection.comment2')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Screen 2: DM Inbox */}
                      <div className="instagram-demo screen-dm">
                        <div className="dm-screen-header">
                          <div className="dm-header-back">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                          </div>
                          <div className="dm-header-user">
                            <div className="dm-header-avatar">
                              <img src="/logo.png" alt="AutomateFlow" width="32" height="32" className="avatar-logo" />
                            </div>
                            <div className="dm-header-info">
                              <span className="dm-header-name">automateflow</span>
                              <span className="dm-header-status">{t('automationSection.dmActive')}</span>
                            </div>
                          </div>
                          <div className="dm-header-actions">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="23 7 16 12 23 17 23 7"/>
                              <rect width="15" height="14" x="1" y="5" rx="2" ry="2"/>
                            </svg>
                          </div>
                        </div>

                        <div className="dm-messages">
                          <div className="dm-message received animate-dm-msg" style={{ animationDelay: '5.5s' }}>
                            <div className="dm-msg-avatar">
                              <img src="/logo.png" alt="AutomateFlow" width="24" height="24" className="avatar-logo" />
                            </div>
                            <div className="dm-msg-bubble">
                              <span>{t('automationSection.dmGreeting')}</span>
                            </div>
                          </div>
                          <div className="dm-message received animate-dm-msg" style={{ animationDelay: '6.5s' }}>
                            <div className="dm-msg-avatar">
                              <img src="/logo.png" alt="AutomateFlow" width="24" height="24" className="avatar-logo" />
                            </div>
                            <div className="dm-msg-bubble">
                              <span>{t('automationSection.dmText')}</span>
                            </div>
                          </div>
                          <div className="dm-message received animate-dm-msg link-message" style={{ animationDelay: '7.5s' }}>
                            <div className="dm-msg-avatar">
                              <img src="/logo.png" alt="AutomateFlow" width="24" height="24" className="avatar-logo" />
                            </div>
                            <div className="dm-msg-bubble dm-link-bubble">
                              <div className="dm-link-preview">
                                <div className="dm-link-icon">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                  </svg>
                                </div>
                                <div className="dm-link-info">
                                  <span className="dm-link-title">{t('automationSection.dmLinkTitle')}</span>
                                  <span className="dm-link-url">automateflow.chat</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="dm-input-bar">
                          <div className="dm-input-camera">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                              <circle cx="12" cy="13" r="4"/>
                            </svg>
                          </div>
                          <div className="dm-input-field">
                            <span>{t('automationSection.dmPlaceholder')}</span>
                          </div>
                          <div className="dm-input-actions">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                              <line x1="9" x2="9.01" y1="9" y2="9"/>
                              <line x1="15" x2="15.01" y1="9" y2="9"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="home-indicator"></div>
                  </div>
                </div>
                <div className="iphone-button-left-1"></div>
                <div className="iphone-button-left-2"></div>
                <div className="iphone-button-left-3"></div>
                <div className="iphone-button-right"></div>
              </div>
            </div>

            <div className="agents-tabs">
              {automations.map((automation, index) => {
                const Icon = automation.icon;
                return (
                  <button
                    key={automation.key}
                    className={`agent-tab ${activeAutomation === index ? 'active' : ''}`}
                    onClick={() => setActiveAutomation(index)}
                    style={{ '--agent-color': automation.color } as React.CSSProperties}
                  >
                    <div className="agent-tab-icon">
                      <Icon size={24} />
                    </div>
                    <div className="agent-tab-content">
                      <h3 className="agent-tab-title">{t(`automations.${automation.key}.title`)}</h3>
                      <p className="agent-tab-desc">{t(`automations.${automation.key}.description`)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .instagram-automation-section {
          background: var(--bg-primary);
          overflow: hidden;
          padding-top: 0;
        }

        .automation-section {
          padding-top: 60px;
          border-top: 1px solid var(--border-color);
        }

        .automation-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .automation-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .automation-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .agents-tabs {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .agent-tab {
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

        .agent-tab:hover {
          border-color: var(--agent-color);
          transform: translateX(-8px);
        }

        .agent-tab.active {
          border-color: var(--agent-color);
          background: var(--secondary-color);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }

        .agent-tab-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--agent-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .agent-tab.active .agent-tab-icon {
          transform: scale(1.1);
        }

        .agent-tab-content {
          flex: 1;
        }

        .agent-tab-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .agent-tab-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .agent-demo {
          display: flex;
          justify-content: center;
          perspective: 1000px;
        }

        .iphone-mockup {
          position: relative;
          width: 300px;
          height: 620px;
          animation: floatPhone 6s ease-in-out infinite;
        }

        @keyframes floatPhone {
          0%, 100% { transform: translateY(0) rotateY(3deg); }
          50% { transform: translateY(-15px) rotateY(-3deg); }
        }

        .iphone-frame {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 50%, #0f0f1a 100%);
          border-radius: 55px;
          padding: 12px;
          box-shadow:
            0 50px 100px -20px rgba(0, 0, 0, 0.5),
            0 30px 60px -30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .iphone-screen {
          width: 100%;
          height: 100%;
          background: var(--surface-color);
          border-radius: 45px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .dynamic-island {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 95px;
          height: 28px;
          background: #000;
          border-radius: 20px;
          z-index: 100;
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 28px 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-time {
          font-size: 15px;
          font-weight: 600;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-primary);
        }

        .battery-icon {
          width: 25px;
          height: 12px;
          border: 1.5px solid var(--text-primary);
          border-radius: 3px;
          padding: 1.5px;
          position: relative;
        }

        .battery-icon::after {
          content: '';
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 5px;
          background: var(--text-primary);
          border-radius: 0 1px 1px 0;
        }

        .battery-level {
          width: 100%;
          height: 100%;
          background: #4ade80;
          border-radius: 1px;
        }

        .iphone-button-left-1 {
          position: absolute;
          left: -2px;
          top: 120px;
          width: 3px;
          height: 30px;
          background: linear-gradient(90deg, #1a1a2e, #2a2a3e);
          border-radius: 2px 0 0 2px;
        }

        .iphone-button-left-2 {
          position: absolute;
          left: -2px;
          top: 180px;
          width: 3px;
          height: 55px;
          background: linear-gradient(90deg, #1a1a2e, #2a2a3e);
          border-radius: 2px 0 0 2px;
        }

        .iphone-button-left-3 {
          position: absolute;
          left: -2px;
          top: 250px;
          width: 3px;
          height: 55px;
          background: linear-gradient(90deg, #1a1a2e, #2a2a3e);
          border-radius: 2px 0 0 2px;
        }

        .iphone-button-right {
          position: absolute;
          right: -2px;
          top: 190px;
          width: 3px;
          height: 70px;
          background: linear-gradient(90deg, #2a2a3e, #1a1a2e);
          border-radius: 0 2px 2px 0;
        }

        .home-indicator {
          width: 135px;
          height: 5px;
          background: var(--text-secondary);
          border-radius: 3px;
          margin: 8px auto 10px;
          opacity: 0.3;
        }

        .instagram-animation-container {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .instagram-demo {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          background: var(--surface-color);
        }

        .screen-post {
          animation: slideOutLeft 0.6s ease forwards;
          animation-delay: 4.5s;
        }

        .screen-dm {
          transform: translateX(100%);
          animation: slideInRight 0.6s ease forwards;
          animation-delay: 4.5s;
        }

        @keyframes slideOutLeft {
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes slideInRight {
          to {
            transform: translateX(0);
          }
        }

        .instagram-header {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .instagram-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .instagram-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .avatar-logo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .instagram-username {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .instagram-post-image {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .post-gradient {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: white;
          text-align: center;
          padding: 20px;
        }

        .post-emoji {
          font-size: 2.5rem;
        }

        .post-text {
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .instagram-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          color: var(--text-primary);
        }

        .instagram-actions-left {
          display: flex;
          gap: 14px;
        }

        .instagram-actions svg {
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .instagram-actions svg:hover {
          transform: scale(1.1);
        }

        .instagram-likes {
          padding: 0 12px 6px;
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--text-primary);
        }

        .instagram-comments {
          padding: 4px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .comment {
          font-size: 0.75rem;
          opacity: 0;
          transform: translateX(-10px);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .comment-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comment-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .comment-avatar svg {
          width: 14px;
          height: 14px;
        }

        .comment-avatar.avatar-male {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .comment-avatar.avatar-female {
          background: linear-gradient(135deg, #ec4899, #be185d);
          color: white;
        }

        .animate-comment {
          animation: slideInComment 0.5s ease forwards;
        }

        @keyframes slideInComment {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .comment-user {
          font-weight: 600;
          color: var(--text-primary);
          margin-right: 6px;
        }

        .comment-text {
          color: var(--text-secondary);
        }


        /* DM Screen Styles */
        .dm-screen-header {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          gap: 12px;
        }

        .dm-header-back {
          color: var(--text-primary);
          cursor: pointer;
        }

        .dm-header-user {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .dm-header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .dm-header-info {
          display: flex;
          flex-direction: column;
        }

        .dm-header-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .dm-header-status {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .dm-header-actions {
          display: flex;
          gap: 16px;
          color: var(--text-primary);
        }

        .dm-messages {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }

        .dm-message {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          opacity: 0;
          transform: translateY(10px);
        }

        .dm-message.received {
          flex-direction: row;
        }

        .animate-dm-msg {
          animation: fadeInMsg 0.4s ease forwards;
        }

        @keyframes fadeInMsg {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dm-msg-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .dm-msg-bubble {
          background: var(--border-color);
          padding: 10px 14px;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          max-width: 80%;
        }

        .dm-msg-bubble span {
          font-size: 0.8rem;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .dm-link-bubble {
          padding: 8px;
          background: var(--border-color);
        }

        .dm-link-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--surface-color);
          padding: 10px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .dm-link-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .dm-link-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dm-link-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dm-link-url {
          font-size: 0.65rem;
          color: #8b5cf6;
        }

        .dm-input-bar {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          gap: 10px;
          border-top: 1px solid var(--border-color);
        }

        .dm-input-camera {
          color: #8b5cf6;
          cursor: pointer;
        }

        .dm-input-field {
          flex: 1;
          background: var(--border-color);
          padding: 10px 14px;
          border-radius: 20px;
        }

        .dm-input-field span {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .dm-input-actions {
          color: var(--text-secondary);
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .automation-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .agent-demo {
            order: -1;
          }

          .agent-tab:hover {
            transform: translateX(8px);
          }

          .iphone-mockup {
            width: 260px;
            height: 540px;
          }

          .iphone-frame {
            border-radius: 48px;
            padding: 10px;
          }

          .iphone-screen {
            border-radius: 40px;
          }

          .dynamic-island {
            width: 80px;
            height: 24px;
            top: 10px;
          }

          .automation-section {
            padding-top: 40px;
          }

          .automation-title {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .agent-tab {
            padding: 16px;
          }

          .agent-tab-icon {
            width: 44px;
            height: 44px;
          }

          .agent-tab-title {
            font-size: 1rem;
          }

          .agent-tab-desc {
            font-size: 0.8rem;
          }

          .iphone-mockup {
            width: 240px;
            height: 500px;
          }

          .automation-title {
            font-size: 1.5rem;
          }

          .automation-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
