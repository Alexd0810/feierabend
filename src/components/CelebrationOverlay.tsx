import { useEffect, useState, useRef } from "react";
import { playFeierabendSound } from "../utils/audio";

/** Props for {@link CelebrationOverlay}. */
export interface CelebrationOverlayProps {
  /** Whether the celebration overlay is visible and animating. */
  active: boolean;
  /** Whether to play the Feierabend fanfare when the overlay activates. */
  soundEnabled: boolean;
}

/**
 * Rotating headline texts shown during the celebration sequence.
 * Add/change entries here to customise the copy.
 */
const TEXTS = [
  "FEIERABEND!",
  "FREEDOM!",
  "FINALLY!",
  "LETS GO!",
  "PARTY TIME!",
];

/** Confetti and firework colours. */
const COLORS = [
  "#ff006e",
  "#fb5607",
  "#ffbe0b",
  "#06d6a0",
  "#118ab2",
  "#7b2cbf",
];
/** Emojis used in the floating-emoji animation. */
const EMOJIS = ["🎉", "🥳", "🎊", "🍺", "🎈", "✨", "🌟", "💃", "🕺", "🎆"];

/**
 * Spawns 100 coloured confetti rectangles that fall from the top of the
 * viewport using the `confettiFall` CSS animation.
 *
 * Each element is appended to `document.body` and self-removes after 5 s.
 */
function createConfetti() {
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed;
        width:${Math.random() * 10 + 5}px;
        height:${Math.random() * 10 + 5}px;
        background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
        left:${Math.random() * 100}vw;
        top:-20px;
        z-index:10001;
        pointer-events:none;
        animation:confettiFall ${Math.random() * 3 + 2}s linear forwards;
        transform:rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 30);
  }
}

/**
 * Spawns a single firework element at a random viewport position.
 * Self-removes after 1 s.
 */
function createFirework() {
  const el = document.createElement("div");
  el.className = "firework";
  el.style.left = `${Math.random() * 100}vw`;
  el.style.top = `${Math.random() * 100}vh`;
  el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
  el.style.zIndex = "10001";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

/**
 * Spawns a single floating emoji that rises from the bottom of the viewport.
 * Self-removes after 3 s.
 */
function createFloatingEmoji() {
  const el = document.createElement("div");
  el.className = "party-emojis";
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  el.style.left = `${Math.random() * 100}vw`;
  el.style.zIndex = "10001";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/**
 * Full-screen overlay that triggers when Feierabend is reached.
 *
 * On activation it:
 * - plays the Feierabend fanfare (if sound is enabled),
 * - launches a one-shot burst of 100 confetti pieces,
 * - continuously spawns fireworks every 500 ms, and
 * - floats random emojis every 300 ms.
 *
 * All DOM elements are appended to `document.body` and clean themselves up
 * automatically so no manual cleanup is needed beyond unmounting.
 *
 * Returns `null` when `active` is `false`.
 */
export default function CelebrationOverlay({
  active,
  soundEnabled,
}: CelebrationOverlayProps) {
  const [textIndex, setTextIndex] = useState(0);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  useEffect(() => {
    if (!active) return;
    if (soundEnabledRef.current) playFeierabendSound();
    createConfetti();
    const fireworkId = setInterval(createFirework, 500);
    const emojiId = setInterval(createFloatingEmoji, 300);
    const textId = setInterval(
      () => setTextIndex((i) => (i + 1) % TEXTS.length),
      1000,
    );
    return () => {
      clearInterval(fireworkId);
      clearInterval(emojiId);
      clearInterval(textId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="celebration-overlay active">
      <div className="celebration-text">{TEXTS[textIndex]}</div>
      <div className="celebration-subtitle">
        Zeit zu gehen! Du hast es geschafft!
      </div>
    </div>
  );
}
