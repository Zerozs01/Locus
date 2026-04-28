import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Grid,
  Map as MapIcon,
  MapPin,
  MessageSquare,
  Route,
  Sun,
  Wallet,
  Wind
} from 'lucide-react';
import { Region, Province, regionsData } from '../data/regions';
import { regionTheme, type RegionId } from '../data/regionTheme';
import { CachedImage } from './CachedImage';
import { DetailCard } from './DetailCard';
import { RegionalIntelBar, ClimateStatProps, MobilityStatProps, StabilityStatProps } from './RegionalIntelBar';
import { mixHex, toRgba } from '../utils/color';
import { pm25ToAqi, getAqiLevel, getAqiLevelSub, AQI_SYNC_TIMESTAMP_KEY, AQI_SYNC_COOLDOWN_MS, saveSyncTimestamp, AQI_SYNC_EVENT } from '../utils/aqi';
import { AQIModal } from './AQIModal';
import { WeatherHistoryModal } from './WeatherHistoryModal';
import { getRecords, saveRecord } from '../utils/csvDb';

// ─── FORECAST SYNC CONSTANTS (separate from AQI) ───────────────────────────────
const WEATHER_FORECAST_SYNC_KEY = 'locus_weather_forecast_last_sync_timestamp';
const WEATHER_FORECAST_SYNC_LABEL_KEY = 'locus_weather_forecast_last_sync';
const WEATHER_FORECAST_STALE_MS = 24 * 60 * 60 * 1000;

const isForecastStale = (): boolean => {
  const lastSync = Number(localStorage.getItem(WEATHER_FORECAST_SYNC_KEY) || 0);
  return lastSync === 0 || Date.now() - lastSync > WEATHER_FORECAST_STALE_MS;
};
const saveForecastSyncTimestamp = () => {
  localStorage.setItem(WEATHER_FORECAST_SYNC_LABEL_KEY, new Date().toLocaleString('th-TH'));
  localStorage.setItem(WEATHER_FORECAST_SYNC_KEY, String(Date.now()));
};
const getForecastLastSyncLabel = (): string =>
  localStorage.getItem(WEATHER_FORECAST_SYNC_LABEL_KEY) || 'Never';
const getLocalDateKey = (d = new Date()): string => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

interface ProvinceIndexItem {
  id: string;
  name: string;
  regionId: string;
  regionName: string;
  dailyCostValue?: number | null;
  populationValue?: number | null;
  safety?: number | null;
}

interface WeatherAqiRow {
  provinceId: string;
  date: string;
  temperature: number;
  aqi: number;
}

interface AQIProvinceItem {
  id: string;
  name: string;
}

const normalizeProvinceNameKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

// Display names for provinces with long official names (GeoJSON names -> Display names)
const provinceDisplayNames: Record<string, string> = {
  'Bangkok Metropolis': 'Bangkok',
  'Phra Nakhon Si Ayutthaya': 'Ayutthaya',
  'Prachuap Khiri Khan': 'Prachuap K.K.',
  'Nakhon Ratchasima': 'Korat',
  'Nong Bua Lam Phu': 'Nong Bua L.P.',
  'Nakhon Si Thammarat': 'Nakhon S.T.'
};

type RegionThemeTokens = (typeof regionTheme)[RegionId];

const getDisplayName = (name: string) => provinceDisplayNames[name] || name;

const getRegionTheme = (regionId: string) => regionTheme[regionId as RegionId] || regionTheme.central;

const getRegionAccent = (theme: RegionThemeTokens) => theme.accentHex || '#3b82f6';

const getAccentColor = (theme: RegionThemeTokens, lift = 0.28) => mixHex(getRegionAccent(theme), '#ffffff', lift);
const getTone = (theme: RegionThemeTokens, index: 0 | 1 | 2) => theme.toneRamp[index] ?? getRegionAccent(theme);

const getHeaderTitleStyle = (theme: RegionThemeTokens): CSSProperties => ({
  color: getRegionAccent(theme),
  textShadow: `0 0 22px ${toRgba(getTone(theme, 1), 0.1)}`
});

const getInactiveRegionTitleStyle = (): CSSProperties => ({
  color: 'rgba(203, 213, 225, 0.62)'
});

const getHeaderMetaStyle = (theme: RegionThemeTokens): CSSProperties => ({
  borderColor: toRgba(getRegionAccent(theme), 0.16)
});

const getHeaderMetaTextStyle = (theme: RegionThemeTokens): CSSProperties => ({
  backgroundImage: `linear-gradient(180deg, ${getTone(theme, 0)} 0%, ${getTone(theme, 2)} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent'
});

const getPanelSurfaceStyle = (theme: RegionThemeTokens, isActive: boolean): CSSProperties => ({
  background: isActive
    ? 'linear-gradient(180deg, rgba(32, 36, 42, 0.99) 0%, rgba(21, 24, 29, 1) 100%)'
    : 'linear-gradient(180deg, rgba(10, 12, 16, 0.98) 0%, rgba(5, 7, 10, 0.99) 100%)',
  borderColor: isActive ? toRgba(getRegionAccent(theme), 0.1) : 'rgba(255,255,255,0.04)'
});

const getCodeBadgeStyle = (theme: RegionThemeTokens): CSSProperties => ({
  background: `linear-gradient(135deg, ${toRgba(getTone(theme, 0), 0.88)} 0%, ${toRgba(getTone(theme, 1), 0.7)} 52%, ${toRgba(getTone(theme, 2), 0.58)} 100%)`,
  borderColor: toRgba(getRegionAccent(theme), 0.32),
  color: '#ffffff',
  boxShadow: `0 10px 22px ${toRgba(getRegionAccent(theme), 0.12)}`
});

const getDescriptionStyle = (theme: RegionThemeTokens): CSSProperties => ({
  borderColor: toRgba(getTone(theme, 1), 0.22),
  color: 'rgba(226, 232, 240, 0.84)'
});

const getDetailCardStyle = (): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(22, 25, 30, 0.96) 0%, rgba(15, 17, 21, 0.98) 100%)',
  borderColor: 'rgba(255,255,255,0.08)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 18px rgba(0,0,0,0.18)`
});

