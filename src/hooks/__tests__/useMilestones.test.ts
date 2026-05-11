import { renderHook, act } from '@testing-library/react';
import { useMilestones } from '../useMilestones';

jest.mock('../../utils/audio', () => ({
  playMilestoneSound: jest.fn(),
}));

import { playMilestoneSound } from '../../utils/audio';

const TODAY = new Date().toDateString();

describe('useMilestones', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('starts with no active milestone', () => {
    const { result } = renderHook(() => useMilestones(120, false));
    expect(result.current.activeMilestone).toBeNull();
  });

  it('fires the 60-minute milestone when minutesLeft equals 60', () => {
    const { result } = renderHook(() => useMilestones(60, false));
    expect(result.current.activeMilestone).not.toBeNull();
    expect(result.current.activeMilestone?.time).toBe(60);
  });

  it('fires the 5-minute milestone when minutesLeft equals 5', () => {
    const { result } = renderHook(() => useMilestones(5, false));
    expect(result.current.activeMilestone?.time).toBe(5);
  });

  it('does not fire a milestone below the threshold window', () => {
    // minutesLeft=59 should not fire the 60-min milestone
    const { result } = renderHook(() => useMilestones(59, false));
    expect(result.current.activeMilestone).toBeNull();
  });

  it('plays sound when soundEnabled is true', () => {
    renderHook(() => useMilestones(60, true));
    expect(playMilestoneSound).toHaveBeenCalledTimes(1);
  });

  it('does not play sound when soundEnabled is false', () => {
    renderHook(() => useMilestones(60, false));
    expect(playMilestoneSound).not.toHaveBeenCalled();
  });

  it('dismissMilestone sets activeMilestone to null', () => {
    const { result } = renderHook(() => useMilestones(60, false));
    expect(result.current.activeMilestone).not.toBeNull();

    act(() => {
      result.current.dismissMilestone();
    });

    expect(result.current.activeMilestone).toBeNull();
  });

  it('does not re-fire a milestone that has already been triggered today', () => {
    const triggeredKey = 'milestone_60';
    localStorage.setItem('milestonesTriggered', JSON.stringify([triggeredKey]));
    localStorage.setItem('lastMilestoneReset', TODAY);

    const { result } = renderHook(() => useMilestones(60, false));
    expect(result.current.activeMilestone).toBeNull();
  });

  it('resets triggered milestones when the stored date is yesterday', () => {
    localStorage.setItem('milestonesTriggered', JSON.stringify(['milestone_60']));
    localStorage.setItem('lastMilestoneReset', 'Mon Jan 01 2024');

    const { result } = renderHook(() => useMilestones(60, false));
    expect(result.current.activeMilestone).not.toBeNull();
  });
});
