/**
 * Converts an absolute minute-of-the-day value into a zero-padded `HH:MM` string.
 *
 * @param minutes - Minutes since midnight (e.g. `480` → `"08:00"`).
 * @returns A formatted time string.
 *
 * @example
 * minutesToTime(495) // "08:15"
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Calculates the ISO 8601 week number for the given date.
 *
 * Week 1 is the week containing the first Thursday of the year.
 *
 * @param date - The date to calculate the week number for.
 * @returns An integer in the range 1–53.
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Returns the current time expressed as minutes since midnight.
 *
 * @param now - Reference date/time (defaults to `new Date()`).
 * @returns Minutes since midnight, e.g. `490` for 08:10.
 */
export function getCurrentMinutes(now: Date = new Date()): number {
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Returns the number of **whole seconds** remaining until a target time.
 *
 * Returns `0` if the target is already in the past.
 *
 * @param targetMinutes - Target time as minutes since midnight.
 * @param now           - Reference date/time (defaults to `new Date()`).
 * @returns Non-negative seconds until the target.
 */
export function getSecondsUntil(targetMinutes: number, now: Date = new Date()): number {
  const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const targetSeconds = targetMinutes * 60;
  return Math.max(0, targetSeconds - currentSeconds);
}
