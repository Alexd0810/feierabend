import type { Lesson, DayInfo } from "../types";
import { minutesToTime } from "../utils/time";

/** Props for {@link ScheduleTimeline}. */
export interface ScheduleTimelineProps {
  /** All lessons for the day, including cancelled ones. */
  lessons: Lesson[];
  /** Current time as minutes since midnight. */
  currentMin: number;
  /** Current day information computed by {@link useDayInfo}. */
  dayInfo: DayInfo;
  /**
   * Maps each active replacement lesson to the cancelled lesson it covers.
   * Built by {@link findReplacementLessons}.
   */
  replacements: Map<Lesson, Lesson>;
}

type ScheduleStatusTone =
  | "live"
  | "upcoming"
  | "done"
  | "cancelled"
  | "replacement";

interface LessonPresentation {
  badge: string;
  tone: ScheduleStatusTone;
  progress: number | null;
}

function getLessonPresentation(
  lesson: Lesson,
  currentMin: number,
  isReplacement: boolean,
): LessonPresentation {
  if (lesson.cancelled) {
    return { badge: "Cancelled", tone: "cancelled", progress: null };
  }

  if (currentMin >= lesson.startMin && currentMin < lesson.endMin) {
    const duration = Math.max(1, lesson.endMin - lesson.startMin);
    const elapsed = currentMin - lesson.startMin;
    return {
      badge: isReplacement ? "Live Replacement" : "Live Now",
      tone: isReplacement ? "replacement" : "live",
      progress: Math.min(100, Math.max(0, (elapsed / duration) * 100)),
    };
  }

  if (currentMin < lesson.startMin) {
    return {
      badge: isReplacement ? "Replacement" : "Up Next",
      tone: isReplacement ? "replacement" : "upcoming",
      progress: null,
    };
  }

  return {
    badge: isReplacement ? "Replacement Done" : "Completed",
    tone: isReplacement ? "replacement" : "done",
    progress: null,
  };
}

/**
 * Renders a vertical timeline of today's full lesson schedule.
 *
 * Each item is styled according to its status:
 * - `active`          – currently in progress
 * - `past`            – already finished
 * - `replacement`     – an active lesson filling a cancelled slot
 * - `cancelled`       – a cancelled lesson
 *
 * Displays an empty-state message on weekends, work days, and lesson-free
 * school days.
 */
