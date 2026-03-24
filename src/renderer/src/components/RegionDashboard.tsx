import { memo, useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Biohazard,
  Coins,
  ExternalLink,
  Grid,
  Map as MapIcon,
  MapPin,
  MessageSquare,
  Route,
  Shield,
  ShieldAlert,
  Skull,
  Wallet
} from 'lucide-react';
import { Region, Province } from '../data/regions';
import { regionTheme, type RegionId } from '../data/regionTheme';
import { DetailCard } from './DetailCard';
import { RegionalIntelBar, ClimateStatProps, MobilityStatProps, StabilityStatProps } from './RegionalIntelBar';
import { mixHex, toRgba } from '../utils/color';

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

const getRegionAccent = (theme: RegionThemeTokens) => theme.accentHex ?? theme.mapActive;

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
  color: toRgba(getTone(theme, 1), 0.9),
  borderColor: toRgba(getRegionAccent(theme), 0.16)
});

const getPanelSurfaceStyle = (theme: RegionThemeTokens, isActive: boolean): CSSProperties => ({
  background: isActive
    ? 'linear-gradient(180deg, rgba(12, 14, 18, 0.98) 0%, rgba(7, 9, 12, 1) 100%)'
    : 'linear-gradient(180deg, rgba(11, 13, 16, 0.98) 0%, rgba(6, 8, 11, 0.99) 100%)',
  borderColor: isActive ? toRgba(getRegionAccent(theme), 0.1) : 'rgba(255,255,255,0.04)'
});

const getCodeBadgeStyle = (theme: RegionThemeTokens): CSSProperties => ({
  background: `linear-gradient(135deg, ${toRgba(getTone(theme, 2), 0.88)} 0%, ${toRgba(getTone(theme, 1), 0.66)} 52%, ${toRgba(getTone(theme, 0), 0.58)} 100%)`,
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

const getDetailIconStyle = (): CSSProperties => ({
  color: 'rgba(226, 232, 240, 0.72)',
  background: 'rgba(27, 30, 35, 0.96)',
  borderColor: 'rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
});

const getDetailLabelStyle = (): CSSProperties => ({
  color: 'rgba(148, 163, 184, 0.78)'
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
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 30px ${toRgba(getTone(theme, 1), 0.2)}`
});

const getOutlineButtonStyle = (): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(18, 20, 24, 0.98) 0%, rgba(11, 13, 16, 0.98) 100%)',
  borderColor: 'rgba(255,255,255,0.1)',
  color: 'rgba(248,250,252,0.92)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 12px 22px rgba(0,0,0,0.16)'
});

const getModeButtonStyle = (theme: RegionThemeTokens, isProvinceMode: boolean): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(18, 20, 24, 0.98) 0%, rgba(11, 13, 16, 0.98) 100%)',
  borderColor: toRgba(getRegionAccent(theme), isProvinceMode ? 0.24 : 0.16),
  borderRadius: 9999,
  color: toRgba(getTone(theme, isProvinceMode ? 1 : 0), 0.92),
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 18px rgba(0,0,0,0.16)'
});

const getProvinceCardStyle = (theme: RegionThemeTokens, isSelected: boolean): CSSProperties => ({
  background: 'linear-gradient(180deg, rgba(12, 15, 19, 0.96) 0%, rgba(6, 8, 12, 0.92) 100%)',
  borderColor: isSelected ? toRgba(getRegionAccent(theme), 0.22) : 'rgba(255,255,255,0.08)',
  boxShadow: isSelected ? `0 14px 28px rgba(0,0,0,0.22)` : 'none'
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

export interface RegionDashboardProps {
  regions: Region[];
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
  const sortedProvincesByRegion = useMemo(() => {
    const map = new Map<string, Province[]>();
    for (const reg of regions) {
      map.set(reg.id, [...reg.subProvinces].sort((a, b) => a.name.localeCompare(b.name)));
    }
    return map;
  }, [regions]);

  useEffect(() => {
    if (mapMode !== 'province' || !selectedProvince) return;
    const target = provinceCardRefs.current.get(selectedProvince.id);
    if (!target || !provinceListRef.current) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [mapMode, selectedProvince?.id, selectedRegionId, regions]);

  return (
    <section className="relative flex flex-[3] flex-col overflow-hidden bg-[#020305]">
      {regions.map((reg) => {
        const isActive = selectedRegionId === reg.id;
        const climate = climateByRegion[reg.id] || climateByRegion.central;
        const mobility = mobilityByRegion[reg.id] || mobilityByRegion.central;
        const stability = getStabilityProps(reg.safety);
        const theme = getRegionTheme(reg.id);
        const accentHex = getRegionAccent(theme);
        const detailCards = [
          { key: 'ration', icon: <Coins />, label: 'Ration Cost', value: reg.stats.dailyCost, sub: 'Avg/Day', emphasis: 0.34 },
          { key: 'stash', icon: <Wallet />, label: 'Stash Value', value: reg.stats.monthlyCost, sub: 'Resources', emphasis: 0.3 },
          { key: 'contamination', icon: <Biohazard />, label: 'Contamination', value: 'Moderate', sub: 'Bio-Threat', emphasis: 0.16 },
          { key: 'hostiles', icon: <Skull />, label: 'Hostiles', value: 'High density', sub: 'Infecteds', emphasis: 0.1 },
          { key: 'safezones', icon: <ShieldAlert />, label: 'Safe Zones', value: reg.stats.attraction, sub: 'Secured', emphasis: 0.4 },
          { key: 'risk', icon: <Activity />, label: 'Risk Level', value: 'Critical', sub: 'Hot Zone', emphasis: 0.18 },
          { key: 'survival', icon: <Shield />, label: 'Survival Rate', value: `${reg.safety}%`, sub: 'Status', emphasis: 0.44 }
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
                        {reg.engName}
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
                    className="z-50 flex items-center gap-2 border px-4 py-2 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5"
                    style={getModeButtonStyle(theme, mapMode === 'province')}
                  >
                    {mapMode === 'province' ? <Grid size={14} /> : <MapPin size={14} />}
                    {mapMode === 'province' ? 'Threat Summary' : 'Scan Sectors'}
                  </button>
                )}
              </div>

              {isActive && mapMode === 'region' && (
                <div className="mt-1 flex-1 overflow-y-auto pr-1 opacity-100 md:pr-2">
                  <p className="mb-4 max-w-2xl border-l-2 pl-4 font-light leading-relaxed" style={getDescriptionStyle(theme)}>
                    {reg.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pb-3 xl:grid-cols-4">
                    {detailCards.map((item) => (
                      <DetailCard
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        value={item.value}
                        sub={item.sub}
                        className="border backdrop-blur-sm hover:bg-[#1a1d23]"
                        textClass="text-white"
                        iconClassName="border"
                        style={getDetailCardStyle()}
                        iconStyle={getDetailIconStyle()}
                        labelStyle={getDetailLabelStyle()}
                        valueStyle={getDetailValueStyle()}
                        subStyle={getDetailSubStyle()}
                      />
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-col gap-4 border-t pt-4 xl:flex-row" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/travel-guide/${reg.id}`);
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                        style={getFilledButtonStyle(theme)}
                      >
                        <Route size={16} /> Travel Guide
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
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                        style={getOutlineButtonStyle()}
                      >
                        <MessageSquare size={16} /> Chat with AI
                      </button>
                    </div>
                    <RegionalIntelBar climate={climate} stability={stability} mobility={mobility} accentHex={accentHex} dimHex={theme.mapDimmed} toneRamp={theme.toneRamp} />
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
                                    Tactical Map
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
    </section>
  );
});
