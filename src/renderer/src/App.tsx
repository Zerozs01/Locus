import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScanView } from './views/ScanView'
import { MapView } from './views/MapView'
import { HistoryView } from './views/HistoryView'
import { SyncView } from './views/SyncView'
import { SettingsView } from './views/SettingsView'

type TabType = 'scan' | 'map' | 'history' | 'sync' | 'settings'

// Mock Analysis Data
export const MOCK_ANALYSIS = {
  status: 'success',
  location: 'Prypiat, Ukraine (Simulated)',
  coordinates: '51.4045° N, 30.0542° E',
  analysis: {
    geoguessr_meta: [
      { label: 'Bollard', value: 'White with red reflector (Type 4)' },
      { label: 'Road Lines', value: 'Solid white edge, dashed center' },
      { label: 'Vegetation', value: 'Deciduous forest, Betula pendula detected' }
    ],
    survival_intel: [
      { label: 'Threat Level', value: 'Moderate (Radiation/Structural)', color: 'text-orange-400' },
      { label: 'Shelter Potential', value: 'High (Concrete Structures)', color: 'text-green-400' },
      { label: 'Water Source', value: 'Pripyat River (Contaminated - Filters required)', color: 'text-blue-400' }
    ],
    historical_lore:
      'Founded in 1970 to serve the Chernobyl Nuclear Power Plant. Abandoned in 1986. Current status: Zone of Alienation.'
  }
}

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('scan')
  const [isScanning, setIsScanning] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleStartScan = (): void => {
    setIsScanning(true)
    setHasResult(false)
    // Simulate API delay
    setTimeout(() => {
      setIsScanning(false)
      setHasResult(true)
    }, 3000)
  }

  const renderView = (): JSX.Element => {
    switch (activeTab) {
      case 'scan':
        return (
          <ScanView
            isScanning={isScanning}
            hasResult={hasResult}
            onStartScan={handleStartScan}
          />
        )
      case 'map':
        return <MapView />
      case 'history':
        return <HistoryView />
      case 'sync':
        return <SyncView />
      case 'settings':
        return <SettingsView />
      default:
        return <ScanView isScanning={isScanning} hasResult={hasResult} onStartScan={handleStartScan} />
    }
  }

  return (
    <div className="flex h-screen w-screen bg-tactical-dark text-zinc-300 font-mono overflow-hidden select-none">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Top Header Bar */}
        <Header currentTime={currentTime} />

        {/* View Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {renderView()}
        </div>

        {/* Footer Bar */}
        <Footer hasResult={hasResult} />
      </main>
    </div>
  )
}

export default App
