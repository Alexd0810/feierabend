import type { MilestoneData } from '../types';

/**
 * Ordered list of milestones that are triggered as the countdown reaches
 * each threshold. Add new entries here to introduce additional toasts.
 *
 * - `time`    – minutes remaining when the milestone fires
 * - `emoji`   – decorative emoji shown in the toast
 * - `text`    – primary headline text
 * - `subtext` – secondary motivational line
 */
export const MILESTONES: MilestoneData[] = [
  { time: 60, emoji: '⏰', text: '1 HOUR LEFT!',  subtext: 'The final countdown begins!' },
  { time: 30, emoji: '⚡', text: '30 MINUTES!',   subtext: 'You can almost taste it!' },
  { time: 15, emoji: '🔥', text: '15 MINUTES!',   subtext: 'FREEDOM IS NEAR!' },
  { time: 5,  emoji: '💨', text: '5 MINUTES!',    subtext: 'START PACKING!' },
  { time: 1,  emoji: '🚀', text: '1 MINUTE!',     subtext: 'READY... SET...' },
];
