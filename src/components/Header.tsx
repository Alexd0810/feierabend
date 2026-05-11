/** Props for {@link Header}. */
export interface HeaderProps {
  /** The current date/time, updated every second by {@link useTimer}. */
  now: Date;
}

/**
 * Page header containing the app title and the live current-time display.
 *
 * The time is formatted in `de-DE` locale (HH:MM:SS).
 */
export default function Header({ now }: HeaderProps) {
  const timeStr = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="header">
      <h1 data-text="FEIERABEND TIMER">FEIERABEND TIMER</h1>
      <div className="current-time">
        Current Time: <span>{timeStr}</span>
      </div>
    </header>
  );
}
