import { useState, useCallback } from 'react';

/** Return value of {@link useSound}. */
export interface UseSoundResult {
  /** Whether the Feierabend and milestone sounds are currently enabled. */
  soundEnabled: boolean;
  /** Toggles sound on/off and persists the choice to `localStorage`. */
  toggleSound: () => void;
}

/**
 * Manages the user's sound-enabled preference.
 *
 * The preference is read from and written to `localStorage` under the key
 * `"soundEnabled"` so it survives page reloads.
 *
 * @returns Current enabled state and a stable toggle callback.
 */
export function useSound(): UseSoundResult {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    () => localStorage.getItem('soundEnabled') === 'true'
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('soundEnabled', String(next));
      return next;
    });
  }, []);

  return { soundEnabled, toggleSound };
}
