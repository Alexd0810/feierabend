import { useState, useEffect, useCallback } from 'react';
import type { TimetableData } from '../types';
import { deduplicateLessons } from '../utils/lessons';

const API_URL = 'https://backenduntis.onrender.com/api/timetable';

interface UseTimetableResult {
  data: TimetableData | null;
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

export function useTimetable(): UseTimetableResult {
  const [data, setData] = useState<TimetableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(API_URL);
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
    const id = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
