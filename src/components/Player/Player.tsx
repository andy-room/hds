import { useState, useRef } from 'react';
import {
  Play, PauseCircle, SkipBack, SkipForward,
  VolumeMax, VolumeX, Maximize02, XClose,
} from '@untitled-ui/icons-react';
import styles from './Player.module.css';

/* ─── Custom inline icons (not in @untitled-ui/icons-react) ─── */

function IconRewind10({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5V2L7 7l5 5V8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="currentColor" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white" stroke="none" fontFamily="sans-serif">10</text>
    </svg>
  );
}

function IconForward10({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5V2l5 5-5 5V8c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" fill="currentColor" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white" stroke="none" fontFamily="sans-serif">10</text>
    </svg>
  );
}

function IconSubtitles({ size = 24, solid = false }: { size?: number; solid?: boolean }) {
  if (solid) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" />
        <path d="M6 10h12M6 14h8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M6 10h12M6 14h8" />
    </svg>
  );
}

function IconEnterPip({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <rect x="12" y="12" width="9" height="5" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconExitPip({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M15 9l-4 4m0 0h4m-4 0V9" />
    </svg>
  );
}

/* ─── Helpers ─── */

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const SPEEDS = [0.5, 1, 1.25, 1.5, 2];

function GhostBtn({
  children,
  onClick,
  'aria-label': label,
  size = 24,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label': string;
  size?: number;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`${styles.ghostBtn} ${className ?? ''}`}
      style={{ width: size + 8, height: size + 8 }}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  onSeek?: (ratio: number) => void;
}) {
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    onSeek?.(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  }

  return (
    <div ref={ref} className={styles.progressTrack} onClick={handleClick}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
  );
}

function SpeedMenu({
  rate,
  onChange,
}: {
  rate: number;
  onChange?: (r: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.speedWrap}>
      {open && (
        <ul className={styles.speedDropdown} role="menu">
          {SPEEDS.map(s => (
            <li key={s} role="none">
              <button
                role="menuitem"
                type="button"
                className={`${styles.speedOption} ${s === rate ? styles.speedOptionActive : ''}`}
                onClick={() => { onChange?.(s); setOpen(false); }}
              >
                {s}x
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className={styles.ghostBtn}
        onClick={() => setOpen(p => !p)}
        aria-label="재생 속도"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={styles.speedLabel}>{rate}x</span>
      </button>
    </div>
  );
}

/* ─── Types ─── */

export type PlayerMode = 'player' | 'preview' | 'pip';

export interface PlayerProps {
  mode?: PlayerMode;
  poster?: string;
  title?: string;
  playing?: boolean;
  currentTime?: number;
  duration?: number;
  muted?: boolean;
  playbackRate?: number;
  subtitlesOn?: boolean;
  subtitlesText?: string;
  onPlayPause?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onRewind?: () => void;
  onForward?: () => void;
  onMuteToggle?: () => void;
  onPlaybackRateChange?: (rate: number) => void;
  onSubtitlesToggle?: () => void;
  onEnterPip?: () => void;
  onExitPip?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  onSeek?: (ratio: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── Sub-renderers ─── */

function FullControls({
  playing, currentTime, duration, muted, playbackRate, subtitlesOn, subtitlesText,
  onPlayPause, onRewind, onForward, onMuteToggle, onPlaybackRateChange,
  onSubtitlesToggle, onEnterPip, onMaximize, onSeek,
}: Omit<PlayerProps, 'mode' | 'poster' | 'title' | 'onSkipBack' | 'onSkipForward' | 'onExitPip' | 'onClose' | 'className' | 'style'>) {
  const ct = currentTime ?? 0;
  const dur = duration ?? 0;
  const rate = playbackRate ?? 1;

  return (
    <>
      {subtitlesOn && subtitlesText && (
        <div className={styles.subtitlesWrap}>
          <div className={styles.subtitlesBubble}>
            <span className={styles.subtitlesText}>{subtitlesText}</span>
          </div>
        </div>
      )}
      <div className={styles.playerControls}>
        <ProgressBar currentTime={ct} duration={dur} onSeek={onSeek} />
        <div className={styles.playerRow}>
          <div className={styles.playerLeft}>
            <div className={styles.btnSet}>
              <GhostBtn aria-label={playing ? '일시정지' : '재생'} onClick={onPlayPause}>
                {playing ? <PauseCircle size={24} /> : <Play size={24} />}
              </GhostBtn>
              <GhostBtn aria-label="10초 되감기" onClick={onRewind}>
                <IconRewind10 size={24} />
              </GhostBtn>
              <GhostBtn aria-label="10초 앞으로" onClick={onForward}>
                <IconForward10 size={24} />
              </GhostBtn>
              <GhostBtn aria-label={muted ? '음소거 해제' : '음소거'} onClick={onMuteToggle}>
                {muted ? <VolumeX size={24} /> : <VolumeMax size={24} />}
              </GhostBtn>
            </div>
            <div className={styles.timeDisplay}>
              <span>{fmt(ct)}</span>
              <span className={styles.timeMuted}>/</span>
              <span className={styles.timeMuted}>{fmt(dur)}</span>
            </div>
          </div>
          <div className={styles.playerRight}>
            <SpeedMenu rate={rate} onChange={onPlaybackRateChange} />
            <GhostBtn aria-label={subtitlesOn ? '자막 끄기' : '자막 켜기'} onClick={onSubtitlesToggle}>
              <IconSubtitles size={24} solid={subtitlesOn} />
            </GhostBtn>
            <GhostBtn aria-label="PIP 모드" onClick={onEnterPip}>
              <IconEnterPip size={24} />
            </GhostBtn>
            <GhostBtn aria-label="전체화면" onClick={onMaximize}>
              <Maximize02 size={24} />
            </GhostBtn>
          </div>
        </div>
      </div>
    </>
  );
}

function PreviewMode({
  playing, currentTime, duration, muted,
  onPlayPause, onSkipBack, onSkipForward, onMuteToggle, onMaximize, onSeek,
}: Pick<PlayerProps, 'playing' | 'currentTime' | 'duration' | 'muted' | 'onPlayPause' | 'onSkipBack' | 'onSkipForward' | 'onMuteToggle' | 'onMaximize' | 'onSeek'>) {
  const ct = currentTime ?? 0;
  const dur = duration ?? 0;
  return (
    <>
      <div className={styles.dim} />
      <div className={styles.previewCenter}>
        <GhostBtn aria-label="처음으로" onClick={onSkipBack} size={20}>
          <SkipBack size={20} />
        </GhostBtn>
        <GhostBtn aria-label={playing ? '일시정지' : '재생'} onClick={onPlayPause} size={40}>
          {playing ? <PauseCircle size={40} /> : <Play size={40} />}
        </GhostBtn>
        <GhostBtn aria-label="끝으로" onClick={onSkipForward} size={20}>
          <SkipForward size={20} />
        </GhostBtn>
      </div>
      <div className={styles.previewControls}>
        <ProgressBar currentTime={ct} duration={dur} onSeek={onSeek} />
        <div className={styles.previewBottom}>
          <div className={styles.timeDisplay} style={{ fontSize: 11 }}>
            <span>{fmt(ct)}</span>
            <span className={styles.timeMuted}>/</span>
            <span className={styles.timeMuted}>{fmt(dur)}</span>
          </div>
          <div className={styles.btnSet}>
            <GhostBtn aria-label={muted ? '음소거 해제' : '음소거'} onClick={onMuteToggle} size={16}>
              {muted ? <VolumeX size={16} /> : <VolumeMax size={16} />}
            </GhostBtn>
            <GhostBtn aria-label="전체화면" onClick={onMaximize} size={16}>
              <Maximize02 size={16} />
            </GhostBtn>
          </div>
        </div>
      </div>
    </>
  );
}

function PipMode({
  playing, title,
  onPlayPause, onExitPip, onMuteToggle, onClose, muted,
}: Pick<PlayerProps, 'playing' | 'title' | 'muted' | 'onPlayPause' | 'onExitPip' | 'onMuteToggle' | 'onClose'>) {
  return (
    <>
      <div className={styles.dim} style={{ background: 'rgba(0,0,0,0.25)' }} />
      <div className={styles.pipHeader}>
        <GhostBtn aria-label="PIP 종료" onClick={onExitPip} size={16}>
          <IconExitPip size={16} />
        </GhostBtn>
        <div className={styles.btnSet}>
          <GhostBtn aria-label={muted ? '음소거 해제' : '음소거'} onClick={onMuteToggle} size={16}>
            {muted ? <VolumeX size={16} /> : <VolumeMax size={16} />}
          </GhostBtn>
          <GhostBtn aria-label="닫기" onClick={onClose} size={16}>
            <XClose size={16} />
          </GhostBtn>
        </div>
      </div>
      <div className={styles.pipCenter}>
        <GhostBtn aria-label={playing ? '일시정지' : '재생'} onClick={onPlayPause} size={32}>
          {playing ? <PauseCircle size={32} /> : <Play size={32} />}
        </GhostBtn>
      </div>
      {title && (
        <div className={styles.pipFooter}>
          <span className={styles.pipTitle}>{title}</span>
        </div>
      )}
    </>
  );
}

/* ─── Main component ─── */

export function Player({
  mode = 'player',
  poster,
  title,
  playing = false,
  currentTime = 0,
  duration = 0,
  muted = false,
  playbackRate = 1,
  subtitlesOn = false,
  subtitlesText,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onRewind,
  onForward,
  onMuteToggle,
  onPlaybackRateChange,
  onSubtitlesToggle,
  onEnterPip,
  onExitPip,
  onMaximize,
  onClose,
  onSeek,
  className,
  style,
}: PlayerProps) {
  return (
    <div
      className={`${styles.player} ${styles[`player--${mode}`]} ${className ?? ''}`}
      style={style}
    >
      {poster ? (
        <img src={poster} alt="" className={styles.thumbnail} draggable={false} />
      ) : (
        <div className={styles.thumbnailPlaceholder} />
      )}

      {mode === 'player' && (
        <FullControls
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          muted={muted}
          playbackRate={playbackRate}
          subtitlesOn={subtitlesOn}
          subtitlesText={subtitlesText}
          onPlayPause={onPlayPause}
          onRewind={onRewind}
          onForward={onForward}
          onMuteToggle={onMuteToggle}
          onPlaybackRateChange={onPlaybackRateChange}
          onSubtitlesToggle={onSubtitlesToggle}
          onEnterPip={onEnterPip}
          onMaximize={onMaximize}
          onSeek={onSeek}
        />
      )}

      {mode === 'preview' && (
        <PreviewMode
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          muted={muted}
          onPlayPause={onPlayPause}
          onSkipBack={onSkipBack}
          onSkipForward={onSkipForward}
          onMuteToggle={onMuteToggle}
          onMaximize={onMaximize}
          onSeek={onSeek}
        />
      )}

      {mode === 'pip' && (
        <PipMode
          playing={playing}
          title={title}
          muted={muted}
          onPlayPause={onPlayPause}
          onExitPip={onExitPip}
          onMuteToggle={onMuteToggle}
          onClose={onClose}
        />
      )}
    </div>
  );
}
