import {
  DAY_START_MIN,
  WORK_DAY_END_MIN,
  TIMETABLE_API_URL,
  TIMETABLE_REFETCH_INTERVAL_MS,
  QUOTE_ROTATION_INTERVAL_MS,
  MASCOT_MESSAGE_INTERVAL_MS,
} from '../config';

describe('config constants', () => {
  it('DAY_START_MIN equals 480 (08:00)', () => {
    expect(DAY_START_MIN).toBe(480);
  });

  it('WORK_DAY_END_MIN equals 960 (16:00)', () => {
    expect(WORK_DAY_END_MIN).toBe(960);
  });

  it('TIMETABLE_API_URL is a valid https URL', () => {
    expect(TIMETABLE_API_URL).toMatch(/^https:\/\//);
  });

  it('TIMETABLE_REFETCH_INTERVAL_MS is 5 minutes', () => {
    expect(TIMETABLE_REFETCH_INTERVAL_MS).toBe(5 * 60 * 1000);
  });

  it('QUOTE_ROTATION_INTERVAL_MS is 30 seconds', () => {
    expect(QUOTE_ROTATION_INTERVAL_MS).toBe(30_000);
  });

  it('MASCOT_MESSAGE_INTERVAL_MS is 10 seconds', () => {
    expect(MASCOT_MESSAGE_INTERVAL_MS).toBe(10_000);
  });

  it('DAY_START_MIN is less than WORK_DAY_END_MIN', () => {
    expect(DAY_START_MIN).toBeLessThan(WORK_DAY_END_MIN);
  });
});
