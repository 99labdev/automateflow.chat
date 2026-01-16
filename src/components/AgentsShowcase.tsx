'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Share2, Brain, Settings, BookOpen, Bot } from 'lucide-react';

export default function AgentsShowcase() {
  const t = useTranslations('agentsShowcase');
  const [activeAgent, setActiveAgent] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animation every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Reset animation when agent changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeAgent]);

  const primaryColor = '#8b5cf6';

  const agents = [
    {
      key: 'multichannel',
      icon: Share2,
      color: primaryColor,
      messages: [
        { type: 'bot', text: 'multichannelMsg1' },
        { type: 'user', text: 'multichannelMsg2' },
        { type: 'bot', text: 'multichannelMsg3' },
      ]
    },
    {
      key: 'aimodels',
      icon: Brain,
      color: primaryColor,
      messages: [
        { type: 'bot', text: 'aimodelsMsg1' },
        { type: 'user', text: 'aimodelsMsg2' },
        { type: 'bot', text: 'aimodelsMsg3' },
      ]
    },
    {
      key: 'integrations',
      icon: Settings,
      color: primaryColor,
      messages: [
        { type: 'bot', text: 'integrationsMsg1' },
        { type: 'user', text: 'integrationsMsg2' },
        { type: 'bot', text: 'integrationsMsg3' },
      ]
    },
    {
      key: 'leadcapture',
      icon: BookOpen,
      color: primaryColor,
      messages: [
        { type: 'bot', text: 'leadcaptureMsg1' },
        { type: 'user', text: 'leadcaptureMsg2' },
        { type: 'bot', text: 'leadcaptureMsg3' },
      ]
    },
  ];

  const currentAgent = agents[activeAgent];

  return (
    <section id="agents-showcase" className="section agents-section">
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="agents-grid">
          <div className="agents-tabs">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <button
                  key={agent.key}
                  className={`agent-tab ${activeAgent === index ? 'active' : ''}`}
                  onClick={() => setActiveAgent(index)}
                  style={{ '--agent-color': agent.color } as React.CSSProperties}
                >
                  <div className="agent-tab-icon">
                    <Icon size={24} />
                  </div>
                  <div className="agent-tab-content">
                    <h3 className="agent-tab-title">{t(`agents.${agent.key}.title`)}</h3>
                    <p className="agent-tab-desc">{t(`agents.${agent.key}.description`)}</p>
                  </div>
                </button>
              );
            })}
          </div>

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
                  <div className="chat-header-demo whatsapp-header">
                    <div className="whatsapp-header-left">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                      <div className="chat-avatar-demo">
                        <Bot size={20} />
                      </div>
                      <div className="chat-info-demo">
                        <span className="chat-name-demo">Agente</span>
                        <span className="chat-status-demo">online</span>
                      </div>
                    </div>
                    <div className="whatsapp-header-right">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 7l-7 5 7 5V7z"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="12" cy="5" r="1"/>
                        <circle cx="12" cy="19" r="1"/>
                      </svg>
                    </div>
                  </div>
                  <div key={animationKey} className="chat-body-demo whatsapp-body">
                    {/* Bot greeting */}
                    <div className="message-demo bot animate-msg" style={{ animationDelay: '0.5s' }}>
                      <span className="msg-text">{t(`agents.${currentAgent.key}.${currentAgent.messages[0].text}`)}</span>
                      <span className="msg-time">9:41</span>
                    </div>

                    {/* User message */}
                    <div className="message-demo user animate-msg" style={{ animationDelay: '3s' }}>
                      <span className="msg-text">{t(`agents.${currentAgent.key}.${currentAgent.messages[1].text}`)}</span>
                      <span className="msg-time">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                          <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.47.47 0 0 0-.343.146l-.311.31a.445.445 0 0 0-.14.337c0 .136.047.25.14.343l2.996 2.996a.724.724 0 0 0 .501.203.697.697 0 0 0 .521-.229L11.211 1.35a.458.458 0 0 0 .14-.343.414.414 0 0 0-.14-.311l-.14-.044z"/>
                          <path d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.405-1.272-.311.311 1.996 1.996a.724.724 0 0 0 .501.203.697.697 0 0 0 .521-.229L15.211 1.35a.458.458 0 0 0 .14-.343.414.414 0 0 0-.14-.311l-.14-.044z"/>
                        </svg>
                        9:42
                      </span>
                    </div>

                    {/* Bot typing indicator */}
                    <div className="typing-demo animate-typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    {/* Bot response */}
                    <div className="message-demo bot animate-msg" style={{ animationDelay: '5s' }}>
                      <span className="msg-text">{t(`agents.${currentAgent.key}.${currentAgent.messages[2].text}`)}</span>
                      <span className="msg-time">9:42</span>
                    </div>
                  </div>

                  {/* WhatsApp Input Bar */}
                  <div className="whatsapp-input-bar">
                    <div className="input-field-wrapper">
                      {/* Emoji icon */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="input-icon emoji-icon">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm3.5-9c.828 0 1.5-.672 1.5-1.5S16.328 8 15.5 8 14 8.672 14 9.5s.672 1.5 1.5 1.5zm-7 0c.828 0 1.5-.672 1.5-1.5S9.328 8 8.5 8 7 8.672 7 9.5 7.672 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
                      </svg>

                      {/* Input field */}
                      <div className="input-field">
                        <span key={animationKey} className="typing-text">{t(`agents.${currentAgent.key}.${currentAgent.messages[1].text}`)}</span>
                      </div>

                      {/* Attachment icon */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="input-icon attach-icon">
                        <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 003.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 01-2.829 1.171 3.975 3.975 0 01-2.83-1.173 3.973 3.973 0 01-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.606.606 0 00-.86 0l-7.209 7.211c-1.391 1.392-2.158 3.24-2.158 5.207.001.025.001.051.001.076l-.002.002z" fill="currentColor"/>
                      </svg>

                      {/* Camera icon */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="input-icon camera-icon">
                        <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" fill="currentColor"/>
                        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
                      </svg>
                    </div>

                    {/* Microphone / Send button */}
                    <div className="input-mic-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mic-icon">
                        <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6z" fill="currentColor"/>
                        <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="currentColor"/>
                      </svg>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="send-icon">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
                      </svg>
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
        </div>
      </div>

      <style jsx>{`
        .agents-section {
          background: var(--bg-primary);
          overflow: hidden;
        }

        .agents-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-top: 48px;
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
          transform: translateX(8px);
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
          0%, 100% { transform: translateY(0) rotateY(-3deg); }
          50% { transform: translateY(-15px) rotateY(3deg); }
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

        .chat-header-demo {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.3s ease;
        }

        .whatsapp-header {
          background: #075e54 !important;
          justify-content: space-between;
          padding: 8px 12px;
        }

        .whatsapp-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
        }

        .whatsapp-header-right {
          display: flex;
          align-items: center;
          gap: 18px;
          color: white;
        }

        .chat-avatar-demo {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .chat-info-demo {
          display: flex;
          flex-direction: column;
        }

        .chat-name-demo {
          color: white;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .chat-status-demo {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.7rem;
        }

        .chat-body-demo {
          flex: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .whatsapp-body {
          background: #0b141a;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          padding: 12px;
        }

        .message-demo {
          max-width: 80%;
          padding: 6px 8px 6px 10px;
          border-radius: 8px;
          font-size: 0.85rem;
          line-height: 1.4;
          opacity: 0;
          transform: translateY(20px);
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 6px;
        }

        .msg-text {
          flex: 1;
        }

        .msg-time {
          font-size: 0.65rem;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 3px;
          white-space: nowrap;
          margin-left: auto;
          padding-top: 2px;
        }

        .animate-msg {
          animation: slideUpMsg 0.5s ease forwards;
        }

        @keyframes slideUpMsg {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-demo.bot {
          background: #1f2c34;
          color: #e9edef;
          align-self: flex-start;
          border-top-left-radius: 0;
        }

        .message-demo.bot::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 8px 8px 0;
          border-color: transparent #1f2c34 transparent transparent;
        }

        .message-demo.user {
          background: #005c4b;
          color: #e9edef;
          align-self: flex-end;
          border-top-right-radius: 0;
        }

        .message-demo.user::before {
          content: '';
          position: absolute;
          top: 0;
          right: -8px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 8px 8px 0 0;
          border-color: #005c4b transparent transparent transparent;
        }

        .message-demo.user .msg-time {
          color: #8fdfcb;
        }

        .message-demo.user .msg-time svg {
          color: #53bdeb;
        }

        .typing-demo {
          display: flex;
          gap: 4px;
          padding: 10px 14px;
          background: #1f2c34;
          border-radius: 8px;
          border-top-left-radius: 0;
          width: fit-content;
          opacity: 0;
          position: relative;
        }

        .typing-demo::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 8px 8px 0;
          border-color: transparent #1f2c34 transparent transparent;
        }

        .typing-demo span {
          width: 7px;
          height: 7px;
          background: #8696a0;
          border-radius: 50%;
          animation: typingBounce 1.4s infinite ease-in-out;
        }

        .typing-demo span:nth-child(2) { animation-delay: 0.2s; }
        .typing-demo span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        .animate-typing {
          opacity: 0;
          animation: showTyping 1.5s ease forwards;
          animation-delay: 3.2s;
        }

        @keyframes showTyping {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* WhatsApp Input Bar */
        .whatsapp-input-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 6px;
          background: #0b141a;
        }

        .input-field-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          background: #1f2c34;
          border-radius: 21px;
          padding: 6px 8px;
          gap: 6px;
          min-height: 42px;
          overflow: hidden;
        }

        .input-field-wrapper > svg {
          color: #8696a0;
          flex: 0 0 auto;
          cursor: pointer;
          min-width: 22px;
        }

        .input-field-wrapper > svg.emoji-icon {
          width: 24px;
          height: 24px;
          min-width: 24px;
        }

        .input-field-wrapper > svg.attach-icon {
          width: 22px;
          height: 22px;
          min-width: 22px;
          transform: rotate(-45deg);
        }

        .input-field-wrapper > svg.camera-icon {
          width: 22px;
          height: 22px;
          min-width: 22px;
        }

        .input-field {
          flex: 1 1 auto;
          min-width: 0;
          overflow: hidden;
          min-height: 20px;
        }

        .typing-text {
          font-size: 0.9rem;
          color: #e9edef;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          animation: typeTextClip 1.5s steps(40) forwards, hideText 0.1s forwards;
          animation-delay: 1.2s, 2.9s;
        }

        @keyframes typeTextClip {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }

        @keyframes hideText {
          to { opacity: 0; }
        }

        .input-mic-btn {
          width: 42px;
          height: 42px;
          background: #00a884;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          cursor: pointer;
          position: relative;
        }

        .input-mic-btn .mic-icon {
          position: absolute;
          animation: showMic 12s ease infinite;
        }

        .input-mic-btn .send-icon {
          position: absolute;
          opacity: 0;
          animation: showSend 12s ease infinite;
        }

        @keyframes showMic {
          0%, 10% { opacity: 1; }
          12%, 25% { opacity: 0; }
          27%, 100% { opacity: 1; }
        }

        @keyframes showSend {
          0%, 10% { opacity: 0; }
          12%, 25% { opacity: 1; }
          27%, 100% { opacity: 0; }
        }

        @media (max-width: 1024px) {
          .agents-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .agent-demo {
            order: -1;
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

          .message-demo {
            font-size: 0.8rem;
            padding: 10px 14px;
          }
        }
      `}</style>
    </section>
  );
}
