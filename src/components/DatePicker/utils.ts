export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime() && !isSameDay(a, b);
}

export function isStrictlyInRange(date: Date, start: Date, end: Date): boolean {
  const d = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return d > s && d < e;
}

export function normalizeRange(
  start: Date,
  end: Date
): [Date, Date] {
  return isBeforeDay(start, end) ? [start, end] : [end, start];
}

export function buildCalendarGrid(year: number, month: number): Date[] {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: Date[] = [];

  for (let i = firstDow - 1; i >= 0; i--) {
    cells.push(new Date(year, month - 1, prevDays - i));
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  // fill to complete 6 rows (42 cells)
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push(new Date(year, month + 1, d));
  }

  return cells;
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function formatMonthLabel(year: number, month: number): string {
  return `${year}년 ${month + 1}월`;
}
