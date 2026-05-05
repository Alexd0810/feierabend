import { useState, useCallback } from 'react';

interface UseSoundResult {
  soundEnabled: boolean;
  toggleSound: () => void;
}

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
