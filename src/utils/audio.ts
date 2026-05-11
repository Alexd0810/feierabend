/**
 * Resolves the browser's AudioContext constructor, falling back to the
 * webkit-prefixed variant for older Safari versions.
 *
 * @returns The AudioContext constructor, or `null` when the Web Audio API is
 *          unavailable (e.g. in a test environment).
 */
function getAudioContext(): typeof AudioContext | null {
  return (
    window.AudioContext ??
    (window as unknown as Record<string, typeof AudioContext>)['webkitAudioContext'] ??
    null
  );
}

/**
 * Plays the Feierabend victory fanfare — a four-note ascending arpeggio
 * (C5 → E5 → G5 → C6) using the Web Audio API.
 *
 * Silently does nothing when the Web Audio API is unavailable.
 */
export function playFeierabendSound(): void {
  const AudioCtx = getAudioContext();
  if (!AudioCtx) return;
  const audioContext = new AudioCtx();
  // C5, E5, G5, C6
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.5);
    oscillator.start(audioContext.currentTime + i * 0.15);
    oscillator.stop(audioContext.currentTime + i * 0.15 + 0.5);
  });
}

/**
 * Plays a short milestone ping (A5, 880 Hz) using the Web Audio API.
 *
 * Silently does nothing when the Web Audio API is unavailable.
 */
export function playMilestoneSound(): void {
  const AudioCtx = getAudioContext();
  if (!AudioCtx) return;
  const audioContext = new AudioCtx();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.frequency.value = 880;
  oscillator.type = 'sine';
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}
