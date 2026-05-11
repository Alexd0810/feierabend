import { useEffect } from "react";
import type { MilestoneData } from "../types";

/** Props for {@link MilestoneToast}. */
export interface MilestoneToastProps {
  /**
   * The milestone to display, or `null` when no toast should be visible.
   * Changing this to a non-null value starts the auto-dismiss timer.
   */
  milestone: MilestoneData | null;
  /** Called when the toast should be hidden (after 3 s or manually). */
  onDismiss: () => void;
}

/**
 * A non-blocking toast notification that appears when a countdown milestone
 * is reached.
 *
 * Auto-dismisses after 3 seconds. The toast slides in/out using the
 * `show` CSS class.
 */
export default function MilestoneToast({
  milestone,
  onDismiss,
}: MilestoneToastProps) {
  useEffect(() => {
    if (!milestone) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [milestone, onDismiss]);

  return (
    <div className={`milestone-toast${milestone ? " show" : ""}`}>
      <div className="milestone-emoji">{milestone?.emoji ?? "-"}</div>
      <div className="milestone-text">{milestone?.text ?? "MILESTONE!"}</div>
      <div className="milestone-subtext">
        {milestone?.subtext ?? "Keep going!"}
      </div>
    </div>
  );
}
