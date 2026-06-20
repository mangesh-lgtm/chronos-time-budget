import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HABITS } from '../data/chronosData';

function HabitCard({ habit, onComplete }) {
  const [animating, setAnimating] = useState(false);

  const handleComplete = () => {
    if (habit.completed) return;
    setAnimating(true);
    setTimeout(() => {
      onComplete(habit.id);
      setAnimating(false);
    }, 600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="card challenge-card p-4"
      style={{
        border: `1px solid ${habit.completed ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)'}`,
        background: habit.completed ? 'rgba(16,185,129,0.04)' : undefined,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            animate={animating ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
            className="text-3xl"
          >
            {habit.icon}
          </motion.div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>{habit.name}</div>
            <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{habit.description}</div>
          </div>
        </div>

        {/* Reward badge */}
        <div className="flex flex-col items-end gap-1">
          <div className="time-chip time-chip-credit" style={{ whiteSpace: 'nowrap' }}>
            +{habit.reward}m
          </div>
          <div className="text-xs" style={{ color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>
            +{habit.xp} XP
          </div>
        </div>
      </div>

      {/* Streak */}
      {habit.streak > 0 && (
        <div className="flex items-center gap-1.5 mb-3">
          <span>🔥</span>
          <span className="text-xs font-medium" style={{ color: '#f59e0b' }}>{habit.streak} day streak</span>
          <div className="flex gap-0.5 ml-1">
            {Array.from({ length: Math.min(7, habit.streak) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#f59e0b', opacity: 0.6 + (i / habit.streak) * 0.4 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Complete button */}
      <motion.button
        whileHover={habit.completed ? {} : { scale: 1.02 }}
        whileTap={habit.completed ? {} : { scale: 0.98 }}
        onClick={handleComplete}
        disabled={habit.completed}
        className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
        style={{
          background: habit.completed
            ? 'rgba(16,185,129,0.15)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: habit.completed ? '1px solid rgba(16,185,129,0.3)' : 'none',
          color: habit.completed ? '#10b981' : '#fff',
          cursor: habit.completed ? 'default' : 'pointer',
        }}
      >
        {habit.completed ? (
          <>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >✓</motion.span>
            Completed — Time earned!
          </>
        ) : (
          <>Mark as Complete</>
        )}
      </motion.button>
    </motion.div>
  );
}

export default function Habits({ budget, onBudgetChange }) {
  const [habits, setHabits] = useState(HABITS);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);

  const completedCount = habits.filter(h => h.completed).length;
  const totalReward = habits.filter(h => h.completed).reduce((s, h) => s + h.reward, 0);
  const totalXP = habits.filter(h => h.completed).reduce((s, h) => s + h.xp, 0);

  const handleComplete = (id) => {
    const habit = habits.find(h => h.id === id);
    if (!habit || habit.completed) return;

    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: true, streak: h.streak + 1 } : h));

    setToast({ message: `${habit.icon} ${habit.name} done! +${habit.reward}min earned`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = filter === 'all' ? habits : filter === 'done' ? habits.filter(h => h.completed) : habits.filter(h => !h.completed);

  return (
    <div className="main-scroll p-5 space-y-5">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2"
            style={{ background: 'rgba(16,185,129,0.9)', color: '#fff', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}
          >
            🏆 {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary header */}
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {[
          { label: 'Completed Today', value: `${completedCount} / ${habits.length}`, color: '#10b981', icon: '✅', sub: 'habits done' },
          { label: 'Time Earned', value: `${totalReward}m`, color: '#6366f1', icon: '⏱', sub: 'credited to balance' },
          { label: 'XP Earned', value: totalXP.toLocaleString(), color: '#f59e0b', icon: '⚡', sub: 'experience points' },
          { label: 'Completion Rate', value: `${Math.round((completedCount / habits.length) * 100)}%`, color: '#8b5cf6', icon: '📈', sub: 'today' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{s.icon}</span>
              <div className="text-xs" style={{ color: '#475569' }}>{s.label}</div>
            </div>
            <div className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress towards unlock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card p-4"
        style={{ border: '1px solid rgba(99,102,241,0.2)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Unlock Progress</div>
            <div className="text-xs" style={{ color: '#475569' }}>Complete habits to unlock locked apps</div>
          </div>
          <div className="time-chip" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}>
            {totalReward}m earned
          </div>
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { app: '📸 Instagram', needed: 67, color: '#E1306C' },
            { app: '𝕏 Twitter', needed: 47, color: '#1DA1F2' },
            { app: '🎵 TikTok', needed: 94, color: '#010101' },
          ].map(item => {
            const progress = Math.min(1, totalReward / item.needed);
            return (
              <div key={item.app} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex justify-between text-xs mb-2">
                  <span style={{ color: '#f1f5f9' }}>{item.app}</span>
                  <span style={{ color: progress >= 1 ? '#10b981' : '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                    {progress >= 1 ? '✓ Unlocked!' : `${totalReward}/${item.needed}m`}
                  </span>
                </div>
                <div className="progress-track" style={{ height: '4px' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="progress-fill"
                    style={{ height: '100%', background: progress >= 1 ? '#10b981' : 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: `All Habits (${habits.length})` },
          { id: 'pending', label: `Pending (${habits.filter(h => !h.completed).length})` },
          { id: 'done', label: `Done (${completedCount})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="px-4 py-1.5 rounded-xl text-xs font-medium"
            style={{
              background: filter === tab.id ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === tab.id ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: filter === tab.id ? '#818cf8' : '#94a3b8',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Habit grid */}
      <motion.div layout className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        <AnimatePresence>
          {filtered.map((habit, i) => (
            <HabitCard key={habit.id} habit={habit} onComplete={handleComplete} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Challenge creation CTA */}
      <motion.div
        className="card p-4 flex items-center justify-between"
        style={{ borderStyle: 'dashed' }}
        whileHover={{ borderColor: 'rgba(99,102,241,0.4)' }}
      >
        <div>
          <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Create Custom Habit</div>
          <div className="text-xs mt-0.5" style={{ color: '#475569' }}>Define your own goals and time rewards</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}
        >
          + New Habit
        </motion.button>
      </motion.div>
    </div>
  );
}
