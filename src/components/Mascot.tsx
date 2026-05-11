import type { MascotMood } from "../types";
import { mascotStates } from "../data/mascot";
import { MASCOT_MESSAGE_INTERVAL_MS } from "../config";

/** Props for {@link Mascot}. */
export interface MascotProps {
  /** Minutes remaining until Feierabend. */
  minutesLeft: number;
  /** Total minutes from day start to Feierabend (used to compute progress). */
  totalMinutes: number;
}

/**
 * Derives the appropriate {@link MascotMood} based on how far through the day
 * the user is.
 *
 * | Condition              | Mood          |
 * |------------------------|---------------|
 * | Feierabend reached     | `celebration` |
 * | ≤ 30 min left          | `hyped`       |
 * | > 75 % through day     | `dying`       |
 * | > 50 % through day     | `tired`       |
 * | > 25 % through day     | `normal`      |
 * | < 25 % through day     | `fresh`       |
 *
 * @param minutesLeft  - Minutes remaining until Feierabend.
 * @param totalMinutes - Total day length in minutes.
 */
function getMascotMood(minutesLeft: number, totalMinutes: number): MascotMood {
  const progress = totalMinutes > 0 ? 1 - minutesLeft / totalMinutes : 1;
  if (minutesLeft <= 0) return "celebration";
  if (minutesLeft <= 30) return "hyped";
  if (progress > 0.75) return "dying";
  if (progress > 0.5) return "tired";
  if (progress > 0.25) return "normal";
  return "fresh";
}

/**
 * Animated mascot that reacts to the current countdown progress.
 *
 * The mood and speech bubble message cycle automatically based on time.
 * Message rotation interval is controlled by {@link MASCOT_MESSAGE_INTERVAL_MS}.
 */
export default function Mascot({ minutesLeft, totalMinutes }: MascotProps) {
  const mood = getMascotMood(minutesLeft, totalMinutes);
  const state = mascotStates[mood];
  const messageIndex =
    Math.floor(Date.now() / MASCOT_MESSAGE_INTERVAL_MS) % state.messages.length;

  const extraClass =
    mood === "dying"
      ? " dying"
      : mood === "tired"
        ? " tired"
        : mood === "celebration" || mood === "hyped"
          ? " happy"
          : "";

  return (
    <div className="mascot-container">
      <div className="mascot-speech">{state.messages[messageIndex]}</div>
      <div className={`mascot${extraClass}`}>{state.emoji}</div>
    </div>
  );
}
