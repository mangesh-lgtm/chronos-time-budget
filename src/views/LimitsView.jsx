import { motion } from 'framer-motion';

const apps = [
  {
    icon: 'web', name: 'Social Feed',  desc: 'Might feel draining today.',
    used: '1h 45m', limit: '2h', pct: 0.875,
    status: 'Heavy Spirits', statusColor: 'var(--error)', statusBg: 'rgba(255,180,171,0.1)',
    barColor: 'rgba(255,180,171,0.7)', borderColor: 'rgba(255,180,171,0.25)',
    action: 'Mindful Pause', actionIcon: 'hourglass_top',
  },
  {
    icon: 'energy_savings_leaf', name: 'Work Sync', desc: 'Nearly at your comfort zone.',
    used: '2h 10m', limit: '3h', pct: 0.72,
    status: 'Gentle Nudge', statusColor: 'var(--tertiary)', statusBg: 'rgba(222,194,154,0.1)',
    barColor: 'rgba(222,194,154,0.7)', borderColor: 'rgba(222,194,154,0.25)',
    action: 'Pause Flow', actionIcon: 'flare',
  },
  {
    icon: 'water_drop', name: 'Deep Work', desc: 'Energy is perfectly aligned.',
    used: '45m', limit: '4h', pct: 0.19,
    status: 'Calm Waters', statusColor: 'var(--primary)', statusBg: 'rgba(190,198,224,0.1)',
    barColor: 'rgba(190,198,224,0.8)', borderColor: 'rgba(190,198,224,0.2)',
    action: 'Let It Flow', actionIcon: 'water',
  },
];

const weekData = [
  { h: 90, day: 'M' }, { h: 70, day: 'T' }, { h: 80, day: 'W' },
  { h: 55, day: 'T' }, { h: 0, day: 'F' }, { h: 0, day: 'S' }, { h: 0, day: 'S' },
];

const pauses = [
  { icon: 'self_improvement', text: 'Re-centered focus', sub: 'After 45m Social Media session', time: '10:10 AM', color: 'var(--primary)' },
  { icon: 'local_cafe',       text: 'Gentle break', sub: 'Recommended for high productivity', time: '2:15 PM', color: 'var(--tertiary)' },
];

export default function LimitsView() {
  return (
    <div className="view-scroll">

      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ paddingTop: 8 }}
      >
        <div className="badge badge-secondary" style={{ marginBottom: 16 }}>Balance Status: Serene</div>

        <h2 className="t-headline-lg text-on-surface" style={{ marginBottom: 12 }}>
          Your time is a{' '}
          <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>flowing river</em>
          , not a fixed resource.
        </h2>
        <p className="t-body-md text-muted">
          Find harmony between productivity and presence. Use these gentle nudges to redirect your focus when your spirits feel heavy.
        </p>
      </motion.section>

      {/* ── Today's Presence Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{ position: 'relative', overflow: 'hidden', boxShadow: '0 0 20px rgba(190,198,224,0.06)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <p className="t-label-md text-muted" style={{ marginBottom: 4 }}>Today's Presence</p>
            <h3 className="t-headline-sm text-on-surface">4h 12m Flow</h3>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--primary)', opacity: 0.35 }}>waves</span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="t-label-md text-on-surface" style={{ fontWeight: 600 }}>Mindful Usage</span>
            <span className="t-label-sm text-primary">65% of Rhythm</span>
          </div>
          <div className="liquid-progress" style={{ height: 16, background: 'var(--surface-container)', borderRadius: 100 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                height: '100%', borderRadius: 100,
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                boxShadow: '0 0 15px rgba(190,198,224,0.3)',
              }}
            />
          </div>
        </div>

        {/* Decorative glow */}
        <div style={{
          position: 'absolute', bottom: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(190,198,224,0.06)', filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* ── Refining Your Rhythm ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
          <h3 className="t-headline-sm text-on-surface">Refining Your Rhythm</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)', fontSize: 16 }}>lightbulb</span>
            <span className="t-label-sm text-muted">Gentle guidance</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              className="glass-card rounded-3xl p-5"
              style={{ borderLeft: `4px solid ${app.borderColor}` }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: app.statusBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ color: app.statusColor, fontSize: 20 }}>{app.icon}</span>
                </div>
                <span style={{
                  padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                  background: app.statusBg, color: app.statusColor, letterSpacing: '0.04em',
                }}>{app.status}</span>
              </div>

              <h4 className="t-headline-sm text-on-surface" style={{ marginBottom: 4 }}>{app.name}</h4>
              <p className="t-body-md text-muted" style={{ marginBottom: 16 }}>{app.desc}</p>

              {/* Progress */}
              <div className="liquid-progress" style={{ height: 8, background: 'var(--surface-container-high)', marginBottom: 12 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${app.pct * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  style={{ height: '100%', borderRadius: 100, background: app.barColor }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="t-label-sm text-muted">{app.used} / {app.limit} Limit</span>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--primary-fixed-dim)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{app.actionIcon}</span>
                  {app.action}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── The Week in Motion ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface" style={{ marginBottom: 4 }}>The Week in Motion</h3>
        <p className="t-label-md text-muted" style={{ marginBottom: 20 }}>Consistency is better than perfection.</p>

        <div className="week-bar">
          {weekData.map((d, i) => (
            <div key={i} className="week-bar-col">
              <motion.div
                className="week-bar-fill"
                initial={{ height: 0 }}
                animate={{ height: d.h > 0 ? `${d.h}%` : '4px' }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ opacity: d.h === 0 ? 0.15 : 1 }}
              />
              <span className="week-bar-label">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Recent Pauses ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface" style={{ marginBottom: 16 }}>Recent Pauses</h3>

        {pauses.map((p, i) => (
          <div key={i} className="table-row">
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'var(--surface-container)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ color: p.color, fontSize: 20 }}>{p.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="t-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{p.text}</div>
              <div className="t-label-sm text-muted" style={{ marginTop: 2 }}>{p.sub}</div>
            </div>
            <div className="t-label-sm text-muted" style={{ flexShrink: 0 }}>{p.time}</div>
          </div>
        ))}

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_circle</span>
          Start Flow Session
        </button>
      </motion.div>
    </div>
  );
}
