import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { X, Filter, Wind, RefreshCw, AlertCircle, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { getRecords, saveRecord, useMockCSVGenerator } from '../utils/csvDb';

interface AQIModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
  provinces: { id: string; name: string }[];
}

interface WeatherAqiRow {
  provinceId: string;
  date: string;
  temperature: number;
  aqi: number;
}

const normalizeProvinceId = (id: string) => {
  let normalized = id.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (normalized === 'bangkokmetropolis') normalized = 'bangkok';
  if (normalized === 'phranakhonsiayutthaya') normalized = 'ayutthaya';
  return normalized;
};

const normalizeProvinceNameKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const WEATHER_AQI_UPDATED_EVENT = 'locus:weather-aqi-updated';
const AQI_LAST_SYNC_TIMESTAMP_KEY = 'locus_aqi_last_sync_timestamp';
const AQI_AUTO_SYNC_COOLDOWN_MS = 24 * 60 * 60 * 1000;

const toWeatherRows = (rows: any[]): WeatherAqiRow[] => {
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((row) => row && typeof row.provinceId === 'string')
    .map((row) => ({
      provinceId: normalizeProvinceId(row.provinceId),
      date: typeof row.date === 'string' ? row.date : '',
      temperature: Number(row.temperature),
      aqi: Number(row.aqi)
    }));
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { label: 'Good', color: '#38bdf8', bg: 'bg-sky-500/10' };
  if (aqi <= 100) return { label: 'Moderate', color: '#4ade80', bg: 'bg-emerald-500/10' };
  if (aqi <= 200) return { label: 'Unhealthy (Sensitive)', color: '#facc15', bg: 'bg-amber-500/10' };
  if (aqi <= 300) return { label: 'Unhealthy', color: '#fb923c', bg: 'bg-orange-500/10' };
  return { label: 'Hazardous', color: '#ef4444', bg: 'bg-red-500/10' };
};

