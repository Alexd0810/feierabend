interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      className={`sound-toggle${enabled ? " enabled" : ""}`}
      onClick={onToggle}
      title="Toggle Feierabend Sound"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path
          style={{ opacity: enabled ? 1 : 0.3 }}
          d="M15.54 8.46a5 5 0 0 1 0 7.07"
        />
        <path
          style={{ opacity: enabled ? 1 : 0.3 }}
          d="M19.07 4.93a10 10 0 0 1 0 14.14"
        />
      </svg>
    </button>
  );
}
