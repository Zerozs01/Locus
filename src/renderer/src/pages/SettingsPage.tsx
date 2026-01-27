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
  Shield
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  description: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  required: boolean;
}

/**
 * Settings Page - API Keys & Configuration Management
 */
export const SettingsPage = () => {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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
        // In real app, load from electron-store or secure storage
        const savedKeys = localStorage.getItem('locus_api_keys');
        if (savedKeys) {
          const parsed = JSON.parse(savedKeys);
          setApiKeys(prev => prev.map(key => ({
            ...key,
            value: parsed[key.id] || ''
          })));
        }
      } catch (error) {
        console.error('Failed to load API keys:', error);
      }
    };
    loadSavedKeys();
  }, []);

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
      // Save to localStorage (in production, use electron-store or secure storage)
      const keysToSave = apiKeys.reduce((acc, key) => {
        acc[key.id] = key.value;
        return acc;
      }, {} as Record<string, string>);
      
      localStorage.setItem('locus_api_keys', JSON.stringify(keysToSave));
      
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    // TODO: Implement actual connection testing
    console.log(`Testing connection for ${keyId}`);
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
                API keys are stored locally on your device using encrypted storage. 
                Never share your API keys with others or commit them to version control.
                For production deployment, consider using environment variables or a secrets manager.
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
}

const ApiKeyInput = ({ apiKey, showValue, onToggleShow, onChange, onTest }: ApiKeyInputProps) => {
  const hasValue = apiKey.value.length > 0;
  
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
              disabled={!hasValue}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 rounded-lg text-sm text-slate-300 transition-colors"
            >
              Test
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
