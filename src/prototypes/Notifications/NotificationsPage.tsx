import { useState } from 'react';
import {
  ChevronLeft, BookOpen01, Briefcase01, Zap, CreditCardCheck,
  Bell01, Settings01, ArrowRight,
} from '@untitled-ui/icons-react';
import { Loading } from '../../components/Loading/Loading';
import styles from './NotificationsPage.module.css';

/* ─── Types ─── */

export type NotificationCategory = '학습' | '커리어' | '스킬' | '결제' | '멤버십' | '시스템';

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  body?: string;
  createdAt: Date;
  isRead: boolean;
  landingUrl?: string;
}

/* ─── Config ─── */

const CATEGORIES: ('전체' | NotificationCategory)[] = [
  '전체', '학습', '커리어', '스킬', '결제', '멤버십', '시스템',
];

const BADGE_CONFIG: Record<NotificationCategory, { bg: string; color: string }> = {
  학습:   { bg: '#DBEAFE', color: '#1D4ED8' },
  커리어: { bg: '#EDE9FE', color: '#6D28D9' },
  스킬:   { bg: '#DCFCE7', color: '#15803D' },
  결제:   { bg: '#FEF3C7', color: '#B45309' },
  멤버십: { bg: '#F3E8FF', color: '#7E22CE' },
  시스템: { bg: '#F3F4F6', color: '#374151' },
};

function CategoryIcon({ category, size = 20 }: { category: NotificationCategory; size?: number }) {
  const props = { size, color: BADGE_CONFIG[category].color };
  switch (category) {
    case '학습':   return <BookOpen01 {...props} />;
    case '커리어': return <Briefcase01 {...props} />;
    case '스킬':   return <Zap {...props} />;
    case '결제':   return <CreditCardCheck {...props} />;
    case '멤버십': return <Bell01 {...props} />;   // Crown 없어서 Bell 대체
    case '시스템': return <Bell01 {...props} />;
  }
}

/* ─── Time formatter ─── */

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHr < 24) return `${diffHr}시간 전`;
  if (diffDay === 1) return '어제';
  if (diffDay < 7) return `${diffDay}일 전`;
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '');
}

function getDateGroup(date: Date): string {
  const now = new Date();
  const diffDay = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDay === 0) return '오늘';
  if (diffDay === 1) return '어제';
  return '이전';
}

/* ─── Notification Card ─── */

function NotificationCard({
  item,
  onRead,
}: {
  item: NotificationItem;
  onRead: (id: string) => void;
}) {
  const badge = BADGE_CONFIG[item.category];

  function handleClick() {
    onRead(item.id);
  }

  return (
    <button
      type="button"
      className={`${styles.card} ${!item.isRead ? styles.cardUnread : ''}`}
      onClick={handleClick}
    >
      {/* 안읽음 dot */}
      {!item.isRead && <span className={styles.unreadDot} />}

      {/* 타입 아이콘 */}
      <div className={styles.iconWrap} style={{ background: badge.bg }}>
        <CategoryIcon category={item.category} size={20} />
      </div>

      {/* 텍스트 */}
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.badge} style={{ background: badge.bg, color: badge.color }}>
            {item.category}
          </span>
          <span className={styles.cardTime}>{formatTime(item.createdAt)}</span>
        </div>
        <p className={styles.cardTitle}>{item.title}</p>
        {item.body && <p className={styles.cardBody}>{item.body}</p>}
      </div>
    </button>
  );
}

/* ─── Sample data ─── */

const now = new Date();
const h = (n: number) => new Date(now.getTime() - n * 3600000);
const d = (n: number) => new Date(now.getTime() - n * 86400000);

