import React, { useMemo } from 'react';
import { Sparkles, ArrowRight, Calendar, Bell } from 'lucide-react';
import { HOLIDAYS, Holiday } from '../data/holidayData';

export const UpcomingEventBanner: React.FC = () => {
  const nextEvent = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    // Find the next upcoming holiday (including today)
    const upcoming = HOLIDAYS
      .filter(h => h.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))[0];
    
    if (!upcoming) return null;

    // Calculate days remaining
    const eventDate = new Date(upcoming.date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { ...upcoming, daysRemaining: diffDays };
  }, []);

  if (!nextEvent) return null;

  const getTheme = (type: Holiday['type']) => {
    switch (type) {
      case 'religious': return 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400';
      case 'chinese': return 'from-rose-500/20 via-red-500/10 to-transparent border-rose-500/30 text-rose-400';
      case 'public': return 'from-blue-500/20 via-indigo-500/10 to-transparent border-blue-500/30 text-blue-400';
      default: return 'from-purple-500/20 via-fuchsia-500/10 to-transparent border-purple-500/30 text-purple-400';
    }
  };

  const theme = getTheme(nextEvent.type);

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] border bg-gradient-to-r ${theme} p-5 transition-all hover:scale-[1.01] hover:shadow-xl`}>
      {/* Background Decor */}
      <div className="absolute -right-6 -top-6 rotate-12 opacity-10">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
            <Bell size={24} className="animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Next Upcoming Event</span>
              {nextEvent.daysRemaining <= 7 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[8px] font-black text-white animate-pulse">COMING SOON</span>
              )}
            </div>
            <h2 className="text-lg font-black tracking-tight text-white">
              {nextEvent.name}
              <span className="ml-2 text-xs font-medium opacity-60">({nextEvent.nameEn})</span>
            </h2>
            <div className="mt-1 flex items-center gap-3 text-[11px] font-bold">
              <div className="flex items-center gap-1 opacity-80">
                <Calendar size={12} />
                <span>{nextEvent.date}</span>
              </div>
              <div className="h-3 w-[1px] bg-white/20" />
              <span className="text-white">
                {nextEvent.daysRemaining === 0 ? 'วันนี้!' : `อีก ${nextEvent.daysRemaining} วัน`}
              </span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-black text-white backdrop-blur-md transition-all hover:bg-white/20">
          VIEW DETAILS
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
