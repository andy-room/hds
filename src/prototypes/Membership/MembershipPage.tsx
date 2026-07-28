import { useState } from 'react';
import {
  XClose, UserCircle, Ticket02, CreditCardCheck,
  BellRinging02, LogOut01,
} from '@untitled-ui/icons-react';
import styles from './MembershipPage.module.css';

/* ─── Types ─── */

type NavItem = '회원정보' | '멤버십' | '구매내역' | '알림설정';
type MembershipTab = 'hu' | 'ceo' | 'leadership' | 'wisdom';

/* ─── Nav menu ─── */

const NAV_ITEMS: { id: NavItem; icon: React.ElementType }[] = [
  { id: '회원정보', icon: UserCircle },
  { id: '멤버십', icon: Ticket02 },
  { id: '구매내역', icon: CreditCardCheck },
  { id: '알림설정', icon: BellRinging02 },
];

const TABS: { id: MembershipTab; label: string; hasSubscribed?: boolean }[] = [
  { id: 'hu', label: 'HU', hasSubscribed: true },
  { id: 'ceo', label: '휴넷 CEO' },
  { id: 'leadership', label: '리더십 저니' },
  { id: 'wisdom', label: '위즈덤 스프링' },
];

/* ─── Sub-components ─── */

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.navBtn} ${active ? styles.navBtnActive : ''}`}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}

function OrangeTooltip({ label }: { label: string }) {
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipArrow} />
      <div className={styles.tooltipBubble}>{label}</div>
    </div>
  );
}

/* ─── CEO 탭 콘텐츠 ─── */

function CeoContent() {
  return (
    <div className={styles.contentCard}>
      <div className={styles.contentTop}>
        <h2 className={styles.contentTitle}>
          휴넷 CEO 구독 혜택<br />
          비즈니스 리더를 위한 프리미엄 경영 인사이트 서비스
        </h2>
        <div className={styles.contentDivider} />
        <p className={styles.contentDesc}>
          휴넷 CEO는 리더에게 필요한 경영 트렌드, 비즈니스 사례, 리더십 콘텐츠를<br />
          엄선해 제공하는 프리미엄 구독 서비스이에요.
        </p>
      </div>

      <div className={styles.ctaWrap}>
        <div className={styles.priceRow}>
          <span className={styles.priceText}>월 29,900원 / 연 299,000원</span>
          <OrangeTooltip label="멤버십 가입시 50% 할인" />
        </div>
        <div className={styles.btnRow}>
          <button type="button" className={styles.btnPrimary}>
            <CreditCardCheck size={22} />
            휴넷CEO 구독 시작하기
          </button>
          <button type="button" className={styles.btnDark}>
            휴넷CEO 소개
          </button>
        </div>
        <p className={styles.caption}>구독 후 휴넷 CEO 콘텐츠를 바로 이용할 수 있어요.</p>
      </div>
    </div>
  );
}

/* ─── 빈 탭 콘텐츠 ─── */

function EmptyContent({ label }: { label: string }) {
  return (
    <div className={styles.contentCard} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--typography-black-45)', fontFamily: 'var(--font-default)', fontSize: '16px' }}>
        {label} 콘텐츠 준비 중입니다.
      </p>
    </div>
  );
}

/* ─── Main ─── */

export interface MembershipPageProps {
  onClose?: () => void;
}

export function MembershipPage({ onClose }: MembershipPageProps) {
  const [activeNav, setActiveNav] = useState<NavItem>('멤버십');
  const [activeTab, setActiveTab] = useState<MembershipTab>('ceo');

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="멤버십">

        {/* ── Left nav ── */}
        <aside className={styles.sidebar}>
          <div className={styles.closeRow}>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="닫기">
              <XClose size={20} />
            </button>
          </div>

          <nav className={styles.navList}>
            {NAV_ITEMS.map(({ id, icon }) => (
              <NavButton
                key={id}
                icon={icon}
                label={id}
                active={activeNav === id}
                onClick={() => setActiveNav(id)}
              />
            ))}
            <div className={styles.navDivider} />
            <button type="button" className={styles.navBtn}>
              <LogOut01 size={20} />
              <span>로그아웃</span>
            </button>
          </nav>
        </aside>

        {/* ── Right content ── */}
        <div className={styles.content}>
          {/* Title */}
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>멤버십</h1>
          </div>

          {/* Tabs */}
          <div className={styles.tabBar}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.hasSubscribed && (
                  <span className={styles.subscribeBadge}>구독중</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className={styles.tabContent}>
            {activeTab === 'ceo' && <CeoContent />}
            {activeTab === 'hu' && <EmptyContent label="HU" />}
            {activeTab === 'leadership' && <EmptyContent label="리더십 저니" />}
            {activeTab === 'wisdom' && <EmptyContent label="위즈덤 스프링" />}
          </div>
        </div>

      </div>
    </div>
  );
}
