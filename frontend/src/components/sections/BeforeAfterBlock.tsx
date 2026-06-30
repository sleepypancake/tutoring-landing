'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

interface BeforeAfterPhoto {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface BeforeAfterPair {
  id: number;
  beforeImage?: BeforeAfterPhoto;
  afterImage?: BeforeAfterPhoto;
  label?: string;
}

interface BeforeAfterBlockProps {
  pairs?: BeforeAfterPair[];
  layout?: 'hero' | 'grid';
}

function NotebookPlaceholder({ label, variant }: { label: string; variant: 'before' | 'after' }) {
  const isBefore = variant === 'before';
  return (
    <div style={{
      background: isBefore ? 'white' : 'var(--purple)',
      borderRadius: 20,
      padding: '20px 24px',
      width: '100%',
    }}>
      <div style={{
        backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${isBefore ? '#E8E4F0' : 'rgba(255,255,255,0.15)'} 27px, ${isBefore ? '#E8E4F0' : 'rgba(255,255,255,0.15)'} 28px)`,
        paddingTop: 4,
      }}>
        {(isBefore
          ? ['нинья пашла в школу', 'маша купила кнегу', 'у нас было малако']
          : ['Нина пошла в школу.', 'Маша купила книгу.', 'У нас было молоко.']
        ).map((line, i) => (
          <div key={i} style={{
            height: 28, display: 'flex', alignItems: 'center',
            fontSize: 14, color: isBefore ? '#aaa' : 'white',
            fontFamily: 'Georgia, serif',
            fontStyle: isBefore ? 'italic' : 'normal',
          }}>{line}</div>
        ))}
      </div>
      <p style={{ marginTop: 8, fontSize: 11, color: isBefore ? '#ccc' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
        {label}
      </p>
    </div>
  );
}

function PhotoCard({
  image, variant, label, compact,
}: {
  image?: BeforeAfterPhoto;
  variant: 'before' | 'after';
  label?: string;
  compact?: boolean;
}) {
  const isBefore = variant === 'before';
  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: isBefore ? '#FF6B4A' : 'var(--yellow)',
    color: isBefore ? 'white' : '#7A5C00',
    fontSize: 11, fontWeight: 900, letterSpacing: '0.08em',
    padding: '4px 12px', borderRadius: 100,
    marginBottom: compact ? 6 : 10,
  };

  if (!image?.url) {
    return (
      <div style={{ width: '100%' }}>
        <span style={badgeStyle}>{isBefore ? 'ДО' : 'ПОСЛЕ'}</span>
        <NotebookPlaceholder
          label={label ?? (isBefore ? 'много ошибок, неуверенный почерк' : 'реальный результат ученика ❤️')}
          variant={variant}
        />
      </div>
    );
  }

  const src = getStrapiMedia(image.url);
  return (
    <div style={{ width: '100%' }}>
      <span style={badgeStyle}>{isBefore ? 'ДО' : 'ПОСЛЕ'}</span>
      <div style={{
        borderRadius: compact ? 16 : 20,
        overflow: 'hidden',
        border: isBefore ? '1px solid #F0EBF8' : '3px solid var(--purple)',
        position: 'relative',
        aspectRatio: compact ? '4/3' : undefined,
        height: compact ? undefined : 215,
      }}>
        <Image
          src={src}
          alt={image.alternativeText ?? (isBefore ? 'Тетрадь до занятий' : 'Тетрадь после занятий')}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 90vw, 45vw"
        />
      </div>
      {label && !compact && (
        <p style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>
          ❤️ {label}
        </p>
      )}
    </div>
  );
}

/* ─── Hero layout: diagonal cards + dot-slider ─── */
function HeroSlider({ pairs }: { pairs: BeforeAfterPair[] }) {
  const [idx, setIdx] = useState(0);
  const pair = pairs[idx] ?? {};

  return (
    <div style={{ width: '100%' }}>
      {/* Diagonal cards */}
      <div style={{ position: 'relative', height: 420 }}>
        {/* ДО — top-right */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '72%',
          transform: 'rotate(1.5deg)',
          zIndex: 1,
        }}>
          <PhotoCard image={pair.beforeImage} variant="before" label={pair.label} compact />
        </div>

        {/* Arrow */}
        <div style={{
          position: 'absolute', top: '46%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--purple)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 900,
          zIndex: 3, boxShadow: '0 2px 12px rgba(107,79,160,0.35)',
        }}>↓</div>

        {/* ПОСЛЕ — bottom-left */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '72%',
          transform: 'rotate(-1.5deg)',
          zIndex: 2,
        }}>
          <PhotoCard image={pair.afterImage} variant="after" label={pair.label} compact />
        </div>
      </div>

      {/* Dot navigation — only if more than 1 pair */}
      {pairs.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Пара ${i + 1}`}
              style={{
                width: i === idx ? 24 : 8, height: 8,
                borderRadius: 100,
                background: i === idx ? 'var(--purple)' : 'rgba(107,79,160,0.25)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.25s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Grid layout: vertical stack + arrow slider ─── */
function GridSlider({ pairs }: { pairs: BeforeAfterPair[] }) {
  const [idx, setIdx] = useState(0);
  const pair = pairs[idx] ?? {};

  return (
    <div>
      {/* Vertical: ДО → стрелка → ПОСЛЕ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <PhotoCard image={pair.beforeImage} variant="before" label={pair.label} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '10px 0',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--purple)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900,
            boxShadow: '0 2px 10px rgba(107,79,160,0.3)',
          }}>↓</div>
        </div>
        <PhotoCard image={pair.afterImage} variant="after" label={pair.label} />
      </div>

      {/* Prev/next + counter */}
      {pairs.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 20 }}>
          <button
            onClick={() => setIdx(i => (i - 1 + pairs.length) % pairs.length)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: idx === 0 ? 'rgba(107,79,160,0.12)' : 'var(--purple)',
              color: idx === 0 ? 'var(--purple)' : 'white',
              border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 900,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >←</button>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)' }}>
            {idx + 1} / {pairs.length}
          </span>
          <button
            onClick={() => setIdx(i => (i + 1) % pairs.length)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: idx === pairs.length - 1 ? 'rgba(107,79,160,0.12)' : 'var(--purple)',
              color: idx === pairs.length - 1 ? 'var(--purple)' : 'white',
              border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 900,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >→</button>
        </div>
      )}
    </div>
  );
}

export default function BeforeAfterBlock({ pairs, layout = 'hero' }: BeforeAfterBlockProps) {
  const displayPairs: BeforeAfterPair[] = pairs?.length ? pairs : [{ id: 0 }];

  if (layout === 'hero') {
    return <HeroSlider pairs={displayPairs} />;
  }
  return <GridSlider pairs={displayPairs} />;
}
