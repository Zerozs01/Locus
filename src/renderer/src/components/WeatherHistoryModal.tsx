import { useState, useMemo, useEffect, useRef } from 'react';
import { X, ThermometerSun, RefreshCw, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { getRecords, useMockCSVGenerator, saveRecord } from '../utils/csvDb';

const WEATHER_AQI_UPDATED_EVENT = 'locus:weather-aqi-updated';

const normalizeProvinceId = (id: string) => {
  let normalized = id.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (normalized === 'bangkokmetropolis') normalized = 'bangkok';
  if (normalized === 'phranakhonsiayutthaya') normalized = 'ayutthaya';
  return normalized;
};

const toProvinceCompareKey = (id: string) => normalizeProvinceId(id).replace(/[^a-z0-9]/g, '');

const normalizeProvinceNameKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9ก-๙]/g, '');

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface WeatherHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  provinceName: string; // Main title
  provinces: {id: string, name: string}[];
  regionId?: string;
  targetProvinceId?: string;
  chartScope?: 'region-average' | 'province';
}

export const WeatherHistoryModal = ({
  isOpen,
  onClose,
  provinceName,
  provinces,
  regionId,
  targetProvinceId,
  chartScope = 'region-average',
}: WeatherHistoryModalProps) => {
  const [activeProvinces, setActiveProvinces] = useState<{id: string, name: string}[]>([]);
  const [viewMode, setViewMode] = useState<'past' | 'future'>('future');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [apiKey, setApiKey] = useState<string>('');
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string }>>([]);
  const provinceRowRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const provinceIdByName = useMemo(() => {
    const map = new Map<string, string>();
    provinceIndex.forEach((province) => {
      const id = normalizeProvinceId(province.id);
      map.set(province.name.toLowerCase(), id);
      map.set(normalizeProvinceNameKey(province.name), id);
    });
    return map;
  }, [provinceIndex]);

  const resolvedActiveProvinces = useMemo(() => {
    const source = activeProvinces.length > 0 ? activeProvinces : provinces;
    const deduped = new Map<string, { id: string; name: string }>();

    source.forEach((province) => {
      const canonicalId =
        provinceIdByName.get(province.name.toLowerCase()) ||
        provinceIdByName.get(normalizeProvinceNameKey(province.name)) ||
        normalizeProvinceId(province.id);

      if (!deduped.has(canonicalId)) {
        deduped.set(canonicalId, { id: canonicalId, name: province.name });
      }
    });

    return Array.from(deduped.values());
  }, [activeProvinces, provinces, provinceIdByName]);

  const resolvedTargetProvinceId = useMemo(() => {
    const explicitId = normalizeProvinceId(targetProvinceId || '');
    if (explicitId) return explicitId;

    const byName = provinceIdByName.get(provinceName.toLowerCase())
      || provinceIdByName.get(normalizeProvinceNameKey(provinceName));
    if (byName) return byName;

    const fromIncomingList = provinces.find(
      (province) => normalizeProvinceNameKey(province.name) === normalizeProvinceNameKey(provinceName)
    );
    if (fromIncomingList) return normalizeProvinceId(fromIncomingList.id);

    return normalizeProvinceId(provinceName);
  }, [provinceIdByName, provinceName, provinces, targetProvinceId]);

  useEffect(() => {
    let cancelled = false;

    if (isOpen) {
      // Check config for OpenWeather API Key
      if ((window as any).api && (window as any).api.config) {
        (window as any).api.config.get().then((cfg: any) => {
          console.log('[Weather Modal] Config loaded:', cfg);
          if (cfg && cfg.openweather) {
            console.log('[Weather Modal] Found OpenWeather API Key');
            setApiKey(cfg.openweather);
          } else {
            console.log('[Weather Modal] No OpenWeather API Key found in config');
          }
        }).catch((err: any) => console.error('[Weather Modal] Config read error:', err));
      }

      if ((window as any).api?.db?.getProvinceIndex) {
        (window as any).api.db.getProvinceIndex().then((rows: any[]) => {
          if (Array.isArray(rows)) {
            setProvinceIndex(rows.map((row) => ({ id: String(row.id), name: String(row.name) })));
          }
        }).catch((err: any) => console.warn('[Weather Modal] Province index read error:', err));
      }

      const syncStr = localStorage.getItem('locus_weather_last_sync');
      if (syncStr) {
        setLastSync(syncStr);
      } else {
        const defaultTime = new Date().toLocaleString() + ' (Never)';
        setLastSync(defaultTime);
      }

      const incomingProvinces = provinces;
      setActiveProvinces(incomingProvinces);

      // Always try to hydrate full province list by region when regionId exists,
      // because some callers may provide a summarized (truncated) province array.
      if (regionId && (window as any).api?.db?.getProvincesByRegion) {
        (window as any).api.db.getProvincesByRegion(regionId).then((provs: any[]) => {
          if (cancelled || !Array.isArray(provs) || provs.length === 0) return;
          const incomingDisplayNameById = new Map<string, string>();
          incomingProvinces.forEach((province) => {
            incomingDisplayNameById.set(normalizeProvinceId(province.id), province.name);
          });

          const fetched = provs.map((p) => {
            const normalizedId = normalizeProvinceId(String(p.id));
            return {
              id: normalizedId,
              name: incomingDisplayNameById.get(normalizedId) || String(p.name),
            };
          });
          if (fetched.length >= incomingProvinces.length) {
            setActiveProvinces(fetched);
          }
        }).catch((err: any) => {
          console.warn('[Weather Modal] getProvincesByRegion failed:', err);
        });
      }
    }

    return () => {
      cancelled = true;
    };
  }, [isOpen, provinces, regionId]);

  const handleSync = async () => {
    console.log('[Weather Modal] handleSync called. apiKey exists?', !!apiKey);
    setIsSyncing(true);
    
    if (apiKey) {
      try {
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const fetchTargets = resolvedActiveProvinces;
        console.log(`[Weather Modal] Fetching data for ${fetchTargets.length} provinces.`);
        
        for (const prov of fetchTargets) {
          try {
            const cleanName = prov.name.replace(' Metropolis', '').replace(' (Pattaya)', '').trim();
            console.log(`[Weather Modal] Fetching current weather for ${cleanName}...`);
            const qStr = encodeURIComponent(`${cleanName},th`);
            const allRecordsSnapshot = getRecords();
            const latestKnownAqi = allRecordsSnapshot
              .filter(r => r.id === prov.id && Number.isFinite(r.aqi))
              .sort((a, b) => b.date.localeCompare(a.date))[0]?.aqi;
            // Fetch current weather
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${qStr}&units=metric&appid=${apiKey}`);
            const data = await res.json();
            let todayAqi: number | null = null;
            let todayDateStr = getLocalDateKey(today);
            if (data && data.main) {
               // Update today's record
              const dateStr = getLocalDateKey(today);
               todayDateStr = dateStr;
               
               let currentAqi = Number.isFinite(latestKnownAqi) ? Number(latestKnownAqi) : 50;
               // Fetch AQI using coord
               try {
                 if (data.coord && data.coord.lat && data.coord.lon) {
                   const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`);
                   const aqiData = await aqiRes.json();
                   if (aqiData && aqiData.list && aqiData.list.length > 0) {
                     // OpenWeather AQI is 1 (Good) to 5 (Very Poor). We map it roughly to US AQI value:
                     const owAqi = aqiData.list[0].main.aqi;
                     const aqiMap = { 1: 25, 2: 70, 3: 120, 4: 160, 5: 220 };
                     currentAqi = aqiMap[owAqi] || Math.round(owAqi * 40);
                   }
                 }
               } catch (ae) {
                 console.warn('[Weather Modal] Failed to fetch real AQI', ae);
               }
               todayAqi = currentAqi;

               saveRecord({
                 id: prov.id,
                 date: dateStr,
                 temperature: data.main.temp,
                 aqi: currentAqi
               });
            } else {
               console.warn(`[Weather Modal] Invalid response for current weather of ${cleanName}:`, data);
            }
            
            console.log(`[Weather Modal] Fetching 5-day forecast for ${cleanName}...`);
            // Fetch 5-day forecast (every 3h = 40 entries)
            const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${qStr}&units=metric&appid=${apiKey}`);
            if (!forecastRes.ok) {
              console.error(`[Weather Modal] forecast api responded with status ${forecastRes.status}`);
            }
            const forecastData = await forecastRes.json();
            if (forecastData && forecastData.list) {
                // Group forecast by day and get avg
                const dailyData = new Map<string, number[]>();
                forecastData.list.forEach((item: any) => {
                   const d = item.dt_txt.split(' ')[0]; // yyyy-mm-dd
                   if (!dailyData.has(d)) dailyData.set(d, []);
                   dailyData.get(d)?.push(item.main.temp);
                });
                
                dailyData.forEach((temps, dStr) => {
                   const avgT = temps.reduce((a, b) => a + b, 0) / temps.length;
                   const existingRec = allRecordsSnapshot.find(r => r.id === prov.id && r.date === dStr);
                   const preservedAqi = dStr === todayDateStr && todayAqi !== null
                     ? todayAqi
                     : (existingRec && Number.isFinite(existingRec.aqi)
                       ? existingRec.aqi
                       : (Number.isFinite(latestKnownAqi) ? Number(latestKnownAqi) : 50));
                   saveRecord({
                     id: prov.id,
                     date: dStr,
                     temperature: avgT,
                     aqi: preservedAqi
                   });
                });
            }

          } catch (e) {
            console.error(`Failed to fetch weather for ${prov.name}`, e);
          }
        }
      } catch (e) {
        console.error('[Weather Modal] Failed batch weather sync', e);
      }
    } else {
       console.log('[Weather Modal] No API Key, simulating sync delay.');
       // Mock loading if no api key
       await new Promise(r => setTimeout(r, 1500));
    }

    console.log('[Weather Modal] Sync complete.');

    // Persist all csvDb records to SQLite for cross-page access
    try {
      const api = (window as any).api;
      if (api?.db?.saveWeatherAqi) {
        const allRecords = getRecords();
        if (allRecords.length > 0) {
          const dbRecords = allRecords.map(r => ({
            provinceId: r.id,
            date: r.date,
            temperature: r.temperature,
            aqi: r.aqi
          }));
          const saved = await api.db.saveWeatherAqi(dbRecords);
          console.log(`[Weather Modal] Persisted ${saved} records to SQLite DB.`);
        }
      }
    } catch (dbErr) {
      console.warn('[Weather Modal] Failed to persist to DB:', dbErr);
    }

    window.dispatchEvent(new CustomEvent(WEATHER_AQI_UPDATED_EVENT, { detail: { source: 'weather-modal' } }));

    const now = new Date();
    const newSync = now.toLocaleString();
    localStorage.setItem('locus_weather_last_sync', newSync);
    localStorage.setItem('locus_weather_last_sync_timestamp', Date.now().toString());
    setLastSync(newSync);
    setIsSyncing(false);
  };
  
    // Sync policy: manual only (no automatic sync on modal open).

  // Generate mocks to ensure data exists
  const mockDeps = useMemo(() => resolvedActiveProvinces.map(p => ({ id: p.id, name: p.name })), [resolvedActiveProvinces]);
  useMockCSVGenerator(mockDeps);

  // Today string for highlighting
  const todayStr = useMemo(() => {
    const d = new Date();
    return getLocalDateKey(d);
  }, [isOpen]);

  const chartData = useMemo(() => {
    if (!isOpen) return [];
    
    // Refresh hack to trigger re-get if isSyncing just finished
    // Normally we'd use context or SWR.
    
    const allRecords = getRecords();
    const today = new Date();
    today.setHours(0,0,0,0);

    const targetDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      if (viewMode === 'past') {
        d.setDate(today.getDate() - (6 - i));
      } else {
        d.setDate(today.getDate() + i); // 0 corresponds to today in future mode
      }
      return getLocalDateKey(d);
    });

    const activeProvinceKeySet = (() => {
      if (chartScope === 'province' && resolvedTargetProvinceId) {
        return new Set([toProvinceCompareKey(resolvedTargetProvinceId)]);
      }
      return new Set(resolvedActiveProvinces.map((province) => toProvinceCompareKey(province.id)));
    })();

    return targetDates.map(dateStr => {
      const dateRecords = allRecords.filter(
        (record) => record.date === dateStr && activeProvinceKeySet.has(toProvinceCompareKey(record.id))
      );
      const avgTemp = dateRecords.length > 0 
          ? dateRecords.reduce((acc, r) => acc + r.temperature, 0) / dateRecords.length 
          : 0;

      return {
        date: dateStr,
        displayDate: dateStr.substring(5), // MM-DD
        temp: avgTemp > 0 ? Math.round(avgTemp * 10) / 10 : Number.NaN,
        isToday: dateStr === todayStr
      };
    });
  }, [chartScope, isOpen, resolvedActiveProvinces, resolvedTargetProvinceId, viewMode, isSyncing, todayStr]);

  // Province list data for current day
  const provinceList = useMemo(() => {
    if (!isOpen) return [];
    const allRecords = getRecords();
    const records = resolvedActiveProvinces.map(prov => {
      const provinceCompareKey = toProvinceCompareKey(prov.id);
      const rec = allRecords.find(
        (record) => toProvinceCompareKey(record.id) === provinceCompareKey && record.date === todayStr
      );
      return {
        id: prov.id,
        name: prov.name,
        temp: rec ? rec.temperature : Number.NaN
      };
    });

    return records.sort((a, b) => {
      const aHasTemp = Number.isFinite(a.temp);
      const bHasTemp = Number.isFinite(b.temp);
      if (aHasTemp && !bHasTemp) return -1;
      if (!aHasTemp && bHasTemp) return 1;
      if (!aHasTemp && !bHasTemp) return 0;
      return sortOrder === 'desc' ? b.temp - a.temp : a.temp - b.temp;
    });
  }, [isOpen, resolvedActiveProvinces, sortOrder, isSyncing, todayStr]);

  useEffect(() => {
    if (!isOpen || provinceList.length === 0 || resolvedActiveProvinces.length <= 1) return;

    const selectedNameKey = normalizeProvinceNameKey(provinceName);
    const target = provinceList.find((item) => {
      if (resolvedTargetProvinceId && toProvinceCompareKey(item.id) === toProvinceCompareKey(resolvedTargetProvinceId)) {
        return true;
      }
      return selectedNameKey.length > 0 && normalizeProvinceNameKey(item.name) === selectedNameKey;
    });
    if (!target) return;

    const rowEl = provinceRowRefs.current.get(target.id);
    if (!rowEl) return;

    requestAnimationFrame(() => {
      rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [isOpen, provinceList, provinceName, resolvedActiveProvinces.length, resolvedTargetProvinceId, sortOrder, viewMode]);

  if (!isOpen) return null;

  const finiteTemps = chartData.map((d) => d.temp).filter((temp) => Number.isFinite(temp));
  const maxTemp = finiteTemps.length > 0 ? Math.max(...finiteTemps) + 4 : 40;
  const minTemp = finiteTemps.length > 0 ? Math.min(...finiteTemps) - 4 : 20;
  const tempRange = Math.max(maxTemp - minTemp, 1);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f1115] border border-white/10 rounded-2xl w-full max-w-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <ThermometerSun size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Weather Forecast & History</h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {provinceName} • {chartScope === 'province' ? '7-Day Province Trend' : '7-Day Average'}
              </p>
            </div>
          </div>
          <button title="ปิดหน้าต่าง" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Sync Status Banner */}
        <div className={`px-5 py-2.5 border-b flex items-center justify-between ${apiKey ? 'bg-emerald-950/30 border-emerald-900/40' : 'bg-cyan-950/30 border-cyan-900/40'}`}>
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className={apiKey ? 'text-emerald-500' : 'text-cyan-500'} />
            <span className={`text-xs ${apiKey ? 'text-emerald-200/90' : 'text-cyan-200/70'}`}>
              {apiKey ? 'Real Data Mode (OpenWeather API Configured).' : 'Mock Data Mode. OpenWeather API not configured.'} Last sync: <span className="text-white font-mono">{lastSync}</span>
            </span>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-bold transition-all ${isSyncing ? (apiKey ? 'bg-emerald-900 text-emerald-500 border-emerald-800' : 'bg-cyan-900 text-cyan-500 border-cyan-800') : (apiKey ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30 hover:text-emerald-300' : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/30 hover:text-cyan-300')}`}
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} /> 
            {isSyncing ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col sm:flex-row">
            {/* Left: Chart Area */}
            <div className="flex-[3] p-5 border-b sm:border-b-0 sm:border-r border-white/5 flex flex-col">
              
              {/* Toggles */}
              <div className="flex bg-white/5 p-1 rounded-lg w-full mb-8 relative">
                <div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-amber-500 rounded-md transition-all duration-300 ease-in-out shadow-[0_2px_10px_rgba(245,158,11,0.3)]"
                  style={{ left: viewMode === 'past' ? '4px' : 'calc(50%)' }}
                />
                <button 
                  className={`flex-1 flex justify-center items-center py-2 text-sm font-bold transition-colors z-10 ${viewMode === 'past' ? 'text-black' : 'text-slate-400 hover:text-slate-200'}`}
                  onClick={() => setViewMode('past')}
                >
                  Past 7 Days
                </button>
                <button 
                  className={`flex-1 flex justify-center items-center py-2 text-sm font-bold transition-colors z-10 ${viewMode === 'future' ? 'text-black' : 'text-slate-400 hover:text-slate-200'}`}
                  onClick={() => setViewMode('future')}
                >
                  Next 7 Days
                </button>
              </div>

              {/* Bar Chart */}
              <div className="relative flex-1 mt-2 w-full flex pl-8 pb-6 justify-between items-end min-h-[220px]">
                {/* Y-Axis Labels & Grid Lines */}
                <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between items-end pr-2 text-[10px] text-slate-500 font-mono">
                  <span>{maxTemp.toFixed(1)}°</span>
                  <span>{((maxTemp + minTemp) / 2).toFixed(1)}°</span>
                  <span>{minTemp.toFixed(1)}°</span>
                </div>
                <div className="absolute left-8 right-0 top-0 pt-[6px] bottom-6 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-white/5 w-full"></div>
                  <div className="border-t border-white/5 w-full"></div>
                  <div className="border-t border-white/5 w-full"></div>
                </div>

                {/* Bars */}
                {chartData.map((d, i) => {
                  const hasTemp = Number.isFinite(d.temp);
                  const heightPercent = hasTemp ? ((d.temp - minTemp) / tempRange) * 100 : 8;
                  
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 relative h-full justify-end z-10 group px-1 sm:px-2">
                        {/* Bar */}
                        <div 
                            className={`w-full max-w-[40px] rounded-t-md relative transition-all duration-700 ease-out border-t-2 ${d.isToday ? 'bg-gradient-to-t from-amber-500/20 to-amber-500/80 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-gradient-to-t from-white/5 to-white/20 border-white/30 group-hover:from-white/10 group-hover:to-white/30'} ${hasTemp ? '' : 'opacity-35'}`}
                            style={{ height: `${heightPercent}%` }}
                        >
                            {/* Value inside/above bar */}
                            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-xs tracking-tighter ${d.isToday ? 'text-amber-400' : 'text-slate-300'}`}>
                              {hasTemp ? `${d.temp.toFixed(1)}°` : '--'}
                            </div>
                        </div>
                        
                        {/* Highlights & X-Axis */}
                        <div className={`absolute -bottom-7 w-full flex flex-col items-center gap-1 ${d.isToday ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} transition-opacity`}>
                          <span className={`text-[10px] whitespace-nowrap font-mono tracking-wider ${d.isToday ? 'text-amber-400 font-bold bg-amber-500/10 px-1.5 rounded' : 'text-slate-400'}`}>
                            {d.displayDate}
                          </span>
                          {d.isToday && <span className="text-[8px] uppercase text-amber-500 font-black leading-none">Today</span>}
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Province List */}
            {resolvedActiveProvinces.length > 1 && (
                <div className="flex-[2] bg-white/[0.01] flex flex-col border-l border-white/5 min-h-[200px]">
                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                        <div>
                            <h3 className="text-sm font-bold text-white">
                              {chartScope === 'province' ? 'Province Breakdown' : 'Current Average Breakdown'}
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">Today ({chartData.find(d => d.isToday)?.displayDate || '...'})</p>
                        </div>
                        <button 
                            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                            className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition-colors"
                        >
                            {sortOrder === 'desc' ? <ArrowDown size={12}/> : <ArrowUp size={12}/>}
                            Temp
                        </button>
                    </div>
                    <div className="p-3 overflow-y-auto custom-scrollbar flex-1 space-y-1">
                        {provinceList.map((p, idx) => {
                            const selectedNameKey = normalizeProvinceNameKey(provinceName);
                            const isSelected =
                              (resolvedTargetProvinceId
                                ? toProvinceCompareKey(p.id) === toProvinceCompareKey(resolvedTargetProvinceId)
                                : false)
                              || (selectedNameKey.length > 0 && normalizeProvinceNameKey(p.name) === selectedNameKey);
                            return (
                            <div
                                key={p.id}
                                ref={(el) => {
                                  if (el) {
                                    provinceRowRefs.current.set(p.id, el);
                                  } else {
                                    provinceRowRefs.current.delete(p.id);
                                  }
                                }}
                                className={`flex justify-between items-center p-2 rounded-lg transition-colors group cursor-default ${isSelected ? 'bg-amber-500/10 border-l-4 border-amber-500 shadow-inner' : 'hover:bg-white/5'}`}
                            >
                                <span className={`text-sm transition-colors truncate pr-2 ${isSelected ? 'text-amber-400 font-bold' : 'text-slate-300 group-hover:text-amber-400'}`}>
                                    {isSelected && <span className="opacity-50 text-xs mr-1">{idx+1}.</span>}
                                    {!isSelected && <span className="opacity-40 text-xs mr-2">{idx+1}.</span>}
                                    {p.name} {isSelected && <span className="text-[10px] ml-1 bg-amber-500/20 px-1 py-0.5 rounded text-amber-300 font-bold border border-amber-500/30">Target</span>}
                                </span>
                                <span className={`text-sm font-bold font-mono text-right shrink-0 ${isSelected ? 'text-amber-300' : 'text-white'}`}>{Number.isFinite(p.temp) ? `${p.temp.toFixed(1)}°C` : '--'}</span>
                            </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
