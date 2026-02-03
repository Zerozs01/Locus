let perfId = 0;

export const measureAsync = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
  if (!import.meta.env.DEV) return fn();
  if (typeof performance?.mark !== 'function' || typeof performance?.measure !== 'function') return fn();

  const id = perfId++;
  const start = `${label}:start:${id}`;
  const end = `${label}:end:${id}`;
  const measureName = `${label}#${id}`;

  try {
    performance.mark(start);
  } catch {
    return fn();
  }

  try {
    return await fn();
  } finally {
    try {
      performance.mark(end);
      performance.measure(measureName, start, end);
      const entries = performance.getEntriesByName(measureName);
      const last = entries[entries.length - 1];
      if (last) {
        console.info(`[perf] ${label}: ${last.duration.toFixed(1)}ms`);
      }
      performance.clearMarks(start);
      performance.clearMarks(end);
      performance.clearMeasures(measureName);
    } catch {
      // Ignore performance API errors in dev
    }
  }
};
