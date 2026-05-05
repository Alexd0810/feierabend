import type { Lesson } from "../types";
import { minutesToTime } from "../utils/time";

interface LessonCardsProps {
  currentLesson: Lesson | null;
  nextLesson: Lesson | null;
  currentMin: number;
}

export default function LessonCards({
  currentLesson,
  nextLesson,
  currentMin,
}: LessonCardsProps) {
  let lessonProgress = 0;
  if (currentLesson) {
    const length = currentLesson.endMin - currentLesson.startMin;
    const elapsed = currentMin - currentLesson.startMin;
    lessonProgress = Math.min(100, Math.max(0, (elapsed / length) * 100));
  }

  return (
    <section className="cards-grid">
      {/* Current Lesson */}
      <div className="card" style={{ opacity: currentLesson ? 1 : 0.5 }}>
        <div className="card-icon current">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        </div>
        <div className="card-label">Currently in</div>
        <div className="card-subject current">
          {currentLesson?.subject ?? "Free Time"}
        </div>
        <div className="card-details">
          <div className="card-detail">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span>{currentLesson ? `Room ${currentLesson.room}` : "--"}</span>
          </div>
          <div className="card-detail">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>
              {currentLesson
                ? `${minutesToTime(currentLesson.startMin)} - ${minutesToTime(currentLesson.endMin)}`
                : "--:-- - --:--"}
            </span>
          </div>
        </div>
        <div className="lesson-progress">
          <div
            className="lesson-progress-fill"
            style={{ width: `${lessonProgress}%` }}
          />
        </div>
      </div>

      {/* Next Lesson */}
      <div className="card" style={{ opacity: nextLesson ? 1 : 0.5 }}>
        <div className="card-icon next">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="13,17 18,12 13,7" />
            <polyline points="6,17 11,12 6,7" />
          </svg>
        </div>
        <div className="card-label">Next up</div>
        <div className="card-subject next">{nextLesson?.subject ?? "None"}</div>
        <div className="card-details">
          <div className="card-detail">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span>{nextLesson ? `Room ${nextLesson.room}` : "--"}</span>
          </div>
          <div className="card-detail">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>
              {nextLesson
                ? `${minutesToTime(nextLesson.startMin)} - ${minutesToTime(nextLesson.endMin)}`
                : "--:-- - --:--"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
