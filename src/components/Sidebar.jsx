import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const ICONS = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 18.5A6.5 6.5 0 1 0 12 5.5a6.5 6.5 0 0 0 0 13z" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  ),
  habits: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M9 12l2 2 4-4" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 2L2 7h20L12 2z" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8M2 20h20" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  notification: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'apps', label: 'App Control', icon: 'apps' },
  { id: 'habits', label: 'Habits', icon: 'habits' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'bank', label: 'Time Bank', icon: 'bank' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
];

export default function Sidebar({ activeView, onViewChange, budget, notifCount }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass-strong flex-shrink-0 flex flex-col h-full relative z-10"
      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0">
        <div className="relative flex-shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 20px rgba(99,102,241,0.4)'
            }}
          >
            <span className="text-white font-bold text-sm">⏱</span>
          </motion.div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0D1220] status-active" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-bold text-sm tracking-tight" style={{ color: '#f1f5f9' }}>Chronos</div>
              <div className="text-xs" style={{ color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>Time Budget</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Balance pill */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mb-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Today's Balance</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold gradient-text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {budget.currentBalance}
              </span>
              <span className="text-xs" style={{ color: '#94a3b8' }}>min</span>
            </div>
            <div className="progress-track mt-2" style={{ height: '3px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(budget.currentBalance / budget.discretionaryMinutes) * 100}%` }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                className="progress-fill"
                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', height: '100%' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <motion.button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            className={`nav-item w-full text-left ${activeView === item.id ? 'active' : ''}`}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <span className="flex-shrink-0">{ICONS[item.icon]}</span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="flex-shrink-0 px-2 pb-4 space-y-1">
        <motion.button
          onClick={() => onViewChange('settings')}
          whileHover={{ x: 2 }}
          className={`nav-item w-full text-left ${activeView === 'settings' ? 'active' : ''}`}
          style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          {ICONS.settings}
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Collapse toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center py-2 rounded-xl text-xs transition-all"
          style={{ color: '#475569', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {collapsed ? '→' : '←'}
          </motion.span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
