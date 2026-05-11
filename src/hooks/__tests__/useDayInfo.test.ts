import { renderHook } from '@testing-library/react';
import { useDayInfo } from '../useDayInfo';

describe('useDayInfo', () => {
  let getSpy: jest.SpyInstance;

  // Spy on URLSearchParams.prototype.get to avoid touching window.location
  // (jsdom marks window.location as non-configurable).
  function mockParams(mode: string | null, week: string | null) {
    getSpy = jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key: string) => {
      if (key === 'mode') return mode;
      if (key === 'week') return week;
      return null;
    });
  }

  afterEach(() => {
    getSpy?.mockRestore();
  });

  it('returns a DayInfo object with the correct shape', () => {
    mockParams(null, null);
    const { result } = renderHook(() => useDayInfo());
    const info = result.current;
    expect(typeof info.isSchoolDay).toBe('boolean');
    expect(typeof info.isWorkDay).toBe('boolean');
    expect(typeof info.isWeekend).toBe('boolean');
    expect(typeof info.isEvenWeek).toBe('boolean');
    expect(typeof info.weekNumber).toBe('number');
    expect(typeof info.dayOfWeek).toBe('number');
    expect(typeof info.debugMode).toBe('boolean');
  });

  it('sets debugMode to true when ?mode param is present', () => {
    mockParams('work', null);
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.debugMode).toBe(true);
  });

  it('forces isWorkDay via ?mode=work', () => {
    mockParams('work', null);
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.isWorkDay).toBe(true);
    expect(result.current.isSchoolDay).toBe(false);
    expect(result.current.isWeekend).toBe(false);
  });

  it('forces isSchoolDay via ?mode=school', () => {
    mockParams('school', null);
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.isSchoolDay).toBe(true);
    expect(result.current.isWorkDay).toBe(false);
    expect(result.current.isWeekend).toBe(false);
  });

  it('forces isWeekend via ?mode=weekend', () => {
    mockParams('weekend', null);
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.isWeekend).toBe(true);
    expect(result.current.isWorkDay).toBe(false);
    expect(result.current.isSchoolDay).toBe(false);
  });

  it('forces even week via ?week=even', () => {
    mockParams(null, 'even');
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.isEvenWeek).toBe(true);
  });

  it('forces odd week via ?week=odd', () => {
    mockParams(null, 'odd');
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.isEvenWeek).toBe(false);
  });

  it('dayOfWeek is between 0 and 6', () => {
    mockParams(null, null);
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.dayOfWeek).toBeGreaterThanOrEqual(0);
    expect(result.current.dayOfWeek).toBeLessThanOrEqual(6);
  });

  it('debugMode is false when no params are present', () => {
    mockParams(null, null);
    const { result } = renderHook(() => useDayInfo());
    expect(result.current.debugMode).toBe(false);
  });
});