const getDetailIconStyle = (theme: RegionThemeTokens): CSSProperties => ({
  color: toRgba(getTone(theme, 1), 0.84),
  background: `linear-gradient(180deg, ${toRgba(getTone(theme, 0), 0.12)} 0%, rgba(24, 27, 31, 0.96) 100%)`,
  borderColor: toRgba(getTone(theme, 1), 0.18),
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
});

const getDetailLabelStyle = (theme: RegionThemeTokens): CSSProperties => ({
  color: toRgba(getTone(theme, 1), 0.72)
});

const getDetailValueStyle = (): CSSProperties => ({
  color: '#f8fafc'
});

const getDetailSubStyle = (): CSSProperties => ({
  color: 'rgba(148, 163, 184, 0.78)'
});

const getFilledButtonStyle = (theme: RegionThemeTokens): CSSProperties => ({
  background: `linear-gradient(118deg, ${getTone(theme, 0)} 0%, ${getTone(theme, 1)} 48%, ${getTone(theme, 2)} 100%)`,
  borderColor: toRgba(getTone(theme, 1), 0.58),
  color: '#ffffff',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 16px ${toRgba(getTone(theme, 1), 0.12)}`
});

const getFilledButtonHoverSurfaceStyle = (): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(5, 7, 10, 0.18) 0%, rgba(5, 7, 10, 0.34) 100%)'
});

const getOutlineButtonStyle = (theme: RegionThemeTokens): CSSProperties => ({
  background: `linear-gradient(180deg, rgba(18, 20, 24, 0.98) 0%, rgba(11, 13, 16, 0.98) 100%) padding-box, linear-gradient(118deg, ${toRgba(getTone(theme, 0), 0.68)} 0%, ${toRgba(getTone(theme, 1), 0.82)} 52%, ${toRgba(getTone(theme, 2), 0.66)} 100%) border-box`,
  border: '3px solid transparent',
  color: 'rgba(248,250,252,0.92)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 10px 18px rgba(0,0,0,0.14), 0 0 0 1px ${toRgba(getTone(theme, 1), 0.06)}`
});

const getModeButtonStyle = (theme: RegionThemeTokens, isProvinceMode: boolean): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(242,246,250,0.96) 100%)',
  borderColor: toRgba(getRegionAccent(theme), isProvinceMode ? 0.28 : 0.22),
  borderRadius: 9999,
  color: mixHex(getTone(theme, isProvinceMode ? 2 : 1), '#000000', 0.28),
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.82), 0 8px 16px ${toRgba(getTone(theme, 1), 0.08)}`
});

const getModeButtonHoverSurfaceStyle = (theme: RegionThemeTokens): CSSProperties => ({
  background: `linear-gradient(180deg, rgba(7, 9, 13, 0.12) 0%, rgba(7, 9, 13, 0.2) 100%), linear-gradient(118deg, ${mixHex(getTone(theme, 0), '#ffffff', 0.78)} 0%, ${mixHex(getTone(theme, 1), '#ffffff', 0.82)} 52%, ${mixHex(getTone(theme, 2), '#ffffff', 0.84)} 100%)`
});

const getModeButtonTextStyle = (theme: RegionThemeTokens): CSSProperties => ({
  backgroundImage: `linear-gradient(120deg, ${mixHex(getTone(theme, 0), '#000000', 0.16)} 0%, ${mixHex(getTone(theme, 1), '#000000', 0.22)} 52%, ${mixHex(getTone(theme, 2), '#000000', 0.28)} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent'
});

const getProvinceCardStyle = (theme: RegionThemeTokens, isSelected: boolean): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(12, 15, 19, 0.96) 0%, rgba(6, 8, 12, 0.92) 100%)',
  borderColor: isSelected ? getRegionAccent(theme) : 'rgba(255,255,255,0.08)',
  boxShadow: isSelected ? `0 0 0 1px ${getRegionAccent(theme)}, 0 0 20px ${toRgba(getRegionAccent(theme), 0.5)}, 0 14px 28px rgba(0,0,0,0.4)` : 'none'
});

const getProvinceActionStyle = (theme: RegionThemeTokens): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(22, 24, 29, 0.98) 0%, rgba(14, 16, 20, 0.98) 100%)',
  borderColor: toRgba(getRegionAccent(theme), 0.2),
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 18px rgba(0,0,0,0.18)'
});

const climateByRegion: Record<string, ClimateStatProps> = {
  north: { value: '24.8°C', trend: '-0.6°C (7d)', tone: 'cool' },
  northeast: { value: '32.6°C', trend: '+0.9°C (7d)', tone: 'warm' },
  central: { value: '34.1°C', trend: '+1.2°C (7d)', tone: 'hot' },
  south: { value: '30.4°C', trend: '+0.3°C (7d)', tone: 'warm' },
  west: { value: '31.2°C', trend: '+0.5°C (7d)', tone: 'warm' },
  east: { value: '32.8°C', trend: '+0.8°C (7d)', tone: 'warm' }
};

const mobilityByRegion: Record<string, MobilityStatProps> = {
  north: { state: 'ไหลเวียนปกติ', subtitle: 'ตามฤดูกาล', tone: 'normal' },
  northeast: { state: 'ไหลเวียนปกติ', subtitle: 'เกษตรกรรม', tone: 'normal' },
  central: { state: 'หนาแน่น', subtitle: 'ศูนย์กลางเมือง', tone: 'congested' },
  south: { state: 'พีคตามฤดูกาล', subtitle: 'ท่องเที่ยว', tone: 'seasonal' },
  west: { state: 'ไหลเวียนปกติ', subtitle: 'การค้าชายแดน', tone: 'normal' },
  east: { state: 'พีคตามฤดูกาล', subtitle: 'อุตสาหกรรม/ท่าเรือ', tone: 'seasonal' }
};

