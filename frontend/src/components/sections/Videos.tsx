'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

interface VideoFile {
  url: string;
  alternativeText?: string;
  mime?: string;
}

interface VideoLesson {
  id: number;
  title: string;
  video?: VideoFile;
  youtubeUrl?: string;
  thumbnail?: { url: string; alternativeText?: string };
}

interface VideosProps {
  videos?: VideoLesson[];
}

function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\n?#]+)/);
  return match?.[1] ?? '';
}

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}

function ReelCard({ video }: { video: VideoLesson }) {
  const [playing, setPlaying] = useState(false);

  const hasUploadedVideo = !!video.video?.url;
  const hasYoutube = !!video.youtubeUrl;

  const thumbSrc = video.thumbnail?.url
    ? getStrapiMedia(video.thumbnail.url)
    : hasYoutube
    ? getYouTubeThumbnail(video.youtubeUrl!)
    : '';

  const videoSrc = hasUploadedVideo ? getStrapiMedia(video.video!.url) : null;
  const youtubeId = hasYoutube ? getYouTubeId(video.youtubeUrl!) : '';

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: '#111',
        position: 'relative',
        aspectRatio: '9/16',
        flexShrink: 0,
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={() => setPlaying(true)}
    >
      {playing && videoSrc ? (
        /* Native video player for uploaded files */
        <video
          src={videoSrc}
          autoPlay
          controls
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: '#000' }}
        />
      ) : playing && youtubeId ? (
        /* YouTube embed */
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <>
          {/* Thumbnail */}
          {thumbSrc ? (
            <Image
              src={thumbSrc}
              alt={video.thumbnail?.alternativeText ?? video.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 50vw, 25vw"
              unoptimized={!video.thumbnail?.url}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 48, opacity: 0.4 }}>🎬</span>
            </div>
          )}

          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
          }} />

          {/* Play button */}
          <div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 4l12 6-12 6V4z" fill="var(--purple)" />
            </svg>
          </div>

          {/* Title */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '16px 14px 14px',
          }}>
            <p style={{
              fontSize: 13, fontWeight: 800, color: 'white',
              lineHeight: 1.3, fontFamily: 'Nunito, sans-serif',
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>{video.title}</p>
          </div>
        </>
      )}
    </div>
  );
}

const CARD_WIDTH = 260; // px — ширина одной карточки
const CARD_GAP = 16;
const SCROLL_STEP = (CARD_WIDTH + CARD_GAP) * 2; // листаем по 2 карточки

export default function Videos({ videos }: VideosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!videos?.length) return null;

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? SCROLL_STEP : -SCROLL_STEP, behavior: 'smooth' });
  };

  return (
    <section style={{ background: 'var(--cream)', paddingBottom: 0 }}>
      <div style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Смотрите сами</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900,
            color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.5px', marginTop: 12,
          }}>
            Видео с занятий
          </h2>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--muted)', marginTop: 8 }}>
            Нажмите на карточку, чтобы посмотреть
          </p>
        </div>

        {/* Scroll container with arrow buttons */}
        <div style={{ position: 'relative' }}>
          {/* Left arrow */}
          {canScrollLeft && (
            <button onClick={() => scroll('left')} className="reels-arrow reels-arrow-left" aria-label="Назад">
              ←
            </button>
          )}

          {/* Horizontal scroll track */}
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            style={{
              display: 'flex',
              gap: CARD_GAP,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              paddingLeft: 'max(24px, calc((100vw - 1200px) / 2))',
              paddingRight: 'max(24px, calc((100vw - 1200px) / 2))',
              paddingBottom: 8,
              /* hide scrollbar */
              scrollbarWidth: 'none',
            }}
            className="reels-track"
          >
            {videos.map(v => (
              <div key={v.id} style={{
                flexShrink: 0,
                width: CARD_WIDTH,
                scrollSnapAlign: 'start',
              }}>
                <ReelCard video={v} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button onClick={() => scroll('right')} className="reels-arrow reels-arrow-right" aria-label="Вперёд">
              →
            </button>
          )}
        </div>
      </div>

      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,20 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill="#F0EBF8" />
      </svg>

      <style>{`
        .reels-track::-webkit-scrollbar { display: none; }
        .reels-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 10;
          width: 44px; height: 44px; border-radius: 50%;
          background: white; border: none; cursor: pointer;
          font-size: 20px; font-weight: 900;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--purple);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .reels-arrow:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 24px rgba(107,79,160,0.25);
        }
        .reels-arrow-left { left: 12px; }
        .reels-arrow-right { right: 12px; }
        @media (max-width: 768px) {
          .reels-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}
