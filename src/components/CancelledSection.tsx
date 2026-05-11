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

  return (
    <section className="cancelled-section">
      <div className="cancelled-header">
        <span className="cancelled-badge">Cancelled</span>
        <span className="cancelled-title">
          {cancelled.length} lesson{cancelled.length > 1 ? "s" : ""} cancelled
        </span>
      </div>
      <div className="cancelled-list">
        {cancelled.map((lesson, idx) => {
          const replacedBy = cancelledWithReplacement.get(lesson);
          return (
            <div
              key={idx}
              className={`cancelled-item${replacedBy ? " has-replacement" : ""}`}
            >
              <span className="cancelled-subject">{lesson.subject}</span>
              <span className="cancelled-time">
                {minutesToTime(lesson.startMin)} -{" "}
                {minutesToTime(lesson.endMin)}
              </span>
              {replacedBy && (
                <div className="replacement-info">
                  <span className="replacement-arrow">→</span>
                  <span>
                    Replaced by <strong>{replacedBy.subject}</strong> in Room{" "}
                    {replacedBy.room}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
