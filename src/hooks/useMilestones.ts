import { useState, useEffect, useRef, useCallback } from 'react';
import type { MilestoneData } from '../types';
import { playMilestoneSound } from '../utils/audio';

const MILESTONES: MilestoneData[] = [
  { time: 60, emoji: '⏰', text: '1 HOUR LEFT!',   subtext: 'The final countdown begins!' },
  { time: 30, emoji: '⚡', text: '30 MINUTES!',    subtext: 'You can almost taste it!' },
  { time: 15, emoji: '🔥', text: '15 MINUTES!',    subtext: 'FREEDOM IS NEAR!' },
  { time: 5,  emoji: '💨', text: '5 MINUTES!',     subtext: 'START PACKING!' },
  { time: 1,  emoji: '🚀', text: '1 MINUTE!',      subtext: 'READY... SET...' },
];

function initTriggered(): Set<string> {
  const today = new Date().toDateString();
  const lastReset = localStorage.getItem('lastMilestoneReset');
  if (lastReset !== today) {
    localStorage.setItem('milestonesTriggered', '[]');
    localStorage.setItem('lastMilestoneReset', today);
    return new Set<string>();
  }
  return new Set<string>(JSON.parse(localStorage.getItem('milestonesTriggered') || '[]'));
}

interface UseMilestonesResult {
  activeMilestone: MilestoneData | null;
  dismissMilestone: () => void;
}

export function useMilestones(minutesLeft: number, soundEnabled: boolean): UseMilestonesResult {
  const triggeredRef = useRef<Set<string>>(null);
  if (!triggeredRef.current) {
    triggeredRef.current = initTriggered();
  }

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
        localStorage.setItem('milestonesTriggered', JSON.stringify([...triggeredRef.current!]));
        setActiveMilestone(milestone);
        if (soundEnabledRef.current) playMilestoneSound();
        break;
      }
    }
  }, [minutesLeft]);

  const dismissMilestone = useCallback(() => setActiveMilestone(null), []);

  return { activeMilestone, dismissMilestone };
}
