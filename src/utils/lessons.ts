import type { Lesson } from '../types';

/**
 * Removes duplicate lesson entries (same subject + time + room) and returns
 * the remaining lessons sorted by start time.
 *
 * Duplicates can appear when the API returns overlapping entries.
 *
 * @param lessons - Raw lesson array from the API.
 * @returns Deduplicated, time-sorted array.
 */
export function deduplicateLessons(lessons: Lesson[]): Lesson[] {
  const seen = new Map<string, Lesson>();
  lessons.forEach(lesson => {
    const key = `${lesson.subject}-${lesson.startMin}-${lesson.endMin}-${lesson.room}`;
    if (!seen.has(key)) seen.set(key, lesson);
  });
  return Array.from(seen.values()).sort((a, b) => a.startMin - b.startMin);
}

/**
 * Returns `true` when two time ranges (expressed as minute-of-day pairs) overlap.
 *
 * Uses a half-open interval model: `[start, end)`.
 *
 * @param start1 - Start of the first range.
 * @param end1   - End of the first range (exclusive).
 * @param start2 - Start of the second range.
 * @param end2   - End of the second range (exclusive).
 */
function timesOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
  return start1 < end2 && start2 < end1;
}

/**
 * Bidirectional mapping between active replacement lessons and the cancelled
 * lessons they cover.
 */
export interface ReplacementMaps {
  /** Maps each active (replacement) lesson to the cancelled lesson it covers. */
  replacements: Map<Lesson, Lesson>;
  /** Maps each cancelled lesson to the active lesson that covers its slot. */
  cancelledWithReplacement: Map<Lesson, Lesson>;
}

/**
 * Analyses a list of lessons and identifies which active lessons fill the
 * time slot of a cancelled lesson (i.e. replacement lessons).
 *
 * @param lessons - Full lesson list for the day (may include cancelled ones).
 * @returns Two maps that allow bidirectional lookup between replacements and
 *          the lessons they replace.
 */
export function findReplacementLessons(lessons: Lesson[]): ReplacementMaps {
  const cancelled = lessons.filter(l => l.cancelled);
  const active = lessons.filter(l => !l.cancelled);
  const replacements = new Map<Lesson, Lesson>();
  const cancelledWithReplacement = new Map<Lesson, Lesson>();

  cancelled.forEach(cancelledLesson => {
    active.forEach(activeLesson => {
      if (timesOverlap(activeLesson.startMin, activeLesson.endMin, cancelledLesson.startMin, cancelledLesson.endMin)) {
        replacements.set(activeLesson, cancelledLesson);
        cancelledWithReplacement.set(cancelledLesson, activeLesson);
      }
    });
  });

  return { replacements, cancelledWithReplacement };
}

/**
 * Returns the lesson that is currently in progress, or `null` if none.
 *
 * Cancelled lessons are excluded from the search.
 *
 * @param lessons    - Lesson list for the day.
 * @param currentMin - Current time as minutes since midnight.
 */
export function getCurrentLesson(lessons: Lesson[], currentMin: number): Lesson | null {
  return lessons.find(l => !l.cancelled && currentMin >= l.startMin && currentMin < l.endMin) ?? null;
}

/**
 * Returns the next upcoming lesson after `currentMin`, or `null` when
 * there are no more lessons today.
 *
 * Cancelled lessons are excluded from the search.
 *
 * @param lessons    - Lesson list for the day.
 * @param currentMin - Current time as minutes since midnight.
 */
export function getNextLesson(lessons: Lesson[], currentMin: number): Lesson | null {
  return lessons.find(l => !l.cancelled && l.startMin > currentMin) ?? null;
}

/**
 * Filters and returns only the cancelled lessons from the given list.
 *
 * @param lessons - Full lesson list for the day.
 * @returns All lessons whose `cancelled` flag is `true`.
 */
export function getCancelledLessons(lessons: Lesson[]): Lesson[] {
  return lessons.filter(l => l.cancelled);
}
