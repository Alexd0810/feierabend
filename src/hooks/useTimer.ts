import { useState, useEffect } from 'react';

/**
 * Returns a `Date` object that updates every second.
 *
 * The component using this hook will re-render once per second while mounted,
 * which is intentional — it drives the live countdown display.
 *
 * @returns The current date/time, refreshed every 1 000 ms.
 */
export function useTimer(): Date {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
