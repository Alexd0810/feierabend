import { renderHook, act } from '@testing-library/react';
import { useSound } from '../useSound';

describe('useSound', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to false when localStorage has no value', () => {
    const { result } = renderHook(() => useSound());
    expect(result.current.soundEnabled).toBe(false);
  });

  it('reads initial value from localStorage', () => {
    localStorage.setItem('soundEnabled', 'true');
    const { result } = renderHook(() => useSound());
    expect(result.current.soundEnabled).toBe(true);
  });

  it('toggles sound on and updates localStorage', () => {
    const { result } = renderHook(() => useSound());
    expect(result.current.soundEnabled).toBe(false);

    act(() => { result.current.toggleSound(); });
    expect(result.current.soundEnabled).toBe(true);
    expect(localStorage.getItem('soundEnabled')).toBe('true');
  });

  it('toggles sound off and updates localStorage', () => {
    localStorage.setItem('soundEnabled', 'true');
    const { result } = renderHook(() => useSound());

    act(() => { result.current.toggleSound(); });
    expect(result.current.soundEnabled).toBe(false);
    expect(localStorage.getItem('soundEnabled')).toBe('false');
  });

  it('returns a stable toggleSound reference across renders', () => {
    const { result, rerender } = renderHook(() => useSound());
    const first = result.current.toggleSound;
    rerender();
    expect(result.current.toggleSound).toBe(first);
  });
});
