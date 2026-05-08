export interface SensorData {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: 'optimal' | 'imbalance' | 'critical';
  history: { time: string; val: number }[];
}

export interface ZoneLevel {
  id: string;
  name: string;
  status: 'optimal' | 'imbalance' | 'critical';
  temp: number;
  humidity: number;
  ph: number;
  ec: number;
}

export interface Rack {
  id: string;
  name: string;
  levels: ZoneLevel[];
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'optimization';
  time: string;
  message: string;
}

export interface Plant {
  id: string;
  name: string;
  stage: 'Seedling' | 'Vegetative' | 'Flowering';
  tempRange: [number, number];
  humidityRange: [number, number];
  phRange: [number, number];
}
