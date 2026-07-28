import { ChevronLeft, ChevronRight } from '@untitled-ui/icons-react';
import styles from './Pagination.module.css';

export type PaginationSize = 'lg-desktop' | 'lg-mobile' | 'md' | 'sm';

export interface PaginationProps {
  size?: PaginationSize;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

function buildPageList(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const inner: (number | '...')[] = [];
  const lo = Math.max(2, current - 2);
  const hi = Math.min(total - 1, current + 2);

  if (lo > 2) inner.push('...');
  for (let i = lo; i <= hi; i++) inner.push(i);
  if (hi < total - 1) inner.push('...');

  return [1, ...inner, total];
}

function IconBtn({
  onClick,
  disabled,
  dir,
}: {
  onClick: () => void;
  disabled: boolean;
  dir: 'left' | 'right';
}) {
  return (
    <button
      type="button"
      className={styles.iconBtn}
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? '이전 페이지' : '다음 페이지'}
    >
      {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

function LgDesktop({
  currentPage,
  totalPages,
  onPageChange,
}: Required<Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange'>>) {
  const pages = buildPageList(currentPage, totalPages);
  return (
    <div className={styles.lgDesktop}>
      <IconBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} dir="left" />
      <div className={styles.pageRow}>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <button
              key={p}
              type="button"
              className={`${styles.pageBtn} ${p === currentPage ? styles.pageBtnActive : ''}`}
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>
      <IconBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} dir="right" />
    </div>
  );
}

function LgMobile({
  currentPage,
  totalPages,
  onPageChange,
}: Required<Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange'>>) {
  return (
    <div className={styles.lgMobile}>
      <IconBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} dir="left" />
      <div className={styles.mobileText}>
        <span className={styles.mobileCurrent}>{currentPage}</span>
        <span className={styles.mobileSep}>/</span>
        <span className={styles.mobileTotal}>{totalPages}</span>
      </div>
      <IconBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} dir="right" />
    </div>
  );
}

function Md({
  currentPage,
  totalPages,
  onPageChange,
}: Required<Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange'>>) {
  return (
    <div className={styles.md}>
      <button
        type="button"
        className={styles.chevronBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        <ChevronLeft size={16} />
      </button>
      <div className={styles.mdPageList}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            type="button"
            className={`${styles.mdItem} ${p === currentPage ? styles.mdItemActive : ''}`}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.chevronBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function Sm({
  currentPage,
  totalPages,
  onPageChange,
}: Required<Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange'>>) {
  return (
    <div className={styles.sm}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          type="button"
          className={`${styles.dot} ${p === currentPage ? styles.dotActive : ''}`}
          onClick={() => onPageChange(p)}
          aria-label={`페이지 ${p}`}
          aria-current={p === currentPage ? 'page' : undefined}
        />
      ))}
    </div>
  );
}

export function Pagination({
  size = 'lg-desktop',
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
  className,
  style,
}: PaginationProps) {
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const props = { currentPage: safeCurrentPage, totalPages, onPageChange };

  return (
    <nav aria-label="페이지 탐색" className={className} style={style}>
      {size === 'lg-desktop' && <LgDesktop {...props} />}
      {size === 'lg-mobile' && <LgMobile {...props} />}
      {size === 'md' && <Md {...props} />}
      {size === 'sm' && <Sm {...props} />}
    </nav>
  );
}
