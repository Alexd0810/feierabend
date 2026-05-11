import type { Lesson } from "../types";
import { DAY_START_MIN } from "../config";

/** Props for {@link StatsGrid}. */
export interface StatsGridProps {
  /** All lessons for the day (may include cancelled ones). */
  lessons: Lesson[];
  /** Current time as minutes since midnight. */
  currentMin: number;
  /** Feierabend time as minutes since midnight. */
  feierabendMin: number;
}

/**
 * Displays a 2×2 grid of at-a-glance statistics:
 * - **Hours Survived** – hours elapsed since {@link DAY_START_MIN}.
 * - **Lessons Done**   – percentage of non-cancelled lessons that have ended.
 * - **Breaks Left**    – future gaps between consecutive lessons.
 * - **Vibe Check**     – an informal mood label based on minutes remaining.
 */
export default function StatsGrid({
  lessons,
  currentMin,
  feierabendMin,
}: StatsGridProps) {
  const survived = Math.max(0, (currentMin - DAY_START_MIN) / 60);

  let lessonsCompleteText = "N/A";
  if (lessons.length > 0) {
    const completed = lessons.filter(
      (l) => !l.cancelled && currentMin >= l.endMin,
    ).length;
    const total = lessons.filter((l) => !l.cancelled).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    lessonsCompleteText = `${pct}%`;
  }

  let breaksLeft: string | number = "?";
  if (lessons.length > 0) {
    const sorted = [...lessons]
      .filter((l) => !l.cancelled)
      .sort((a, b) => a.startMin - b.startMin);
    let count = 0;
    for (let i = 1; i < sorted.length; i++) {
      if (
        sorted[i].startMin > sorted[i - 1].endMin &&
        sorted[i].startMin > currentMin
      )
        count++;
    }
    breaksLeft = count;
  }

  const minutesLeft = feierabendMin - currentMin;
  let vibeCheck: string;
  if (minutesLeft <= 0) vibeCheck = "PEAK";
  else if (minutesLeft <= 30) vibeCheck = "Hyped";
  else if (minutesLeft <= 60) vibeCheck = "Excited";
  else if (minutesLeft <= 120) vibeCheck = "Hopeful";
  else if (minutesLeft <= 240) vibeCheck = "Mid";
  else vibeCheck = "Meh";

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{survived.toFixed(1)}h</div>
        <div className="stat-label">Hours Survived</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{lessonsCompleteText}</div>
        <div className="stat-label">Lessons Done</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{breaksLeft}</div>
        <div className="stat-label">Breaks Left</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{vibeCheck}</div>
        <div className="stat-label">Vibe Check</div>
      </div>
    </section>
  );
}
