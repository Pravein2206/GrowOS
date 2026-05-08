import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Map, 
  AlertCircle, 
  Library, 
  Settings, 
  User, 
  Sprout,
  Activity
} from 'lucide-react';
import { useGrowData } from './services/growData';
import { SensorGrid } from './components/SensorGrid';
import { RackVisualizer } from './components/RackVisualizer';
import { AlertsSection } from './components/AlertsSection';
import { PlantDB } from './components/PlantDB';
import { cn } from './lib/utils';

type Tab = 'dashboard' | 'climate' | 'alerts' | 'plants';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { sensors, racks, alerts, plants } = useGrowData();

  const healthScore = 92;

  return (
    <div className="min-h-screen bg-grow-bg pb-24 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-white/5">
      {/* Header */}
      <header className="p-6 pb-2">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-grow-optimal rounded-lg">
              <Sprout size={18} className="text-grow-bg" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">GrowOS</h1>
          </div>
          <div className="flex gap-4">
            <motion.button whileTap={{ scale: 0.9 }}>
              <Settings size={20} className="text-grow-muted" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}>
              <User size={20} className="text-grow-muted" />
            </motion.button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 border-glow flex items-center gap-6"
          >
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#1B3224" strokeWidth="6" fill="none"/>
                <motion.circle 
                  cx="40" cy="40" r="36" 
                  stroke="#4ADE80" strokeWidth="6" fill="none"
                  strokeDasharray="226.19"
                  initial={{ strokeDashoffset: 226.19 }}
                  animate={{ strokeDashoffset: 226.19 - (226.19 * healthScore) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg">
                {healthScore}%
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-grow-muted mb-1">Plant Health Score</div>
              <h2 className="text-3xl font-bold text-grow-optimal tracking-tight">Thriving</h2>
              <p className="text-[10px] text-grow-muted mt-1 leading-tight">All hydroponic parameters are within optimal ranges.</p>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="p-6 pt-4 min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-xs font-mono uppercase text-grow-muted tracking-widest">Main Sensor Grid</h2>
                <SensorGrid sensors={sensors} />
              </div>
            )}
            {activeTab === 'climate' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xs font-mono uppercase text-grow-muted tracking-widest">Rack Layout Visualizer</h2>
                </div>
                <RackVisualizer racks={racks} />
              </div>
            )}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <h2 className="text-xs font-mono uppercase text-grow-muted tracking-widest">Global Watchtower</h2>
                <AlertsSection alerts={alerts} />
              </div>
            )}
            {activeTab === 'plants' && (
              <div className="space-y-6">
                <h2 className="text-xs font-mono uppercase text-grow-muted tracking-widest">Crop Intelligence</h2>
                <PlantDB plants={plants} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-grow-bg/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 z-50">
        <div className="flex justify-between items-center">
          <NavItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={BarChart3} 
            label="Home"
          />
          <NavItem 
            active={activeTab === 'climate'} 
            onClick={() => setActiveTab('climate')} 
            icon={Map} 
            label="Climate"
          />
          <NavItem 
            active={activeTab === 'alerts'} 
            onClick={() => setActiveTab('alerts')} 
            icon={AlertCircle} 
            label="Alerts"
          />
          <NavItem 
            active={activeTab === 'plants'} 
            onClick={() => setActiveTab('plants')} 
            icon={Library} 
            label="Plants"
          />
        </div>
      </nav>

      {/* Hardware Link Note (Developer Only) */}
      {/* 
        DEVELOPER NOTE: 
        To connect to real ESP32 hardware:
        1. Replace useGrowData with an MQTT or Firebase listener.
        2. use MQTT.js @3000 to subscribe to 'grow/rack/#' topics.
        3. Real-time metrics will update the context state automatically.
      */}
    </div>
  );
}

function NavItem({ 
  active, 
  onClick, 
  icon: Icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: any;
  label: string;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        active ? "text-grow-optimal" : "text-grow-muted hover:text-grow-text"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-all",
        active ? "bg-grow-optimal/10" : ""
      )}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-tighter">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-dot"
          className="w-1 h-1 rounded-full bg-grow-optimal mt-1" 
        />
      )}
    </button>
  );
}
