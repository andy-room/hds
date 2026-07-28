import { useState, useRef } from 'react';
import {
  SearchMd, XClose, Clock, Trash01,
  ChevronRight, BookOpen01, Briefcase02, Zap,
  Users01, SwitchVertical01, FilterLines, ChevronDown,
} from '@untitled-ui/icons-react';
import styles from './SearchPage.module.css';

/* ─── Types ─── */

type ResultTab = '전체' | '콘텐츠' | '스킬' | '커리어';
type SortOption = '관련도순' | '최신순' | '인기순';

interface ContentResult {
  id: string;
  thumbnail: string;
  title: string;
  instructor: string;
  students: number;
  category: string;
}

interface SkillResult {
  id: string;
  name: string;
  contentCount: number;
}

interface CareerResult {
  id: string;
  name: string;
  skillCount: number;
  contentCount: number;
}

/* ─── Highlight utility ─── */

function Highlight({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword) return <>{text}</>;
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase()
          ? <mark key={i} className={styles.highlight}>{part}</mark>
          : part
      )}
    </>
  );
}

/* ─── Sample data ─── */

const RECENT_SEARCHES = ['데이터 분석', 'SQL 입문', 'UX 리서치', '파이썬'];

const CONTENT_RESULTS: ContentResult[] = [
  { id: 'c1', thumbnail: '', title: '데이터 분석 입문 A to Z', instructor: '김데이터', students: 12340, category: '데이터' },
  { id: 'c2', thumbnail: '', title: '데이터 분석 실전 프로젝트', instructor: '이분석', students: 8760, category: '데이터' },
  { id: 'c3', thumbnail: '', title: '파이썬으로 배우는 데이터 분석', instructor: '박파이썬', students: 21000, category: '프로그래밍' },
  { id: 'c4', thumbnail: '', title: 'SQL로 시작하는 데이터 분석', instructor: '최에스큐엘', students: 5430, category: '데이터' },
  { id: 'c5', thumbnail: '', title: '비즈니스 데이터 분석 with Excel', instructor: '정엑셀', students: 3210, category: '비즈니스' },
];

const SKILL_RESULTS: SkillResult[] = [
  { id: 's1', name: '데이터 분석', contentCount: 45 },
  { id: 's2', name: '데이터 시각화', contentCount: 28 },
  { id: 's3', name: 'Python', contentCount: 62 },
  { id: 's4', name: 'SQL', contentCount: 33 },
];

const CAREER_RESULTS: CareerResult[] = [
  { id: 'r1', name: '데이터 분석가', skillCount: 12, contentCount: 67 },
  { id: 'r2', name: '데이터 사이언티스트', skillCount: 18, contentCount: 89 },
  { id: 'r3', name: '비즈니스 애널리스트', skillCount: 9, contentCount: 41 },
];

/* ─── Sub-components ─── */

function ContentCard({ item, keyword }: { item: ContentResult; keyword: string }) {
  return (
    <div className={styles.contentCard}>
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailPlaceholder}>
          <BookOpen01 size={24} color="rgba(255,255,255,0.4)" />
        </div>
      </div>
      <div className={styles.contentInfo}>
        <span className={styles.categoryTag}>{item.category}</span>
        <p className={styles.contentTitle}>
          <Highlight text={item.title} keyword={keyword} />
        </p>
        <div className={styles.contentMeta}>
          <span className={styles.instructor}>{item.instructor}</span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.students}>
            <Users01 size={12} />
            {item.students.toLocaleString()}명
          </span>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ item, keyword }: { item: SkillResult; keyword: string }) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.skillIcon}>
        <Zap size={18} color="#15803D" />
      </div>
      <div className={styles.skillInfo}>
        <p className={styles.skillName}>
          <Highlight text={item.name} keyword={keyword} />
        </p>
        <span className={styles.skillMeta}>관련 콘텐츠 {item.contentCount}개</span>
      </div>
      <ChevronRight size={18} color="var(--typography-black-45)" />
    </div>
  );
}

function CareerCard({ item, keyword }: { item: CareerResult; keyword: string }) {
  return (
    <div className={styles.careerCard}>
      <div className={styles.careerIcon}>
        <Briefcase02 size={18} color="#6D28D9" />
      </div>
      <div className={styles.careerInfo}>
        <p className={styles.careerName}>
          <Highlight text={item.name} keyword={keyword} />
        </p>
        <span className={styles.careerMeta}>
          스킬 {item.skillCount}개 · 콘텐츠 {item.contentCount}개
        </span>
      </div>
      <ChevronRight size={18} color="var(--typography-black-45)" />
    </div>
  );
}

