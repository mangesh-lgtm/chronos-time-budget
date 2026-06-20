import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { TIME_BUDGET, TIME_LEDGER, TRACKED_APPS, HABITS, NOTIFICATIONS, WEEKLY_DATA } from '../data/chronosData';

// ─── Mini Clock Ring ─────────────────────────────────────────────────────────
function BudgetRing({ value, max, size = 160, strokeWidth = 10, color = '#6366f1', label, sublabel }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={`ring-grad-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`ring-fill-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color === '#6366f1' ? '#8b5cf6' : color} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={`url(#ring-grad-${color.replace('#','')})`}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={`url(#ring-fill-${color.replace('#','')})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-center"
        >
          <div className="font-bold leading-none" style={{ fontSize: size > 120 ? 28 : 18, fontFamily: 'JetBrains Mono, monospace', color: '#f1f5f9' }}>
            {value}
          </div>
          {label && <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>{label}</div>}
          {sublabel && <div style={{ fontSize: 10, color: '#475569' }}>{sublabel}</div>}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Ledger Row ───────────────────────────────────────────────────────────────
function LedgerRow({ entry, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 py-2.5 border-b"
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <div className="text-lg w-8 text-center flex-shrink-0">{entry.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate" style={{ color: '#f1f5f9' }}>{entry.action}</div>
        <div className="text-xs" style={{ color: '#475569' }}>{entry.time}</div>
      </div>
      <div
        className="time-chip flex-shrink-0"
        style={{
          background: entry.type === 'credit' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${entry.type === 'credit' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: entry.type === 'credit' ? '#10b981' : '#ef4444',
          padding: '3px 8px',
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {entry.delta > 0 ? `+${entry.delta}` : entry.delta}m
      </div>
    </motion.div>
  );
}

// ─── App Status Card ──────────────────────────────────────────────────────────
function AppStatusBadge({ app }) {
  const pct = Math.min(1, app.used / app.limit);
  const isOver = app.used > app.limit;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 p-2.5 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${isOver ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${app.color}22`, border: `1px solid ${app.color}44` }}
      >
        {app.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium truncate" style={{ color: '#f1f5f9' }}>{app.name}</span>
          {app.locked ? (
            <span className="text-chip time-chip-locked" style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4 }}>LOCKED</span>
          ) : null}
        </div>
        <div className="progress-track" style={{ height: '3px' }}>
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(100, pct * 100)}%`,
              background: isOver ? '#ef4444' : pct > 0.8 ? '#f59e0b' : '#6366f1',
              height: '100%',
              transition: 'width 1s ease',
            }}
          />
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
          {app.used}m / {app.limit}m
        </div>
      </div>
    </motion.div>
  );
}

// ─── Notification Toast Area ──────────────────────────────────────────────────
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
    <div className="ticker-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 0', background: 'rgba(0,0,0,0.3)' }}>
      <div className="ticker-content" style={{ gap: '60px' }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-xs flex-shrink-0" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Header Bar ───────────────────────────────────────────────────────────────
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
      {/* Left: greeting */}
      <div>
        <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>
          {hrs < 12 ? '🌅 Good morning' : hrs < 18 ? '☀️ Good afternoon' : '🌙 Good evening'}, Mangesh
        </div>
        <div className="text-xs" style={{ color: '#475569' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Center: live clock */}
      <div className="hidden md:flex items-center gap-2">
        <div className="font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: '#f1f5f9' }}>
          {displayHrs}:{mins}
          <span className="text-sm" style={{ color: '#6366f1' }}>:{secs}</span>
          <span className="text-xs ml-1" style={{ color: '#94a3b8' }}>{period}</span>
        </div>
      </div>

      {/* Right: stats + actions */}
      <div className="flex items-center gap-3">
        {/* XP bar */}
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

        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <span>🔥</span>
          <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>{budget.streakDays}</span>
        </div>

        {/* Money balance */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="text-sm font-bold" style={{ color: '#10b981', fontFamily: 'JetBrains Mono, monospace' }}>
            ${budget.moneyBalance.toFixed(2)}
          </span>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNotifToggle}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: showNotif ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
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

// ─── Main Dashboard View ──────────────────────────────────────────────────────
export default function Dashboard({ budget, showNotif, notifications }) {
  const lockedApps = TRACKED_APPS.filter(a => a.locked);
  const topApps = TRACKED_APPS.slice(0, 5);

  return (
    <div className="main-scroll p-5 space-y-5">
      {/* ── Row 1: Time Budget Overview ── */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>

        {/* Main budget ring card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card card-glow p-6 flex flex-col items-center"
          style={{ gridColumn: 'span 1' }}
        >
          <div className="text-sm font-semibold mb-1" style={{ color: '#94a3b8' }}>Today's Time Budget</div>
          <div className="text-xs mb-4" style={{ color: '#475569' }}>Your 24hrs as currency</div>

          {/* Concentric rings */}
          <div className="relative" style={{ width: 200, height: 200 }}>
            {/* Outer: total discretionary */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BudgetRing value={budget.discretionaryMinutes} max={budget.discretionaryMinutes} size={200} strokeWidth={8} color="#6366f1" />
            </div>
            {/* Middle: used */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BudgetRing value={budget.usedMinutes} max={budget.discretionaryMinutes} size={168} strokeWidth={8} color="#ef4444" />
            </div>
            {/* Inner: earned */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BudgetRing value={budget.earnedMinutes} max={budget.discretionaryMinutes} size={136} strokeWidth={8} color="#10b981" label="balance" sublabel="minutes" />
            </div>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold gradient-text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {budget.currentBalance}
              </div>
              <div className="text-xs" style={{ color: '#94a3b8' }}>min left</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4">
            {[
              { color: '#6366f1', label: 'Budget', value: `${budget.discretionaryMinutes}m` },
              { color: '#ef4444', label: 'Used', value: `${budget.usedMinutes}m` },
              { color: '#10b981', label: 'Earned', value: `+${budget.earnedMinutes}m` },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <div className="text-xs" style={{ color: '#94a3b8' }}>{item.label}</div>
                <div className="text-xs font-mono font-medium" style={{ color: '#f1f5f9' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="flex flex-col gap-3">
          {[
            { icon: '🔒', label: 'Apps Locked', value: lockedApps.length, sub: 'due to overuse', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
            { icon: '⚡', label: 'Time Earned Today', value: `${budget.earnedMinutes}m`, sub: 'via habits & goals', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
            { icon: '💰', label: 'Money Balance', value: `$${budget.moneyBalance.toFixed(2)}`, sub: `+$${budget.moneySaved.toFixed(2)} saved`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
            { icon: '🔥', label: 'Current Streak', value: `${budget.streakDays} days`, sub: 'personal best: 18', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
            >
              <div className="text-xl w-8 text-center">{stat.icon}</div>
              <div className="flex-1">
                <div className="text-xs" style={{ color: '#94a3b8' }}>{stat.label}</div>
                <div className="font-bold text-sm" style={{ color: stat.color, fontFamily: 'JetBrains Mono, monospace' }}>{stat.value}</div>
                <div className="text-xs" style={{ color: '#475569' }}>{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Time Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Time Ledger</div>
            <div className="time-chip time-chip-credit" style={{ fontSize: 9 }}>LIVE</div>
          </div>
          <div>
            {TIME_LEDGER.slice(0, 5).map((entry, i) => (
              <LedgerRow key={i} entry={entry} delay={0.3 + i * 0.06} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Row 2: App Monitoring + Locked Apps ── */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>App Usage Today</div>
            <span className="text-xs" style={{ color: '#475569' }}>Live tracking</span>
          </div>
          <div className="space-y-2">
            {topApps.map((app, i) => (
              <motion.div key={app.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.07 }}>
                <AppStatusBadge app={app} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locked Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-4"
          style={{ border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span>🔒</span>
            <div className="font-semibold text-sm" style={{ color: '#ef4444' }}>Currently Locked</div>
          </div>
          <div className="space-y-3">
            {lockedApps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <div className="text-2xl">{app.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{app.name}</div>
                  <div className="text-xs" style={{ color: '#ef4444' }}>
                    Over by {app.used - app.limit}m · Unlocks {app.lockedUntil}
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm"
                >🔒</motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#94a3b8' }}>
            💡 <strong style={{ color: '#818cf8' }}>Earn time back</strong> by completing habits in the Habits tab to unlock these apps early.
          </div>
        </motion.div>

        {/* Mini weekly bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-4"
        >
          <div className="font-semibold text-sm mb-1" style={{ color: '#f1f5f9' }}>Weekly Performance</div>
          <div className="text-xs mb-4" style={{ color: '#475569' }}>Earned vs Wasted minutes</div>

          <div className="flex items-end gap-2" style={{ height: 80 }}>
            {WEEKLY_DATA.map((d, i) => {
              const maxVal = 180;
              const earnH = (d.earned / maxVal) * 80;
              const wasteH = (d.wasted / maxVal) * 80;
              const isToday = i === 6;

              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        height: `${earnH}px`,
                        width: '100%',
                        background: 'linear-gradient(180deg, #10b981, #059669)',
                        borderRadius: '4px 4px 0 0',
                        transformOrigin: 'bottom',
                        opacity: isToday ? 1 : 0.6,
                      }}
                    />
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.55 + i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        height: `${wasteH}px`,
                        width: '100%',
                        background: 'linear-gradient(180deg, #ef4444, #dc2626)',
                        borderRadius: '0 0 4px 4px',
                        transformOrigin: 'top',
                        opacity: isToday ? 1 : 0.4,
                      }}
                    />
                  </div>
                  <div className="text-xs font-medium" style={{ color: isToday ? '#818cf8' : '#475569', fontSize: 10 }}>
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score bar */}
          <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex justify-between text-xs mb-2" style={{ color: '#94a3b8' }}>
              <span>Today's Discipline Score</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>88 / 100</span>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '88%' }}
                transition={{ delay: 1, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                className="progress-fill"
                style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #10b981)' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Row 3: Live Activity ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Live Activity Feed</div>
          <div className="flex items-center gap-2">
            <div className="status-indicator status-active" />
            <span className="text-xs" style={{ color: '#10b981' }}>Monitoring</span>
          </div>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {[
            { app: 'VS Code', time: '3h 34m', status: 'active', icon: '💻', type: 'productive' },
            { app: 'Instagram', time: '2h 7m', status: 'locked', icon: '📸', type: 'social' },
            { app: 'Slack', time: '1h 28m', status: 'active', icon: '💬', type: 'communication' },
            { app: 'Twitter/X', time: '1h 7m', status: 'locked', icon: '𝕏', type: 'social' },
            { app: 'Spotify', time: '1h 16m', status: 'active', icon: '🎧', type: 'entertainment' },
            { app: 'YouTube', time: '48m', status: 'active', icon: '▶️', type: 'entertainment' },
          ].map((item, i) => (
            <motion.div
              key={item.app}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              className="flex items-center gap-2 p-2.5 rounded-xl"
              style={{
                background: item.status === 'locked' ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${item.status === 'locked' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: '#f1f5f9' }}>{item.app}</div>
                <div className="text-xs" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>{item.time}</div>
              </div>
              <div
                className="status-indicator flex-shrink-0"
                style={{
                  background: item.status === 'locked' ? '#ef4444' : '#10b981',
                  boxShadow: `0 0 8px ${item.status === 'locked' ? '#ef444480' : '#10b98180'}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
