import { useState } from 'react';
import type { DayInfo } from '../types';
import { getWeekNumber } from '../utils/time';

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

export function useDayInfo(): DayInfo {
  const [dayInfo] = useState<DayInfo>(computeDayInfo);
  return dayInfo;
}
