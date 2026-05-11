import { renderHook, waitFor } from '@testing-library/react';
import { useTimetable } from '../useTimetable';

const MOCK_RESPONSE = {
  lessons: [
    { subject: 'Math', room: '101', startMin: 480, endMin: 570, cancelled: false },
    { subject: 'Math', room: '101', startMin: 480, endMin: 570, cancelled: false }, // duplicate
  ],
};

describe('useTimetable', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('starts in loading state', () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_RESPONSE,
    } as Response);

    const { result } = renderHook(() => useTimetable());
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(false);
  });

  it('sets data and clears loading on successful fetch', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_RESPONSE,
    } as Response);

    const { result } = renderHook(() => useTimetable());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).not.toBeNull();
    expect(result.current.error).toBe(false);
  });

  it('deduplicates lessons from the API response', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_RESPONSE,
    } as Response);

    const { result } = renderHook(() => useTimetable());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Two identical lessons → deduplicated to one
    expect(result.current.data?.lessons).toHaveLength(1);
  });

  it('sets error state when fetch fails', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('network error'));

    const { result } = renderHook(() => useTimetable());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('sets error state when response is not ok', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useTimetable());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
  });

  it('exposes a refetch function', () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_RESPONSE,
    } as Response);

    const { result } = renderHook(() => useTimetable());
    expect(typeof result.current.refetch).toBe('function');
  });
});
