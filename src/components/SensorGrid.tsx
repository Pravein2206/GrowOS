import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { SensorData } from '../types';
import { cn } from '../lib/utils';

export function SensorGrid({ sensors }: { sensors: SensorData[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {sensors.map((sensor) => (
        <div key={sensor.id}>
          <SensorCard sensor={sensor} />
        </div>
      ))}
    </div>
  );
}

function SensorCard({ sensor }: { sensor: SensorData }) {
  const isOptimal = sensor.status === 'optimal';
  const isWarning = sensor.status === 'imbalance';
  const isCritical = sensor.status === 'critical';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-4 flex flex-col justify-between h-40 overflow-hidden relative"
    >
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-grow-muted">
          {sensor.label}
        </span>
        <span className={cn(
          "text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-tighter",
          isOptimal && "bg-grow-optimal/10 text-grow-optimal border-grow-optimal/30",
          isWarning && "bg-grow-warning/10 text-grow-warning border-grow-warning/30",
          isCritical && "bg-grow-critical/10 text-grow-critical border-grow-critical/30"
        )}>
          {sensor.status === 'optimal' ? 'OPTIMAL' : sensor.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-2 z-10">
        <span className="text-2xl font-mono font-medium">
          {sensor.value.toFixed(1)}
        </span>
        <span className="text-xs text-grow-muted ml-1">{sensor.unit}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sensor.history}>
            <defs>
              <linearGradient id={`grad-${sensor.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isOptimal ? '#4ADE80' : isWarning ? '#FB923C' : '#EF4444'} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isOptimal ? '#4ADE80' : isWarning ? '#FB923C' : '#EF4444'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={isOptimal ? '#4ADE80' : isWarning ? '#FB923C' : '#EF4444'}
              fillOpacity={1}
              fill={`url(#grad-${sensor.id})`}
              strokeWidth={1}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
