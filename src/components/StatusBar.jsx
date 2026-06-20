import { motion } from 'framer-motion';
import { Brain, Wifi, Shield, Zap, Clock } from 'lucide-react';

export default function StatusBar({ activeTab }) {
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const stats = [
    { icon: Shield, label: 'SHIELD', value: 'ACTIVE', color: '#00ff41' },
    { icon: Zap, label: 'NEURAL', value: '100%', color: '#00f5ff' },
    { icon: Wifi, label: 'SIGNAL', value: 'MAX', color: '#bf00ff' },
  ];

  return (
    <div
      className="flex items-center justify-between px-4 py-1 glass-dark border-t"
      style={{ borderColor: 'rgba(0,245,255,0.08)', minHeight: '28px' }}
    >
      {/* Left: URL info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="status-dot online" style={{ width: '5px', height: '5px' }} />
          <span className="text-xs font-mono text-gray-600" style={{ fontSize: '10px' }}>NEXUS SECURE</span>
        </div>
        {activeTab?.url && activeTab.url !== 'newtab' && (
          <span className="text-xs font-mono text-gray-700 truncate max-w-xs" style={{ fontSize: '10px' }}>
            {activeTab.url}
          </span>
        )}
      </div>

      {/* Center: Stats */}
      <div className="hidden sm:flex items-center gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-1">
            <Icon size={9} style={{ color }} />
            <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>
              {label}:
            </span>
            <span className="font-mono font-bold" style={{ fontSize: '9px', color }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Time */}
      <div className="flex items-center gap-2">
        <Clock size={9} className="text-gray-700" />
        <span className="font-mono text-gray-500" style={{ fontSize: '10px' }}>
          {date} {time}
        </span>
        <div
          className="px-2 py-0.5 rounded font-mono"
          style={{
            fontSize: '9px',
            background: 'rgba(0,245,255,0.08)',
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#00f5ff',
          }}
        >
          2050
        </div>
      </div>
    </div>
  );
}
