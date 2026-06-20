import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NOTIFICATIONS, TIME_BUDGET } from './data/chronosData';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AppControl from './components/AppControl';
import Habits from './components/Habits';
import Analytics from './components/Analytics';
import TimeBank from './components/TimeBank';
import CalendarView from './components/CalendarView';

// ─── Live Ticker ──────────────────────────────────────────────────────────────
function LiveTicker() {
  const items = [
    '🔒 Instagram locked — overuse detected',
    '🏆 Gym habit completed! +60 min earned',
    '⚠️ YouTube: 42 minutes remaining',
    '💸 Fine: -$2.00 deducted for social media overuse',
    '🔥 12-day streak active — keep going!',
    '📍 Gym zone detected — earn time on arrival',
    '💳 Account balance: $8.45',
    '✅ Reading goal completed — +45 min added',
  ];
  const doubled = [...items, ...items];

  return (
    <div
      className="ticker-wrap flex-shrink-0"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '6px 0', background: 'rgba(0,0,0,0.4)' }}
    >
      <div className="ticker-content" style={{ gap: '80px', fontSize: 11 }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ budget, notifCount, onNotifToggle, showNotif }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hrs = time.getHours();
  const mins = time.getMinutes().toString().padStart(2, '0');
  const secs = time.getSeconds().toString().padStart(2, '0');
  const period = hrs >= 12 ? 'PM' : 'AM';
  const displayHrs = (hrs % 12 || 12).toString().padStart(2, '0');

  return (
    <div
      className="glass-strong flex-shrink-0 flex items-center justify-between px-5 py-3"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', zIndex: 20 }}
    >
      <div>
        <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>
          {hrs < 12 ? '🌅 Good morning' : hrs < 18 ? '☀️ Good afternoon' : '🌙 Good evening'}, Mangesh
        </div>
        <div className="text-xs" style={{ color: '#475569' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <div className="font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: '#f1f5f9' }}>
          {displayHrs}:{mins}
          <span className="text-sm" style={{ color: '#6366f1' }}>:{secs}</span>
          <span className="text-xs ml-1" style={{ color: '#94a3b8' }}>{period}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2">
          <div className="text-xs" style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
            Lv.{budget.level}
          </div>
          <div className="w-24 progress-track" style={{ height: '4px' }}>
            <div
              className="progress-fill"
              style={{ width: `${(budget.xp / budget.xpToNext) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', height: '100%' }}
            />
          </div>
          <div className="text-xs" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
            {budget.xp.toLocaleString()} XP
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <span>🔥</span>
          <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>{budget.streakDays}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="text-sm font-bold" style={{ color: '#10b981', fontFamily: 'JetBrains Mono, monospace' }}>
            ${budget.moneyBalance.toFixed(2)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNotifToggle}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: showNotif ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" style={{ color: '#94a3b8' }}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
              style={{ background: '#ef4444', fontSize: 9, fontWeight: 700 }}
            >
              {notifCount}
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Notification Panel ───────────────────────────────────────────────────────
function NotifPanel({ notifications, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="absolute top-16 right-4 w-80 z-50 card"
      style={{ border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Notifications</div>
        <button onClick={onClose} className="text-xs" style={{ color: '#475569' }}>Clear all</button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3 p-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.04)' }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
              style={{ background: `${n.color}15`, border: `1px solid ${n.color}30` }}
            >
              {n.icon}
            </div>
            <div>
              <div className="text-xs" style={{ color: '#f1f5f9' }}>{n.message}</div>
              <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{n.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-grid"
      style={{ background: '#080B14' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)' }}
        />
      </div>

      <div className="relative text-center z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.1 }}
          className="w-24 h-24 mx-auto mb-6 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #10b981, #6366f1)', padding: '2px', borderRadius: '50%' }}
          >
            <div className="w-full h-full rounded-full" style={{ background: '#080B14' }} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">⏱</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-2" style={{ letterSpacing: '-0.02em' }}>
            Chronos
          </h1>
          <p className="text-sm" style={{ color: '#6366f1', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.3em' }}>
            TIME BUDGET TRACKER
          </p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 w-48 mx-auto"
        >
          <div className="progress-track" style={{ height: '2px' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="progress-fill"
              style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
            />
          </div>
          <p className="text-xs font-mono mt-3" style={{ color: '#475569', letterSpacing: '0.2em' }}>
            SYNCING YOUR DATA...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const VIEW_LABELS = {
  dashboard: 'Dashboard',
  apps: 'App Control',
  habits: 'Habits & Goals',
  analytics: 'Analytics',
  bank: 'Time Bank',
  calendar: 'Calendar',
  settings: 'Settings',
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [showNotif, setShowNotif] = useState(false);
  const [budget, setBudget] = useState(TIME_BUDGET);
  const [notifications] = useState(NOTIFICATIONS);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard budget={budget} />;
      case 'apps': return <AppControl />;
      case 'habits': return <Habits budget={budget} onBudgetChange={setBudget} />;
      case 'analytics': return <Analytics />;
      case 'bank': return <TimeBank budget={budget} />;
      case 'calendar': return <CalendarView budget={budget} />;
      case 'settings': return (
        <div className="main-scroll p-5">
          <div className="card p-6 max-w-lg">
            <h2 className="font-bold text-lg mb-1" style={{ color: '#f1f5f9' }}>Settings</h2>
            <p className="text-sm mb-6" style={{ color: '#475569' }}>Configure your Chronos experience</p>

            {[
              { section: 'Tracking', items: [
                { label: 'Auto-lock apps on limit', enabled: true },
                { label: 'Location-based rules', enabled: true },
                { label: 'Calendar sync', enabled: true },
                { label: 'Sleep schedule', enabled: false },
              ]},
              { section: 'Banking', items: [
                { label: 'Real money deposits', enabled: false },
                { label: 'Fine deductions', enabled: true },
                { label: 'Weekly payouts', enabled: false },
              ]},
              { section: 'Notifications', items: [
                { label: 'App limit warnings', enabled: true },
                { label: 'Habit reminders', enabled: true },
                { label: 'Daily summary', enabled: true },
              ]},
            ].map(section => (
              <div key={section.section} className="mb-5">
                <div className="text-xs font-semibold mb-2 tracking-widest" style={{ color: '#6366f1' }}>{section.section.toUpperCase()}</div>
                <div className="space-y-2">
                  {section.items.map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      <span className="text-sm" style={{ color: '#94a3b8' }}>{item.label}</span>
                      <div
                        className="w-10 h-5 rounded-full relative cursor-pointer"
                        style={{ background: item.enabled ? 'rgba(99,102,241,0.8)' : 'rgba(255,255,255,0.1)' }}
                      >
                        <div
                          className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                          style={{ background: '#fff', left: item.enabled ? 22 : 2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      default: return <Dashboard budget={budget} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="app-layout bg-grid"
        style={{ background: '#080B14' }}
      >
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onViewChange={(v) => { setActiveView(v); setShowNotif(false); }}
          budget={budget}
          notifCount={notifications.length}
        />

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top bar */}
          <TopBar
            budget={budget}
            notifCount={notifications.length}
            onNotifToggle={() => setShowNotif(p => !p)}
            showNotif={showNotif}
          />

          {/* Page header */}
          <div
            className="flex-shrink-0 px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div>
              <h1 className="font-bold text-base" style={{ color: '#f1f5f9' }}>{VIEW_LABELS[activeView]}</h1>
              <div className="text-xs" style={{ color: '#475569' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Quick balance always visible */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <span className="text-xs" style={{ color: '#94a3b8' }}>Balance:</span>
              <span className="font-bold font-mono text-sm" style={{ color: '#818cf8' }}>{budget.currentBalance}m</span>
            </div>
          </div>

          {/* View content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>

            {/* Notification panel */}
            <AnimatePresence>
              {showNotif && (
                <NotifPanel
                  notifications={notifications}
                  onClose={() => setShowNotif(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom ticker */}
          <LiveTicker />
        </div>
      </motion.div>
    </>
  );
}
