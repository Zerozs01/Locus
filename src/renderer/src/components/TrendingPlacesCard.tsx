import React, { useEffect, useState } from 'react';
import { TrendingUp, Star, MessageSquare, CheckCircle2, Sparkles, Users } from 'lucide-react';
import type { TrendingPlace } from '../../../shared/types';
import { CachedImage } from './CachedImage';

interface TrendingPlacesCardProps {
  limit?: number;
  onClick?: (place: TrendingPlace) => void;
}

export const TrendingPlacesCard: React.FC<TrendingPlacesCardProps> = ({ 
  limit = 5,
  onClick 
}) => {
  const [places, setPlaces] = useState<TrendingPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('week');
  const [expandedPlaceId, setExpandedPlaceId] = useState<string | null>(null);

  const fetchTrendingPlaces = async (currentLimit: number, currentTimeframe: string) => {
    try {
      setLoading(true);
      setError(null);

      // Wait for preload bridge
      let win = window as any;
      let retries = 0;
      while (!win?.api?.db?.getTrendingPlaces && !win?.electron?.ipcRenderer?.invoke && retries < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        win = window as any;
        retries++;
      }

      const api = win?.api;
      const electronInvoke = win?.electron?.ipcRenderer?.invoke;

      let result: any;
      if (api?.db?.getTrendingPlaces) {
        result = await api.db.getTrendingPlaces(currentLimit, currentTimeframe);
      } else if (electronInvoke) {
        result = await electronInvoke('get-trending-places', currentLimit, currentTimeframe);
      } else {
        setError('API not available');
        return;
      }

      setPlaces(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error('❌ TrendingPlacesCard: Error:', err);
      setError('Failed to load trends');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPlaces(limit, timeframe);
  }, [limit, timeframe]);

  const formatScore = (score: number): string => {
    return score.toFixed(1);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8.0) return 'text-emerald-400';
    if (score >= 6.0) return 'text-cyan-400';
    if (score >= 4.0) return 'text-amber-400';
    return 'text-gray-400';
  };

  const timeframes: { id: 'today' | 'week' | 'month'; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
  ];

  return (
    <div className="bg-tactical-card border border-zinc-800 rounded-2xl p-5 shadow-xl card-hover h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-zinc-800 rounded-md text-zinc-400">
            <TrendingUp size={16} />
          </div>
          <h3 className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
            Trending {timeframe}
          </h3>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id)}
              className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                timeframe === tf.id 
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-[10px] font-medium text-zinc-500 animate-pulse">Analyzing trends...</span>
          </div>
        ) : error ? (
          <div className="py-8 flex flex-col items-center justify-center border border-dashed border-red-900/30 rounded-xl bg-red-900/5">
            <span className="text-[10px] text-red-400/80 text-center px-4">{error}</span>
          </div>
        ) : places.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center border border-dashed border-zinc-800/50 rounded-xl bg-zinc-900/20">
            <span className="text-[10px] text-zinc-600 italic">No activity detected for this period</span>
          </div>
        ) : (
          <div className="space-y-3">
            {places.map((place, idx) => (
              <div key={place.id} className="flex flex-col gap-1">
                <div
                  onClick={() => onClick?.(place)}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/50 hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Rank Badge */}
                  <div className="flex items-center justify-center w-6 h-6 shrink-0 rounded-lg bg-zinc-800 border border-zinc-700 text-[10px] font-black text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    {idx + 1}
                  </div>

                  {/* Image */}
                  <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg border border-zinc-800 shadow-inner">
                    {place.thumbnailUrl ? (
                      <CachedImage
                        src={place.thumbnailUrl}
                        alt={place.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h4 className="text-[11px] font-bold text-zinc-100 truncate group-hover:text-white transition-colors">
                        {place.title}
                      </h4>
                      {place.isTrending && (
                        <div className="flex items-center shrink-0">
                          <Sparkles size={10} className="text-cyan-400 animate-pulse" />
                        </div>
                      )}
                    </div>
                    <p className="text-[9px] text-zinc-500 truncate mb-1.5 font-medium">{place.locationName || 'Unknown Location'}</p>
                    
                    <div className="flex items-center gap-2.5">
                      {typeof place.rating === 'number' && place.rating > 0 && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-amber-400/90">
                          <Star size={9} className="fill-amber-400" />
                          {place.rating.toFixed(1)}
                        </span>
                      )}
                      {typeof place.reviewCount === 'number' && place.reviewCount > 0 && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-zinc-400">
                          <MessageSquare size={9} className="text-zinc-500" />
                          {place.reviewCount > 999 ? `${(place.reviewCount/1000).toFixed(1)}k` : place.reviewCount}
                        </span>
                      )}
                      {timeframe === 'today' && typeof place.checkinCount === 'number' && place.checkinCount > 0 && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400" title="Check-ins Today">
                          <Users size={9} />
                          {place.checkinCount}
                        </span>
                      )}
                      {timeframe === 'week' && typeof place.recencyGrowth === 'number' && place.recencyGrowth > 0 && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400" title="New Reviews this Week">
                          <TrendingUp size={9} />
                          +{place.recencyGrowth}
                        </span>
                      )}
                      {timeframe === 'month' && typeof place.reviewCount === 'number' && place.reviewCount > 0 && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400" title="Active Visitors">
                          <Users size={9} />
                          {Math.floor(place.reviewCount * 0.1)} 
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedPlaceId(expandedPlaceId === place.id ? null : place.id);
                    }}
                    className="flex flex-col items-end shrink-0 z-10 bg-zinc-900/60 px-2 py-1 rounded-lg border border-zinc-800/80 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all cursor-help"
                  >
                    <div className={`text-[13px] font-black leading-none ${getScoreColor(place.trendingScore)}`}>
                      {formatScore(place.trendingScore)}
                    </div>
                    <span className="text-[7px] font-black text-zinc-600 uppercase tracking-tighter mt-1">Score</span>
                  </div>
                </div>

                {/* Score Breakdown Popover */}
                {expandedPlaceId === place.id && place.scoreBreakdown && (
                  <div className="mx-2 p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Score Breakdown</span>
                      <button onClick={() => setExpandedPlaceId(null)} className="text-zinc-500 hover:text-white">
                        <CheckCircle2 size={12} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500">Rating (20%)</span>
                        <span className="text-amber-400 font-bold">{place.scoreBreakdown.rating.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-1">
                        <div className="bg-amber-400 h-1 rounded-full" style={{ width: `${(place.scoreBreakdown.rating / 5) * 100}%` }} />
                      </div>
                      
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500">Volume (40%)</span>
                        <span className="text-cyan-400 font-bold">{place.scoreBreakdown.volume.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-1">
                        <div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${(place.scoreBreakdown.volume / 5) * 100}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-zinc-500">Growth (40%)</span>
                        <span className="text-emerald-400 font-bold">{place.scoreBreakdown.growth.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-1">
                        <div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${(place.scoreBreakdown.growth / 5) * 100}%` }} />
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-zinc-700/50 flex justify-end">
                       <button 
                        onClick={() => onClick?.(place)}
                        className="text-[9px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                       >
                         WARP TO PROVINCE <Sparkles size={10} />
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
