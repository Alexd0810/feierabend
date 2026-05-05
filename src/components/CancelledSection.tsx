import type { Lesson } from "../types";
import { minutesToTime } from "../utils/time";

interface CancelledSectionProps {
  cancelled: Lesson[];
  cancelledWithReplacement: Map<Lesson, Lesson>;
}

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
