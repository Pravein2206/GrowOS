import { motion } from 'motion/react';
import { Rack, ZoneLevel } from '../types';
import { cn } from '../lib/utils';
import { Thermometer, Droplets, FlaskConical, Zap } from 'lucide-react';

export function RackVisualizer({ racks }: { racks: Rack[] }) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {racks.map((rack) => (
          <div key={rack.id} className="flex-1 space-y-3">
            <h3 className="text-xs font-mono uppercase text-grow-muted text-center">{rack.name}</h3>
            <div className="flex flex-col-reverse gap-2">
              {rack.levels.map((level) => (
                <div key={level.id}>
                  <LevelNode level={level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-grow-muted">Detailed Metrics per Zone</h3>
        <div className="space-y-2">
          {racks.flatMap(r => r.levels).map(level => (
            <div key={level.id}>
              <ZoneDetailRow level={level} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LevelNode({ level }: { level: ZoneLevel }) {
  const bgColor = {
    optimal: 'bg-grow-optimal',
    imbalance: 'bg-grow-warning',
    critical: 'bg-grow-critical'
  }[level.status];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={cn(
        "h-12 rounded-md cyber-border flex items-center justify-center text-[10px] font-bold transition-all",
        bgColor + "/20",
        "border-" + bgColor + "/40"
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full mr-2", bgColor)} />
      {level.name}
    </motion.div>
  );
}

function ZoneDetailRow({ level }: { level: ZoneLevel }) {
  return (
    <div className="glass p-3 flex items-center justify-between">
      <div>
        <div className="text-[10px] font-mono text-grow-muted">{level.name}</div>
        <div className={cn(
          "text-[8px] font-bold uppercase",
          level.status === 'optimal' ? 'text-grow-optimal' : level.status === 'imbalance' ? 'text-grow-warning' : 'text-grow-critical'
        )}>{level.status}</div>
      </div>
      <div className="flex gap-4">
        <MetricIcon value={level.temp} unit="°" icon={Thermometer} />
        <MetricIcon value={level.humidity} unit="%" icon={Droplets} />
        <MetricIcon value={level.ph} unit="" icon={FlaskConical} />
        <MetricIcon value={level.ec} unit="" icon={Zap} />
      </div>
    </div>
  );
}

function MetricIcon({ value, unit, icon: Icon }: { value: number; unit: string; icon: any }) {
  return (
    <div className="flex flex-col items-center">
      <Icon size={12} className="text-grow-muted mb-1" />
      <span className="text-[10px] font-mono">{value.toFixed(1)}{unit}</span>
    </div>
  );
}
