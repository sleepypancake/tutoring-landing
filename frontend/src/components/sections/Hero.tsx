import BeforeAfterBlock from './BeforeAfterBlock';
import type { ContactLink } from '@/lib/contacts';
import { CONTACT_STYLES } from '@/lib/contacts';

interface BeforeAfterPair {
  id: number;
  beforeImage?: { url: string; alternativeText?: string };
  afterImage?: { url: string; alternativeText?: string };
  label?: string;
}

interface HeroProps {
  headline?: string;
  subheadline?: string;
  beforeAfterPairs?: BeforeAfterPair[];
  contacts?: ContactLink[];
}

export default function Hero({
  headline = 'Ребёнок пишет с ошибками и не понимает прочитанное?',
  subheadline = 'Помогу улучшить письмо, чтение и почерк уже за 2–3 месяца — без стресса и слёз',
  beforeAfterPairs,
  contacts = [],
}: HeroProps) {
  const tg = contacts.find(c => c.type === 'telegram');
  const tgHref = tg ? CONTACT_STYLES.telegram.href(tg.value) : 'https://t.me/username';
  return (
    <section style={{ background: 'var(--cream)', paddingTop: 68, overflow: 'hidden' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="hero-grid">

          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--yellow-light)', border: '1.5px solid var(--yellow)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 28,
            }}>
              <span style={{ fontSize: 16 }}>⭐</span>
              <span style={{ fontWeight: 800, fontSize: 13, color: '#7A5C00' }}>Репетитор начальных классов</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 900, lineHeight: 1.12,
              color: 'var(--navy)', marginBottom: 24, letterSpacing: '-1px',
            }}>
              {headline}
            </h1>

            <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 36 }}>
              {subheadline}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
              <a href="#signup" className="btn-primary">Записаться на диагностику →</a>
              <a href={tgHref} target="_blank" rel="noopener noreferrer" className="btn-tg-hero">
                <TelegramIcon /> Telegram
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '❤️', text: 'Индивидуальный подход к каждому ребёнку' },
                { icon: '🚀', text: 'Реальный прогресс уже через 3 месяца' },
                { icon: '🛡️', text: 'Спокойная, поддерживающая атмосфера' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: before/after */}
          <div style={{ maxWidth: 380, width: '100%', margin: '0 auto' }}>
            <BeforeAfterBlock pairs={beforeAfterPairs} layout="hero" />
          </div>
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', marginTop: 48 }}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F0EBF8" />
      </svg>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        .btn-tg-hero {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          background: transparent !important;
          color: #1155A0 !important;
          padding: 15px 32px !important;
          border-radius: 100px !important;
          font-weight: 800 !important;
          font-size: 16px !important;
          font-family: 'Nunito', sans-serif !important;
          text-decoration: none !important;
          border: 2.5px solid #229ED9 !important;
          cursor: pointer;
          transition: transform 0.15s, background 0.15s, color 0.15s;
        }
        .btn-tg-hero:hover {
          background: #229ED9 !important;
          color: white !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}
