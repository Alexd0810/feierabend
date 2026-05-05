import { useEffect } from "react";
import type { MilestoneData } from "../types";

interface MilestoneToastProps {
  milestone: MilestoneData | null;
  onDismiss: () => void;
}

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