function SectionHeader({ title, count, onMore }: { title: string; count?: number; onMore?: () => void }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionTitle}>{title}</span>
      {count !== undefined && <span className={styles.sectionCount}>{count}</span>}
      {onMore && (
        <button type="button" className={styles.moreBtn} onClick={onMore}>
          더보기 <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

/* ─── Main ─── */

export interface SearchPageProps {
  initialQuery?: string;
  onBack?: () => void;
}

export function SearchPage({ initialQuery = '데이터 분석', onBack }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<ResultTab>('전체');
  const [sort, setSort] = useState<SortOption>('관련도순');
  const [isFocused, setIsFocused] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const inputRef = useRef<HTMLInputElement>(null);

  const TABS: ResultTab[] = ['전체', '콘텐츠', '스킬', '커리어'];
  const SORTS: SortOption[] = ['관련도순', '최신순', '인기순'];

  function handleSearch(q: string) {
    if (!q.trim()) return;
    setQuery(q.trim());
    setInputValue(q.trim());
    setIsFocused(false);
    if (!recentSearches.includes(q.trim())) {
      setRecentSearches(prev => [q.trim(), ...prev].slice(0, 8));
    }
    inputRef.current?.blur();
  }

  function removeRecent(term: string) {
    setRecentSearches(prev => prev.filter(s => s !== term));
  }

  const hasResults = CONTENT_RESULTS.length > 0;

  return (
    <div className={styles.page}>

      {/* ── 검색 바 ── */}
      <div className={styles.searchBarWrap}>
        <button type="button" className={styles.backBtn} onClick={onBack} aria-label="뒤로가기">
          <XClose size={22} />
        </button>
        <div className={`${styles.searchBar} ${isFocused ? styles.searchBarFocused : ''}`}>
          <SearchMd size={18} color="var(--typography-black-45)" />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyDown={e => e.key === 'Enter' && handleSearch(inputValue)}
            placeholder="검색어를 입력해주세요"
          />
          {inputValue && (
            <button type="button" className={styles.clearBtn} onClick={() => setInputValue('')} aria-label="지우기">
              <XClose size={16} />
            </button>
          )}
        </div>
        <button type="button" className={styles.searchSubmitBtn} onClick={() => handleSearch(inputValue)}>
          검색
        </button>
      </div>

      {/* ── 최근 검색어 드롭다운 ── */}
      {isFocused && (
        <div className={styles.recentDropdown}>
          {recentSearches.length === 0 ? (
            <p className={styles.recentEmpty}>검색어를 입력해주세요</p>
          ) : (
            <>
              <div className={styles.recentHeader}>
                <span>최근 검색어</span>
                <button type="button" className={styles.clearAllBtn} onClick={() => setRecentSearches([])}>
                  전체 삭제
                </button>
              </div>
              {recentSearches.map(term => (
                <div key={term} className={styles.recentItem}>
                  <button type="button" className={styles.recentBtn} onMouseDown={() => handleSearch(term)}>
                    <Clock size={15} color="var(--typography-black-45)" />
                    <span>{term}</span>
                  </button>
                  <button type="button" className={styles.recentRemove} onMouseDown={() => removeRecent(term)} aria-label="삭제">
                    <Trash01 size={14} color="var(--typography-black-45)" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* ── 탭 + 정렬/필터 ── */}
      {!isFocused && (
        <>
          <div className={styles.tabFilterRow}>
            <div className={styles.tabs}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortFilterRow}>
            <div className={styles.sortWrap}>
              <button type="button" className={styles.sortBtn} onClick={() => setShowSortMenu(p => !p)}>
                <SwitchVertical01 size={14} />
                {sort}
                <ChevronDown size={14} />
              </button>
              {showSortMenu && (
                <ul className={styles.sortMenu}>
                  {SORTS.map(s => (
                    <li key={s}>
                      <button
                        type="button"
                        className={`${styles.sortOption} ${sort === s ? styles.sortOptionActive : ''}`}
                        onClick={() => { setSort(s); setShowSortMenu(false); }}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" className={styles.filterBtn}>
              <FilterLines size={14} />
              필터
            </button>
          </div>

          {/* ── 결과 영역 ── */}
          {!hasResults ? (
            <div className={styles.emptyState}>
              <SearchMd size={40} color="var(--typography-black-disabled)" />
              <p className={styles.emptyTitle}>'{query}'에 대한 검색 결과가 없습니다</p>
              <p className={styles.emptyDesc}>다른 검색어를 입력하거나 철자를 확인해 보세요</p>
            </div>
          ) : (
            <div className={styles.results}>

              {/* 전체 탭 */}
              {activeTab === '전체' && (
                <>
                  <SectionHeader title="콘텐츠" count={CONTENT_RESULTS.length} onMore={() => setActiveTab('콘텐츠')} />
                  {CONTENT_RESULTS.slice(0, 3).map(item => (
                    <ContentCard key={item.id} item={item} keyword={query} />
                  ))}
                  <div className={styles.divider} />
                  <SectionHeader title="스킬" count={SKILL_RESULTS.length} onMore={() => setActiveTab('스킬')} />
                  {SKILL_RESULTS.slice(0, 3).map(item => (
                    <SkillCard key={item.id} item={item} keyword={query} />
                  ))}
                  <div className={styles.divider} />
                  <SectionHeader title="커리어" count={CAREER_RESULTS.length} onMore={() => setActiveTab('커리어')} />
                  {CAREER_RESULTS.map(item => (
                    <CareerCard key={item.id} item={item} keyword={query} />
                  ))}
                </>
              )}

              {/* 콘텐츠 탭 */}
              {activeTab === '콘텐츠' && (
                <>
                  <div className={styles.resultCount}>총 {CONTENT_RESULTS.length}개</div>
                  {CONTENT_RESULTS.map(item => (
                    <ContentCard key={item.id} item={item} keyword={query} />
                  ))}
                </>
              )}

              {/* 스킬 탭 */}
              {activeTab === '스킬' && (
                <>
                  <div className={styles.resultCount}>총 {SKILL_RESULTS.length}개</div>
                  {SKILL_RESULTS.map(item => (
                    <SkillCard key={item.id} item={item} keyword={query} />
                  ))}
                </>
              )}

              {/* 커리어 탭 */}
              {activeTab === '커리어' && (
                <>
                  <div className={styles.resultCount}>총 {CAREER_RESULTS.length}개</div>
                  {CAREER_RESULTS.map(item => (
                    <CareerCard key={item.id} item={item} keyword={query} />
                  ))}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
