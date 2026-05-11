import { useState, useEffect, useRef, useCallback } from 'react';
import type { MilestoneData } from '../types';
import { playMilestoneSound } from '../utils/audio';
import { MILESTONES } from '../data/milestones';

/**
 * LocalStorage key used to store which milestone keys have already fired
 * today, preventing duplicate toasts on page reload.
 */
const STORAGE_KEY_TRIGGERED = 'milestonesTriggered';

/** LocalStorage key that records the date of the last milestone reset. */
const STORAGE_KEY_RESET = 'lastMilestoneReset';

/**
 * Loads the set of already-triggered milestone keys from `localStorage`,
 * resetting it when the stored date no longer matches today.
 *
 * @returns A `Set` of milestone keys (e.g. `"milestone_60"`) that have
 *          already fired today.
 */
function initTriggered(): Set<string> {
  const today = new Date().toDateString();
  const lastReset = localStorage.getItem(STORAGE_KEY_RESET);
  if (lastReset !== today) {
    localStorage.setItem(STORAGE_KEY_TRIGGERED, '[]');
    localStorage.setItem(STORAGE_KEY_RESET, today);
    return new Set<string>();
  }
  return new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEY_TRIGGERED) || '[]'));
}

/** Return value of {@link useMilestones}. */
export interface UseMilestonesResult {
  /**
   * The milestone that is currently being shown, or `null` when none is
   * active.
   */
  activeMilestone: MilestoneData | null;
  /** Dismisses the active milestone toast immediately. */
  dismissMilestone: () => void;
}

/**
 * Watches the countdown and fires milestone toasts when the remaining time
 * crosses a threshold defined in `src/data/milestones.ts`.
 *
 * Each milestone fires **at most once per calendar day** — the triggered set
 * is persisted in `localStorage` and reset at midnight.
 *
 * @param minutesLeft   - Minutes remaining until Feierabend.
 * @param soundEnabled  - Whether to play an audio ping when a milestone fires.
 * @returns The currently active milestone and a dismiss callback.
 */
export function useMilestones(minutesLeft: number, soundEnabled: boolean): UseMilestonesResult {
  const triggeredRef = useRef<Set<string>>(null);
  if (!triggeredRef.current) {
    triggeredRef.current = initTriggered();
  }

  // Keep soundEnabled in a ref so the effect closure always reads the latest
  // value without needing to be re-created.
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const [activeMilestone, setActiveMilestone] = useState<MilestoneData | null>(null);

  useEffect(() => {
    for (const milestone of MILESTONES) {
      const key = `milestone_${milestone.time}`;
      if (
        minutesLeft <= milestone.time &&
        minutesLeft > milestone.time - 1 &&
        !triggeredRef.current!.has(key)
      ) {
        triggeredRef.current!.add(key);
        localStorage.setItem(STORAGE_KEY_TRIGGERED, JSON.stringify([...triggeredRef.current!]));
        setActiveMilestone(milestone);
        if (soundEnabledRef.current) playMilestoneSound();
        break;
      }
    }
  }, [minutesLeft]);

  const dismissMilestone = useCallback(() => setActiveMilestone(null), []);

  return { activeMilestone, dismissMilestone };
}
