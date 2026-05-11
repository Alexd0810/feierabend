import type { DayInfo } from "../types";
import { minutesToTime, getCurrentMinutes } from "../utils/time";
import { DAY_START_MIN } from "../config";

/** Props for {@link TimerSection}. */
export interface TimerSectionProps {
  /** Seconds remaining until Feierabend. */
  secondsLeft: number;
  /** Feierabend time as minutes since midnight. */
  feierabendMin: number;
  /** Current day information computed by {@link useDayInfo}. */
  dayInfo: DayInfo;
  /** Whether there are any non-cancelled lessons today. */
  hasLessons: boolean;
  /** The current date/time, updated every second by {@link useTimer}. */
  now: Date;
}

/**
 * The primary countdown section.
 *
 * Displays hours / minutes / seconds remaining, the target Feierabend time,
 * contextual badges (Work Day / School Day), and an overall day-progress bar.
 *
 * The countdown label adapts to the day type returned by `dayInfo`.
 */
export default function TimerSection({
  secondsLeft,
  feierabendMin,
  dayInfo,
  hasLessons,
  now,
}: TimerSectionProps) {
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const hStr = hours.toString().padStart(2, "0");
  const mStr = minutes.toString().padStart(2, "0");
  const sStr = seconds.toString().padStart(2, "0");

  const currentMin = getCurrentMinutes(now);
  const dayLength = feierabendMin - DAY_START_MIN;
  const elapsed = currentMin - DAY_START_MIN;
  const progress =
    dayLength <= 0 ? 0 : Math.min(100, Math.max(0, (elapsed / dayLength) * 100));

  let timerLabel = "TIME UNTIL FEIERABEND";
  let showWorkBadge = false;
  let showSchoolBadge = false;

  if (dayInfo.isWeekend) {
    timerLabel = "ENJOY YOUR WEEKEND";
  } else if (dayInfo.isSchoolDay && hasLessons) {
    showSchoolBadge = true;
    timerLabel = "TIME UNTIL FEIERABEND";
  } else if (dayInfo.isSchoolDay && !hasLessons) {
    showWorkBadge = true;
    timerLabel = "TIME UNTIL WORK ENDS (NO LESSONS)";
  } else if (dayInfo.isWorkDay) {
    showWorkBadge = true;
    timerLabel = "TIME UNTIL WORK ENDS";
  }

  return (
    <section className="timer-section">
      <div className="timer-container">
        <div className="status-indicator">
          <div className="status-dot" />
          <span>LIVE</span>
        </div>

        <div className="timer-label">{timerLabel}</div>

        <div className="timer-display">
          <div className="timer-unit">
            <div className="timer-value" data-value={hStr}>
              {hStr}
            </div>
            <div className="timer-unit-label">Hours</div>
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-unit">
            <div className="timer-value" data-value={mStr}>
              {mStr}
            </div>
            <div className="timer-unit-label">Minutes</div>
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-unit">
            <div className="timer-value" data-value={sStr}>
              {sStr}
            </div>
            <div className="timer-unit-label">Seconds</div>
          </div>
        </div>

        <div className="feierabend-time">
          Feierabend at <span>{minutesToTime(feierabendMin)}</span>
        </div>

        <div style={{ textAlign: "center" }}>
          {showWorkBadge && (
            <div className="work-mode-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Work Day Mode
            </div>
          )}
          {showSchoolBadge && (
            <div className="school-mode-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              School Day
            </div>
          )}
          <span className="week-indicator">
            Week {dayInfo.weekNumber} ({dayInfo.isEvenWeek ? "Even" : "Odd"})
          </span>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Day Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
