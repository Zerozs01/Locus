import { useEffect } from 'react';

const CSV_KEY = 'locus_weather_aqi_csv_db';

export interface WeatherRecord {
  id: string; // provinceId or regionId
  date: string; // YYYY-MM-DD
  temperature: number;
  aqi: number;
}

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
      id,
      date,
      temperature: parseFloat(temperature),
      aqi: parseInt(aqi, 10)
    };
  });
};

export const saveRecord = (record: WeatherRecord) => {
  initDB();
  const csv = localStorage.getItem(CSV_KEY) || '';
  const newLine = `${record.id},${record.date},${record.temperature},${record.aqi}`;
  
  // if exists, replace it
  const lines = csv.split('\n');
  const index = lines.findIndex(l => l.startsWith(`${record.id},${record.date},`));
  if (index >= 0) {
    lines[index] = newLine;
    localStorage.setItem(CSV_KEY, lines.join('\n'));
  } else {
    localStorage.setItem(CSV_KEY, csv + (csv.endsWith('\n') ? '' : '\n') + newLine + '\n');
  }
};

// Generate some mock defaults for demo if empty
export const useMockCSVGenerator = (regionProvinces: {id: string, name: string}[]) => {
  useEffect(() => {
    initDB();
    const records = getRecords();
    if (records.length < 10 && regionProvinces.length > 0) {
      // Create mock data
      const today = new Date();
      // Ensure we don't duplicate logic for provinces that already have records
      const existingIds = new Set(records.map(r => r.id));
      
      regionProvinces.forEach(prov => {
        if (existingIds.has(prov.id)) return;

        // mock 7 days past and 7 days future
        for (let i = -7; i <= 7; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          
          saveRecord({
            id: prov.id,
            date: dateStr,
            temperature: 28 + Math.random() * 10,
            aqi: 20 + Math.random() * 150
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionProvinces.map(p => p.id).join(',')]);
};
