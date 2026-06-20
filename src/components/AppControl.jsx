import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TRACKED_APPS, APP_CATEGORIES } from '../data/chronosData';

function AppCard({ app, onToggleLock, onEditLimit }) {
  const pct = Math.min(1, app.used / app.limit);
  const isOver = app.used > app.limit;
  const remaining = Math.max(0, app.limit - app.used);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="card p-4 challenge-card"
      style={{
        border: `1px solid ${app.locked ? 'rgba(239,68,68,0.25)' : isOver ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {/* App header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `${app.color}22`, border: `1px solid ${app.color}44` }}
          >
            {app.icon}
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>{app.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: APP_CATEGORIES[app.category]?.color || '#6366f1' }}
              />
              <span className="text-xs" style={{ color: '#475569' }}>{APP_CATEGORIES[app.category]?.label}</span>
            </div>
          </div>
        </div>

        {/* Lock toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleLock(app.id)}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
          style={{
            background: app.locked ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${app.locked ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {app.locked ? '🔒' : '🔓'}
        </motion.button>
      </div>

      {/* Usage stat */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xl font-bold" style={{ color: isOver ? '#ef4444' : '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
            {app.used}m
          </span>
          <span className="text-xs ml-1" style={{ color: '#475569' }}>used</span>
        </div>
        <div className="text-right">
          {isOver ? (
            <div className="text-xs font-mono" style={{ color: '#ef4444' }}>+{app.used - app.limit}m over</div>
          ) : (
            <div className="text-xs font-mono" style={{ color: '#10b981' }}>{remaining}m left</div>
          )}
          <div className="text-xs" style={{ color: '#475569' }}>/ {app.limit}m limit</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track mb-3" style={{ height: '6px' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, pct * 100)}%` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="progress-fill"
          style={{
            height: '100%',
            background: isOver
              ? 'linear-gradient(90deg, #ef4444, #dc2626)'
              : pct > 0.8
              ? 'linear-gradient(90deg, #f59e0b, #d97706)'
              : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            boxShadow: isOver ? '0 0 8px rgba(239,68,68,0.5)' : undefined,
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onEditLimit(app.id)}
          className="flex-1 py-1.5 rounded-xl text-xs font-medium text-center"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
        >
          Edit Limit
        </motion.button>
        {app.locked && (
          <div className="flex-1 py-1.5 rounded-xl text-xs font-medium text-center" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
            Unlocks {app.lockedUntil || 'tomorrow'}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AppControl() {
  const [apps, setApps] = useState(TRACKED_APPS);
  const [filter, setFilter] = useState('all');
  const [editApp, setEditApp] = useState(null);
  const [newLimit, setNewLimit] = useState('');

  const categories = ['all', ...Object.keys(APP_CATEGORIES)];
  const filtered = filter === 'all' ? apps : apps.filter(a => a.category === filter);
  const locked = apps.filter(a => a.locked).length;
  const overLimit = apps.filter(a => a.used > a.limit).length;

  const handleToggleLock = (id) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, locked: !a.locked } : a));
  };

  const handleEditLimit = (id) => {
    const app = apps.find(a => a.id === id);
    setEditApp(app);
    setNewLimit(String(app.limit));
  };

  const handleSaveLimit = () => {
    if (!editApp) return;
    setApps(prev => prev.map(a => a.id === editApp.id ? { ...a, limit: parseInt(newLimit) || a.limit } : a));
    setEditApp(null);
  };

  return (
    <div className="main-scroll p-5 space-y-5">
      {/* Header stats */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total Apps', value: apps.length, color: '#6366f1', icon: '📱' },
          { label: 'Locked Now', value: locked, color: '#ef4444', icon: '🔒' },
          { label: 'Over Limit', value: overLimit, color: '#f59e0b', icon: '⚠️' },
          { label: 'Compliant', value: apps.length - overLimit, color: '#10b981', icon: '✅' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-3 text-center"
            style={{ border: `1px solid ${s.color}22` }}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
            <div className="text-xs" style={{ color: '#475569' }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFilter(cat)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium capitalize"
            style={{
              background: filter === cat ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === cat ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: filter === cat ? '#818cf8' : '#94a3b8',
            }}
          >
            {cat === 'all' ? '🌐 All' : `${APP_CATEGORIES[cat]?.icon} ${APP_CATEGORIES[cat]?.label}`}
          </motion.button>
        ))}
      </div>

      {/* App grid */}
      <motion.div layout className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        <AnimatePresence>
          {filtered.map((app, i) => (
            <AppCard
              key={app.id}
              app={app}
              onToggleLock={handleToggleLock}
              onEditLimit={handleEditLimit}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add custom rule banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card p-4 flex items-center justify-between"
        style={{ borderStyle: 'dashed' }}
      >
        <div>
          <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Add Smart Rules</div>
          <div className="text-xs mt-0.5" style={{ color: '#475569' }}>
            Create custom time rules based on location, time of day, or habit completion
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl text-xs font-semibold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}
        >
          + Add Rule
        </motion.button>
      </motion.div>

      {/* Edit modal */}
      <AnimatePresence>
        {editApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setEditApp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="card p-6 w-80"
              style={{ border: '1px solid rgba(99,102,241,0.3)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">{editApp.icon}</div>
                <div>
                  <div className="font-bold" style={{ color: '#f1f5f9' }}>{editApp.name}</div>
                  <div className="text-xs" style={{ color: '#475569' }}>Set daily time limit</div>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs mb-2 block" style={{ color: '#94a3b8' }}>Daily Limit (minutes)</label>
                <input
                  type="number"
                  value={newLimit}
                  onChange={e => setNewLimit(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#f1f5f9',
                    outline: 'none',
                  }}
                  autoFocus
                />
                <div className="text-xs mt-1.5" style={{ color: '#475569' }}>
                  Current usage: {editApp.used}m today
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditApp(null)}
                  className="flex-1 py-2 rounded-xl text-xs"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveLimit}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  Save Limit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
