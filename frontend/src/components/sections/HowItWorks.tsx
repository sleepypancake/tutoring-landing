function extractYandexMapSrc(input: string): string | null {
  const trimmed = input.trim();
  // Если это уже URL — проверяем что он яндексовый
  if (trimmed.startsWith('http')) {
    try {
      const { hostname } = new URL(trimmed);
      const isYandex = hostname === 'yandex.ru' || hostname.endsWith('.yandex.ru')
        || hostname === 'yandex.com' || hostname.endsWith('.yandex.com');
      return isYandex ? trimmed : null;
    } catch {
      return null;
    }
  }
  // Если это HTML-виджет — вытаскиваем src из iframe
  const match = trimmed.match(/src="(https:\/\/[^"]*yandex\.[a-z]+[^"]*)"/);
  return match ? match[1] : null;
}

const features = [
  { icon: '👤', text: 'Очные занятия — очно, живой контакт' },
  { icon: '👥', text: 'Индивидуально или в мини-группах' },
  { icon: '⏱️', text: 'Занятия 45–60 минут' },
  { icon: '🤝', text: 'Спокойная, поддерживающая атмосфера' },
  { icon: '🚫', text: 'Без давления и стресса' },
  { icon: '🌟', text: 'Ребёнок не боится ошибаться — и прогрессирует!' },
];

export default function HowItWorks({ mapEmbed }: { mapEmbed?: string | null }) {
  return (
    <section id="how" style={{ background: 'var(--cream)', paddingBottom: 0 }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">Формат работы</span>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.5px', marginTop: 12 }}>
            Как проходят занятия
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }} className="how-grid">
          {/* Format */}
          <div style={{ background: 'white', borderRadius: 28, padding: '32px 28px', boxShadow: '0 2px 24px rgba(107,79,160,0.07)' }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>📋</div>
            <h3 style={{ fontWeight: 900, fontSize: 20, color: 'var(--navy)', marginBottom: 20 }}>Формат</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {features.map((f) => (
                <div key={f.text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)', lineHeight: 1.4 }}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div style={{ background: 'var(--purple)', borderRadius: 28, padding: '32px 28px', color: 'white' }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>❤️</div>
            <h3 id="about" style={{ fontWeight: 900, fontSize: 20, color: 'white', marginBottom: 20, lineHeight: 1.3 }}>
              Бережный подход к каждому ребёнку
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 16px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                  Я подбираю формат занятий под уровень и особенности каждого ребёнка
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 16px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                  Помогаю не просто «заучить», а действительно понять и полюбить учёбу
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 16px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                  Объясняю спокойно и понятно — без спешки
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div style={{ background: '#E6F8F4', borderRadius: 28, padding: '32px 28px' }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>📍</div>
            <h3 style={{ fontWeight: 900, fontSize: 20, color: 'var(--navy)', marginBottom: 8 }}>
              Где проходят занятия
            </h3>
            <div style={{ background: 'white', borderRadius: 20, padding: '16px 18px', marginBottom: 20 }}>
              <p style={{ fontWeight: 900, fontSize: 16, color: 'var(--purple)', marginBottom: 4 }}>
                Краснодар, пос. Знаменский, ЖК «Родные просторы»
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.4 }}>
                Удобное расположение для жителей района
              </p>
            </div>
            {mapEmbed && extractYandexMapSrc(mapEmbed) ? (
              <div style={{ borderRadius: 16, overflow: 'hidden', height: 180 }}>
                <iframe
                  src={extractYandexMapSrc(mapEmbed)!}
                  width="100%"
                  height="180"
                  style={{ border: 'none', display: 'block' }}
                  title="Карта"
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div style={{
                background: '#D0F0E8', borderRadius: 16, height: 180,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 8,
              }}>
                <span style={{ fontSize: 32 }}>🗺️</span>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textAlign: 'center', padding: '0 16px' }}>
                  Вставьте iframe Яндекс карт в поле «Map Embed» в Strapi
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,20 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill="#F0EBF8" />
      </svg>

      <style>{`
        @media (max-width: 900px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
