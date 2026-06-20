import { motion } from 'framer-motion';
import { WEEKLY_DATA, TRACKED_APPS, APP_CATEGORIES } from '../data/chronosData';

// ─── Category Donut ───────────────────────────────────────────────────────────
function DonutChart({ data, size = 140 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 50;
  const cx = size / 2;
  const cy = size / 2;
  const strokeW = 16;
  const r = (size / 2) - strokeW;
  const circ = 2 * Math.PI * r;

  let cumulative = 0;
  const slices = data.map(d => {
    const pct = d.value / total;
    const slice = { ...d, offset: cumulative, length: pct };
    cumulative += pct;
    return slice;
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {slices.map((s, i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeW}
            strokeDasharray={`${s.length * circ} ${circ}`}
            strokeDashoffset={-s.offset * circ}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            style={{ strokeLinecap: 'butt' }}
          />
        ))}
        {/* Inner shadow circle */}
        <circle cx={cx} cy={cy} r={r - strokeW / 2 - 2} fill="rgba(13,18,32,0.8)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-bold" style={{ color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
          {total}m
        </div>
        <div className="text-xs" style={{ color: '#475569' }}>total</div>
      </div>
    </div>
  );
}

// ─── Heatmap ──────────────────────────────────────────────────────────────────
function Heatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 16 }, (_, i) => `${i + 7}:00`);

  // Generate fake heatmap data
  const data = days.map(d => hours.map(h => {
    const hour = parseInt(h);
    // Productive hours: higher during work time
    if (hour >= 9 && hour <= 17) return Math.random() * 0.7 + 0.3;
    if (hour >= 20 && hour <= 23) return Math.random() * 0.6 + 0.2;
    return Math.random() * 0.3;
  }));

  const getColor = (val) => {
    if (val < 0.2) return 'rgba(99,102,241,0.08)';
    if (val < 0.4) return 'rgba(99,102,241,0.25)';
    if (val < 0.6) return 'rgba(99,102,241,0.5)';
    if (val < 0.8) return 'rgba(99,102,241,0.75)';
    return 'rgba(99,102,241,1)';
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 500 }}>
        {/* Hour labels */}
        <div className="flex mb-1 pl-10">
          {hours.filter((_, i) => i % 2 === 0).map(h => (
            <div key={h} style={{ flex: '0 0 calc(100%/8)', fontSize: 9, color: '#475569', textAlign: 'center' }}>{h}</div>
          ))}
        </div>
        {days.map((day, di) => (
          <div key={day} className="flex items-center gap-1 mb-1">
            <div style={{ width: 36, fontSize: 10, color: '#475569', textAlign: 'right', flexShrink: 0 }}>{day}</div>
            <div className="flex gap-0.5 flex-1">
              {data[di].map((val, hi) => (
                <motion.div
                  key={hi}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: di * 0.04 + hi * 0.02, duration: 0.2 }}
                  className="heatmap-cell"
                  style={{ flex: 1, height: 14, background: getColor(val), borderRadius: 2 }}
                  title={`${day} ${hours[hi]}: ${Math.round(val * 100)}% active`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  // Category usage data for donut
  const categoryData = Object.entries(APP_CATEGORIES).map(([key, cat]) => {
    const apps = TRACKED_APPS.filter(a => a.category === key);
    const value = apps.reduce((s, a) => s + a.used, 0);
    return { label: cat.label, value, color: cat.color, icon: cat.icon };
  }).filter(d => d.value > 0);

  const totalUsage = TRACKED_APPS.reduce((s, a) => s + a.used, 0);
  const productiveTime = TRACKED_APPS.filter(a => a.category === 'productive' || a.category === 'learning').reduce((s, a) => s + a.used, 0);
  const wastedTime = TRACKED_APPS.filter(a => a.category === 'social').reduce((s, a) => s + a.used, 0);
  const focusScore = Math.round((productiveTime / totalUsage) * 100);

  return (
    <div className="main-scroll p-5 space-y-5">
      {/* Summary KPIs */}
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {[
          { label: 'Focus Score', value: `${focusScore}%`, desc: 'of time productive', color: '#10b981', icon: '🎯' },
          { label: 'Total Screen Time', value: `${Math.round(totalUsage / 60)}h ${totalUsage % 60}m`, desc: 'across all apps', color: '#6366f1', icon: '📱' },
          { label: 'Productive Time', value: `${Math.round(productiveTime / 60)}h`, desc: 'work & learning', color: '#06b6d4', icon: '⚡' },
          { label: 'Wasted Time', value: `${wastedTime}m`, desc: 'social media', color: '#ef4444', icon: '⏳' },
          { label: 'Peak Productivity', value: '10–12 AM', desc: 'your best hours', color: '#8b5cf6', icon: '🏆' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4"
          >
            <div className="text-xl mb-2">{s.icon}</div>
            <div className="font-bold text-xl" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{s.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: Donut + Weekly Bar */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '300px 1fr' }}>
        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-5"
        >
          <div className="font-semibold text-sm mb-4" style={{ color: '#f1f5f9' }}>Time by Category</div>
          <div className="flex items-center gap-5">
            <DonutChart data={categoryData} size={140} />
            <div className="flex-1 space-y-2">
              {categoryData.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate" style={{ color: '#94a3b8' }}>{d.icon} {d.label}</div>
                  </div>
                  <div className="text-xs font-mono flex-shrink-0" style={{ color: '#f1f5f9' }}>{d.value}m</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Weekly trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-5"
        >
          <div className="font-semibold text-sm mb-1" style={{ color: '#f1f5f9' }}>Weekly Discipline Score</div>
          <div className="text-xs mb-5" style={{ color: '#475569' }}>Higher is better — earned vs wasted time ratio</div>

          <div className="flex items-end gap-3" style={{ height: 100 }}>
            {WEEKLY_DATA.map((d, i) => {
              const isToday = i === WEEKLY_DATA.length - 1;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-mono" style={{ color: d.score >= 70 ? '#10b981' : d.score >= 50 ? '#f59e0b' : '#ef4444', fontSize: 9 }}>
                    {d.score}
                  </div>
                  <div className="w-full relative flex flex-col justify-end" style={{ height: 80 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.score / 100) * 80}px` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full rounded-lg"
                      style={{
                        background: d.score >= 70
                          ? 'linear-gradient(180deg, #10b981, #059669)'
                          : d.score >= 50
                          ? 'linear-gradient(180deg, #f59e0b, #d97706)'
                          : 'linear-gradient(180deg, #ef4444, #dc2626)',
                        boxShadow: isToday ? `0 0 12px ${d.score >= 70 ? '#10b98140' : '#ef444440'}` : 'none',
                        border: isToday ? '1px solid rgba(255,255,255,0.15)' : 'none',
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

          {/* Avg */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span className="text-xs" style={{ color: '#94a3b8' }}>7-day average</span>
            <span className="font-bold font-mono" style={{ color: '#818cf8' }}>
              {Math.round(WEEKLY_DATA.reduce((s, d) => s + d.score, 0) / WEEKLY_DATA.length)} / 100
            </span>
          </div>
        </motion.div>
      </div>

      {/* Activity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-5"
      >
        <div className="font-semibold text-sm mb-1" style={{ color: '#f1f5f9' }}>Activity Heatmap</div>
        <div className="text-xs mb-4" style={{ color: '#475569' }}>Screen time intensity by hour and day of week</div>
        <Heatmap />
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs" style={{ color: '#475569' }}>Less</span>
          {[0.08, 0.25, 0.5, 0.75, 1].map((v, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: `rgba(99,102,241,${v})` }} />
          ))}
          <span className="text-xs" style={{ color: '#475569' }}>More</span>
        </div>
      </motion.div>

      {/* Top apps by usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-5"
      >
        <div className="font-semibold text-sm mb-4" style={{ color: '#f1f5f9' }}>Top Apps by Usage</div>
        <div className="space-y-3">
          {[...TRACKED_APPS].sort((a, b) => b.used - a.used).map((app, i) => {
            const maxUsed = TRACKED_APPS[0].used;
            const pct = (app.used / 240) * 100;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 text-center flex-shrink-0 text-xs" style={{ color: '#475569' }}>#{i + 1}</div>
                <div className="text-lg w-7 text-center flex-shrink-0">{app.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: '#f1f5f9' }}>{app.name}</span>
                    <span style={{ color: app.used > app.limit ? '#ef4444' : '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                      {app.used}m {app.used > app.limit ? '⚠' : ''}
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: '5px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, pct)}%` }}
                      transition={{ delay: 0.7 + i * 0.06, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="progress-fill"
                      style={{
                        height: '100%',
                        background: app.used > app.limit
                          ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                          : `linear-gradient(90deg, ${APP_CATEGORIES[app.category]?.color || '#6366f1'}88, ${APP_CATEGORIES[app.category]?.color || '#6366f1'})`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
