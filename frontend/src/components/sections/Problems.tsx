const problems = [
  { icon: '✏️', text: 'Пишет с ошибками' },
  { icon: '📖', text: 'Не дочитывает слова' },
  { icon: '🔀', text: 'Путает окончания' },
  { icon: '❓', text: 'Не понимает текст' },
  { icon: '💬', text: 'Не может пересказать' },
  { icon: '📝', text: 'Пишет неразборчиво' },
];

export default function Problems() {
  return (
    <section style={{ background: '#F0EBF8', paddingBottom: 0 }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}
          className="problems-grid">
          {/* Left */}
          <div>
            <span className="section-label">Узнаёте своего ребёнка?</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: 24 }}>
              Возможно, сейчас<br />ваш ребёнок:
            </h2>

            <div style={{
              background: 'var(--yellow-light)',
              border: '2px solid var(--yellow)',
              borderRadius: 20,
              padding: '20px 24px',
              display: 'flex', gap: 14, alignItems: 'flex-start',
              marginTop: 32,
            }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>💡</span>
              <div>
                <p style={{ fontWeight: 800, fontSize: 16, color: 'var(--navy)', marginBottom: 4 }}>
                  Это не «само пройдёт»
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#7A5C00', lineHeight: 1.5 }}>
                  Но с правильной помощью — легко исправляется. Уже через 2–3 месяца занятий вы увидите результат.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {problems.map((p, i) => (
              <div key={p.text} style={{
                background: 'white',
                borderRadius: 20,
                padding: '20px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 10, textAlign: 'center',
                boxShadow: '0 2px 16px rgba(107,79,160,0.07)',
                transform: i % 2 === 0 ? 'translateY(0)' : 'translateY(12px)',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: 'var(--purple-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>{p.icon}</div>
                <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy)', lineHeight: 1.3 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,0 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill="var(--cream)" />
      </svg>

      <style>{`
        @media (max-width: 768px) {
          .problems-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
