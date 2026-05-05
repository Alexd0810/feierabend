import type { DayInfo } from "../types";

interface DayTypeCardProps {
  dayInfo: DayInfo;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DayTypeCard({ dayInfo }: DayTypeCardProps) {
  const {
    isWeekend,
    isSchoolDay,
    isWorkDay,
    isEvenWeek,
    weekNumber,
    dayOfWeek,
  } = dayInfo;

  let iconClass = "day-type-icon";
  let iconEmoji = "";
  let title = "";
  let explanationHtml = "";

  if (isWeekend) {
    iconClass += " weekend";
    iconEmoji = "🎉";
    title = "Weekend Mode";
    explanationHtml =
      "It's the <strong>weekend</strong>! No school, no work. Enjoy your freedom!";
  } else if (isSchoolDay) {
    iconClass += " school";
    iconEmoji = "📚";
    title = "School Day";
    explanationHtml = isEvenWeek
      ? `<strong>Week ${weekNumber}</strong> is an <strong>even week</strong>, so school is on <strong>Monday and Tuesday</strong>.`
      : `<strong>Week ${weekNumber}</strong> is an <strong>odd week</strong>, so school is <strong>only on Tuesday</strong>.`;
  } else if (isWorkDay) {
    iconClass += " work";
    iconEmoji = "💼";
    title = "Work Day";
    explanationHtml = isEvenWeek
      ? `<strong>Week ${weekNumber}</strong> is an <strong>even week</strong>. Today is a work day (school only Mon/Tue). Feierabend at <strong>16:00</strong>!`
      : `<strong>Week ${weekNumber}</strong> is an <strong>odd week</strong>. Today is a work day (school only Tue). Feierabend at <strong>16:00</strong>!`;
  }

  return (
    <section className="day-type-card">
      <div className="day-type-header">
        <div className={iconClass}>{iconEmoji}</div>
        <div className="day-type-title">{title}</div>
      </div>
      <div
        className="day-type-explanation"
        dangerouslySetInnerHTML={{ __html: explanationHtml }}
      />
      <div className="week-schedule">
        {DAYS.map((day, i) => {
          let dayClass = "";
          const isToday = i === dayOfWeek;
          if (i === 0 || i === 6) dayClass = "weekend";
          else if (isEvenWeek && (i === 1 || i === 2)) dayClass = "school";
          else if (!isEvenWeek && i === 2) dayClass = "school";
          else if (i >= 1 && i <= 5) dayClass = "work";

          return (
            <div
              key={day}
              className={`week-day ${dayClass}${isToday ? " today" : ""}`}
            >
              {day}
              {isToday ? " (Today)" : ""}
            </div>
          );
        })}
      </div>
    </section>
  );
}
