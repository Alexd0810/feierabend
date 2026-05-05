import type { Lesson } from '../types';

export function deduplicateLessons(lessons: Lesson[]): Lesson[] {
  const seen = new Map<string, Lesson>();
  lessons.forEach(lesson => {
    const key = `${lesson.subject}-${lesson.startMin}-${lesson.endMin}-${lesson.room}`;
    if (!seen.has(key)) seen.set(key, lesson);
  });
  return Array.from(seen.values()).sort((a, b) => a.startMin - b.startMin);
}

function timesOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
  return start1 < end2 && start2 < end1;
}

export interface ReplacementMaps {
  replacements: Map<Lesson, Lesson>; // active lesson -> cancelled lesson it replaces
  cancelledWithReplacement: Map<Lesson, Lesson>; // cancelled lesson -> active lesson replacing it
}

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

export function getCurrentLesson(lessons: Lesson[], currentMin: number): Lesson | null {
  return lessons.find(l => !l.cancelled && currentMin >= l.startMin && currentMin < l.endMin) ?? null;
}

export function getNextLesson(lessons: Lesson[], currentMin: number): Lesson | null {
  return lessons.find(l => !l.cancelled && l.startMin > currentMin) ?? null;
}

export function getCancelledLessons(lessons: Lesson[]): Lesson[] {
  return lessons.filter(l => l.cancelled);
}