const getStabilityProps = (safetyScore?: number): StabilityStatProps => {
  const score = typeof safetyScore === 'number' && Number.isFinite(safetyScore) ? safetyScore : 80;
  if (score >= 88) return { value: `${score}%`, label: 'เสถียร', tone: 'stable' };
  if (score >= 80) return { value: `${score}%`, label: 'เฝ้าระวัง', tone: 'watch' };
  return { value: `${score}%`, label: 'ผันผวน', tone: 'volatile' };
};

const normalizeWeatherProvinceId = (id: string) => {
  let normalized = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalized === 'bangkokmetropolis') normalized = 'bangkok';
  if (normalized === 'phranakhonsiayutthaya') normalized = 'ayutthaya';
  return normalized;
};

const fallbackPm25ByRegion: Record<string, { value: string; sub: string }> = {
  north: { value: '45-120 AQI', sub: 'Moderate - Unhealthy' },
  northeast: { value: '35-80 AQI', sub: 'Moderate' },
  central: { value: '40-90 AQI', sub: 'Moderate' },
  south: { value: '15-35 AQI', sub: 'Good (Clean Air)' },
  west: { value: '25-60 AQI', sub: 'Moderate' },
  east: { value: '30-70 AQI', sub: 'Moderate' }
};

const getFallbackPM25Stat = (regionId: string) => {
  return fallbackPm25ByRegion[regionId] || fallbackPm25ByRegion.central;
};

const getBestSeason = (regionId: string) => {
  const data: Record<string, string> = {
    north: 'Nov - Feb (Winter)',
    northeast: 'Nov - Jan (Cool)',
    central: 'Nov - Feb (Cool)',
    south: 'All Year Round',
    west: 'Nov - Feb (Nature)',
    east: 'Dec - May (Beach)'
  };
  return data[regionId] || 'All Year';
};

const getPopularProvinces = (reg: Region) => {
  const data: Record<string, string> = {
    north: 'Chiang Mai, Chiang Rai',
    northeast: 'Khon Kaen, Korat',
    central: 'Bangkok, Ayutthaya',
    south: 'Phuket, Krabi',
    west: 'Kanchanaburi',
    east: 'Chon Buri, Rayong'
  };
  return data[reg.id] || reg.subProvinces.slice(0, 2).map(p => getDisplayName(p.name)).join(', ') || 'N/A';
};