export default function ScheduleTimeline({
  lessons,
  currentMin,
  dayInfo,
  replacements,
}: ScheduleTimelineProps) {
  const replacedLessons = new Set(replacements.values());
  const visibleLessons = lessons.filter(
    (lesson) => !(lesson.cancelled && replacedLessons.has(lesson)),
  );
  const count = visibleLessons.length;
  const cancelledCount = lessons.filter((lesson) => lesson.cancelled).length;
  const activeLesson =
    lessons.find(
      (lesson) =>
        !lesson.cancelled &&
        currentMin >= lesson.startMin &&
        currentMin < lesson.endMin,
    ) ?? null;
  const nextLesson =
    lessons.find((lesson) => !lesson.cancelled && lesson.startMin > currentMin) ??
    null;

  const countText = dayInfo.isWorkDay
    ? "Work day"
    : `${count} lesson${count !== 1 ? "s" : ""}`;

  const summaryTitle = activeLesson
    ? activeLesson.subject
    : nextLesson
      ? nextLesson.subject
      : dayInfo.isWeekend
        ? "Weekend"
        : dayInfo.isWorkDay
          ? "Work Day"
          : "Free Slot";
  const summaryLabel = activeLesson
    ? "Currently happening"
    : nextLesson
      ? `Starts at ${minutesToTime(nextLesson.startMin)}`
      : dayInfo.isWeekend
        ? "No lessons today"
        : dayInfo.isWorkDay
          ? "School is off today"
          : "Nothing else scheduled";

  const subtitle = dayInfo.isWeekend
    ? "Your school schedule is clear today."
    : dayInfo.isWorkDay
      ? "Today follows the work-day fallback instead of school lessons."
      : count === 0
        ? "No lessons are available for today."
        : "Live lesson states, replacements, and cancellations for today.";

  const emptyContent = () => {
    let icon = "😴";
    let message = "No lessons scheduled today";
    if (dayInfo.isWeekend) {
      icon = "🎉";
      message = "Weekend! Enjoy your time off!";
    } else if (dayInfo.isWorkDay) {
      icon = "💼";
      message = "Work day - No school lessons today";
    }
    return (
      <div className="schedule-empty-state">
        <div className="no-lesson-icon">{icon}</div>
        <div className="schedule-empty-title">{message}</div>
        <div className="schedule-empty-copy">
          Check the day mode card above if you need to confirm whether today is a
          school day, work day, or weekend.
        </div>
      </div>
    );
  };

  return (
    <section className="schedule-section">
      <div className="schedule-header">
        <div>
          <h2 className="schedule-title">Today&apos;s Schedule</h2>
          <p className="schedule-subtitle">{subtitle}</p>
        </div>
        <span className="schedule-count">{countText}</span>
      </div>

      <div className="schedule-overview">
        <div className="schedule-overview-card primary">
          <span className="schedule-overview-label">Current focus</span>
          <strong className="schedule-overview-value">{summaryTitle}</strong>
          <span className="schedule-overview-note">{summaryLabel}</span>
        </div>
        <div className="schedule-overview-card">
          <span className="schedule-overview-label">Upcoming</span>
          <strong className="schedule-overview-value">
            {nextLesson ? minutesToTime(nextLesson.startMin) : "—"}
          </strong>
          <span className="schedule-overview-note">
            {nextLesson ? nextLesson.subject : "No more upcoming lessons"}
          </span>
        </div>
        <div className="schedule-overview-card">
          <span className="schedule-overview-label">Changes today</span>
          <strong className="schedule-overview-value">{cancelledCount}</strong>
          <span className="schedule-overview-note">
            {cancelledCount === 1 ? "Cancelled lesson" : "Cancelled lessons"}
          </span>
        </div>
      </div>

      <div className="schedule-timeline">
        {count === 0
          ? emptyContent()
          : visibleLessons.map((lesson) => {
              const isReplacement = replacements.has(lesson);
              const replacesLesson = replacements.get(lesson);
              const presentation = getLessonPresentation(
                lesson,
                currentMin,
                isReplacement,
              );
              const duration = lesson.endMin - lesson.startMin;
              const itemKey = `${lesson.subject}-${lesson.startMin}-${lesson.endMin}-${lesson.room}-${lesson.cancelled}`;

              return (
                <article
                  key={itemKey}
                  className={`schedule-item schedule-card ${presentation.tone}`}
                >
                  <div className="schedule-marker">
                    <div className="schedule-dot" />
                  </div>
                  <div className="schedule-time-block">
                    <span className="schedule-time">
                      {minutesToTime(lesson.startMin)}
                    </span>
                    <span className="schedule-time-separator">to</span>
                    <span className="schedule-time">
                      {minutesToTime(lesson.endMin)}
                    </span>
                  </div>
                  <div className="schedule-content">
                    <div className="schedule-card-header">
                      <div>
                        <div className="schedule-subject">{lesson.subject}</div>
                        <div className="schedule-secondary">
                          {replacesLesson
                            ? `Replacement for ${replacesLesson.subject}`
                            : lesson.cancelled
                              ? "This lesson was cancelled"
                              : "Regular lesson"}
                        </div>
                      </div>
                      <span
                        className={`schedule-status-badge ${presentation.tone}`}
                      >
                        {presentation.badge}
                      </span>
                    </div>
                    <div className="schedule-meta">
                      <span>Room {lesson.room}</span>
                      <span>{duration} min</span>
                      {replacesLesson && (
                        <span className="replacement-badge">
                          Replaces {replacesLesson.subject}
                        </span>
                      )}
                    </div>
                    {presentation.progress !== null && (
                      <div
                        className="schedule-progress"
                        aria-label={`${lesson.subject} progress`}
                      >
                        <div
                          className="schedule-progress-fill"
                          style={{ width: `${presentation.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
}
