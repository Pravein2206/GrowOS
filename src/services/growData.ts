import { useState, useEffect } from 'react';
import { SensorData, Rack, Alert, Plant } from '../types';

export function useGrowData() {
  const [sensors, setSensors] = useState<SensorData[]>([
    { id: 'temp', label: 'Temperature', value: 24.5, unit: '°C', status: 'optimal', history: [] },
    { id: 'hum', label: 'Humidity', value: 65, unit: '%', status: 'optimal', history: [] },
    { id: 'ph', label: 'Water pH', value: 6.2, unit: 'pH', status: 'optimal', history: [] },
    { id: 'ec', label: 'Nutrients (EC)', value: 1.8, unit: 'mS/cm', status: 'imbalance', history: [] },
  ]);

  const [racks, setRacks] = useState<Rack[]>([
    {
      id: 'rack-a',
      name: 'Rack A',
      levels: [
        { id: 'a-l1', name: 'Level 1', status: 'optimal', temp: 24, humidity: 65, ph: 6.2, ec: 1.8 },
        { id: 'a-l2', name: 'Level 2', status: 'imbalance', temp: 26, humidity: 62, ph: 6.1, ec: 1.9 },
        { id: 'a-l3', name: 'Level 3', status: 'critical', temp: 28, humidity: 55, ph: 6.0, ec: 2.1 },
      ]
    },
    {
      id: 'rack-b',
      name: 'Rack B',
      levels: [
        { id: 'b-l1', name: 'Level 1', status: 'optimal', temp: 23, humidity: 68, ph: 6.3, ec: 1.7 },
        { id: 'b-l2', name: 'Level 2', status: 'optimal', temp: 24, humidity: 66, ph: 6.2, ec: 1.8 },
        { id: 'b-l3', name: 'Level 3', status: 'optimal', temp: 25, humidity: 64, ph: 6.2, ec: 1.8 },
      ]
    }
  ]);

  const [alerts] = useState<Alert[]>([
    { id: '1', type: 'critical', time: '14:20', message: 'Rack A-L3: High Heat stress detected. Fan 04 failure predicted.' },
    { id: '2', type: 'warning', time: '16:00', message: 'Reservoir pH trending down. Auto-correction in 15 mins.' },
    { id: '3', type: 'optimization', time: '18:30', message: 'DLI target reached soon. Recommended: Dimming L2 lights by 10%.' },
  ]);

  const [plants] = useState<Plant[]>([
    { id: '1', name: 'Butterhead Lettuce', stage: 'Vegetative', tempRange: [18, 24], humidityRange: [60, 75], phRange: [5.8, 6.5] },
    { id: '2', name: 'Sweet Basil', stage: 'Seedling', tempRange: [22, 28], humidityRange: [65, 80], phRange: [6.0, 7.0] },
    { id: '3', name: 'Arugula', stage: 'Flowering', tempRange: [15, 22], humidityRange: [50, 70], phRange: [6.0, 6.8] },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) => prev.map(s => ({
        ...s,
        value: s.value + (Math.random() - 0.5) * 0.2,
        history: [...s.history.slice(-19), { time: new Date().toLocaleTimeString(), val: s.value }]
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return { sensors, racks, alerts, plants };
}
