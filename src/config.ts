/**
 * @file config.ts
 * Central configuration file for the Feierabend Timer app.
 *
 * All magic numbers, API endpoints and tunable constants live here so
 * they can be changed in one place without hunting through the codebase.
 */

// ---------------------------------------------------------------------------
// Time constants (minutes since midnight)
// ---------------------------------------------------------------------------

/** The minute of the day at which the work / school day starts. */
export const DAY_START_MIN = 8 * 60; // 08:00

/** Default Feierabend minute used on work days and as a fallback. */
export const WORK_DAY_END_MIN = 16 * 60; // 16:00

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/** Base URL of the timetable back-end. */
export const TIMETABLE_API_URL = 'https://backenduntis.onrender.com/api/timetable';

/** How often the timetable is re-fetched, in milliseconds. */
export const TIMETABLE_REFETCH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// ---------------------------------------------------------------------------
// Quote rotation
// ---------------------------------------------------------------------------

/** How often (ms) the displayed quote rotates while the page is open. */
export const QUOTE_ROTATION_INTERVAL_MS = 30_000; // 30 seconds

// ---------------------------------------------------------------------------
// Mascot
// ---------------------------------------------------------------------------

/** How often (ms) the mascot cycles through its message list. */
export const MASCOT_MESSAGE_INTERVAL_MS = 10_000; // 10 seconds
