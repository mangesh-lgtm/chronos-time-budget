import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WidgetHubView() {
  const [studyActive, setStudyActive] = useState(false);
  const [balance, setBalance] = useState(112); // in minutes (1h 52m)

  // 5-day historical mock data for Gamma Widget
  const historyData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 5.0 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 4.2 }
  ];

  return (
    <div className="view-scroll">
      {/* ── Header ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <div className="badge badge-primary mb-3">Widget Hub</div>
        <h2 className="t-headline-lg text-on-surface mb-2">Home-Screen Widgets</h2>
        <p className="t-body-md text-muted max-w-sm mx-auto">
          Configure physical home-screen widgets for Android (Jetpack Glance) and iOS (WidgetKit).
        </p>
      </motion.section>

      {/* ── Widget Alpha: Quick Lock (1x1) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-1">Widget Alpha (1x1 Quick Lock)</h3>
        <p className="t-body-md text-muted mb-6">Instantly trigger focus protocol directly from the home screen.</p>
        
        <div className="flex items-center justify-center p-6 rounded-2xl" style={{ background: 'var(--surface-container-low)' }}>
          {/* Mock Widget Shell */}
          <div
            onClick={() => setStudyActive(!studyActive)}
            className="flex flex-col items-center justify-center cursor-pointer shadow-lg transition-all"
            style={{
              width: 100, height: 100, borderRadius: 24,
              background: 'var(--surface-container-high)',
              border: `1px solid ${studyActive ? 'var(--primary)' : 'rgba(255,255,255,0.06)'}`,
              boxShadow: studyActive ? '0 0 15px rgba(190, 198, 224, 0.2)' : 'none'
            }}
          >
            <span className="material-symbols-outlined text-primary mb-2" style={{
              fontSize: 28,
              color: studyActive ? 'var(--primary)' : 'var(--on-surface-variant)'
            }}>
              {studyActive ? 'lock' : 'lock_open'}
            </span>
            <span className="t-label-sm" style={{ fontWeight: 800 }}>
              {studyActive ? 'LOCKED' : 'UNLOCK'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Widget Beta: Balance Bar (2x1) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-1">Widget Beta (2x1 Balance Bar)</h3>
        <p className="t-body-md text-muted mb-6">Real-time focus balance indicator with tracking status.</p>

        <div className="flex items-center justify-center p-6 rounded-2xl" style={{ background: 'var(--surface-container-low)' }}>
          {/* Mock Widget Shell */}
          <div
            className="flex flex-col justify-between p-4 shadow-lg"
            style={{
              width: 220, height: 100, borderRadius: 24,
              background: 'var(--surface-container-high)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="t-label-sm text-muted">Focus Reserve</span>
              <div className="flex items-center gap-1.5">
                <div className="ping-dot"><div className="ping-dot-inner" /></div>
                <span className="t-label-sm text-primary">Live</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}>
                {Math.floor(balance / 60)}h {balance % 60}m
              </div>
              <div className="t-label-sm text-muted" style={{ marginTop: 2 }}>Balance status aligned</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Widget Gamma: Complete Array (4x2) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-1">Widget Gamma (4x2 Complete Array)</h3>
        <p className="t-body-md text-muted mb-6">Full statistics: daily focus usage plus 5-day history.</p>

        <div className="flex items-center justify-center p-6 rounded-2xl" style={{ background: 'var(--surface-container-low)' }}>
          {/* Mock Widget Shell */}
          <div
            className="p-5 shadow-lg flex flex-col justify-between"
            style={{
              width: 320, height: 160, borderRadius: 28,
              background: 'var(--surface-container-high)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>waves</span>
                <span className="t-label-sm" style={{ fontWeight: 800 }}>CHRONOS HARVEST</span>
              </div>
              <span className="t-label-sm text-muted">Rhythm status: Serene</span>
            </div>

            <div className="flex items-center gap-4 flex-1">
              {/* Daily total */}
              <div style={{ flex: 1.2 }}>
                <div className="t-label-sm text-muted">Daily Time</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
                  4h 12m
                </div>
                <div className="liquid-progress" style={{ height: 6, background: 'var(--surface-container-lowest)', borderRadius: 100 }}>
                  <div style={{ width: '65%', height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>

              {/* Historical bar chart */}
              <div className="flex items-end gap-2 h-full flex-1" style={{ justifyContent: 'space-between', paddingBottom: 6 }}>
                {historyData.map(h => (
                  <div key={h.day} className="flex flex-col items-center gap-1.5" style={{ flex: 1 }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${(h.hours / 6) * 44}px`,
                        background: 'linear-gradient(180deg, var(--primary), rgba(190,198,224,0.3))',
                        borderRadius: 4
                      }}
                    />
                    <span className="t-label-sm text-muted" style={{ fontSize: 8 }}>{h.day[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
