export type TravelPlanTask = {
  id: string;
  title: string;
  detail: string;
  when: string;
  date: string;
  category: string;
  completed: boolean;
};

export type TravelPlanHistoryEntry = {
  id: string;
  createdAt: string;
  type: 'checklist-toggle' | 'draft-saved';
  title: string;
  detail: string;
  when: string;
  date: string;
  category: string;
  completed: boolean;
};

export type TravelPlanSnapshot = {
  updatedAt: string;
  items: TravelPlanTask[];
};

const HISTORY_KEY = 'locus_travel_plan_history';
const SNAPSHOT_KEY = 'locus_travel_plan_snapshot';

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const loadTravelPlanHistory = (): TravelPlanHistoryEntry[] => {
  const history = readJson<TravelPlanHistoryEntry[]>(HISTORY_KEY, []);
  return Array.isArray(history) ? history : [];
};

export const appendTravelPlanHistory = (entry: Omit<TravelPlanHistoryEntry, 'id' | 'createdAt'>) => {
  const nextEntry: TravelPlanHistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const nextHistory = [nextEntry, ...loadTravelPlanHistory()].slice(0, 200);
  writeJson(HISTORY_KEY, nextHistory);
  return nextEntry;
};

export const loadTravelPlanSnapshot = (): TravelPlanSnapshot | null => {
  const snapshot = readJson<TravelPlanSnapshot | null>(SNAPSHOT_KEY, null);
  return snapshot && Array.isArray(snapshot.items) ? snapshot : null;
};

export const saveTravelPlanSnapshot = (items: TravelPlanTask[]) => {
  writeJson(SNAPSHOT_KEY, {
    updatedAt: new Date().toISOString(),
    items,
  } satisfies TravelPlanSnapshot);
};

export const formatTravelPlanDate = (isoDate: string) => {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
