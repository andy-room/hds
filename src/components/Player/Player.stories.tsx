import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Player } from './Player';

const meta = {
  title: 'HDS/Player',
  component: Player,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'radio', options: ['player', 'preview', 'pip'] },
    playing: { control: 'boolean' },
    muted: { control: 'boolean' },
    subtitlesOn: { control: 'boolean' },
    currentTime: { control: { type: 'number', min: 0, max: 3600 } },
    duration: { control: { type: 'number', min: 0, max: 3600 } },
    playbackRate: { control: 'select', options: [0.5, 1, 1.25, 1.5, 2] },
  },
} satisfies Meta<typeof Player>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Controlled wrapper ── */
function Interactive(props: React.ComponentProps<typeof Player>) {
  const [playing, setPlaying] = useState(props.playing ?? false);
  const [muted, setMuted] = useState(props.muted ?? false);
  const [subtitlesOn, setSubtitlesOn] = useState(props.subtitlesOn ?? false);
  const [rate, setRate] = useState(props.playbackRate ?? 1);
  const [time, setTime] = useState(props.currentTime ?? 0);
  const dur = props.duration ?? 600;

  return (
    <Player
      {...props}
      playing={playing}
      muted={muted}
      subtitlesOn={subtitlesOn}
      playbackRate={rate}
      currentTime={time}
      duration={dur}
      onPlayPause={() => setPlaying(p => !p)}
      onMuteToggle={() => setMuted(m => !m)}
      onSubtitlesToggle={() => setSubtitlesOn(s => !s)}
      onPlaybackRateChange={setRate}
      onRewind={() => setTime(t => Math.max(0, t - 10))}
      onForward={() => setTime(t => Math.min(dur, t + 10))}
      onSkipBack={() => setTime(0)}
      onSkipForward={() => setTime(dur)}
      onSeek={ratio => setTime(Math.round(ratio * dur))}
      onEnterPip={() => {}}
      onExitPip={() => {}}
      onMaximize={() => {}}
      onClose={() => {}}
    />
  );
}

/* ── Stories ── */

export const FullPlayer: Story = {
  name: 'mode=player / 기본',
  render: () => (
    <Interactive
      mode="player"
      currentTime={120}
      duration={600}
      subtitlesText="안녕하세요, 이것은 자막 예시입니다."
    />
  ),
};

export const FullPlayerPlaying: Story = {
  name: 'mode=player / 재생 중',
  render: () => (
    <Interactive
      mode="player"
      playing
      currentTime={245}
      duration={600}
    />
  ),
};

export const FullPlayerWithSubtitles: Story = {
  name: 'mode=player / 자막 활성',
  render: () => (
    <Interactive
      mode="player"
      subtitlesOn
      currentTime={80}
      duration={600}
      subtitlesText="자막이 활성화된 상태입니다."
    />
  ),
};

export const PreviewStory: Story = {
  name: 'mode=preview',
  render: () => (
    <Interactive
      mode="preview"
      currentTime={120}
      duration={600}
    />
  ),
};

export const PreviewPlaying: Story = {
  name: 'mode=preview / 재생 중',
  render: () => (
    <Interactive
      mode="preview"
      playing
      currentTime={300}
      duration={600}
    />
  ),
};

export const PipStory: Story = {
  name: 'mode=pip',
  render: () => (
    <Interactive
      mode="pip"
      title="HDS 컴포넌트 가이드 - Player 편"
      currentTime={60}
      duration={600}
    />
  ),
};

export const PipPlaying: Story = {
  name: 'mode=pip / 재생 중',
  render: () => (
    <Interactive
      mode="pip"
      playing
      title="HDS 컴포넌트 가이드 - Player 편"
      currentTime={60}
      duration={600}
    />
  ),
};

export const AllModes: Story = {
  name: 'All Modes',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24, padding: 16 }}>
      {(['player', 'preview', 'pip'] as const).map(mode => (
        <div key={mode} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-default)', fontSize: '12px', color: 'var(--typography-black-60)' }}>
            mode={mode}
          </span>
          <Interactive
            mode={mode}
            title="HDS Player Demo"
            currentTime={120}
            duration={600}
            subtitlesText="자막 예시"
          />
        </div>
      ))}
    </div>
  ),
};

export const ControlsStory: Story = {
  name: 'Interactive (Controls)',
  args: {
    mode: 'player',
    playing: false,
    muted: false,
    subtitlesOn: false,
    currentTime: 120,
    duration: 600,
    playbackRate: 1,
    title: 'HDS Player Demo',
    subtitlesText: '자막 텍스트 예시입니다.',
  },
  render: args => <Interactive {...args} />,
};
