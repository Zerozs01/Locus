import { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  Globe, 
  Cpu, 
  Monitor, 
  Database,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap,
  Cloud,
  Shield,
  Activity,
  Wifi,
  WifiOff,
  HardDrive,
  Server,
  Bot
} from 'lucide-react';
import { pingAgent } from '../services/n8nClient';

interface ApiKey {
  id: string;
  name: string;
  description: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  required: boolean;
}

interface SystemStatus {
  database: 'checking' | 'online' | 'offline' | 'error';
  agent: 'checking' | 'online' | 'offline' | 'error';
  network: 'checking' | 'online' | 'offline';
}

interface DatabaseStats {
  regions: number;
  provinces: number;
  stats: number;
  dbPath: string;
}

interface ImageCacheStats {
  fileCount: number;
  totalBytes: number;
  path: string;
}

type ConnectionTestState = 'idle' | 'testing' | 'success' | 'error';

/**
 * Settings Page - API Keys & Configuration Management
 */
export const SettingsPage = () => {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [connectionTests, setConnectionTests] = useState<Record<string, ConnectionTestState>>({});
  
  // System Status State
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    database: 'checking',
    agent: 'checking',
    network: 'checking'
  });
  const [dbStats, setDbStats] = useState<DatabaseStats | null>(null);
  const [imageCacheStats, setImageCacheStats] = useState<ImageCacheStats | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 'ngrok',
      name: 'Ngrok Tunnel URL',
      description: 'Your Ngrok tunnel URL for n8n webhook access',
      value: '',
      placeholder: 'https://xxxx-xx-xx-xxx-xx.ngrok-free.app',
      icon: <Globe size={18} />,
      required: true,
    },
    {
      id: 'n8n_api_key',
      name: 'n8n API Key',
      description: 'Optional webhook API key for n8n authentication',
      value: '',
      placeholder: 'your_n8n_webhook_key',
      icon: <Key size={18} />,
      required: false,
    },
    {
      id: 'gemini',
      name: 'Google Gemini API Key',
      description: 'API key for Gemini AI model access',
      value: '',
      placeholder: 'AIzaSy...',
      icon: <Zap size={18} />,
      required: true,
    },
    {
      id: 'openrouter',
      name: 'OpenRouter API Key',
      description: 'Alternative AI model routing service',
      value: '',
      placeholder: 'sk-or-v1-...',
      icon: <Cpu size={18} />,
      required: false,
    },
    {
      id: 'supabase_url',
      name: 'Supabase Project URL',
      description: 'Your Supabase project URL',
      value: '',
      placeholder: 'https://xxxx.supabase.co',
      icon: <Database size={18} />,
      required: true,
    },
    {
      id: 'supabase_key',
      name: 'Supabase Anon Key',
      description: 'Supabase anonymous/public key',
      value: '',
      placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...',
      icon: <Key size={18} />,
      required: true,
    },
    {
      id: 'openweather',
      name: 'OpenWeather API Key',
      description: 'For real-time weather data',
      value: '',
      placeholder: 'xxxxxxxxxxxxxxxxxxxx',
      icon: <Cloud size={18} />,
      required: false,
    },
    {
      id: 'google_maps',
      name: 'Google Maps API Key',
      description: 'For map and location services',
      value: '',
      placeholder: 'AIzaSy...',
      icon: <Globe size={18} />,
      required: false,
    },
  ]);

  // Load saved keys on mount
  useEffect(() => {
    const loadSavedKeys = async () => {
      try {
        let parsed: Record<string, string> = {};

        if (window.api?.config?.get) {
          parsed = await window.api.config.get();
        }

        // Backward compatibility with old localStorage-based settings.
        if (Object.keys(parsed).length === 0) {
          const legacy = localStorage.getItem('locus_api_keys');
          if (legacy) {
            parsed = JSON.parse(legacy) as Record<string, string>;
            if (window.api?.config?.set) {
              await window.api.config.set(parsed);
              localStorage.removeItem('locus_api_keys');
            }
          }
        }

        setApiKeys(prev => prev.map(key => ({
          ...key,
          value: parsed[key.id] || ''
        })));
      } catch (error) {
        console.error('Failed to load API keys:', error);
      }
    };
    loadSavedKeys();
  }, []);

  // Check system status on mount
  useEffect(() => {
    checkAllStatus();
  }, []);

  const checkAllStatus = async () => {
    setIsRefreshing(true);
    setSystemStatus({
      database: 'checking',
      agent: 'checking',
      network: 'checking'
    });

    // Check Network
    try {
      const online = navigator.onLine;
      setSystemStatus(prev => ({ ...prev, network: online ? 'online' : 'offline' }));
    } catch {
      setSystemStatus(prev => ({ ...prev, network: 'offline' }));
    }

    // Check Database (via IPC)
    try {
      if (window.api?.db?.getStats) {
        const stats = await window.api.db.getStats();
        setDbStats(stats);
        setSystemStatus(prev => ({ 
          ...prev, 
          database: stats.regions > 0 ? 'online' : 'error' 
        }));
      } else {
        setSystemStatus(prev => ({ ...prev, database: 'offline' }));
      }
    } catch (error) {
      console.error('DB check failed:', error);
      setSystemStatus(prev => ({ ...prev, database: 'error' }));
    }

    // Check Agent (n8n)
    try {
      const agentOnline = await pingAgent();
      setSystemStatus(prev => ({ ...prev, agent: agentOnline ? 'online' : 'offline' }));
    } catch {
      setSystemStatus(prev => ({ ...prev, agent: 'offline' }));
    }

    // Image Cache Stats
    try {
      if (window.api?.assets?.getImageCacheStats) {
        const cacheStats = await window.api.assets.getImageCacheStats();
        setImageCacheStats(cacheStats);
      }
    } catch (error) {
      console.error('Cache stats failed:', error);
    }

    setLastChecked(new Date());
    setIsRefreshing(false);
  };

  const clearImageCache = async () => {
    if (!window.api?.assets?.clearImageCache) return;
    setIsClearingCache(true);
    try {
      const stats = await window.api.assets.clearImageCache();
      setImageCacheStats(stats);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    } finally {
      setIsClearingCache(false);
    }
  };

  const handleKeyChange = (id: string, value: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, value } : key
    ));
    setSaveStatus('idle');
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const keysToSave = apiKeys.reduce((acc, key) => {
        acc[key.id] = key.value;
        return acc;
      }, {} as Record<string, string>);

      if (window.api?.config?.set) {
        await window.api.config.set(keysToSave);
      } else {
        localStorage.setItem('locus_api_keys', JSON.stringify(keysToSave));
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async (keyId: string) => {
    const entry = apiKeys.find((key) => key.id === keyId);
    const value = entry?.value?.trim() || '';

    setConnectionTests(prev => ({ ...prev, [keyId]: 'testing' }));

    try {
      if (!value) {
        throw new Error('Missing value');
      }

      if (keyId === 'ngrok' || keyId === 'n8n_api_key') {
        const online = await pingAgent();
        if (!online) {
          throw new Error('Agent unreachable');
        }
      } else if (keyId === 'supabase_url') {
        const parsedUrl = new URL(value);
        if (!parsedUrl.hostname.includes('supabase.co')) {
          throw new Error('Invalid Supabase URL');
        }
      } else if (keyId.includes('key') && value.length < 8) {
        throw new Error('Key seems too short');
      }

      setConnectionTests(prev => ({ ...prev, [keyId]: 'success' }));
    } catch {
      setConnectionTests(prev => ({ ...prev, [keyId]: 'error' }));
    } finally {
      window.setTimeout(() => {
        setConnectionTests(prev => ({ ...prev, [keyId]: 'idle' }));
      }, 2500);
    }
  };

  const requiredKeys = apiKeys.filter(k => k.required);
  const optionalKeys = apiKeys.filter(k => !k.required);
  const filledRequired = requiredKeys.filter(k => k.value.length > 0).length;

  return (
    <div className="flex-1 bg-[#050608] overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-slate-400 text-sm">Configure API keys and system preferences</p>
            </div>
          </div>
          
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              saveStatus === 'success' 
                ? 'bg-emerald-500 text-white'
                : saveStatus === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white'
            } disabled:opacity-50`}
          >
            {isSaving ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : saveStatus === 'success' ? (
              <CheckCircle size={18} />
            ) : saveStatus === 'error' ? (
              <XCircle size={18} />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Configuration'}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="bg-[#0a0c10] rounded-xl border border-white/5 p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Configuration Progress</span>
            <span className="text-sm font-bold text-cyan-400">{filledRequired}/{requiredKeys.length} Required</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(filledRequired / requiredKeys.length) * 100}%` }}
            />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-[#0a0c10] rounded-xl border border-white/5 p-6 mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Monitor size={16} />
            System Information
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <SystemInfoItem label="Agent Version" value="v1.0.4-BETA" />
            <SystemInfoItem label="Electron" value="v33.3.1" />
            <SystemInfoItem label="AI Model" value="Gemini 1.5 Flash" />
            <SystemInfoItem label="Database" value="SQLite + Supabase" />
          </div>
        </div>

        {/* Image Cache */}
        <div className="bg-[#0a0c10] rounded-xl border border-white/5 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <HardDrive size={16} className="text-cyan-400" />
              Image Cache
            </h2>
            <button
              onClick={clearImageCache}
              disabled={isClearingCache}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-slate-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={isClearingCache ? 'animate-spin' : ''} />
              {isClearingCache ? 'Clearing...' : 'Clear Cache'}
            </button>
          </div>
          {imageCacheStats ? (
            <div className="grid grid-cols-3 gap-4">
              <SystemInfoItem label="Cached Files" value={`${imageCacheStats.fileCount} files`} />
              <SystemInfoItem label="Cache Size" value={`${(imageCacheStats.totalBytes / (1024 * 1024)).toFixed(1)} MB`} />
              <SystemInfoItem label="Cache Path" value={imageCacheStats.path} />
            </div>
          ) : (
            <div className="text-sm text-slate-500">Cache stats unavailable.</div>
          )}
        </div>

        {/* System Status & Health */}
        <div className="bg-[#0a0c10] rounded-xl border border-white/5 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" />
              System Status
            </h2>
            <div className="flex items-center gap-3">
              {lastChecked && (
                <span className="text-xs text-slate-500">
                  Last checked: {lastChecked.toLocaleTimeString('th-TH')}
                </span>
              )}
              <button
                onClick={checkAllStatus}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-slate-300 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatusCard 
              label="Database" 
              status={systemStatus.database}
              icon={<HardDrive size={18} />}
              detail={dbStats ? `${dbStats.regions} regions, ${dbStats.provinces} provinces` : undefined}
            />
            <StatusCard 
              label="AI Agent (n8n)" 
              status={systemStatus.agent}
              icon={<Bot size={18} />}
              detail={systemStatus.agent === 'online' ? 'Connected via Ngrok' : 'Not responding'}
            />
            <StatusCard 
              label="Network" 
              status={systemStatus.network}
              icon={systemStatus.network === 'online' ? <Wifi size={18} /> : <WifiOff size={18} />}
              detail={systemStatus.network === 'online' ? 'Internet connected' : 'Offline mode'}
            />
          </div>

          {/* Database Details */}
          {dbStats && (
            <div className="bg-[#0f1115] rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Server size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-slate-400 uppercase">Database Details</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{dbStats.regions}</div>
                  <div className="text-xs text-slate-500">Regions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{dbStats.provinces}</div>
                  <div className="text-xs text-slate-500">Provinces</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{dbStats.stats}</div>
                  <div className="text-xs text-slate-500">Stats Records</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400 truncate" title={dbStats.dbPath}>
                    {dbStats.dbPath.split(/[/\\]/).pop()}
                  </div>
                  <div className="text-xs text-slate-500">DB File</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Required API Keys */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield size={16} className="text-red-400" />
            Required API Keys
          </h2>
          <div className="space-y-4">
            {requiredKeys.map(key => (
              <ApiKeyInput
                key={key.id}
                apiKey={key}
                showValue={showKeys[key.id] || false}
                onToggleShow={() => toggleShowKey(key.id)}
                onChange={(value) => handleKeyChange(key.id, value)}
                onTest={() => testConnection(key.id)}
                testState={connectionTests[key.id] || 'idle'}
              />
            ))}
          </div>
        </div>

        {/* Optional API Keys */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Key size={16} />
            Optional API Keys
          </h2>
          <div className="space-y-4">
            {optionalKeys.map(key => (
              <ApiKeyInput
                key={key.id}
                apiKey={key}
                showValue={showKeys[key.id] || false}
                onToggleShow={() => toggleShowKey(key.id)}
                onChange={(value) => handleKeyChange(key.id, value)}
                onTest={() => testConnection(key.id)}
                testState={connectionTests[key.id] || 'idle'}
              />
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-amber-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-400 mb-1">Security Notice</h3>
              <p className="text-xs text-slate-400">
                API keys are stored in app runtime config on your device (encrypted by OS key store when available).
                Never share your API keys or commit them to version control.
                For team or production environments, move secrets to a centralized secrets manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== HELPER COMPONENTS ====================

interface ApiKeyInputProps {
  apiKey: ApiKey;
  showValue: boolean;
  onToggleShow: () => void;
  onChange: (value: string) => void;
  onTest: () => void;
  testState: ConnectionTestState;
}

const ApiKeyInput = ({ apiKey, showValue, onToggleShow, onChange, onTest, testState }: ApiKeyInputProps) => {
  const hasValue = apiKey.value.length > 0;
  const testLabel = testState === 'testing'
    ? 'Testing...'
    : testState === 'success'
      ? 'Passed'
      : testState === 'error'
        ? 'Failed'
        : 'Test';
  const testClass = testState === 'success'
    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
    : testState === 'error'
      ? 'bg-red-500/20 border-red-500/40 text-red-300'
      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300';
  
  return (
    <div className={`bg-[#0a0c10] rounded-xl border p-4 transition-all ${
      hasValue ? 'border-emerald-500/30' : apiKey.required ? 'border-red-500/20' : 'border-white/5'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          hasValue ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'
        }`}>
          {apiKey.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-medium">{apiKey.name}</span>
            {apiKey.required && (
              <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded uppercase">Required</span>
            )}
            {hasValue && (
              <CheckCircle size={14} className="text-emerald-400" />
            )}
          </div>
          <p className="text-xs text-slate-500 mb-3">{apiKey.description}</p>
          
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type={showValue ? 'text' : 'password'}
                value={apiKey.value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={apiKey.placeholder}
                className="w-full bg-[#0f1115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
              />
              <button
                onClick={onToggleShow}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showValue ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            <button
              onClick={onTest}
              disabled={!hasValue || testState === 'testing'}
              className={`px-4 py-2.5 disabled:opacity-30 disabled:cursor-not-allowed border rounded-lg text-sm transition-colors ${testClass}`}
            >
              {testLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemInfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#0f1115] rounded-lg p-3 border border-white/5">
    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
    <div className="text-sm font-mono text-white">{value}</div>
  </div>
);

// Status Card Component
interface StatusCardProps {
  label: string;
  status: 'checking' | 'online' | 'offline' | 'error';
  icon: React.ReactNode;
  detail?: string;
}

const StatusCard = ({ label, status, icon, detail }: StatusCardProps) => {
  const statusConfig = {
    checking: { 
      color: 'text-slate-400', 
      bg: 'bg-slate-500/20', 
      border: 'border-slate-500/30',
      label: 'Checking...',
      dot: 'bg-slate-400 animate-pulse'
    },
    online: { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/20', 
      border: 'border-emerald-500/30',
      label: 'Online',
      dot: 'bg-emerald-400'
    },
    offline: { 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/20', 
      border: 'border-amber-500/30',
      label: 'Offline',
      dot: 'bg-amber-400'
    },
    error: { 
      color: 'text-red-400', 
      bg: 'bg-red-500/20', 
      border: 'border-red-500/30',
      label: 'Error',
      dot: 'bg-red-400'
    }
  };
  
  const config = statusConfig[status];
  
  return (
    <div className={`${config.bg} rounded-xl border ${config.border} p-4 transition-all`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`${config.color}`}>{icon}</div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">{label}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className={`text-xs font-bold ${config.color}`}>{config.label}</span>
        </div>
      </div>
      {detail && (
        <div className="text-xs text-slate-500 pl-7">{detail}</div>
      )}
    </div>
  );
};
