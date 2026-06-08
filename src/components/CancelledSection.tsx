import type { Lesson } from "../types";
import { minutesToTime } from "../utils/time";

/** Props for {@link CancelledSection}. */
export interface CancelledSectionProps {
  /** All cancelled lessons for the day. */
  cancelled: Lesson[];
  /**
   * Maps each cancelled lesson to the active lesson that replaced its slot.
   * Built by {@link findReplacementLessons}.
   */
  cancelledWithReplacement: Map<Lesson, Lesson>;
}

/**
 * Renders the list of cancelled lessons and, where applicable, indicates
 * which lesson is covering that time slot as a replacement.
 *
 * Returns `null` when there are no cancelled lessons.
 */
export default function CancelledSection({
  cancelled,
  cancelledWithReplacement,
}: CancelledSectionProps) {
  if (cancelled.length === 0) return null;

  const coveredCount = cancelled.filter((lesson) =>
    cancelledWithReplacement.has(lesson),
  ).length;
  const uncoveredCount = cancelled.length - coveredCount;

  return (
    <section className="cancelled-section">
      <div className="cancelled-header">
        <div>
          <div className="cancelled-header-top">
            <span className="cancelled-badge">Cancelled</span>
            <span className="cancelled-count-pill">
              {cancelled.length} total
            </span>
          </div>
          <div className="cancelled-title">Today&apos;s cancelled lessons</div>
          <p className="cancelled-subtitle">
            See which cancelled slots are already covered and which still leave a
            gap in the day.
          </p>
        </div>
      </div>

      <div className="cancelled-overview">
        <div className="cancelled-overview-card primary">
          <span className="cancelled-overview-label">Cancelled total</span>
          <strong className="cancelled-overview-value">{cancelled.length}</strong>
          <span className="cancelled-overview-note">
            Lesson{cancelled.length === 1 ? "" : "s"} removed from today
          </span>
        </div>
        <div className="cancelled-overview-card">
          <span className="cancelled-overview-label">Covered</span>
          <strong className="cancelled-overview-value">{coveredCount}</strong>
          <span className="cancelled-overview-note">
            Replaced by another lesson
          </span>
        </div>
        <div className="cancelled-overview-card">
          <span className="cancelled-overview-label">Open gaps</span>
          <strong className="cancelled-overview-value">{uncoveredCount}</strong>
          <span className="cancelled-overview-note">
            Still cancelled without replacement
          </span>
        </div>
      </div>

      <div className="cancelled-list">
        {cancelled.map((lesson) => {
          const replacedBy = cancelledWithReplacement.get(lesson);
          const duration = lesson.endMin - lesson.startMin;
          const itemKey = `${lesson.subject}-${lesson.startMin}-${lesson.endMin}-${lesson.room}-${lesson.cancelled}`;

          return (
            <article
              key={itemKey}
              className={`cancelled-item cancelled-card${replacedBy ? " has-replacement" : ""}`}
            >
              <div className="cancelled-card-header">
                <div>
                  <div className="cancelled-subject">{lesson.subject}</div>
                  <div className="cancelled-time">
                    {minutesToTime(lesson.startMin)} -{" "}
                    {minutesToTime(lesson.endMin)}
                  </div>
                </div>
                <span
                  className={`cancelled-status-badge${replacedBy ? " covered" : ""}`}
                >
                  {replacedBy ? "Covered" : "Cancelled"}
                </span>
              </div>

              <div className="cancelled-meta">
                <span>Room {lesson.room}</span>
                <span>{duration} min</span>
              </div>

              {replacedBy && (
                <div className="cancelled-replacement-card">
                  <span className="replacement-arrow">→</span>
                  <div>
                    <div className="cancelled-replacement-title">
                      Replaced by <strong>{replacedBy.subject}</strong>
                    </div>
                    <div className="cancelled-replacement-meta">
                      Room {replacedBy.room} • {minutesToTime(replacedBy.startMin)} -{" "}
                      {minutesToTime(replacedBy.endMin)}
                    </div>
                  </div>
                </div>
              )}

              {!replacedBy && (
                <div className="cancelled-open-note">
                  No replacement lesson has been assigned for this slot yet.
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
