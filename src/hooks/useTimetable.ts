import { useState, useEffect, useCallback } from 'react';
import type { TimetableData } from '../types';
import { deduplicateLessons } from '../utils/lessons';
import { TIMETABLE_API_URL, TIMETABLE_REFETCH_INTERVAL_MS } from '../config';

/** Return value of {@link useTimetable}. */
export interface UseTimetableResult {
  /** The most recently fetched timetable, or `null` while loading. */
  data: TimetableData | null;
  /** `true` while an initial or manual fetch is in flight. */
  loading: boolean;
  /** `true` when the most recent fetch attempt failed. */
  error: boolean;
  /** Manually triggers a fresh fetch of the timetable. */
  refetch: () => void;
}

/**
 * Fetches today's timetable from the back-end API and keeps it fresh.
 *
 * - Automatically re-fetches every {@link TIMETABLE_REFETCH_INTERVAL_MS}.
 * - Deduplicates the lesson list using {@link deduplicateLessons} before
 *   storing it in state.
 *
 * @returns Loading/error state, the timetable data, and a manual refetch
 *          callback.
 */
export function useTimetable(): UseTimetableResult {
  const [data, setData] = useState<TimetableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(TIMETABLE_API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const json = await response.json() as TimetableData;
      if (json.lessons) {
        json.lessons = deduplicateLessons(json.lessons);
      }
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, TIMETABLE_REFETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
