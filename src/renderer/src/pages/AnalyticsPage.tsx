import { useState, useEffect, useMemo } from 'react';
import {
  Activity, 
  Database, 
  Map, 
  Users, 
  Shield, 
  TrendingUp,
  Clock,
  Zap,
  Globe,
  Server,
  HardDrive,
  Bot,
  RefreshCw,
  MapPin,
  BarChart3,
  PieChart,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { pingAgent } from '../services/n8nClient';
import { Region } from '../../../shared/types';
import { measureAsync } from '../utils/perf';

interface SystemStats {
  database: {
    regions: number;
    provinces: number;
    stats: number;
    dbPath: string;
  } | null;
  agent: 'online' | 'offline' | 'checking';
  network: boolean;
  lastUpdated: Date | null;
}

interface ActivityItem {
  id: string;
  type: 'view' | 'search' | 'chat' | 'system';
  message: string;
  timestamp: Date;
  icon: React.ReactNode;
}

/**
 * Analytics Page - System health, statistics, and monitoring
 */
export const AnalyticsPage = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    database: null,
    agent: 'checking',
    network: navigator.onLine,
    lastUpdated: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activities] = useState<ActivityItem[]>([
    { id: '1', type: 'system', message: 'Application started', timestamp: new Date(), icon: <Zap size={14} /> },
    { id: '2', type: 'system', message: 'Database connected', timestamp: new Date(Date.now() - 1000), icon: <Database size={14} /> },
    { id: '3', type: 'view', message: 'Loaded region data', timestamp: new Date(Date.now() - 2000), icon: <Map size={14} /> },
  ]);

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    
    // Load regions from DB
    try {
      if (window.api?.db?.getRegions) {
        const data = await measureAsync('db:getRegions@AnalyticsPage', () => window.api.db.getRegions());
        setRegions(data);
      }
    } catch (error) {
      console.error('Failed to load regions:', error);
    }

    // Load DB stats
    try {
      if (window.api?.db?.getStats) {
        const stats = await measureAsync('db:getStats@AnalyticsPage', () => window.api.db.getStats());
        setSystemStats(prev => ({ ...prev, database: stats }));
      }
    } catch (error) {
      console.error('Failed to load DB stats:', error);
    }

    // Check agent status
    try {
      const agentOnline = await measureAsync('pingAgent@AnalyticsPage', () => pingAgent());
      setSystemStats(prev => ({ ...prev, agent: agentOnline ? 'online' : 'offline' }));
    } catch {
      setSystemStats(prev => ({ ...prev, agent: 'offline' }));
    }

    setSystemStats(prev => ({ ...prev, lastUpdated: new Date(), network: navigator.onLine }));
    setIsLoading(false);
  };

  // Computed statistics
  const regionStats = useMemo(() => {
    if (regions.length === 0) return null;
    
    const totalProvinces = regions.reduce((sum, r) => sum + r.subProvinces.length, 0);
    const avgSafety = Math.round(regions.reduce((sum, r) => sum + r.safety, 0) / regions.length);
    const totalArea = regions.reduce((sum, r) => {
      if (typeof r.summary.areaValue === 'number') return sum + r.summary.areaValue;
      const area = parseFloat(r.summary.area.replace(/,/g, '')) || 0;
      return sum + area;
    }, 0);
    const totalPop = regions.reduce((sum, r) => {
      if (typeof r.summary.popValue === 'number') return sum + r.summary.popValue;
      const pop = r.summary.pop.replace('M', '');
      return sum + (parseFloat(pop) || 0) * 1000000;
    }, 0);
    
    // Find safest & least safe regions
    const sortedBySafety = [...regions].sort((a, b) => b.safety - a.safety);
    
    return {
      totalProvinces,
      avgSafety,
      totalArea: totalArea.toLocaleString(),
      totalPop: (totalPop / 1000000).toFixed(1),
      safestRegion: sortedBySafety[0],
      leastSafeRegion: sortedBySafety[sortedBySafety.length - 1],
      regionCount: regions.length
    };
  }, [regions]);

  // Province distribution by region
  const provinceDistribution = useMemo(() => {
    return regions.map(r => ({
      name: r.engName,
      count: r.subProvinces.length,
      color: r.color,
      safety: r.safety
    })).sort((a, b) => b.count - a.count);
  }, [regions]);

  return (
    <div className="flex-1 bg-[#050608] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics & Status</h1>
              <p className="text-slate-400 text-sm">System health, statistics, and monitoring</p>
            </div>
          </div>
          
          <button
            onClick={loadAllData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-slate-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatusCard 
            icon={<Database size={20} />}
            label="Database"
            value={systemStats.database ? 'Connected' : 'Checking...'}
            status={systemStats.database ? 'success' : 'loading'}
            detail={systemStats.database ? `${systemStats.database.provinces} provinces` : undefined}
          />
          <StatusCard 
            icon={<Bot size={20} />}
            label="AI Agent"
            value={systemStats.agent === 'online' ? 'Online' : systemStats.agent === 'checking' ? 'Checking...' : 'Offline'}
            status={systemStats.agent === 'online' ? 'success' : systemStats.agent === 'checking' ? 'loading' : 'warning'}
            detail="n8n + Gemini"
          />
          <StatusCard 
            icon={systemStats.network ? <Wifi size={20} /> : <WifiOff size={20} />}
            label="Network"
            value={systemStats.network ? 'Connected' : 'Offline'}
            status={systemStats.network ? 'success' : 'warning'}
            detail={systemStats.network ? 'Internet active' : 'Local only'}
          />
          <StatusCard 
            icon={<Clock size={20} />}
            label="Last Update"
            value={systemStats.lastUpdated ? systemStats.lastUpdated.toLocaleTimeString('th-TH') : '--:--'}
            status="info"
            detail={systemStats.lastUpdated?.toLocaleDateString('th-TH')}
          />
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Overview Stats */}
          <div className="col-span-2 bg-[#0a0c10] rounded-2xl border border-white/5 p-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <BarChart3 size={16} className="text-amber-400" />
              Thailand Overview
            </h2>
            
            {regionStats ? (
              <div className="grid grid-cols-4 gap-4">
                <StatBox 
                  icon={<Globe size={18} />}
                  label="Regions"
                  value={regionStats.regionCount.toString()}
                  color="text-cyan-400"
                />
                <StatBox 
                  icon={<MapPin size={18} />}
                  label="Provinces"
                  value={regionStats.totalProvinces.toString()}
                  color="text-emerald-400"
                />
                <StatBox 
                  icon={<Shield size={18} />}
                  label="Avg Safety"
                  value={`${regionStats.avgSafety}%`}
                  color="text-amber-400"
                />
                <StatBox 
                  icon={<Users size={18} />}
                  label="Population"
                  value={`${regionStats.totalPop}M`}
                  color="text-pink-400"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-slate-500">
                <RefreshCw size={20} className="animate-spin mr-2" />
                Loading statistics...
              </div>
            )}

            {/* Safety Highlights */}
            {regionStats && (
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase">Safest Region</span>
                  </div>
                  <div className="text-lg font-bold text-white">{regionStats.safestRegion?.name}</div>
                  <div className="text-sm text-slate-400">Safety Score: {regionStats.safestRegion?.safety}%</div>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase">Needs Attention</span>
                  </div>
                  <div className="text-lg font-bold text-white">{regionStats.leastSafeRegion?.name}</div>
                  <div className="text-sm text-slate-400">Safety Score: {regionStats.leastSafeRegion?.safety}%</div>
                </div>
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-[#0a0c10] rounded-2xl border border-white/5 p-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-slate-400">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{activity.message}</div>
                    <div className="text-xs text-slate-500">
                      {activity.timestamp.toLocaleTimeString('th-TH')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Province Distribution */}
        <div className="bg-[#0a0c10] rounded-2xl border border-white/5 p-6 mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <PieChart size={16} className="text-purple-400" />
            Province Distribution by Region
          </h2>
          
          <div className="grid grid-cols-6 gap-4">
            {provinceDistribution.map(region => (
              <RegionStatCard 
                key={region.name}
                name={region.name}
                count={region.count}
                safety={region.safety}
                color={region.color}
              />
            ))}
          </div>
        </div>

        {/* Database Info */}
        {systemStats.database && (
          <div className="bg-[#0a0c10] rounded-2xl border border-white/5 p-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <HardDrive size={16} className="text-blue-400" />
              Database Information
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <InfoItem label="Regions Table" value={`${systemStats.database.regions} records`} />
              <InfoItem label="Provinces Table" value={`${systemStats.database.provinces} records`} />
              <InfoItem label="Stats Table" value={`${systemStats.database.stats} records`} />
              <InfoItem label="Database File" value={systemStats.database.dbPath.split(/[/\\]/).pop() || 'locus.db'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== HELPER COMPONENTS ====================

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error' | 'loading' | 'info';
  detail?: string;
}

const StatusCard = ({ icon, label, value, status, detail }: StatusCardProps) => {
  const statusColors = {
    success: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    warning: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400',
    error: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
    loading: 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400',
    info: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400'
  };

  return (
    <div className={`bg-gradient-to-br ${statusColors[status]} rounded-xl border p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={statusColors[status].split(' ').pop()}>{icon}</div>
        <span className="text-xs font-bold text-slate-400 uppercase">{label}</span>
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
      {detail && <div className="text-xs text-slate-500 mt-1">{detail}</div>}
    </div>
  );
};

interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const StatBox = ({ icon, label, value, color }: StatBoxProps) => (
  <div className="bg-[#0f1115] rounded-xl p-4 border border-white/5">
    <div className={`${color} mb-2`}>{icon}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs text-slate-500 uppercase">{label}</div>
  </div>
);

interface RegionStatCardProps {
  name: string;
  count: number;
  safety: number;
  color: string;
}

const RegionStatCard = ({ name, count, safety, color }: RegionStatCardProps) => {
  // Extract color class for background
  const bgColor = color.replace('text-', 'bg-').replace('-400', '-500/20');
  const borderColor = color.replace('text-', 'border-').replace('-400', '-500/30');
  
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-4 text-center`}>
      <div className="text-2xl font-bold text-white mb-1">{count}</div>
      <div className="text-xs text-slate-400 uppercase mb-2">{name}</div>
      <div className="flex items-center justify-center gap-1">
        <Shield size={12} className={color} />
        <span className={`text-xs font-bold ${color}`}>{safety}%</span>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#0f1115] rounded-lg p-3 border border-white/5">
    <div className="text-xs text-slate-500 mb-1">{label}</div>
    <div className="text-sm font-mono text-white truncate" title={value}>{value}</div>
  </div>
);
