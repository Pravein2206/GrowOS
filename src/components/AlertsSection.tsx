import { motion } from 'motion/react';
import { Alert } from '../types';
import { AlertTriangle, Info, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function AlertsSection({ alerts }: { alerts: Alert[] }) {
  const categories = [
    { label: 'Critical', count: alerts.filter(a => a.type === 'critical').length, color: 'bg-grow-critical' },
    { label: 'Warnings', count: alerts.filter(a => a.type === 'warning').length, color: 'bg-grow-warning' },
    { label: 'Optimizations', count: alerts.filter(a => a.type === 'optimization').length, color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <div key={cat.label} className="glass p-3 text-center border-b-2 border-opacity-30" style={{ borderColor: cat.color.replace('bg-', '') }}>
            <div className="text-[10px] text-grow-muted uppercase mb-1">{cat.label}</div>
            <div className="text-xl font-mono font-bold">{cat.count}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase text-grow-muted px-1">6h Predictive Timeline</h3>
        <div className="relative pl-6 space-y-6 border-l border-grow-muted/20 ml-2">
          {alerts.length > 0 ? (
            alerts.map((alert, idx) => (
              <div key={alert.id}>
                <AlertItem alert={alert} isLast={idx === alerts.length - 1} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 opacity-50">
              <ShieldCheck size={48} className="text-grow-optimal mb-4" />
              <p className="text-sm">No critical anomalies predicted.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertItem({ alert }: { alert: Alert; isLast?: boolean }) {
  const Icon = {
    critical: AlertTriangle,
    warning: Info,
    optimization: Zap
  }[alert.type];

  const color = {
    critical: 'text-grow-critical',
    warning: 'text-grow-warning',
    optimization: 'text-blue-400'
  }[alert.type];

  return (
    <div className="relative">
      <div className={cn("absolute -left-[31px] top-0 p-1.5 rounded-full bg-grow-bg border border-grow-muted/20", color)}>
        <Icon size={14} />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-mono text-grow-muted">ETA: {alert.time}</span>
          <span className={cn("text-[8px] font-bold uppercase tracking-tighter", color)}>
            {alert.type}
          </span>
        </div>
        <p className="text-xs leading-relaxed opacity-90">{alert.message}</p>
      </div>
    </div>
  );
}
