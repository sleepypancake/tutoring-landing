'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#programs', label: 'Программы' },
  { href: '#how', label: 'Как проходят' },
  { href: '#about', label: 'Обо мне' },
  { href: '#contacts', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,253,246,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(107,79,160,0.1)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--purple)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>✏️</div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--purple)' }}>Помогаю детям</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--muted)' }}>писать и читать с пониманием</div>
            </div>
          </div>
        </Link>

        <nav className="header-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} style={{
              fontSize: 15, fontWeight: 700, color: 'var(--navy)',
              textDecoration: 'none', opacity: 0.75,
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
            >{item.label}</a>
          ))}
        </nav>

        <a href="#signup" className="header-cta" style={{
          background: 'var(--purple)', color: 'white',
          padding: '10px 24px', borderRadius: 100,
          fontSize: 14, fontWeight: 800, textDecoration: 'none',
          transition: 'transform 0.15s, background 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--purple-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--purple)'; e.currentTarget.style.transform = 'none'; }}
        >
          Записаться →
        </a>

        <button className="header-burger" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Меню"
        >
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: 2.5, background: 'var(--navy)', borderRadius: 2,
                transformOrigin: 'center',
                transform: open && i === 0 ? 'rotate(45deg) translateY(7.5px)' :
                  open && i === 1 ? 'scaleX(0)' :
                  open && i === 2 ? 'rotate(-45deg) translateY(-7.5px)' : 'none',
                transition: 'transform 0.2s',
              }} />
            ))}
          </div>
        </button>
      </div>

      {open && (
        <div style={{
          background: 'var(--cream)', borderTop: '1px solid rgba(107,79,160,0.1)',
          padding: '20px 24px 24px',
        }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}
              style={{ display: 'block', padding: '10px 0', fontWeight: 700, fontSize: 16, color: 'var(--navy)', textDecoration: 'none' }}
              onClick={() => setOpen(false)}
            >{item.label}</a>
          ))}
          <a href="#signup" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 16, textAlign: 'center',
            background: 'var(--purple)', color: 'white',
            padding: '14px', borderRadius: 100,
            fontWeight: 800, fontSize: 15, textDecoration: 'none',
          }}>Записаться →</a>
        </div>
      )}

      <style>{`
        .header-nav { display: flex; align-items: center; gap: 32px; }
        .header-cta { display: inline-flex; }
        .header-burger { display: none; }
        @media (max-width: 768px) {
          .header-nav { display: none; }
          .header-cta { display: none; }
          .header-burger { display: block; }
        }
      `}</style>
    </header>
  );
}
