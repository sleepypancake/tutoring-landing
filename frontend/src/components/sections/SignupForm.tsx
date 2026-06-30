'use client';

import { useState } from 'react';
import type { ContactLink } from '@/lib/contacts';
import { CONTACT_STYLES } from '@/lib/contacts';

interface SignupFormProps {
  contacts?: ContactLink[];
}

const DEFAULT_CONTACTS: ContactLink[] = [
  { id: 1, type: 'telegram', value: 'https://t.me/username' },
  { id: 2, type: 'max', value: 'https://max.ru/username' },
  { id: 3, type: 'phone', value: '+7 938 415-47-93' },
];

export default function SignupForm({ contacts }: SignupFormProps) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const displayContacts = contacts?.length ? contacts : DEFAULT_CONTACTS;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', phone: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="signup" style={{ background: 'var(--cream)', paddingBottom: 0 }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}
          className="signup-grid">

          {/* Left: form */}
          <div style={{
            background: 'var(--purple)',
            borderRadius: 36, padding: '48px 40px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 180, height: 180, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }} />

            <span style={{
              display: 'inline-block', background: 'var(--yellow)', color: '#7A5C00',
              fontSize: 12, fontWeight: 900, padding: '5px 14px', borderRadius: 100,
              marginBottom: 20, letterSpacing: '0.05em',
            }}>ПЕРВЫЙ ШАГ</span>

            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.5px' }}>
              Запишите ребёнка<br />на первое занятие
            </h2>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 32, lineHeight: 1.5 }}>
              Напишите — подберём удобное время и программу для вашего ребёнка.
            </p>

            {status === 'success' ? (
              <div style={{
                background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '32px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <p style={{ fontWeight: 900, fontSize: 18, color: 'white', marginBottom: 6 }}>Заявка отправлена!</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Я свяжусь с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input
                  type="text" placeholder="Ваше имя" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    border: 'none', borderRadius: 16, padding: '16px 20px',
                    fontSize: 15, fontWeight: 700, fontFamily: 'Nunito, sans-serif',
                    background: 'rgba(255,255,255,0.18)', color: 'white',
                    outline: 'none', width: '100%',
                  }}
                  onFocus={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
                  onBlur={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                />
                <input
                  type="tel" placeholder="Телефон" required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{
                    border: 'none', borderRadius: 16, padding: '16px 20px',
                    fontSize: 15, fontWeight: 700, fontFamily: 'Nunito, sans-serif',
                    background: 'rgba(255,255,255,0.18)', color: 'white',
                    outline: 'none', width: '100%',
                  }}
                  onFocus={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
                  onBlur={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                />
                <button
                  type="submit" disabled={status === 'loading'}
                  style={{
                    background: 'var(--yellow)', color: '#7A5C00',
                    border: 'none', borderRadius: 100, padding: '18px',
                    fontSize: 16, fontWeight: 900, fontFamily: 'Nunito, sans-serif',
                    cursor: 'pointer', marginTop: 4,
                    opacity: status === 'loading' ? 0.7 : 1,
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                >
                  {status === 'loading' ? 'Отправляем...' : 'Записаться на занятие →'}
                </button>
                {status === 'error' && (
                  <p style={{ color: 'var(--yellow)', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
                    Ошибка. Попробуйте ещё раз или напишите нам напрямую.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Right: contacts */}
          <div id="contacts" style={{ paddingTop: 8 }}>
            <span className="section-label">Контакты</span>
            <h3 style={{ fontWeight: 900, fontSize: 28, color: 'var(--navy)', marginTop: 12, marginBottom: 32, letterSpacing: '-0.5px' }}>
              Или свяжитесь<br />удобным способом
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {displayContacts.map((c) => {
                const s = CONTACT_STYLES[c.type];
                const href = s.href(c.value);
                const isPhone = c.type === 'phone';
                const label = c.label || (isPhone ? c.value : s.defaultLabel);
                const sub = isPhone ? null : s.defaultSub;

                return (
                  <a
                    key={c.id}
                    href={href}
                    target={isPhone ? undefined : '_blank'}
                    rel={isPhone ? undefined : 'noopener noreferrer'}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      background: s.bg, border: `2px solid ${s.border}`,
                      borderRadius: 20, padding: '18px 22px',
                      textDecoration: 'none',
                      transition: 'transform 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: s.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: 22,
                    }}>
                      {s.icon}
                    </div>
                    <div>
                      <p style={{ fontWeight: 900, fontSize: 15, color: s.textColor }}>{label}</p>
                      {sub && <p style={{ fontSize: 12, fontWeight: 700, color: s.subColor }}>{sub}</p>}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .signup-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder { color: rgba(255,255,255,0.5); }
      `}</style>
    </section>
  );
}
