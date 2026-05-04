import React, { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin, LocateFixed, Navigation, Sparkles, Loader2, Info, Bus, Car, Bike, Footprints } from 'lucide-react';

interface SearchPlace {
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  source: 'local' | 'geocode';
}

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (routeContext: {
    originLat: number;
    originLng: number;
    destLat: number;
    destLng: number;
    estimatedDistanceKm: number;
    estimatedDurationMin: number;
    source: 'quick_search';
  }) => void;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [startQuery, setStartQuery] = useState('');
  const [endQuery, setEndQuery] = useState('');
  const [startPoint, setStartPoint] = useState<SearchPlace | null>(null);
  const [endPoint, setEndPoint] = useState<SearchPlace | null>(null);
  const [suggestions, setSuggestions] = useState<SearchPlace[]>([]);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const searchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStartQuery('');
      setEndQuery('');
      setStartPoint(null);
      setEndPoint(null);
      setSuggestions([]);
      setRouteInfo(null);
    }
  }, [isOpen]);

  const handleSearch = async (query: string, field: 'start' | 'end') => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ' Thailand')}&limit=5&addressdetails=1&accept-language=th,en`;
      const res = await fetch(url);
      const data = await res.json();
      
      const results: SearchPlace[] = data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        title: item.display_name.split(',')[0],
        subtitle: item.display_name,
        source: 'geocode'
      }));
      
      setSuggestions(results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onQueryChange = (val: string, field: 'start' | 'end') => {
    if (field === 'start') setStartQuery(val);
    else setEndQuery(val);
    
    setActiveField(field);

    if (searchTimeoutRef.current) window.clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = window.setTimeout(() => {
      handleSearch(val, field);
    }, 500);
  };

  const selectPlace = (place: SearchPlace) => {
    if (activeField === 'start') {
      setStartPoint(place);
      setStartQuery(place.title);
    } else {
      setEndPoint(place);
      setEndQuery(place.title);
    }
    setSuggestions([]);
    setActiveField(null);
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const place: SearchPlace = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            title: 'My Current Location',
            source: 'local'
          };
          setStartPoint(place);
          setStartQuery(place.title);
          setIsLocating(false);
        },
        (error) => {
          setIsLocating(false);
          let errorMsg = 'Could not get location';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location permission denied. Please search manually.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'Location provider error (403/Unreachable). Please search manually.';
          }
          alert(errorMsg);
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    }
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      calculateRoute(startPoint, endPoint);
    } else {
      setRouteInfo(null);
    }
  }, [startPoint, endPoint]);

  const calculateRoute = async (start: SearchPlace, end: SearchPlace) => {
    setIsCalculating(true);
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.code === 'Ok' && data.routes.length > 0) {
        setRouteInfo({
          distance: data.routes[0].distance,
          duration: data.routes[0].duration
        });
      } else {
        // Haversine fallback
        const dist = haversineDistance(start.lat, start.lng, end.lat, end.lng);
        setRouteInfo({
          distance: dist * 1000,
          duration: (dist / 60) * 3600 // Estimate 60km/h
        });
      }
    } catch (err) {
       const dist = haversineDistance(start.lat, start.lng, end.lat, end.lng);
       setRouteInfo({
         distance: dist * 1000,
         duration: (dist / 60) * 3600
       });
    } finally {
      setIsCalculating(false);
    }
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleConfirm = () => {
    if (!startPoint || !endPoint || !routeInfo) return;
    
    onConfirm({
      originLat: startPoint.lat,
      originLng: startPoint.lng,
      destLat: endPoint.lat,
      destLng: endPoint.lng,
      estimatedDistanceKm: routeInfo.distance / 1000,
      estimatedDurationMin: routeInfo.duration / 60,
      source: 'quick_search'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0b1018] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3 text-cyan-400">
            <Sparkles size={20} />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Quick Route Analysis</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Start Point */}
          <div className="space-y-2 relative">
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
              <span>Origin Point</span>
              {isLocating && <span className="text-cyan-500 animate-pulse">Locating...</span>}
            </label>
            <div className="relative group">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input 
                type="text"
                value={startQuery}
                onChange={(e) => onQueryChange(e.target.value, 'start')}
                placeholder="Where are you starting from?"
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button 
                onClick={handleLocateMe}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                title="Use current location"
              >
                <LocateFixed size={16} />
              </button>
            </div>
          </div>

          {/* End Point */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Destination Point</label>
            <div className="relative group">
              <Navigation size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" />
              <input 
                type="text"
                value={endQuery}
                onChange={(e) => onQueryChange(e.target.value, 'end')}
                placeholder="Where are you going?"
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50 transition-all"
              />
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="mt-1 bg-[#15181e] border border-white/10 rounded-xl overflow-hidden shadow-xl max-h-48 overflow-y-auto">
              {suggestions.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPlace(p)}
                  className="w-full px-4 py-2 text-left hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors"
                >
                  <div className="text-sm font-medium text-white truncate">{p.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">{p.subtitle}</div>
                </button>
              ))}
            </div>
          )}

          {/* Route Summary */}
          {(routeInfo || isCalculating) && (
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-cyan-500/10">
              {isCalculating ? (
                <div className="flex items-center justify-center gap-3 text-cyan-400 py-2 text-sm">
                  <Loader2 size={16} className="animate-spin" /> Calculating route...
                </div>
              ) : routeInfo && (
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white">
                      {routeInfo.duration > 3600 
                        ? `${Math.floor(routeInfo.duration / 3600)} hr ${Math.round((routeInfo.duration % 3600) / 60)} min`
                        : `${Math.round(routeInfo.duration / 60)} min`}
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {(routeInfo.distance / 1000).toFixed(1)} KM • EST. TRAVEL TIME
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                      <Car size={20} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            disabled={!startPoint || !endPoint || isCalculating}
            onClick={handleConfirm}
            className="flex-2 flex-[2] px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95"
          >
            Send to Locus Agent
          </button>
        </div>
      </div>
    </div>
  );
};
