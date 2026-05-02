import React, { useEffect, useState } from 'react';
import { X, Star, TrendingUp, MapPin, RefreshCw } from 'lucide-react';

interface PopularProvince {
  provinceId: string;
  provinceName: string;
  regionId: string;
  visitorCount: number;
  popularityFactors?: string;
  lastUpdated?: string;
}

interface PopularProvincePopupProps {
  regionId: string;
  regionName: string;
  onClose: () => void;
  onSelectProvince: (provinceName: string) => void;
}

export const PopularProvincePopup: React.FC<PopularProvincePopupProps> = ({
  regionId,
  regionName,
  onClose,
  onSelectProvince,
}) => {
  const [provinces, setProvinces] = useState<PopularProvince[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularProvinces = async () => {
      if (!window.api?.db?.getPopularProvinces) {
        setError('API not available');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await window.api.db.getPopularProvinces(regionId, 100);
        setProvinces(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProvinces();
  }, [regionId]);

  const formatVisitorCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  const getRankIcon = (index: number): React.ReactNode => {
    switch (index) {
      case 0:
        return <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
      case 1:
        return <Star className="w-4 h-4 text-gray-300 fill-gray-300" />;
      case 2:
        return <Star className="w-4 h-4 text-amber-600 fill-amber-600" />;
      default:
        return <span className="w-4 h-4 text-xs text-gray-500 font-mono">#{index + 1}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg mx-4 bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
        style={{ animationFillMode: 'both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Popular Provinces</h2>
              <p className="text-xs text-gray-400 capitalize">{regionName} Region</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const fetchPopularProvinces = async () => {
                  try {
                    setLoading(true);
                    const result = await window.api.db.getPopularProvinces(regionId, 100);
                    setProvinces(result);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to refresh');
                  } finally {
                    setLoading(false);
                  }
                };
                fetchPopularProvinces();
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              title="Refresh tourism stats"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-4">
          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              <span className="ml-3 text-sm text-gray-400">Loading provinces...</span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-red-400 mb-2">{error}</p>
              <button
                onClick={() => {
                  const fetchPopularProvinces = async () => {
                    try {
                      setLoading(true);
                      const result = await window.api.db.getPopularProvinces(regionId, 100);
                      setProvinces(result);
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Failed to retry');
                    } finally {
                      setLoading(false);
                    }
                  };
                  fetchPopularProvinces();
                }}
                className="text-xs text-amber-400 hover:text-amber-300 underline"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && provinces.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <MapPin className="w-10 h-10 text-gray-600 mb-3" />
              <p className="text-sm text-gray-400">No popular provinces data available</p>
              <p className="text-xs text-gray-500 mt-1">Run the tourism scraper to collect data</p>
            </div>
          )}

          {!loading && !error && provinces.length > 0 && (
            <div className="space-y-2">
              {provinces.map((province, index) => (
                <button
                  key={province.provinceId}
                  onClick={() => {
                    onSelectProvince(province.provinceName);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#16181d] hover:bg-[#1c1f24] border border-white/5 hover:border-amber-500/30 transition-all group"
                >
                  {/* Rank Icon */}
                  <div className="flex items-center justify-center w-8 h-8 shrink-0">
                    {getRankIcon(index)}
                  </div>

                  {/* Province Info */}
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-amber-300 transition-colors">
                      {province.provinceName}
                    </p>
                    {province.popularityFactors && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {province.popularityFactors}
                      </p>
                    )}
                  </div>

                  {/* Visitor Count */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm font-mono text-gray-300">
                      {formatVisitorCount(province.visitorCount)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 bg-[#0a0c10] flex flex-col gap-1">
          <p className="text-[10px] text-gray-500 text-center uppercase tracking-wider">
            Source: MOTS Thailand tourism statistics
          </p>
          {provinces.length > 0 && provinces[0].lastUpdated && (
            <p className="text-[9px] text-gray-600 text-center">
              Data synchronized: {new Date(provinces[0].lastUpdated).toLocaleString('th-TH')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
