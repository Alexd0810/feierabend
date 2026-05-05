export interface Lesson {
  subject: string;
  room: string;
  startMin: number;
  endMin: number;
  cancelled: boolean;
}

export interface TimetableData {
  lessons: Lesson[];
}

export interface DayInfo {
  isSchoolDay: boolean;
  isWorkDay: boolean;
  isWeekend: boolean;
  isEvenWeek: boolean;
  weekNumber: number;
  dayOfWeek: number;
  debugMode: boolean;
  debugParams: { mode: string | null; week: string | null };
}

export interface Quote {
  text: string;
  vibe: string;
}

export interface MilestoneData {
  time: number;
  emoji: string;
  text: string;
  subtext: string;
}

export type VideoType = 'minecraft' | 'subway' | 'satisfying' | 'asmr';

export type MascotMood = 'fresh' | 'normal' | 'tired' | 'dying' | 'hyped' | 'celebration';

export interface MascotState {
  emoji: string;
  messages: string[];
}
