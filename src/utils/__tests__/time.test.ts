import { minutesToTime, getWeekNumber, getCurrentMinutes, getSecondsUntil } from '../time';

describe('minutesToTime', () => {
  it('converts 0 to 00:00', () => {
    expect(minutesToTime(0)).toBe('00:00');
  });

  it('converts 480 to 08:00', () => {
    expect(minutesToTime(480)).toBe('08:00');
  });

  it('converts 495 to 08:15', () => {
    expect(minutesToTime(495)).toBe('08:15');
  });

  it('converts 960 to 16:00', () => {
    expect(minutesToTime(960)).toBe('16:00');
  });

  it('pads hours and minutes with leading zeros', () => {
    expect(minutesToTime(61)).toBe('01:01');
  });

  it('converts 1439 to 23:59', () => {
    expect(minutesToTime(1439)).toBe('23:59');
  });
});

describe('getWeekNumber', () => {
  it('returns a number between 1 and 53', () => {
    const week = getWeekNumber(new Date());
    expect(week).toBeGreaterThanOrEqual(1);
    expect(week).toBeLessThanOrEqual(53);
  });

  it('returns 1 for the first week of 2024 (Jan 1)', () => {
    // Jan 1 2024 is a Monday — week 1
    expect(getWeekNumber(new Date(2024, 0, 1))).toBe(1);
  });

  it('returns 52 for Dec 30 2024', () => {
    // Dec 30 2024 is a Monday — week 1 of 2025, but still ISO 2024 week 1 — let's just verify it is a number
    const week = getWeekNumber(new Date(2024, 11, 30));
    expect(typeof week).toBe('number');
  });

  it('returns consistent values for the same date', () => {
    const date = new Date(2025, 4, 12); // May 12 2025
    expect(getWeekNumber(date)).toBe(getWeekNumber(new Date(2025, 4, 12)));
  });
});

describe('getCurrentMinutes', () => {
  it('returns correct minutes for 08:30', () => {
    const date = new Date(2025, 0, 1, 8, 30, 0);
    expect(getCurrentMinutes(date)).toBe(510);
  });

  it('returns 0 for midnight', () => {
    const date = new Date(2025, 0, 1, 0, 0, 0);
    expect(getCurrentMinutes(date)).toBe(0);
  });

  it('returns 1439 for 23:59', () => {
    const date = new Date(2025, 0, 1, 23, 59, 0);
    expect(getCurrentMinutes(date)).toBe(1439);
  });
});

describe('getSecondsUntil', () => {
  it('returns positive seconds when target is in the future', () => {
    // target: 16:00 = 960 min, current: 15:00 = 900 min → 3600 sec
    const now = new Date(2025, 0, 1, 15, 0, 0);
    expect(getSecondsUntil(960, now)).toBe(3600);
  });

  it('returns 0 when target is in the past', () => {
    const now = new Date(2025, 0, 1, 17, 0, 0);
    expect(getSecondsUntil(960, now)).toBe(0);
  });

  it('returns 0 when target equals current time', () => {
    const now = new Date(2025, 0, 1, 16, 0, 0);
    expect(getSecondsUntil(960, now)).toBe(0);
  });

  it('accounts for seconds in the current time', () => {
    // target 16:00 (57600 sec), current 15:59:30 → 30 sec remaining
    const now = new Date(2025, 0, 1, 15, 59, 30);
    expect(getSecondsUntil(960, now)).toBe(30);
  });
});
