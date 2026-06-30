import BeforeAfterBlock from './BeforeAfterBlock';

interface BeforeAfterPair {
  id: number;
  beforeImage?: { url: string; alternativeText?: string };
  afterImage?: { url: string; alternativeText?: string };
  label?: string;
}

interface ResultsProps {
  pairs?: BeforeAfterPair[];
}

const milestones = [
  { week: '2–3 недели', result: 'Ребёнок начинает чувствовать себя увереннее' },
  { week: '1–2 месяца', result: 'Заметно меньше ошибок, почерк становится аккуратнее' },
  { week: '3 месяца', result: 'Устойчивый результат — грамотность и уверенность' },
];

export default function Results({ pairs }: ResultsProps) {
  return (
    <section style={{ background: '#F0EBF8', paddingBottom: 0 }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}
          className="results-grid">

          {/* Left: timeline */}
          <div>
            <span className="section-label">Прогресс</span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900,
              color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.5px',
              margin: '12px 0 36px',
            }}>
              Результат уже через<br />
              <span style={{
                color: 'var(--purple)', background: 'var(--yellow)',
                padding: '2px 10px', borderRadius: 8, fontStyle: 'italic',
              }}>3 месяца</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'var(--purple)', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, fontWeight: 900,
                    }}>{i + 1}</div>
                    {i < milestones.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'rgba(107,79,160,0.2)', minHeight: 32, margin: '4px 0' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < milestones.length - 1 ? 28 : 0, paddingTop: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.week}</div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4 }}>{m.result}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 28, fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>
              ❤️ На основе реальных результатов учеников
            </p>
          </div>

          {/* Right: before/after photos */}
          <div>
            <BeforeAfterBlock pairs={pairs} layout="grid" />
          </div>
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,40 C360,80 1080,0 1440,50 L1440,80 L0,80 Z" fill="var(--cream)" />
      </svg>

      <style>{`
        @media (max-width: 768px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
