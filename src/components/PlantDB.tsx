import { useState } from 'react';
import { motion } from 'motion/react';
import { Plant } from '../types';
import { Search, Thermometer, Droplets, FlaskConical, Sprout } from 'lucide-react';

export function PlantDB({ plants }: { plants: Plant[] }) {
  const [search, setSearch] = useState('');

  const filtered = plants.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-grow-muted" />
        <input
          type="text"
          placeholder="Search crop database..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-grow-card/50 border border-grow-muted/20 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-grow-optimal/50 transition-colors"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((plant) => (
          <div key={plant.id}>
            <PlantCard plant={plant} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-4 space-y-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold">{plant.name}</h3>
          <div className="flex items-center text-[10px] text-grow-muted mt-1">
            <Sprout size={10} className="mr-1" />
            <span>Target Stage: {plant.stage}</span>
          </div>
        </div>
        <div className="bg-grow-optimal/10 text-grow-optimal text-[8px] px-2 py-0.5 rounded border border-grow-optimal/20 uppercase font-bold">
          Active Track
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <RangeMetric icon={Thermometer} label="Temp" range={plant.tempRange} unit="°C" />
        <RangeMetric icon={Droplets} label="Humidity" range={plant.humidityRange} unit="%" />
        <RangeMetric icon={FlaskConical} label="pH" range={plant.phRange} unit="" />
      </div>

      <button className="w-full py-1.5 text-[10px] font-mono uppercase tracking-widest border border-grow-optimal/20 hover:bg-grow-optimal/10 transition-colors rounded">
        Update Ideal Ranges
      </button>
    </motion.div>
  );
}

function RangeMetric({ icon: Icon, label, range, unit }: { icon: any; label: string; range: [number, number]; unit: string }) {
  return (
    <div className="bg-black/20 p-2 rounded-md">
      <div className="flex items-center text-[10px] text-grow-muted mb-1">
        <Icon size={10} className="mr-1" />
        <span>{label}</span>
      </div>
      <div className="text-[10px] font-mono">
        {range[0]}-{range[1]}{unit}
      </div>
    </div>
  );
}
