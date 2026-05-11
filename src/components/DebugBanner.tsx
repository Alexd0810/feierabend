/** Props for {@link DebugBanner}. */
export interface DebugBannerProps {
  /** Value of the `?mode` query-parameter, or `null` when absent. */
  mode: string | null;
  /** Value of the `?week` query-parameter, or `null` when absent. */
  week: string | null;
}

/**
 * Displays a sticky banner at the top of the page when any debug
 * query-parameter is active.
 *
 * Renders nothing when both `mode` and `week` are `null`.
 */
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