export const AQIModal = ({ isOpen, onClose, regionName, provinces }: AQIModalProps) => {
  useMockCSVGenerator(provinces.map(p => ({ id: p.id, name: p.name })));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [aqiProvider, setAqiProvider] = useState<'openweather' | 'aqicn'>('openweather');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string>(() => localStorage.getItem('locus_aqi_last_sync') || 'Never');
  const [syncCount, setSyncCount] = useState(0);
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string }>>([]);
  const [weatherRows, setWeatherRows] = useState<WeatherAqiRow[]>([]);
  const hasAutoSynced = useRef(false);

  const loadWeatherRows = useCallback(async () => {
    const api = (window as any).api;

    try {
      if (api?.db?.getWeatherAqi) {
        const dbRows = await api.db.getWeatherAqi();
        const normalizedRows = toWeatherRows(dbRows);
        if (normalizedRows.length > 0) {
          setWeatherRows(normalizedRows);
          return;
        }
      }
    } catch (error) {
      console.warn('[AQI Modal] Failed loading weather rows from DB, fallback to csvDb', error);
    }

    const fallbackRows = getRecords().map((row) => ({
      provinceId: normalizeProvinceId(row.id),
      date: row.date,
      temperature: row.temperature,
      aqi: row.aqi
    }));
    setWeatherRows(fallbackRows);
  }, []);

  const provinceIdByName = useMemo(() => {
    const map = new Map<string, string>();
    provinceIndex.forEach((province) => {
      const id = normalizeProvinceId(province.id);
      map.set(province.name.toLowerCase(), id);
      map.set(normalizeProvinceNameKey(province.name), id);
    });
    return map;
  }, [provinceIndex]);

  const resolvedProvinces = useMemo(() => {
    const deduped = new Map<string, { id: string; name: string }>();

    provinces.forEach((province) => {
      const canonicalId =
        provinceIdByName.get(province.name.toLowerCase()) ||
        provinceIdByName.get(normalizeProvinceNameKey(province.name)) ||
        normalizeProvinceId(province.id);

      if (!deduped.has(canonicalId)) {
        deduped.set(canonicalId, {
          id: canonicalId,
          name: province.name
        });
      }
    });

    return Array.from(deduped.values());
  }, [provinceIdByName, provinces]);

  const latestTempByProvince = useMemo(() => {
    const grouped = new Map<string, Array<{ date: string; temperature: number }>>();

    weatherRows.forEach((row) => {
      if (!Number.isFinite(row.temperature)) return;
      const records = grouped.get(row.provinceId) || [];
      records.push({ date: row.date, temperature: row.temperature });
      grouped.set(row.provinceId, records);
    });

    const map = new Map<string, number>();
    grouped.forEach((records, provinceId) => {
      const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
      if (sorted[0]) map.set(provinceId, sorted[0].temperature);
    });

    return map;
  }, [weatherRows]);

  useEffect(() => {
    if (isOpen) {
      if (window.api?.config?.get) {
        window.api.config.get().then((conf: any) => {
          const provider = conf?.aqi_provider || 'openweather';
          setAqiProvider(provider as any);
          if (provider === 'aqicn' && conf?.aqicn) {
            setApiKey(conf.aqicn);
          } else if (conf?.openweather) {
            setApiKey(conf.openweather);
          }
        }).catch(console.error);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const api = (window as any).api;
    let cancelled = false;

    const hydrate = async () => {
      try {
        if (api?.db?.getProvinceIndex) {
          const indexRows = await api.db.getProvinceIndex();
          if (!cancelled && Array.isArray(indexRows)) {
            setProvinceIndex(indexRows.map((row: any) => ({ id: String(row.id), name: String(row.name) })));
          }
        }
      } catch (error) {
        console.warn('[AQI Modal] Failed loading province index', error);
      }

      if (!cancelled) {
        await loadWeatherRows();
      }
    };

    const onWeatherUpdated = () => {
      void loadWeatherRows();
    };

    hydrate();
    window.addEventListener(WEATHER_AQI_UPDATED_EVENT, onWeatherUpdated as EventListener);

    return () => {
      cancelled = true;
      window.removeEventListener(WEATHER_AQI_UPDATED_EVENT, onWeatherUpdated as EventListener);
    };
  }, [isOpen, loadWeatherRows]);

  const handleSync = async () => {
    setIsSyncing(true);
    if (apiKey) {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const syncedRows: WeatherAqiRow[] = [];

        console.log(`[AQI Modal] Syncing ${resolvedProvinces.length} provinces using ${aqiProvider}...`);
        for (const prov of resolvedProvinces) {
          try {
            const cleanName = prov.name.replace(' Metropolis', '').replace(' (Pattaya)', '').trim();
            console.log(`[AQI Modal] Fetching for ${cleanName} (${prov.id})...`);
            
            let aqiVal = 50;
            let success = false;
            let resolvedTemp = latestTempByProvince.get(prov.id);
            const existingTodayTemp = weatherRows.find(
              (row) => row.provinceId === prov.id && row.date === todayStr && Number.isFinite(row.temperature)
            )?.temperature;
            if (Number.isFinite(existingTodayTemp)) {
              resolvedTemp = existingTodayTemp;
            }
            
            if (aqiProvider === 'aqicn') {
              const res = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(cleanName)}/?token=${apiKey}`);
              const data = await res.json();
              if (data.status === 'ok' && data.data?.aqi && !isNaN(Number(data.data.aqi))) {
                aqiVal = Number(data.data.aqi);
                const aqicnTemp = Number(data?.data?.iaqi?.t?.v);
                if (!Number.isFinite(resolvedTemp) && Number.isFinite(aqicnTemp)) {
                  resolvedTemp = aqicnTemp;
                }
                success = true;
                console.log(`[AQI Modal] AQICN ${prov.id} => AQI=${aqiVal}`);
              } else {
                console.warn(`[AQI Modal] AQICN failed for ${cleanName}:`, data.data);
              }
            } else {
              // OpenWeather fallback
              const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanName)},th&limit=1&appid=${apiKey}`);
              const geoData = await geoRes.json();
              let lat = 13.75, lon = 100.5;
              if (geoData && geoData.length > 0) { lat = geoData[0].lat; lon = geoData[0].lon; }

              const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
              const aqiData = await aqiRes.json();
              if (aqiData && aqiData.list && aqiData.list[0]) {
                const pm25 = aqiData.list[0].components.pm2_5;
                if (pm25 != null) {
                  if (pm25 <= 12.0) aqiVal = Math.round((50 / 12) * pm25);
                  else if (pm25 <= 35.4) aqiVal = Math.round(((49) / 23.4) * (pm25 - 12) + 51);
                  else if (pm25 <= 55.4) aqiVal = Math.round(((49) / 20) * (pm25 - 35.5) + 101);
                  else if (pm25 <= 150.4) aqiVal = Math.round(((49) / 95) * (pm25 - 55.5) + 151);
                  else if (pm25 <= 250.4) aqiVal = Math.round(((99) / 100) * (pm25 - 150.5) + 201);
                  else aqiVal = Math.round(((199) / 249.5) * (pm25 - 250.5) + 301);
                }
                success = true;
                console.log(`[AQI Modal] OpenWeather ${prov.id} => PM2.5=${pm25}, AQI=${aqiVal}`);
              }

              if (!Number.isFinite(resolvedTemp)) {
                const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
                const weatherData = await weatherRes.json();
                const fetchedTemp = Number(weatherData?.main?.temp);
                if (Number.isFinite(fetchedTemp)) {
                  resolvedTemp = fetchedTemp;
                }
              }
            }

            if (success) {
              const temperatureToStore = Number.isFinite(resolvedTemp) ? Number(resolvedTemp) : 30;

              saveRecord({
                id: prov.id,
                date: todayStr,
                temperature: temperatureToStore,
                aqi: aqiVal,
              });

              syncedRows.push({
                provinceId: prov.id,
                date: todayStr,
                temperature: temperatureToStore,
                aqi: aqiVal
              });
            }
          } catch (e) {
            console.error(`[AQI Modal] Failed for ${prov.name}`, e);
          }
          await new Promise(r => setTimeout(r, aqiProvider === 'aqicn' ? 1000 : 250)); // AQICN rate limit is generous but 1 req/s is safe, OpenWeather is 60/min
        }
        console.log('[AQI Modal] Sync complete.');
        
        // Persist all csvDb records to SQLite for cross-page access
        try {
          const api = (window as any).api;
          if (api?.db?.saveWeatherAqi && syncedRows.length > 0) {
            await api.db.saveWeatherAqi(syncedRows);
            console.log(`[AQI Modal] Persisted ${syncedRows.length} records to SQLite DB.`);
          }
        } catch (dbErr) {
          console.warn('[AQI Modal] Failed to persist to DB:', dbErr);
        }

        await loadWeatherRows();
        window.dispatchEvent(new CustomEvent(WEATHER_AQI_UPDATED_EVENT, { detail: { source: 'aqi-modal' } }));

      } catch (e) {
        console.error('[AQI Modal] Batch sync failed', e);
      }
    } else {
      await new Promise(r => setTimeout(r, 1500));
    }
    const nowTs = Date.now();
    const newSync = new Date(nowTs).toLocaleString('th-TH');
    localStorage.setItem('locus_aqi_last_sync', newSync);
    localStorage.setItem(AQI_LAST_SYNC_TIMESTAMP_KEY, String(nowTs));
    setLastSync(newSync);
    setSyncCount(c => c + 1);
    setIsSyncing(false);
  };

  useEffect(() => {
    if (isOpen && apiKey && !hasAutoSynced.current && resolvedProvinces.length > 0) {
      hasAutoSynced.current = true;

      const lastSyncTs = Number(localStorage.getItem(AQI_LAST_SYNC_TIMESTAMP_KEY) || 0);
      const nowTs = Date.now();
      if (lastSyncTs > 0 && nowTs - lastSyncTs < AQI_AUTO_SYNC_COOLDOWN_MS) {
        const remainingHours = ((AQI_AUTO_SYNC_COOLDOWN_MS - (nowTs - lastSyncTs)) / 3600000).toFixed(1);
        console.log(`[AQI Modal] Auto-sync skipped: cooldown active (${remainingHours}h remaining).`);
        return;
      }
      
      const todayStr = new Date().toISOString().split('T')[0];
      // Check if we already have records for all provinces in this region for today
      const alreadySyncedToday = resolvedProvinces.every((province) =>
        weatherRows.some(
          (row) => row.provinceId === province.id && row.date === todayStr && Number.isFinite(row.aqi)
        )
      );
      
      if (!alreadySyncedToday) {
        handleSync();
      } else {
        console.log('[AQI Modal] Data already synced today, skipping auto-sync.');
      }
    }
  }, [apiKey, isOpen, resolvedProvinces, weatherRows]);

  useEffect(() => {
    if (!isOpen) hasAutoSynced.current = false;
  }, [isOpen]);

  // === Today's per-province AQI ===
  const aqiDataList = useMemo(() => {
    if (!isOpen) return [];

    const groupedByProvince = new Map<string, Array<{ date: string; temperature: number; aqi: number }>>();
    weatherRows.forEach((row) => {
      if (!Number.isFinite(row.aqi)) return;
      const records = groupedByProvince.get(row.provinceId) || [];
      records.push({ date: row.date, temperature: row.temperature, aqi: row.aqi });
      groupedByProvince.set(row.provinceId, records);
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const data = resolvedProvinces.map((province) => {
      const records = groupedByProvince.get(province.id) || [];
      const todayRecord = records.find((record) => record.date === todayStr);
      const latestRecord = [...records].sort((a, b) => b.date.localeCompare(a.date))[0];
      const resolved = todayRecord || latestRecord;
      const aqi = resolved && Number.isFinite(resolved.aqi) ? Math.round(resolved.aqi) : 50;

      return {
        ...province,
        aqi,
        level: getAQILevel(aqi)
      };
    });

    return data.sort((a, b) => b.aqi - a.aqi);
  }, [isOpen, resolvedProvinces, syncCount, weatherRows]);

  // === Region Summary: avg, worst, best, 7-day trend ===
  const regionSummary = useMemo(() => {
    if (!isOpen || aqiDataList.length === 0) return null;
    const provIds = new Set(resolvedProvinces.map((province) => province.id));
    const today = new Date();

    // Today's stats
    const todayAqis = aqiDataList.map(d => d.aqi);
    const avg = Math.round(todayAqis.reduce((a, b) => a + b, 0) / todayAqis.length);
    const worst = aqiDataList[0];
    const best = aqiDataList[aqiDataList.length - 1];

    // 7-day trend (past 6 days + today)
    const trend: { date: string; displayDate: string; avg: number; isToday: boolean }[] = [];
    for (let i = -6; i <= 0; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayRecs = weatherRows.filter(
        (row) => provIds.has(row.provinceId) && row.date === dateStr && Number.isFinite(row.aqi)
      );
      const dayAvg = dayRecs.length > 0
        ? Math.round(dayRecs.reduce((sum, r) => sum + r.aqi, 0) / dayRecs.length)
        : 0;
      trend.push({
        date: dateStr,
        displayDate: `${d.getDate()}/${d.getMonth() + 1}`,
        avg: dayAvg,
        isToday: i === 0,
      });
    }
    return { avg, worst, best, trend, avgLevel: getAQILevel(avg) };
  }, [isOpen, aqiDataList, resolvedProvinces, syncCount, weatherRows]);

  const filteredData = useMemo(() => {
    if (!activeFilter) return aqiDataList;
    return aqiDataList.filter(d => {
      if (activeFilter === 'good') return d.aqi <= 50;
      if (activeFilter === 'moderate') return d.aqi > 50 && d.aqi <= 100;
      if (activeFilter === 'unhealthy+') return d.aqi > 100;
      return true;
    });
  }, [aqiDataList, activeFilter]);

  console.log('[AQI Modal Render] isOpen:', isOpen, 'provinces:', provinces, 'aqiDataList:', aqiDataList);

  if (!isOpen) return null;

  const trendMax = regionSummary ? Math.max(...regionSummary.trend.map(t => t.avg), 1) : 1;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f1115] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Wind size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Air Quality (PM2.5)</h2>
              <p className="text-sm text-slate-400">AQI Overview — {regionName} Region</p>
            </div>
          </div>
          <button title="ปิดหน้าต่าง" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Sync Status */}
        <div className={`px-5 py-2.5 border-b flex items-center justify-between ${apiKey ? 'bg-emerald-950/30 border-emerald-900/40' : 'bg-cyan-950/30 border-cyan-900/40'}`}>
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className={apiKey ? 'text-emerald-500' : 'text-cyan-500'} />
            <span className={`text-xs ${apiKey ? 'text-emerald-200/90' : 'text-cyan-200/70'}`}>
              {apiKey ? `Real Data Mode (${aqiProvider === 'aqicn' ? 'AQICN' : 'OpenWeather'}).` : 'Mock Data Mode.'} Last sync: <span className="text-white font-mono">{lastSync}</span>
            </span>
          </div>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 py-1 rounded bg-black/40 text-[10px] font-bold border transition-colors ${isSyncing ? 'text-slate-500 border-white/5 cursor-not-allowed' : 'text-white border-white/10 hover:bg-white/10'}`}
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>

        {/* === Region Summary === */}
        {regionSummary && (
          <div className="p-4 border-b border-white/5">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Average */}
              <div className={`rounded-xl p-3 border ${regionSummary.avgLevel.bg} border-white/5`}>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1"><BarChart3 size={10} /> Regional Avg</div>
                <div className="text-2xl font-black" style={{ color: regionSummary.avgLevel.color }}>{regionSummary.avg}</div>
                <div className="text-[10px] mt-0.5" style={{ color: regionSummary.avgLevel.color }}>{regionSummary.avgLevel.label}</div>
              </div>
              {/* Worst */}
              <div className="rounded-xl p-3 border bg-red-500/5 border-white/5">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1"><TrendingUp size={10} /> Worst (Today)</div>
                <div className="text-lg font-black text-red-400">{regionSummary.worst.aqi}</div>
                <div className="text-[10px] text-red-400/80 truncate">{regionSummary.worst.name}</div>
              </div>
              {/* Best */}
              <div className="rounded-xl p-3 border bg-emerald-500/5 border-white/5">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1"><TrendingDown size={10} /> Best (Today)</div>
                <div className="text-lg font-black text-emerald-400">{regionSummary.best.aqi}</div>
                <div className="text-[10px] text-emerald-400/80 truncate">{regionSummary.best.name}</div>
              </div>
            </div>

            {/* 7-Day Trend */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">7-Day Regional AQI Trend</div>
              <div className="flex items-end gap-1 h-[60px]">
                {regionSummary.trend.map((t, i) => {
                  const heightPct = trendMax > 0 ? (t.avg / trendMax) * 100 : 0;
                  const level = getAQILevel(t.avg);
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group relative">
                      <div className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold whitespace-nowrap" style={{ color: level.color }}>
                        {t.avg}
                      </div>
                      <div
                        className={`w-full rounded-t-sm transition-all duration-500 ${t.isToday ? 'border-t-2' : ''}`}
                        style={{
                          height: `${Math.max(heightPct, 4)}%`,
                          backgroundColor: level.color + '60',
                          borderColor: t.isToday ? level.color : 'transparent',
                        }}
                      />
                      <div className={`text-[8px] mt-1 ${t.isToday ? 'font-bold text-white' : 'text-slate-500'}`}>
                        {t.displayDate}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="p-4 border-b border-white/5 flex gap-2 overflow-x-auto">
          <span className="flex items-center gap-1 text-sm text-slate-400 mr-2"><Filter size={14} /> Filter:</span>
          <button onClick={() => setActiveFilter(null)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${!activeFilter ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>All ({aqiDataList.length})</button>
          <button onClick={() => setActiveFilter('good')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeFilter === 'good' ? 'bg-[#38bdf8] text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Good (0-50)</button>
          <button onClick={() => setActiveFilter('moderate')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeFilter === 'moderate' ? 'bg-[#4ade80] text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Moderate (51-100)</button>
          <button onClick={() => setActiveFilter('unhealthy+')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeFilter === 'unhealthy+' ? 'bg-[#facc15] text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Unhealthy (101+)</button>
        </div>

        {/* Per Province Bars */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          <div className="space-y-3">
            {filteredData.map((item, idx) => (
              <div key={item.id} className="flex flex-col gap-1.5 group">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                    <span className="text-xs text-slate-500 mr-1.5">{idx + 1}.</span>{item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ color: item.level.color, backgroundColor: item.level.color + '15' }}>{item.level.label}</span>
                    <span className="font-black w-10 text-right font-mono" style={{ color: item.level.color }}>{item.aqi}</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(100, (item.aqi / 300) * 100)}%`, backgroundColor: item.level.color }}
                  />
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center py-10 text-slate-400">No provinces match this AQI level.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
