interface DebugBannerProps {
  mode: string | null;
  week: string | null;
}

export default function DebugBanner({ mode, week }: DebugBannerProps) {
  if (!mode && !week) return null;

  const parts: string[] = [];
  if (mode) parts.push(`mode=${mode}`);
  if (week) parts.push(`week=${week}`);

  return (
    <div className="debug-banner">
      DEBUG MODE ACTIVE <code>{parts.join(" | ")}</code>
    </div>
  );
}
