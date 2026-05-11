import { excuses } from '../excuses';

describe('excuses', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(excuses)).toBe(true);
    expect(excuses.length).toBeGreaterThan(0);
  });

  it('every excuse is a non-empty string', () => {
    excuses.forEach(excuse => {
      expect(typeof excuse).toBe('string');
      expect(excuse.trim().length).toBeGreaterThan(0);
    });
  });

  it('contains no duplicate excuses', () => {
    const unique = new Set(excuses);
    expect(unique.size).toBe(excuses.length);
  });

  it('has at least 10 excuses', () => {
    expect(excuses.length).toBeGreaterThanOrEqual(10);
  });
});
