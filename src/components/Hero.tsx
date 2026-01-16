'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const [currentConversation, setCurrentConversation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typewriterTexts = [
    t('titleHighlight'),
    t('titleHighlight2'),
  ];

  const subtitles = [
    t('subtitle'),
    t('subtitle2'),
  ];

  const totalConversations = 10;

  // Typewriter effect
  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 150;
    const pauseDelay = 2000;

    if (!isDeleting && displayedText === currentFullText) {
      // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      // Move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, typewriterTexts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentConversation((prev) => (prev + 1) % totalConversations);
        setIsAnimating(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getConversationKey = (index: number) => `conversations.c${index + 1}`;

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">{t('title')}</span>
              <span className="text-highlight-wrapper">
                <span className="text-highlight-placeholder" aria-hidden="true">
                  {typewriterTexts.reduce((a, b) => a.length > b.length ? a : b)}
                </span>
                <span className="text-highlight">{displayedText}<span className="cursor">|</span></span>
              </span>
            </h1>
            <p key={currentTextIndex} className="hero-subtitle animate-subtitle">{subtitles[currentTextIndex]}</p>

            <div className="hero-buttons">
              <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-white">
                {t('cta.trial')}
                <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn btn-outline-white">
                {t('cta.howItWorks')}
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">{t('stats.available')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5 min</span>
                <span className="stat-label">{t('stats.setup')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">{t('stats.unlimited')}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="chat-demo">
              <div className="chat-header">
                <div className="chat-avatar">
                  <Bot size={24} color="white" />
                </div>
                <div className="chat-info">
                  <span className="chat-name">{t('chatDemo.agentName')}</span>
                  <span className="chat-status">
                    <span className="status-dot"></span>
                    {t('chatDemo.status')}
                  </span>
                </div>
              </div>
              <div className={`chat-messages ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="message received animate-message">
                  <p>{t(`${getConversationKey(currentConversation)}.greeting`)}</p>
                  <span className="time">10:30</span>
                </div>
                <div className="message sent animate-message delay-1">
                  <p>{t(`${getConversationKey(currentConversation)}.userMessage`)}</p>
                  <span className="time">10:32</span>
                </div>
                <div className="message received animate-message delay-2">
                  <p>{t(`${getConversationKey(currentConversation)}.response`)}</p>
                  <span className="time">10:32</span>
                </div>
              </div>
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 140px 0 100px;
          background: var(--gradient-primary);
          color: white;
          overflow: hidden;
          position: relative;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="30" cy="5" r="1" fill="white" opacity="0.05"/><circle cx="50" cy="15" r="1" fill="white" opacity="0.1"/><circle cx="70" cy="8" r="1" fill="white" opacity="0.05"/><circle cx="90" cy="12" r="1" fill="white" opacity="0.1"/></svg>') repeat;
          animation: float 20s infinite linear;
        }

        @keyframes float {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 640px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          color: white;
          text-align: center;
        }

        .hero-title-main {
          white-space: nowrap;
        }

        .text-highlight-wrapper {
          position: relative;
          display: block;
          text-align: center;
          white-space: nowrap;
        }

        .text-highlight-placeholder {
          visibility: hidden;
        }

        .text-highlight {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          color: white;
          opacity: 0.9;
        }

        .cursor {
          animation: blink 1s infinite;
          font-weight: 400;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .animate-subtitle {
          animation: slideUpSubtitle 0.5s ease-out;
        }

        @keyframes slideUpSubtitle {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .btn-white {
          background: var(--surface-color);
          color: var(--primary-dark);
          padding: 14px 32px;
          border-radius: var(--radius-lg);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-md);
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-outline-white {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          padding: 14px 32px;
          border-radius: var(--radius-lg);
          font-weight: 600;
          transition: all var(--transition-normal);
        }

        .btn-outline-white:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
        }

        .hero-stats {
          display: flex;
          gap: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          opacity: 0.8;
          margin-top: 4px;
        }

        .hero-visual {
          display: flex;
          justify-content: flex-end;
        }

        .chat-demo {
          background: var(--card-bg);
          border-radius: var(--radius-2xl);
          padding: 24px;
          box-shadow: var(--shadow-xl);
          max-width: 400px;
          width: 100%;
          animation: slideInRight 1s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .chat-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .chat-avatar {
          width: 44px;
          height: 44px;
          background: var(--gradient-primary);
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-info {
          display: flex;
          flex-direction: column;
        }

        .chat-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .chat-status {
          font-size: 0.8rem;
          color: #8b5cf6;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #8b5cf6;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        .chat-messages {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 180px;
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        .chat-messages.fade-out {
          opacity: 0;
          transform: translateY(-10px);
        }

        .chat-messages.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .message {
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 85%;
          position: relative;
        }

        .animate-message {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-message.delay-1 {
          animation-delay: 0.3s;
        }

        .animate-message.delay-2 {
          animation-delay: 0.6s;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: var(--secondary-color);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          width: fit-content;
          margin-top: 8px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8b5cf6;
          animation: typingBounce 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .message.received {
          background: var(--secondary-color);
          color: var(--text-primary);
          margin-right: auto;
          border-bottom-left-radius: 4px;
        }

        .message.sent {
          background: var(--gradient-primary);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 4px;
        }

        .message p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .message .time {
          font-size: 0.7rem;
          opacity: 0.7;
          display: block;
          text-align: right;
          margin-top: 4px;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .chat-demo {
            margin-top: 40px;
          }

          .hero-visual {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 0 80px;
          }

          .hero-title {
            font-size: 1.75rem;
          }

          .text-highlight-wrapper {
            margin-top: 4px;
          }

          .text-highlight-placeholder,
          .text-highlight {
            white-space: nowrap;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-white,
          .btn-outline-white {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
