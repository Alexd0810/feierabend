import type { Lesson, DayInfo } from "../types";
import { minutesToTime } from "../utils/time";

interface ScheduleTimelineProps {
  lessons: Lesson[];
  currentMin: number;
  dayInfo: DayInfo;
  replacements: Map<Lesson, Lesson>; // active -> cancelled it replaces
}

export default function ScheduleTimeline({
  lessons,
  currentMin,
  dayInfo,
  replacements,
}: ScheduleTimelineProps) {
  const count = lessons.length;
  const countText = dayInfo.isWorkDay
    ? "Work day"
    : `${count} lesson${count !== 1 ? "s" : ""}`;

  const emptyContent = () => {
    let icon = "😴";
    let message = "No lessons scheduled today";
    if (dayInfo.isWeekend) {
      icon = "🎉";
      message = "Weekend! Enjoy your time off!";
    } else if (dayInfo.isWorkDay) {
      icon = "💼";
      message = "Work day - No school today";
    }
    return (
      <div className="no-lesson">
        <div className="no-lesson-icon">{icon}</div>
        {message}
      </div>
    );
  };

  return (
    <section className="schedule-section">
      <div className="schedule-header">
        <h2 className="schedule-title">Today's Schedule</h2>
        <span className="schedule-count">{countText}</span>
      </div>
      <div className="schedule-timeline">
        <div className="timeline-line" />
        {count === 0
          ? emptyContent()
          : lessons.map((lesson, idx) => {
              const isReplacement = replacements.has(lesson);
              const replacesLesson = replacements.get(lesson);

              let status = "";
              if (lesson.cancelled) {
                status = "cancelled";
              } else if (isReplacement) {
                if (currentMin >= lesson.startMin && currentMin < lesson.endMin)
                  status = "replacement active";
                else if (currentMin >= lesson.endMin)
                  status = "replacement past";
                else status = "replacement";
              } else if (
                currentMin >= lesson.startMin &&
                currentMin < lesson.endMin
              ) {
                status = "active";
              } else if (currentMin >= lesson.endMin) {
                status = "past";
              }

              return (
                <div key={idx} className={`schedule-item ${status}`}>
                  <div className="schedule-dot" />
                  <div className="schedule-time">
                    {minutesToTime(lesson.startMin)} -{" "}
                    {minutesToTime(lesson.endMin)}
                  </div>
                  <div className="schedule-content">
                    <div className="schedule-subject">{lesson.subject}</div>
                    <div className="schedule-meta">
                      <span>Room {lesson.room}</span>
                      {lesson.cancelled && (
                        <span style={{ color: "var(--accent-danger)" }}>
                          CANCELLED
                        </span>
                      )}
                      {isReplacement && replacesLesson && (
                        <span className="replacement-badge">
                          REPLACES {replacesLesson.subject}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
}
