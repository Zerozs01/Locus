import { useEffect } from 'react';

const CSV_KEY = 'locus_weather_aqi_csv_db';

export interface WeatherRecord {
  id: string; // provinceId or regionId
  date: string; // YYYY-MM-DD
  temperature: number;
  aqi: number;
}

const normalizeId = (id: string) => {
  let dbId = id.toLowerCase().replace(/[^a-z]/g, '');
  if (dbId === 'bangkokmetropolis') dbId = 'bangkok';
  if (dbId === 'phranakhonsiayutthaya') dbId = 'ayutthaya';
  return dbId;
};

const initDB = () => {
  if (!localStorage.getItem(CSV_KEY)) {
    localStorage.setItem(CSV_KEY, 'id,date,temperature,aqi\n');
  }
};

export const getRecords = (): WeatherRecord[] => {
  initDB();
  const csv = localStorage.getItem(CSV_KEY) || '';
  const lines = csv.split('\n').filter(l => l.trim() !== '' && !l.startsWith('id'));
  return lines.map(line => {
    const [id, date, temperature, aqi] = line.split(',');
    return {
      id: normalizeId(id),
      date,
      temperature: parseFloat(temperature),
      aqi: parseInt(aqi, 10)
    };
  });
};

export const saveRecord = (record: WeatherRecord) => {
  initDB();
  const csv = localStorage.getItem(CSV_KEY) || '';
  const nid = normalizeId(record.id);
  const newLine = `${nid},${record.date},${record.temperature},${record.aqi}`;
  
  // if exists, replace it
  const lines = csv.split('\n');
  const index = lines.findIndex(l => l.startsWith(`${nid},${record.date},`));
  if (index >= 0) {
    lines[index] = newLine;
    localStorage.setItem(CSV_KEY, lines.join('\n'));
  } else {
    localStorage.setItem(CSV_KEY, csv + (csv.endsWith('\n') ? '' : '\n') + newLine + '\n');
  }
};

/**
 * Mock generator is now a NO-OP.
 * Real data comes from AQI/Weather sync via OpenWeather or AQICN APIs.
 * Keeping the function signature so existing callers don't break.
 */
export const useMockCSVGenerator = (_regionProvinces: {id: string, name: string}[]) => {
  useEffect(() => {
    // Intentionally empty — mock data generation disabled.
    // Real-time AQI/temp data is synced via the AQI Modal and Weather Modal.
  }, []);
};