const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', category: '학습',   title: '이어서 학습해 볼까요?',      body: '데이터 분석 입문 · 3일 전 학습',        createdAt: h(3),  isRead: false },
  { id: '2', category: '스킬',   title: '스킬 포인트가 올랐어요',      body: '데이터 분석 +20P',                      createdAt: h(5),  isRead: false },
  { id: '3', category: '결제',   title: '결제가 완료됐어요',           body: 'HU 멤버십 · 월 9,900원',               createdAt: h(8),  isRead: true  },
  { id: '4', category: '멤버십', title: '멤버십이 7일 후 만료돼요',    body: '월간 멤버십 (D-7)',                     createdAt: d(1),  isRead: false },
  { id: '5', category: '커리어', title: '관심 커리어에 추가했어요',    body: '데이터 사이언티스트',                   createdAt: d(1),  isRead: true  },
  { id: '6', category: '학습',   title: '학습을 완료했어요',           body: 'Python 기초',                           createdAt: d(2),  isRead: true  },
  { id: '7', category: '시스템', title: '이용약관이 개정돼요',         body: '시행일 2026-08-01 전에 확인해요',       createdAt: d(3),  isRead: true  },
  { id: '8', category: '스킬',   title: '스킬을 담았어요',             body: 'UX 리서치',                             createdAt: d(4),  isRead: true  },
  { id: '9', category: '시스템', title: '비밀번호가 변경됐어요',       body: '본인이 아니라면 고객센터로 알려 주세요', createdAt: d(5),  isRead: true  },
];

/* ─── Main Page ─── */

export interface NotificationsPageProps {
  onBack?: () => void;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<'전체' | NotificationCategory>('전체');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isLoading] = useState(false);
  const [isEnd] = useState(true);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }

  const filtered = notifications.filter(n => {
    if (activeCategory !== '전체' && n.category !== activeCategory) return false;
    if (unreadOnly && n.isRead) return false;
    return true;
  });

  const groups: { label: string; items: NotificationItem[] }[] = [];
  for (const item of filtered) {
    const g = getDateGroup(item.createdAt);
    const existing = groups.find(x => x.label === g);
    if (existing) existing.items.push(item);
    else groups.push({ label: g, items: [item] });
  }

  return (
    <div className={styles.page}>

      {/* ① 헤더 */}
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={onBack} aria-label="뒤로가기">
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.headerTitle}>
          알림
          {unreadCount > 0 && <span className={styles.headerBadge}>{unreadCount}</span>}
        </h1>
        <button
          type="button"
          className={`${styles.markAllBtn} ${unreadCount === 0 ? styles.markAllBtnDisabled : ''}`}
          onClick={markAllRead}
          disabled={unreadCount === 0}
        >
          모두 읽음
        </button>
      </header>

      {/* ② 카테고리 필터 탭 */}
      <div className={styles.filterWrap}>
        <div className={styles.categoryTabs}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ②' 미읽음 토글 */}
        <label className={styles.unreadToggle}>
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={e => setUnreadOnly(e.target.checked)}
            className={styles.toggleInput}
          />
          <span className={`${styles.toggleTrack} ${unreadOnly ? styles.toggleTrackOn : ''}`}>
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>미읽음만</span>
        </label>
      </div>

      {/* ③④ 알림 리스트 */}
      <div className={styles.listWrap}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <Bell01 size={40} color="var(--typography-black-disabled)" />
            <p className={styles.emptyText}>알림이 없어요</p>
          </div>
        ) : (
          <>
            {groups.map(group => (
              <div key={group.label}>
                <div className={styles.dateGroup}>{group.label}</div>
                {group.items.map(item => (
                  <NotificationCard key={item.id} item={item} onRead={markRead} />
                ))}
              </div>
            ))}

            {/* ⑤ 로딩 */}
            {isLoading && (
              <div className={styles.loadingWrap}>
                <Loading size="sm" />
              </div>
            )}

            {/* ⑥ 리스트 끝 */}
            {isEnd && !isLoading && (
              <div className={styles.listEnd}>
                <span className={styles.listEndLine} />
                <span className={styles.listEndText}>모든 알림을 확인했어요</span>
                <span className={styles.listEndLine} />
              </div>
            )}
          </>
        )}

        {/* ⑦ 알림 설정 링크 */}
        <button type="button" className={styles.settingsLink}>
          <Settings01 size={16} />
          알림 설정
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
