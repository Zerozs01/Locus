import { useState, useEffect } from 'react';
import { X, RefreshCw, Star, MapPin, Clock, ExternalLink } from 'lucide-react';

interface ExploreDetailModalProps {
  place: any;
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: (updatedPlace: any) => void;
}

export const ExploreDetailModal = ({ place, isOpen, onClose, onSyncComplete }: ExploreDetailModalProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(place);

  useEffect(() => {
    setCurrentPlace(place);
  }, [place]);

  if (!isOpen || !currentPlace) return null;

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      const updatedData = await window.api.explorePlaces.scrapeSinglePlace(currentPlace.id);
      if (updatedData) {
        setCurrentPlace(updatedData);
        if (onSyncComplete) onSyncComplete(updatedData);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Parse images if stored as JSON array string, else put in array
  let imageAlbumUrls: string[] = [];
  try {
    if (currentPlace.fullImageUrl) {
      if (currentPlace.fullImageUrl.startsWith('[')) {
        imageAlbumUrls = JSON.parse(currentPlace.fullImageUrl);
      } else {
        imageAlbumUrls = currentPlace.fullImageUrl.split(',').map((u: string) => u.trim());
      }
    } else if (currentPlace.thumbnailUrl) {
      imageAlbumUrls = [currentPlace.thumbnailUrl];
    }
  } catch {
    if (currentPlace.fullImageUrl) {
      imageAlbumUrls = [currentPlace.fullImageUrl];
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-[#0b0e14] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin size={20} className="text-cyan-400" />
              {currentPlace.title}
            </h2>
            {currentPlace.category && (
              <span className="text-xs text-cyan-400/80 mt-1 uppercase tracking-wider">{currentPlace.category}</span>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          
          {/* Left Column: Info & Sync */}
          <div className="w-full md:w-1/3 p-6 border-r border-white/10 flex flex-col gap-6 overflow-y-auto bg-black/20">
            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isSyncing 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:scale-[1.02] active:scale-95'
              }`}
            >
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'SYNCHRONIZING TACTICAL INTEL...' : 'SYNC INTEL'}
            </button>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{currentPlace.rating || 'Intel Pending'}</span>
                  {currentPlace.reviewCount && <span className="text-xs text-slate-500">({currentPlace.reviewCount} reviews)</span>}
                </div>
                
                <div className="flex items-start gap-2 text-slate-300 mt-4">
                  <Clock size={16} className="mt-0.5 text-emerald-400 shrink-0" />
                  <span className="text-sm font-medium">{currentPlace.openingHours || 'Intel Pending'}</span>
                </div>
              </div>

              {currentPlace.description && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentPlace.description}
                  </p>
                </div>
              )}
            </div>

            {currentPlace.sourceUrl && (
              <a 
                href={currentPlace.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                className="mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors border border-white/5 text-sm font-medium"
              >
                <ExternalLink size={16} />
                Open Map Coordinates
              </a>
            )}
          </div>

          {/* Right Column: Pinterest Grid */}
          <div className="w-full md:w-2/3 p-4 overflow-y-auto custom-scrollbar">
            {imageAlbumUrls.length > 0 ? (
              <div className="columns-2 md:columns-3 gap-3 space-y-3">
                {imageAlbumUrls.map((url, index) => (
                  <div key={index} className="break-inside-avoid overflow-hidden rounded-xl bg-slate-900 border border-slate-800/50 group cursor-pointer shadow-lg shadow-black/50">
                    <img 
                      src={url} 
                      alt={`Album element ${index}`} 
                      className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full min-h-[300px] rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 bg-white/[0.01]">
                <MapPin size={48} className="mb-4 opacity-20" />
                <p className="font-medium text-sm">NO VISUAL INTEL AVAILABLE</p>
                <p className="text-xs opacity-60 mt-1">Click Sync Intel to retrieve data</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
