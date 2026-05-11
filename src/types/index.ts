/**
 * A single lesson entry as returned by the timetable API.
 * Extend this interface when the API starts returning additional fields.
 */
export interface Lesson {
  /** Display name of the subject (e.g. "Mathematik"). */
  subject: string;
  /** Room identifier (e.g. "101"). */
  room: string;
  /** Lesson start expressed as minutes since midnight. */
  startMin: number;
  /** Lesson end expressed as minutes since midnight. */
  endMin: number;
  /** Whether the lesson has been cancelled for today. */
  cancelled: boolean;
}

/** Top-level shape of the timetable API response. */
export interface TimetableData {
  /** All lessons for the current school day. */
  lessons: Lesson[];
}

/**
 * Derived information about the current day.
 * Computed once on mount by {@link useDayInfo} and never mutated.
 */
export interface DayInfo {
  /** Whether today is a school day according to the rotation schedule. */
  isSchoolDay: boolean;
  /** Whether today is a regular work day (no school). */
  isWorkDay: boolean;
  /** Whether today is Saturday or Sunday. */
  isWeekend: boolean;
  /** Whether the current ISO week number is even. */
  isEvenWeek: boolean;
  /** ISO week number of the current date. */
  weekNumber: number;
  /** Day of the week as returned by `Date.getDay()` (0 = Sunday). */
  dayOfWeek: number;
  /** True when any debug query-parameter is present in the URL. */
  debugMode: boolean;
  /** Raw values of the `?mode` and `?week` query parameters. */
  debugParams: { mode: string | null; week: string | null };
}

/**
 * A motivational quote with an associated vibe label.
 * Add new quotes to `src/data/quotes.ts`.
 */
export interface Quote {
  /** The quote body. */
  text: string;
  /** Short label describing the tone of the quote (displayed in caps). */
  vibe: string;
}

/**
 * A countdown milestone that triggers a toast notification and optionally a sound.
 * Add new milestones to `src/data/milestones.ts`.
 */
export interface MilestoneData {
  /** Minutes remaining when this milestone should fire. */
  time: number;
  /** Emoji character shown in the toast header. */
  emoji: string;
  /** Primary headline shown in the toast. */
  text: string;
  /** Secondary motivational line shown below the headline. */
  subtext: string;
}

/**
 * Identifiers for the background video options.
 * Extend the union and add entries to `src/data/videos.ts` to add a new channel.
 */
export type VideoType = 'minecraft' | 'subway' | 'satisfying' | 'asmr';

/**
 * All possible moods the mascot can be in.
 * Extend the union and add entries to `src/data/mascot.ts` to add a new mood.
 */
export type MascotMood = 'fresh' | 'normal' | 'tired' | 'dying' | 'hyped' | 'celebration';

/**
 * Visual and textual representation of a single mascot mood.
 * Stored in `src/data/mascot.ts` keyed by {@link MascotMood}.
 */
export interface MascotState {
  /** ASCII-art / emoji face character for the mood. */
  emoji: string;
  /** Rotating list of short messages the mascot says in this mood. */
  messages: string[];
}
