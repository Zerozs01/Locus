/**
 * PM2.5 → AQI Conversion using US EPA breakpoints
 * https://aqicn.org/faq/2013-01-24/converting-pm2-5-into-us-aqi/
 */
export const PM25_TO_AQI_BREAKPOINTS = [
  { pmHigh: 12.0, pmLow: 0,    aqiHigh: 50,  aqiLow: 0   },
  { pmHigh: 35.4, pmLow: 12.1, aqiHigh: 100, aqiLow: 51  },
  { pmHigh: 55.4, pmLow: 35.5, aqiHigh: 150, aqiLow: 101 },
  { pmHigh: 150.4, pmLow: 55.5, aqiHigh: 200, aqiLow: 151 },
  { pmHigh: 250.4, pmLow: 150.5, aqiHigh: 300, aqiLow: 201 },
  { pmHigh: 500.4, pmLow: 250.5, aqiHigh: 500, aqiLow: 301 },
] as const;

export const pm25ToAqi = (pm25: number): number => {
  if (!Number.isFinite(pm25) || pm25 < 0) return 50; // Default to moderate

  for (const bp of PM25_TO_AQI_BREAKPOINTS) {
    if (pm25 <= bp.pmHigh) {
      return Math.round(
        ((bp.aqiHigh - bp.aqiLow) / (bp.pmHigh - bp.pmLow)) * (pm25 - bp.pmLow) + bp.aqiLow
      );
    }
  }
  // Hazardous: pm25 > 500.4
  return Math.round(
    ((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301
  );
};

/** AQI level categorization */
export type AQILevel = {
  label: string;
  color: string;
  bg: string;
  value: number;
};

export const getAqiLevel = (aqi: number): AQILevel => {
  const value = Math.round(aqi);
  if (value <= 50)  return { label: 'Good',                color: '#38bdf8', bg: 'bg-sky-500/10',       value };
  if (value <= 100) return { label: 'Moderate',            color: '#4ade80', bg: 'bg-emerald-500/10',   value };
  if (value <= 150) return { label: 'Unhealthy (Sensitive)', color: '#facc15', bg: 'bg-amber-500/10',   value };
  if (value <= 200) return { label: 'Unhealthy',           color: '#fb923c', bg: 'bg-orange-500/10',    value };
  if (value <= 300) return { label: 'Very Unhealthy',      color: '#f87171', bg: 'bg-red-500/10',       value };
  return             { label: 'Hazardous',              color: '#ef4444', bg: 'bg-red-600/20',       value };
};

export const getAqiLevelSub = (aqi: number): string => {
  const level = getAqiLevel(aqi);
  return level.label;
};

/** Sync policy constants */
export const AQI_SYNC_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
export const AQI_SYNC_TIMESTAMP_KEY = 'locus_aqi_last_sync_timestamp';
export const AQI_SYNC_LABEL_KEY = 'locus_aqi_last_sync';
export const AQI_SYNC_EVENT = 'locus:weather-aqi-updated' as const;

export const isDataStale = (regionName?: string): boolean => {
  const now = Date.now();
  const globalTs = Number(localStorage.getItem(AQI_SYNC_TIMESTAMP_KEY) || 0);
  const regionTs = regionName
    ? Number(localStorage.getItem(`${AQI_SYNC_TIMESTAMP_KEY}_${regionName}`) || 0)
    : 0;
  const lastTs = Math.max(globalTs, regionTs);
  return lastTs === 0 || now - lastTs > AQI_SYNC_COOLDOWN_MS;
};

export const saveSyncTimestamp = (regionName?: string) => {
  const nowTs = Date.now();
  const label = new Date(nowTs).toLocaleString('th-TH');
  // Always write global keys
  localStorage.setItem(AQI_SYNC_LABEL_KEY, label);
  localStorage.setItem(AQI_SYNC_TIMESTAMP_KEY, String(nowTs));
  // Also write region key if provided
  if (regionName) {
    localStorage.setItem(`${AQI_SYNC_LABEL_KEY}_${regionName}`, label);
    localStorage.setItem(`${AQI_SYNC_TIMESTAMP_KEY}_${regionName}`, String(nowTs));
  }
};

export const getLastSyncLabel = (regionName?: string): string => {
  if (regionName) {
    const regionLabel = localStorage.getItem(`${AQI_SYNC_LABEL_KEY}_${regionName}`);
    if (regionLabel && regionLabel !== 'Never') return regionLabel;
  }
  return localStorage.getItem(AQI_SYNC_LABEL_KEY) || 'Never';
};
