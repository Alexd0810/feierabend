import { useState } from 'react';
import type { DayInfo } from '../types';
import { getWeekNumber } from '../utils/time';

/**
 * Derives {@link DayInfo} from the current date and any debug query-parameters
 * present in the URL.
 *
 * Supported parameters:
 * - `?mode=school|work|weekend` – override the day type.
 * - `?week=even|odd`            – override the week parity.
 *
 * The result is computed once on mount and never changes for the lifetime of
 * the page, so it is safe to read without a subscription.
 */
function computeDayInfo(): DayInfo {
  const params = new URLSearchParams(window.location.search);
  const debug = { mode: params.get('mode'), week: params.get('week') };

  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekNum = getWeekNumber(today);

  let isEvenWeek: boolean;
  if (debug.week === 'even') isEvenWeek = true;
  else if (debug.week === 'odd') isEvenWeek = false;
  else isEvenWeek = weekNum % 2 === 0;

  let isSchoolDay: boolean;
  if (debug.mode === 'school') isSchoolDay = true;
  else if (debug.mode === 'work' || debug.mode === 'weekend') isSchoolDay = false;
  else if (isEvenWeek) isSchoolDay = dayOfWeek === 1 || dayOfWeek === 2;
  else isSchoolDay = dayOfWeek === 2;

  let isWeekend: boolean;
  if (debug.mode === 'weekend') isWeekend = true;
  else if (debug.mode === 'work' || debug.mode === 'school') isWeekend = false;
  else isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  let isWorkDay: boolean;
  if (debug.mode === 'work') isWorkDay = true;
  else if (debug.mode === 'school' || debug.mode === 'weekend') isWorkDay = false;
  else if (dayOfWeek === 0 || dayOfWeek === 6) isWorkDay = false;
  else isWorkDay = !isSchoolDay;

  return {
    isSchoolDay,
    isWorkDay,
    isWeekend,
    isEvenWeek,
    weekNumber: weekNum,
    dayOfWeek,
    debugMode: !!(debug.mode || debug.week),
    debugParams: debug,
  };
}

/**
 * Returns stable {@link DayInfo} for the current page session.
 *
 * The value is computed once (on mount) and never re-computed, because the
 * day type cannot change while the user has the page open.
 *
 * @returns Immutable day-info object.
 */
export function useDayInfo(): DayInfo {
  const [dayInfo] = useState<DayInfo>(computeDayInfo);
  return dayInfo;
}
