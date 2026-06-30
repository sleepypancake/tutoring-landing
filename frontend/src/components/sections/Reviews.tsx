import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';

interface Review {
  id: number;
  parentName: string;
  childAge: string;
  text: string;
  rating: number;
  photo?: { url: string; alternativeText?: string };
}

const defaultReviews: Review[] = [
  { id: 1, parentName: 'Мария', childAge: 'дочь, 8 лет', text: 'За 2 месяца почерк стал просто другим! Дочь сама хочет идти на занятия. Атмосфера очень спокойная и дружелюбная. Огромное спасибо!', rating: 5 },
  { id: 2, parentName: 'Александр', childAge: 'сын, 9 лет', text: 'Сын перестал бояться диктантов. Ошибок стало намного меньше. Педагог находит подход к каждому ребёнку. Рекомендую всем!', rating: 5 },
  { id: 3, parentName: 'Елена', childAge: 'дочь, 7 лет', text: 'Готовили ребёнка к школе. Очень внимательный и терпеливый педагог. Дочь полюбила учиться. Результат превзошёл все ожидания!', rating: 5 },
];

const avatarColors = [
  { bg: 'var(--purple-light)', color: 'var(--purple)' },
  { bg: '#E6F8F4', color: '#0F8A6E' },
  { bg: '#FFF0EC', color: '#C24A1E' },
];

interface ReviewsProps {
  reviews?: Review[];
}

export default function Reviews({ reviews = defaultReviews }: ReviewsProps) {
  return (
    <section style={{ background: '#F0EBF8', paddingBottom: 0 }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">Говорят родители</span>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.5px', marginTop: 12 }}>
            Отзывы
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="reviews-grid">
          {reviews.map((r, i) => {
            const aColor = avatarColors[i % avatarColors.length];
            return (
              <div key={r.id} style={{
                background: 'white',
                borderRadius: 28,
                boxShadow: '0 2px 24px rgba(107,79,160,0.07)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Photo at top if uploaded */}
                {r.photo?.url && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', flexShrink: 0 }}>
                    <Image
                      src={getStrapiMedia(r.photo.url)}
                      alt={r.photo.alternativeText ?? `Отзыв от ${r.parentName}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
                  {/* Big quote mark */}
                  <div style={{
                    position: 'absolute', top: 12, right: 24,
                    fontSize: 72, lineHeight: 1,
                    color: 'var(--purple-light)',
                    fontFamily: 'Georgia, serif',
                    userSelect: 'none',
                  }}>"</div>

                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: aColor.bg, color: aColor.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, fontSize: 17, flexShrink: 0,
                    }}>{r.parentName[0]}</div>
                    <div>
                      <p style={{ fontWeight: 900, fontSize: 15, color: 'var(--navy)' }}>{r.parentName}</p>
                      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>{r.childAge}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} style={{ color: '#FFCC00', fontSize: 16 }}>★</span>
                    ))}
                  </div>

                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.65, position: 'relative', zIndex: 1 }}>
                    {r.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,60 C360,0 1080,80 1440,30 L1440,80 L0,80 Z" fill="var(--cream)" />
      </svg>

      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
