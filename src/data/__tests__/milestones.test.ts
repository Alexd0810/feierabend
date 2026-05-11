import { MILESTONES } from '../milestones';

describe('MILESTONES', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(MILESTONES)).toBe(true);
    expect(MILESTONES.length).toBeGreaterThan(0);
  });

  it('every milestone has a positive time value', () => {
    MILESTONES.forEach(m => {
      expect(m.time).toBeGreaterThan(0);
    });
  });

  it('every milestone has an emoji', () => {
    MILESTONES.forEach(m => {
      expect(typeof m.emoji).toBe('string');
      expect(m.emoji.trim().length).toBeGreaterThan(0);
    });
  });

  it('every milestone has non-empty text and subtext', () => {
    MILESTONES.forEach(m => {
      expect(m.text.trim().length).toBeGreaterThan(0);
      expect(m.subtext.trim().length).toBeGreaterThan(0);
    });
  });

  it('milestones are ordered from largest to smallest time', () => {
    for (let i = 1; i < MILESTONES.length; i++) {
      expect(MILESTONES[i].time).toBeLessThan(MILESTONES[i - 1].time);
    }
  });

  it('includes a 1-minute milestone', () => {
    expect(MILESTONES.some(m => m.time === 1)).toBe(true);
  });
});
