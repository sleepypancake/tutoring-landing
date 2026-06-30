'use client';

interface Program {
  icon: string;
  title: string;
  description: string;
  color: string;
  bg: string;
  rotate: string;
}

const defaultPrograms: Program[] = [
  { icon: '✏️', title: 'Коррекция письма и чтения', description: 'Устраняем ошибки, улучшаем грамотность и понимание текста', color: '#6B4FA0', bg: '#EDE8F8', rotate: '-1deg' },
  { icon: '🖊️', title: 'Чистописание', description: 'Формируем аккуратный, разборчивый и уверенный почерк', color: '#0F8A6E', bg: '#E6F8F4', rotate: '1.5deg' },
  { icon: '📄', title: 'Сочинения и изложения', description: 'Учимся выражать мысли и строить красивые тексты', color: '#C24A1E', bg: '#FFF0EC', rotate: '-0.8deg' },
  { icon: '🎒', title: 'Подготовка к школе', description: 'База чтения, письма, математики и развитие мышления', color: '#9A6B00', bg: '#FFFBE6', rotate: '1.2deg' },
  { icon: '🔢', title: 'Математика', description: 'Устраняем пробелы, укрепляем навыки и уверенность', color: '#1155A0', bg: '#E6EFFF', rotate: '-1.5deg' },
  { icon: '🎨', title: 'Творчество', description: 'Рисуем, лепим, развиваем моторику и креативность', color: '#A0226B', bg: '#FFE8F5', rotate: '0.5deg' },
];

interface ProgramsProps {
  programs?: Program[];
}

export default function Programs({ programs = defaultPrograms }: ProgramsProps) {
  return (
    <section id="programs" style={{ background: 'var(--cream)', paddingBottom: 0 }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">Чему я учу</span>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.5px', marginTop: 12 }}>
            Программы занятий
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="programs-grid">
          {programs.map((p) => (
            <div key={p.title} style={{
              background: p.bg,
              borderRadius: 28,
              padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: 14,
              transition: 'transform 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = `rotate(${p.rotate}) translateY(-4px)`)}
              onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 18,
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>{p.icon}</div>
              <h3 style={{ fontWeight: 900, fontSize: 17, color: 'var(--navy)', lineHeight: 1.25 }}>{p.title}</h3>
              <p style={{ fontSize: 14, fontWeight: 600, color: p.color, lineHeight: 1.5 }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#F0EBF8" />
      </svg>

      <style>{`
        @media (max-width: 900px) {
          .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .programs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
