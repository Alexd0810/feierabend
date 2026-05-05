import type { MascotMood } from "../types";
import { mascotStates } from "../data/mascot";

interface MascotProps {
  minutesLeft: number;
  totalMinutes: number;
}

function getMascotMood(minutesLeft: number, totalMinutes: number): MascotMood {
  const progress = totalMinutes > 0 ? 1 - minutesLeft / totalMinutes : 1;
  if (minutesLeft <= 0) return "celebration";
  if (minutesLeft <= 30) return "hyped";
  if (progress > 0.75) return "dying";
  if (progress > 0.5) return "tired";
  if (progress > 0.25) return "normal";
  return "fresh";
}

export default function Mascot({ minutesLeft, totalMinutes }: MascotProps) {
  const mood = getMascotMood(minutesLeft, totalMinutes);
  const state = mascotStates[mood];
  const messageIndex = Math.floor(Date.now() / 10000) % state.messages.length;

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
