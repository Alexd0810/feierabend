import { useEffect, useState, useRef } from "react";
import { playFeierabendSound } from "../utils/audio";

interface CelebrationOverlayProps {
  active: boolean;
  soundEnabled: boolean;
}

const TEXTS = [
  "FEIERABEND!",
  "FREEDOM!",
  "FINALLY!",
  "LETS GO!",
  "PARTY TIME!",
];
const COLORS = [
  "#ff006e",
  "#fb5607",
  "#ffbe0b",
  "#06d6a0",
  "#118ab2",
  "#7b2cbf",
];
const EMOJIS = ["🎉", "🥳", "🎊", "🍺", "🎈", "✨", "🌟", "💃", "🕺", "🎆"];

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

function createFloatingEmoji() {
  const el = document.createElement("div");
  el.className = "party-emojis";
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  el.style.left = `${Math.random() * 100}vw`;
  el.style.zIndex = "10001";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

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
