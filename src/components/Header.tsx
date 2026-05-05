interface HeaderProps {
  now: Date;
}

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
