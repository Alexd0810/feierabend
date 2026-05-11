import { renderHook, act } from '@testing-library/react';
import { useTimer } from '../useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a Date instance on initial render', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current).toBeInstanceOf(Date);
  });

  it('updates the date every second', () => {
    const { result } = renderHook(() => useTimer());
    const initial = result.current.getTime();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.getTime()).toBeGreaterThanOrEqual(initial);
  });

  it('clears the interval on unmount', () => {
    const clearSpy = jest.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() => useTimer());
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