export interface RegionDashboardProps {
  regions: Region[];
  provinceIndex?: ProvinceIndexItem[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
  mapMode: 'region' | 'province';
  setMapMode: (mode: 'region' | 'province') => void;
  selectedProvince: Province | null;
  onSelectProvince: (prov: Province) => void;
  onViewProvinceDetail?: (regionId: string, provinceId: string) => void;
  onOpenChat?: (context: { type: 'region' | 'province'; name: string; data: any }) => void;
  loadingProvinceRegionId?: string | null;
}

export const RegionDashboard = memo(({
  regions,
  provinceIndex = [],
  selectedRegionId,
  onSelectRegion,
  mapMode,
  setMapMode,
  selectedProvince,
  onSelectProvince,
  onViewProvinceDetail,
  onOpenChat,
  loadingProvinceRegionId
}: RegionDashboardProps) => {
  const navigate = useNavigate();
  const provinceListRef = useRef<HTMLDivElement | null>(null);
  const provinceCardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [isAQIModalOpen, setIsAQIModalOpen] = useState(false);
  const [selectedRegionForAQI, setSelectedRegionForAQI] = useState<Region | null>(null);
  
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
    const [selectedRegionForWeather, setSelectedRegionForWeather] = useState<Region | null>(null);
  const [weatherRows, setWeatherRows] = useState<WeatherAqiRow[]>([]);
  const hasBootAutoSyncChecked = useRef(false);
  const isBootAutoSyncRunning = useRef(false);
  const autoSyncScheduled = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const syncWeatherRows = async () => {
      let nextRows: WeatherAqiRow[] = [];
      try {
        const api = (window as any).api;
        if (api?.db?.getWeatherAqi) {
          const dbRows = await api.db.getWeatherAqi();
          if (Array.isArray(dbRows) && dbRows.length > 0) {
            nextRows = dbRows
              .filter((r: any) => r && typeof r.provinceId === 'string')
              .map((r: any) => ({
                provinceId: r.provinceId,
                date: typeof r.date === 'string' ? r.date : '',
                temperature: Number(r.temperature),
                aqi: Number(r.aqi)
              }));
          }
        }
      } catch {
        // Use csvDb fallback when IPC/SQLite is unavailable.
      }

      if (nextRows.length === 0) {
        nextRows = getRecords().map((r) => ({
          provinceId: r.id,
          date: r.date,
          temperature: r.temperature,
          aqi: r.aqi
        }));
      }

      if (!cancelled) {
        setWeatherRows(nextRows);
      }
    };

        syncWeatherRows();
    // Poll every 60s — auto-sync is the primary refresh mechanism
    const intervalId = window.setInterval(syncWeatherRows, 60000);
    const onWeatherUpdated = () => {
      void syncWeatherRows();
    };

    window.addEventListener(AQI_SYNC_EVENT, onWeatherUpdated as EventListener);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener(AQI_SYNC_EVENT, onWeatherUpdated as EventListener);
    };
    }, [isAQIModalOpen, isWeatherModalOpen]);

  const latestAqiByProvince = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const grouped = new Map<string, Array<{ date: string; aqi: number }>>();

    weatherRows.forEach((row) => {
      if (!row || typeof row.provinceId !== 'string') return;
      if (typeof row.aqi !== 'number' || !Number.isFinite(row.aqi)) return;

      const id = normalizeWeatherProvinceId(row.provinceId);
      const list = grouped.get(id) || [];
      list.push({ date: row.date, aqi: row.aqi });
      grouped.set(id, list);
    });

    const result: Record<string, number> = {};
    grouped.forEach((records, provinceId) => {
      const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
      const preferred = sorted.find((item) => item.date === todayStr)
        || sorted.find((item) => item.date <= todayStr)
        || sorted[0];
      if (preferred) {
        result[provinceId] = preferred.aqi;
      }
    });

    return result;
  }, [weatherRows]);

  const provinceIdsByRegion = useMemo(() => {
    const map = new Map<string, string[]>();
    provinceIndex.forEach((item) => {
      const list = map.get(item.regionId) || [];
      list.push(normalizeWeatherProvinceId(item.id));
      map.set(item.regionId, list);
    });
    return map;
  }, [provinceIndex]);

  const provinceIdByName = useMemo(() => {
    const map = new Map<string, string>();
    provinceIndex.forEach((item) => {
      const canonicalId = normalizeWeatherProvinceId(item.id);
      map.set(item.name.toLowerCase(), canonicalId);
      map.set(normalizeProvinceNameKey(item.name), canonicalId);
    });
    return map;
  }, [provinceIndex]);

  const provinceCountByRegion = useMemo(() => {
    const map = new Map<string, number>();
    provinceIndex.forEach((item) => {
      map.set(item.regionId, (map.get(item.regionId) || 0) + 1);
    });
    return map;
  }, [provinceIndex]);

  const aqiModalProvincesByRegion = useMemo(() => {
    const map = new Map<string, AQIProvinceItem[]>();

    if (provinceIndex.length > 0) {
      provinceIndex.forEach((item) => {
        const list = map.get(item.regionId) || [];
        list.push({ id: normalizeWeatherProvinceId(item.id), name: item.name });
        map.set(item.regionId, list);
      });
    }

    for (const reg of regions) {
      if ((map.get(reg.id) || []).length > 0) {
        continue;
      }

      let provinces = reg.subProvinces;
      if (!provinces || provinces.length === 0) {
        provinces = regionsData.find((r) => r.id === reg.id)?.subProvinces || [];
      }

      const deduped = new Map<string, AQIProvinceItem>();
      provinces.forEach((province) => {
        const canonicalId =
          provinceIdByName.get(province.name.toLowerCase()) ||
          provinceIdByName.get(normalizeProvinceNameKey(province.name)) ||
          normalizeWeatherProvinceId(province.id);

        if (!deduped.has(canonicalId)) {
          deduped.set(canonicalId, { id: canonicalId, name: province.name });
        }
      });

      map.set(reg.id, Array.from(deduped.values()));
    }

    map.forEach((items, regionId) => {
      map.set(regionId, [...items].sort((a, b) => a.name.localeCompare(b.name)));
    });

    return map;
  }, [provinceIdByName, provinceIndex, regions]);

  const sortedProvincesByRegion = useMemo(() => {
    const map = new Map<string, Province[]>();
    for (const reg of regions) {
      const summaryCount = Number(reg.summary?.provinces);
      const expectedCount = provinceCountByRegion.get(reg.id)
        || (Number.isFinite(summaryCount) && summaryCount > 0 ? summaryCount : 0);

      let provs = reg.subProvinces || [];
      const staticProvs = regionsData.find((r) => r.id === reg.id)?.subProvinces || [];

      const isLikelyTruncated = expectedCount > 0 && provs.length > 0 && provs.length < expectedCount;
      if (provs.length === 0 || isLikelyTruncated) {
        provs = staticProvs.length > 0 ? staticProvs : provs;
      }

      map.set(reg.id, [...provs].sort((a, b) => a.name.localeCompare(b.name)));
    }
    return map;
  }, [provinceCountByRegion, regions]);

  const orderedRegions = useMemo(() => {
    const preferredOrder = ['north', 'northeast', 'central', 'east', 'west', 'south'];
    const orderMap = new Map(preferredOrder.map((id, index) => [id, index]));
    return [...regions].sort((a, b) => {
      const aIndex = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
      return aIndex - bIndex;
    });
  }, [regions]);

  const pm25ByRegion = useMemo(() => {
    const map = new Map<string, { value: string; sub: string }>();

    for (const reg of orderedRegions) {
      let provinceIds = provinceIdsByRegion.get(reg.id);
      if (!provinceIds || provinceIds.length === 0) {
        let provinces = reg.subProvinces;
        if (!provinces || provinces.length === 0) {
          provinces = regionsData.find((r) => r.id === reg.id)?.subProvinces || [];
        }
        provinceIds = provinces.map((p) => normalizeWeatherProvinceId(p.id));
      }

      const values = provinceIds
        .map((id) => latestAqiByProvince[normalizeWeatherProvinceId(id)])
        .filter((value): value is number => typeof value === 'number' && Number.isFinite(value));

      if (values.length > 0) {
        const avg = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
        map.set(reg.id, { value: `${avg} AQI`, sub: getAqiLevelSub(avg) });
      } else {
        map.set(reg.id, getFallbackPM25Stat(reg.id));
      }
    }

    return map;
  }, [latestAqiByProvince, orderedRegions, provinceIdsByRegion]);

  const latestTemperatureByProvince = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const grouped = new Map<string, Array<{ date: string; temperature: number }>>();

    weatherRows.forEach((row) => {
      if (!row || typeof row.provinceId !== 'string') return;
      if (typeof row.temperature !== 'number' || !Number.isFinite(row.temperature)) return;

      const id = normalizeWeatherProvinceId(row.provinceId);
      const records = grouped.get(id) || [];
      records.push({ date: row.date, temperature: row.temperature });
      grouped.set(id, records);
    });

    const result = new Map<string, { latest: number; previous: number | null }>();
    grouped.forEach((records, provinceId) => {
      const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
      const latest = sorted.find((item) => item.date === todayStr)
        || sorted.find((item) => item.date <= todayStr)
        || sorted[0];
      if (!latest) return;
      const previous = sorted.find((item) => item.date < latest.date);
      result.set(provinceId, { latest: latest.temperature, previous: previous ? previous.temperature : null });
    });

    return result;
  }, [weatherRows]);

  const climateByRegionDynamic = useMemo(() => {
    const map = new Map<string, ClimateStatProps>();

    for (const reg of orderedRegions) {
      let provinceIds = provinceIdsByRegion.get(reg.id);
      if (!provinceIds || provinceIds.length === 0) {
        let provinces = reg.subProvinces;
        if (!provinces || provinces.length === 0) {
          provinces = regionsData.find((r) => r.id === reg.id)?.subProvinces || [];
        }
        provinceIds = provinces.map((p) => normalizeWeatherProvinceId(p.id));
      }

      const latestValues: number[] = [];
      const previousValues: number[] = [];

      provinceIds.forEach((provinceId) => {
        const state = latestTemperatureByProvince.get(normalizeWeatherProvinceId(provinceId));
        if (!state) return;
        latestValues.push(state.latest);
        if (typeof state.previous === 'number' && Number.isFinite(state.previous)) {
          previousValues.push(state.previous);
        }
      });

      if (latestValues.length === 0) {
        map.set(reg.id, climateByRegion[reg.id] || climateByRegion.central);
        continue;
      }

      const avgLatest = latestValues.reduce((sum, value) => sum + value, 0) / latestValues.length;
      const avgPrevious = previousValues.length > 0
        ? previousValues.reduce((sum, value) => sum + value, 0) / previousValues.length
        : avgLatest;
      const delta = avgLatest - avgPrevious;

      const tone: ClimateStatProps['tone'] = avgLatest <= 26 ? 'cool' : avgLatest >= 33 ? 'hot' : 'warm';
      const trendSign = delta > 0 ? '+' : delta < 0 ? '-' : '±';
      const absDelta = Math.abs(delta).toFixed(1);

      map.set(reg.id, {
        value: `${avgLatest.toFixed(1)}°C`,
        trend: `${trendSign}${absDelta}°C (1d)`,
        tone
      });
    }

    return map;
  }, [latestTemperatureByProvince, orderedRegions, provinceIdsByRegion]);

  const runStartupAqiAutoSync = useCallback(async () => {
    if (isBootAutoSyncRunning.current) return;

        const nowTs = Date.now();
    const lastSyncTs = Number(localStorage.getItem(AQI_SYNC_TIMESTAMP_KEY) || 0);
    if (lastSyncTs > 0 && nowTs - lastSyncTs < AQI_SYNC_COOLDOWN_MS) {
      return;
    }

    const api = (window as any).api;
    if (!api?.config?.get) return;

    const conf = await api.config.get().catch(() => null);
    const provider = (conf?.aqi_provider || 'openweather') as 'openweather' | 'aqicn';
    const apiKey = provider === 'aqicn' ? conf?.aqicn : conf?.openweather;
    if (!apiKey) return;

    const provinceMap = new Map<string, AQIProvinceItem>();
    if (provinceIndex.length > 0) {
      provinceIndex.forEach((item) => {
        const id = normalizeWeatherProvinceId(item.id);
        if (!provinceMap.has(id)) {
          provinceMap.set(id, { id, name: item.name });
        }
      });
    }

    if (provinceMap.size === 0) {
      regions.forEach((region) => {
        (region.subProvinces || []).forEach((province) => {
          const id = normalizeWeatherProvinceId(province.id);
          if (!provinceMap.has(id)) {
            provinceMap.set(id, { id, name: province.name });
          }
        });
      });
    }

    const allProvinces = Array.from(provinceMap.values());
    if (allProvinces.length === 0) return;

    let snapshotRows: WeatherAqiRow[] = [];
    try {
      if (api?.db?.getWeatherAqi) {
        const dbRows = await api.db.getWeatherAqi();
        if (Array.isArray(dbRows)) {
          snapshotRows = dbRows
            .filter((r: any) => r && typeof r.provinceId === 'string')
            .map((r: any) => ({
              provinceId: normalizeWeatherProvinceId(r.provinceId),
              date: typeof r.date === 'string' ? r.date : '',
              temperature: Number(r.temperature),
              aqi: Number(r.aqi)
            }));
        }
      }
    } catch {
      // Fallback below.
    }

    if (snapshotRows.length === 0) {
      snapshotRows = getRecords().map((r) => ({
        provinceId: normalizeWeatherProvinceId(r.id),
        date: r.date,
        temperature: r.temperature,
        aqi: r.aqi
      }));
    }

    const latestTempSnapshot = new Map<string, number>();
    const todayStr = new Date().toISOString().split('T')[0];
    const grouped = new Map<string, Array<{ date: string; temperature: number }>>();
    snapshotRows.forEach((row) => {
      if (!Number.isFinite(row.temperature)) return;
      const records = grouped.get(row.provinceId) || [];
      records.push({ date: row.date, temperature: row.temperature });
      grouped.set(row.provinceId, records);
    });
    grouped.forEach((records, provinceId) => {
      const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
      const latest = sorted.find((item) => item.date === todayStr)
        || sorted.find((item) => item.date <= todayStr)
        || sorted[0];
      if (latest) {
        latestTempSnapshot.set(provinceId, latest.temperature);
      }
    });

    const syncedRows: WeatherAqiRow[] = [];

    isBootAutoSyncRunning.current = true;
    try {
      for (const province of allProvinces) {
        const cleanName = province.name.replace(' Metropolis', '').replace(' (Pattaya)', '').trim();
        let aqiVal = 50;
        let success = false;
        let resolvedTemp = latestTempSnapshot.get(province.id);

        try {
          if (provider === 'aqicn') {
            const aqiRes = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(cleanName)}/?token=${apiKey}`);
            const aqiData = await aqiRes.json();
            if (aqiData.status === 'ok' && Number.isFinite(Number(aqiData?.data?.aqi))) {
              aqiVal = Number(aqiData.data.aqi);
              const aqicnTemp = Number(aqiData?.data?.iaqi?.t?.v);
              if (!Number.isFinite(resolvedTemp) && Number.isFinite(aqicnTemp)) {
                resolvedTemp = aqicnTemp;
              }
              success = true;
            }
          } else {
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanName)},th&limit=1&appid=${apiKey}`);
            const geoData = await geoRes.json();
            let lat = 13.75;
            let lon = 100.5;
            if (Array.isArray(geoData) && geoData[0]) {
              lat = Number(geoData[0].lat) || lat;
              lon = Number(geoData[0].lon) || lon;
            }

                        const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const aqiData = await aqiRes.json();
            if (aqiData && aqiData.list && aqiData.list[0]) {
              const pm25 = aqiData.list[0].components.pm2_5;
              if (pm25 != null) {
                aqiVal = pm25ToAqi(pm25);
              }
              success = true;
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
        } catch {
          success = false;
        }

        if (success) {
          const temperature = Number.isFinite(resolvedTemp) ? Number(resolvedTemp) : 30;
          const row = { provinceId: province.id, date: todayStr, temperature, aqi: aqiVal };
          syncedRows.push(row);
          saveRecord({ id: row.provinceId, date: row.date, temperature: row.temperature, aqi: row.aqi });
        }

                // OpenWeather free tier: 60 requests/min. With 77 provinces, 250ms delay = ~20s per batch.
        // Rate limit guard: slow down if consecutive failures, reset on success.
        const delay = provider === 'aqicn' ? 1000 : 400;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

            if (syncedRows.length > 0) {
                if (api?.db?.saveWeatherAqi) {
          await api.db.saveWeatherAqi(syncedRows);
        }
        saveSyncTimestamp();
        window.dispatchEvent(new CustomEvent('locus:weather-aqi-updated', { detail: { source: 'region-dashboard-auto-sync' } }));
      }
        } finally {
      isBootAutoSyncRunning.current = false;
    }
  }, [provinceIndex, regions]);

  // ─── FORECAST AUTO-SYNC ───────────────────────────────────────────────────────
  const runStartupForecastSync = useCallback(async () => {
    if (!isForecastStale()) return;
    const api = (window as any).api;
    if (!api?.config?.get) return;
    const conf = await api.config.get().catch(() => null);
    const apiKey = conf?.openweather;
    if (!apiKey) return;

    // Collect all provinces
    const provinceMap = new Map<string, AQIProvinceItem>();
    if (provinceIndex.length > 0) {
      provinceIndex.forEach((item) => {
        const id = normalizeWeatherProvinceId(item.id);
        if (!provinceMap.has(id)) provinceMap.set(id, { id, name: item.name });
      });
    }
    if (provinceMap.size === 0) {
      regions.forEach((region) => {
        (region.subProvinces || []).forEach((province) => {
          const id = normalizeWeatherProvinceId(province.id);
          if (!provinceMap.has(id)) provinceMap.set(id, { id, name: province.name });
        });
      });
    }
    const allProvinces = Array.from(provinceMap.values());
    if (allProvinces.length === 0) return;

    // Get existing records for AQI preservation
    const existingRows: WeatherAqiRow[] = (() => {
      try { return getRecords().map(r => ({ provinceId: r.id, date: r.date, temperature: r.temperature, aqi: r.aqi })); }
      catch { return []; }
    })();
    const aqiByProvinceDate = new Map<string, number>();
    existingRows.forEach(r => {
      if (Number.isFinite(r.aqi)) aqiByProvinceDate.set(`${normalizeWeatherProvinceId(r.provinceId)}|${r.date}`, r.aqi);
    });

    const syncedRows: WeatherAqiRow[] = [];
    for (const province of allProvinces) {
      const cleanName = province.name.replace(' Metropolis', '').replace(' (Pattaya)', '').trim();
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cleanName)},th&units=metric&appid=${apiKey}`);
        const data = await res.json();
        if (!data?.list) continue;

        const dailyAvg = new Map<string, number[]>();
        data.list.forEach((item: any) => {
          const d = item.dt_txt?.split(' ')[0];
          if (!d) return;
          if (!dailyAvg.has(d)) dailyAvg.set(d, []);
          dailyAvg.get(d)?.push(item.main?.temp);
        });

        dailyAvg.forEach((temps, dateStr) => {
          if (temps.length === 0) return;
          const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
          const provinceKey = normalizeWeatherProvinceId(province.id);
          const todayStr = getLocalDateKey();
          const todayAqi = dateStr === todayStr ? aqiByProvinceDate.get(`${provinceKey}|${todayStr}`) : undefined;
          const existingAqi = aqiByProvinceDate.get(`${provinceKey}|${dateStr}`);
          const aqiVal = todayAqi ?? existingAqi ?? 50;
          const row = { provinceId: province.id, date: dateStr, temperature: avgTemp, aqi: aqiVal };
          syncedRows.push(row);
          saveRecord({ id: row.provinceId, date: row.date, temperature: row.temperature, aqi: row.aqi });
        });
      } catch { /* skip province */ }
      await new Promise(r => setTimeout(r, 300)); // rate limit
    }

    if (syncedRows.length > 0) {
      if (api?.db?.saveWeatherAqi) await api.db.saveWeatherAqi(syncedRows);
      saveForecastSyncTimestamp();
      window.dispatchEvent(new CustomEvent(AQI_SYNC_EVENT, { detail: { source: 'forecast-auto-sync' } }));
    }
  }, [provinceIndex, regions]);

      // Run startup AQI + Forecast auto-sync once when regions are loaded
  useEffect(() => {
    if (autoSyncScheduled.current) return;
    if (regions.length === 0) return;
    autoSyncScheduled.current = true;
    // Delay 5s to let the dashboard render and DB queries settle
    const timer = setTimeout(() => {
      if (!hasBootAutoSyncChecked.current) {
        hasBootAutoSyncChecked.current = true;
        void runStartupAqiAutoSync();
        void runStartupForecastSync(); // Also sync forecast if stale (>24h)
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [regions.length, runStartupForecastSync]);

  useEffect(() => {
    if (mapMode !== 'province' || !selectedProvince) return;
    const target = provinceCardRefs.current.get(selectedProvince.id);
    if (!target || !provinceListRef.current) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [mapMode, selectedProvince?.id, selectedRegionId, regions]);

  return (
    <section className="relative flex flex-[3] flex-col overflow-hidden bg-[#0c1014]">
      {orderedRegions.map((reg) => {
        const isActive = selectedRegionId === reg.id;
        const climate = climateByRegionDynamic.get(reg.id) || climateByRegion[reg.id] || climateByRegion.central;
        const mobility = mobilityByRegion[reg.id] || mobilityByRegion.central;
        const stability = getStabilityProps(reg.safety);
        const theme = getRegionTheme(reg.id);
        const accentHex = getRegionAccent(theme);
        const pm25 = pm25ByRegion.get(reg.id) || getFallbackPM25Stat(reg.id);
        const detailCards = [
          { key: 'cost', icon: <Wallet />, label: 'Avg Daily Cost', value: reg.stats.dailyCost, sub: 'Expenses/Day', emphasis: 0.34 },
          { key: 'air', icon: <Wind />, label: 'Air Quality (PM2.5)', value: pm25.value, sub: pm25.sub, emphasis: 0.3, isAqi: true },
          { key: 'provinces', icon: <MapPin />, label: 'Popular Provinces', value: getPopularProvinces(reg), sub: 'Top Destinations', emphasis: 0.4, valueClass: 'text-[0.8rem]' },
          { key: 'season', icon: <Sun />, label: 'Best Season', value: getBestSeason(reg.id), sub: 'Recommended', emphasis: 0.18, valueClass: 'text-[0.8rem]' }
        ];

        return (
          <div
            key={reg.id}
            onClick={() => onSelectRegion(reg.id)}
            data-region={reg.id}
            data-active={isActive}
            className={`
              region-card group relative cursor-pointer overflow-hidden transition-[flex-grow,opacity] duration-300 ease-out
              ${isActive ? 'flex-[10]' : 'flex-[1] bg-[#0f1115]/20 opacity-60 hover:flex-[1.2] hover:opacity-100 hover:bg-[#101318]/70'}
            `}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 border-b" style={getPanelSurfaceStyle(theme, isActive)} />
            </div>

            <div className="absolute inset-0 flex h-full w-full flex-col px-4 pb-2 pt-5 sm:px-6 sm:pt-6">
              <div
                className="relative z-20 mb-3 flex flex-col gap-4 border-b pb-3 sm:flex-row sm:items-center sm:justify-between"
                style={{ borderColor: isActive ? toRgba(accentHex, 0.18) : undefined }}
              >
                <div className="flex items-baseline gap-3">
                  <h2
                    className={`font-black uppercase tracking-tighter leading-none transition-all duration-300 ${isActive ? 'text-[3.1rem] xl:text-[3.45rem]' : 'text-2xl md:text-3xl'}`}
                    style={isActive ? getHeaderTitleStyle(theme) : getInactiveRegionTitleStyle()}
                  >
                    {reg.name}
                  </h2>
                  {isActive && (
                    <>
                      <span className="border-l pl-3 text-lg font-light uppercase tracking-wider xl:text-xl" style={getHeaderMetaStyle(theme)}>
                        <span style={getHeaderMetaTextStyle(theme)}>{reg.engName}</span>
                      </span>
                      <span className="rounded-md border px-2 py-0.5 text-sm font-mono tracking-widest" style={getCodeBadgeStyle(theme)}>
                        {reg.code}
                      </span>
                    </>
                  )}
                </div>
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapMode(mapMode === 'region' ? 'province' : 'region');
                    }}
                    className="group/province relative z-50 flex items-center gap-2 overflow-hidden border px-4 py-2 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5"
                    style={getModeButtonStyle(theme, mapMode === 'province')}
                  >
                    <span
                      className="pointer-events-none absolute inset-[1px] rounded-[999px] opacity-0 transition-opacity duration-300 group-hover/province:opacity-100"
                      style={getModeButtonHoverSurfaceStyle(theme)}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {mapMode === 'province' ? <Grid size={14} /> : <MapPin size={14} />}
                      <span style={getModeButtonTextStyle(theme)}>
                        {mapMode === 'province' ? 'Threat Summary' : 'View Provinces'}
                      </span>
                    </span>
                  </button>
                )}
              </div>

              {isActive && mapMode === 'region' && (
                <div className="mt-4 flex-1 overflow-y-auto pr-1 opacity-100 md:pr-2">
                  <div className="flex flex-col py-2">
                    <p className="mb-5 max-w-[48rem] border-l-2 pl-3 text-sm font-light leading-snug" style={getDescriptionStyle(theme)}>
                      {reg.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pb-6 xl:grid-cols-4">
                      {detailCards.map((item) => (
                        <DetailCard
                          key={item.key}
                          icon={item.icon}
                          label={item.label}
                          value={item.value}
                          sub={item.sub}
                          valueClassName={item.valueClass}
                          className="border backdrop-blur-sm hover:bg-[#1a1d23]"
                          textClass="text-white"
                          iconClassName="border"
                          style={getDetailCardStyle()}
                          iconStyle={getDetailIconStyle(theme)}
                          labelStyle={getDetailLabelStyle(theme)}
                          valueStyle={getDetailValueStyle()}
                          subStyle={getDetailSubStyle()}
                          onClick={item.isAqi ? (e) => {
                            e.stopPropagation();
                            setSelectedRegionForAQI(reg);
                            setIsAQIModalOpen(true);
                          } : undefined}
                        />
                      ))}
                    </div>

                    <div className="mb-3 flex flex-col gap-3 xl:flex-row">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/travel-guide/${reg.id}`);
                        }}
                        className="group/travel relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                        style={getFilledButtonStyle(theme)}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/travel:opacity-100"
                          style={getFilledButtonHoverSurfaceStyle()}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          <Route size={16} /> Travel Guide
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenChat) {
                            onOpenChat({
                              type: 'region',
                              name: reg.name,
                              data: {
                                regionId: reg.id,
                                regionName: reg.name,
                                engName: reg.engName,
                                provinces: reg.subProvinces.map((p) => p.name),
                                stats: reg.stats,
                                safety: reg.safety
                              }
                            });
                          } else {
                            navigate('/intelligence', {
                              state: {
                                context: {
                                  type: 'region',
                                  name: reg.name,
                                  regionId: reg.id,
                                  engName: reg.engName,
                                  provinces: reg.subProvinces.map((p) => p.name),
                                  stats: reg.stats,
                                  safety: reg.safety
                                }
                              }
                            });
                          }
                        }}
                        className="group/chat relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                        style={getOutlineButtonStyle(theme)}
                      >
                        <span className="pointer-events-none absolute inset-[1px] rounded-[0.9rem] bg-[#111318] transition-colors duration-300 group-hover/chat:bg-white" />
                        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover/chat:text-black">
                          <MessageSquare size={16} /> Chat with AI
                        </span>
                      </button>
                    </div>
                    <RegionalIntelBar 
                      climate={{
                        ...climate,
                        onClick: () => {
                          setSelectedRegionForWeather(reg);
                          setIsWeatherModalOpen(true);
                        }
                      }} 
                      stability={stability} 
                      mobility={mobility} 
                      accentHex={accentHex} 
                      dimHex={theme.mapDimmed} 
                      toneRamp={theme.toneRamp} 
                    />
                  </div>
                </div>
              )}

              {isActive && mapMode === 'province' && (
                <div
                  ref={isActive ? provinceListRef : undefined}
                  className="custom-scrollbar mt-2 flex-1 min-h-0 overflow-y-auto pr-1 opacity-100"
                  style={{ maxHeight: 'calc(100% - 80px)' }}
                >
                  <div className="grid grid-cols-1 gap-4 pb-7 md:grid-cols-2 2xl:grid-cols-3">
                    {isActive && reg.subProvinces.length === 0 && loadingProvinceRegionId === reg.id ? (
                      <div className="col-span-3 py-10 text-center text-sm text-slate-500">กำลังโหลดจังหวัด...</div>
                    ) : (
                      (sortedProvincesByRegion.get(reg.id) || reg.subProvinces).map((prov) => {
                        const isSelected = selectedProvince?.id === prov.id;

                        return (
                          <div
                            key={prov.id}
                            ref={(el) => {
                              if (el) {
                                provinceCardRefs.current.set(prov.id, el);
                              } else {
                                provinceCardRefs.current.delete(prov.id);
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProvince(prov);
                            }}
                            className="group cursor-pointer overflow-hidden rounded-[1.15rem] border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:brightness-110"
                            style={getProvinceCardStyle(theme, isSelected)}
                          >
                            <div className="relative h-28 overflow-hidden">
                              <CachedImage
                                loading="lazy"
                                decoding="async"
                                src={prov.image}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                alt={getDisplayName(prov.name)}
                              />
                              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/15" />
                              <div className="absolute bottom-2 left-2 right-2">
                                <h3 className="text-lg font-bold text-white drop-shadow-md">{getDisplayName(prov.name)}</h3>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="mb-2 grid grid-cols-2 gap-2 text-[10px]" style={{ color: toRgba(getAccentColor(theme, 0.34), 0.84) }}>
                                <span className="flex items-center gap-1">
                                  <MapIcon size={10} /> {prov.dist} อำเภอ
                                </span>
                                <span className="flex items-center gap-1">
                                  <Grid size={10} /> {prov.tam} ตำบล
                                </span>
                                <span className="flex items-center gap-1">💰 {prov.dailyCost || '300 ฿'}</span>
                                <span className="flex items-center gap-1">🛡️ {prov.safety || 80}%</span>
                              </div>
                              {isSelected && (
                                <div className="animate-in slide-in-from-top-2 border-t pt-2" style={{ borderColor: toRgba(accentHex, 0.12) }}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onViewProvinceDetail && selectedRegionId) {
                                        onViewProvinceDetail(selectedRegionId, prov.id);
                                      }
                                    }}
                                    className="group flex w-full items-center justify-center gap-1 rounded-lg border py-1.5 text-xs font-bold text-white transition-all"
                                    style={getProvinceActionStyle(theme)}
                                  >
                                    View province detail
                                    <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Modals */}
      {selectedRegionForAQI && (
        <AQIModal 
          isOpen={isAQIModalOpen}
          onClose={() => setIsAQIModalOpen(false)}
          regionName={selectedRegionForAQI.name}
          provinces={aqiModalProvincesByRegion.get(selectedRegionForAQI.id) || []}
        />
      )}

      {selectedRegionForWeather && (
        <WeatherHistoryModal 
          isOpen={isWeatherModalOpen}
          onClose={() => setIsWeatherModalOpen(false)}
          provinceName={`${selectedRegionForWeather.name} Region`}
          regionId={selectedRegionForWeather.id}
          provinces={sortedProvincesByRegion.get(selectedRegionForWeather.id) || selectedRegionForWeather.subProvinces}
        />
      )}
    </section>
  );
});
