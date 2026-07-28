import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as UntitledIcons from '@untitled-ui/icons-react';
import { Icon } from './Icon';
import type { IconSize } from './Icon';

const meta = {
  title: 'HDS/Icon',
  component: Icon,
  tags: ['!test', '!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const allIcons = Object.entries(UntitledIcons) as [string, React.ComponentType<React.SVGProps<SVGSVGElement>>][];

function IconGallery() {
  const [query, setQuery] = useState('');
  const [size, setSize] = useState<IconSize>(24);

  const filtered = query
    ? allIcons.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()))
    : allIcons;

  return (
    <div style={{ padding: 32, fontFamily: 'var(--font-default)' }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <input
          type="search"
          placeholder="아이콘 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid var(--line-outline)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-14)',
            fontFamily: 'var(--font-default)',
            outline: 'none',
          }}
        />
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value) as IconSize)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--line-outline)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-14)',
            fontFamily: 'var(--font-default)',
          }}
        >
          {([16, 20, 24, 32, 40] as IconSize[]).map((s) => (
            <option key={s} value={s}>{s}px</option>
          ))}
        </select>
        <span style={{ fontSize: 'var(--text-12)', color: 'var(--typography-black-60)', whiteSpace: 'nowrap' }}>
          {filtered.length} / {allIcons.length}
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: 8,
        }}
      >
        {filtered.map(([name, IconComp]) => (
          <button
            key={name}
            title={name}
            onClick={() => navigator.clipboard?.writeText(name)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '12px 8px',
              border: '1px solid var(--line-layout)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--line-strong)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line-layout)')}
          >
            <Icon icon={IconComp} size={size} />
            <span style={{ fontSize: 10, color: 'var(--typography-black-60)', textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.3 }}>
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export const Gallery: Story = {
  name: 'Gallery (전체 아이콘)',
  render: () => <IconGallery />,
};
