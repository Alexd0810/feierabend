import { deduplicateLessons, findReplacementLessons, getCurrentLesson, getNextLesson } from '../lessons';
import type { Lesson } from '../../types';

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    subject: 'Math',
    room: '101',
    startMin: 480,
    endMin: 570,
    cancelled: false,
    ...overrides,
  };
}

describe('deduplicateLessons', () => {
  it('returns an empty array for empty input', () => {
    expect(deduplicateLessons([])).toEqual([]);
  });

  it('removes exact duplicates', () => {
    const lesson = makeLesson();
    const result = deduplicateLessons([lesson, { ...lesson }]);
    expect(result).toHaveLength(1);
  });

  it('keeps lessons with different subjects', () => {
    const a = makeLesson({ subject: 'Math' });
    const b = makeLesson({ subject: 'English' });
    expect(deduplicateLessons([a, b])).toHaveLength(2);
  });

  it('keeps lessons with different times', () => {
    const a = makeLesson({ startMin: 480 });
    const b = makeLesson({ startMin: 570 });
    expect(deduplicateLessons([a, b])).toHaveLength(2);
  });

  it('sorts lessons by start time', () => {
    const a = makeLesson({ startMin: 570, subject: 'B' });
    const b = makeLesson({ startMin: 480, subject: 'A' });
    const result = deduplicateLessons([a, b]);
    expect(result[0].startMin).toBe(480);
    expect(result[1].startMin).toBe(570);
  });
});

describe('findReplacementLessons', () => {
  it('returns empty maps when there are no cancelled lessons', () => {
    const lessons = [makeLesson()];
    const { replacements, cancelledWithReplacement } = findReplacementLessons(lessons);
    expect(replacements.size).toBe(0);
    expect(cancelledWithReplacement.size).toBe(0);
  });

  it('identifies a replacement lesson that overlaps a cancelled slot', () => {
    const cancelled = makeLesson({ subject: 'Math', startMin: 480, endMin: 570, cancelled: true });
    const replacement = makeLesson({ subject: 'English', startMin: 480, endMin: 570 });
    const { replacements, cancelledWithReplacement } = findReplacementLessons([cancelled, replacement]);
    expect(replacements.get(replacement)).toBe(cancelled);
    expect(cancelledWithReplacement.get(cancelled)).toBe(replacement);
  });

  it('does not link active lessons that do not overlap cancelled slots', () => {
    const cancelled = makeLesson({ startMin: 480, endMin: 570, cancelled: true });
    const active = makeLesson({ startMin: 600, endMin: 690 });
    const { replacements } = findReplacementLessons([cancelled, active]);
    expect(replacements.size).toBe(0);
  });
});

describe('getCurrentLesson', () => {
  it('returns null when no lessons', () => {
    expect(getCurrentLesson([], 500)).toBeNull();
  });

  it('returns the active lesson at the given time', () => {
    const lesson = makeLesson({ startMin: 480, endMin: 570 });
    expect(getCurrentLesson([lesson], 510)).toBe(lesson);
  });

  it('returns null when time is before the lesson', () => {
    const lesson = makeLesson({ startMin: 480, endMin: 570 });
    expect(getCurrentLesson([lesson], 479)).toBeNull();
  });

  it('returns null when time is at or after end', () => {
    const lesson = makeLesson({ startMin: 480, endMin: 570 });
    expect(getCurrentLesson([lesson], 570)).toBeNull();
  });

  it('ignores cancelled lessons', () => {
    const lesson = makeLesson({ startMin: 480, endMin: 570, cancelled: true });
    expect(getCurrentLesson([lesson], 510)).toBeNull();
  });
});

describe('getNextLesson', () => {
  it('returns null when no lessons', () => {
    expect(getNextLesson([], 500)).toBeNull();
  });

  it('returns the next upcoming lesson', () => {
    const a = makeLesson({ startMin: 480, subject: 'A' });
    const b = makeLesson({ startMin: 600, subject: 'B' });
    expect(getNextLesson([a, b], 490)).toBe(b);
  });

  it('returns null when all lessons are in the past', () => {
    const lesson = makeLesson({ startMin: 480 });
    expect(getNextLesson([lesson], 600)).toBeNull();
  });

  it('ignores cancelled lessons', () => {
    const cancelled = makeLesson({ startMin: 600, cancelled: true });
    const active = makeLesson({ startMin: 700 });
    expect(getNextLesson([cancelled, active], 500)).toBe(active);
  });
});
