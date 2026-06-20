import { motion } from 'framer-motion';

// ─── Habit Card ───────────────────────────────────────────────────────────────
function HabitCard({ icon, title, desc, reward, color, bgColor, borderColor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="habit-card glass-card rounded-3xl p-6"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      whileTap={{ scale: 0.97 }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, position: 'relative',
        boxShadow: `0 0 24px ${color}20`,
      }}>
        <span className="material-symbols-outlined" style={{ color, fontSize: 30 }}>{icon}</span>
      </div>

      <h4 className="t-headline-sm text-on-surface" style={{ marginBottom: 8 }}>{title}</h4>
      <p className="t-body-md text-muted" style={{ marginBottom: 20, lineHeight: 1.5 }}>{desc}</p>

      <div style={{
        marginTop: 'auto', padding: '10px 20px', borderRadius: 100,
        background: bgColor, color, fontSize: 12, fontWeight: 700,
        border: `1px solid ${borderColor}`, letterSpacing: '0.03em',
      }}>
        {reward}
      </div>
    </motion.div>
  );
}

// ─── Flow View ────────────────────────────────────────────────────────────────
export default function FlowView() {
  const weekData = [
    { day: 'M', h: 80 }, { day: 'T', h: 60 }, { day: 'W', h: 80 },
    { day: 'T', h: 50 }, { day: 'F', h: 0  }, { day: 'S', h: 0  }, { day: 'S', h: 0 },
  ];

  return (
    <div className="view-scroll">

      {/* ── Hero: Focus Mood ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6"
        style={{ position: 'relative' }}
      >
        {/* Ambient */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 0, pointerEvents: 'none',
        }}>
          <div className="animate-float" style={{
            width: 220, height: 220, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,198,224,0.15) 0%, rgba(188,199,222,0.08) 60%, transparent 80%)',
            filter: 'blur(40px)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-primary animate-pulse-slow" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified_user</span>
            Focus Mood
          </div>

          <h2 className="t-headline-lg text-on-surface" style={{ marginBottom: 10 }}>Equilibrium Found</h2>
          <p className="t-body-md text-muted" style={{ maxWidth: 300, margin: '0 auto' }}>
            Your biological rhythm is synchronized. You are currently earning time at a 1.2× rate.
          </p>
        </div>
      </motion.section>

      {/* ── Stats Bento ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Background icon */}
        <span className="material-symbols-outlined" style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 80, color: 'var(--on-surface)', opacity: 0.06,
        }}>account_balance_wallet</span>

        <p className="t-label-md text-muted" style={{ marginBottom: 4 }}>Time Vault Balance</p>
        <div style={{
          fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em',
          color: 'var(--primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1,
        }}>18:42:05</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, color: 'var(--primary)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
          <span className="t-label-md" style={{ fontWeight: 600 }}>+12m earned today</span>
        </div>
      </motion.div>

      {/* ── Active Flow ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{ border: '1px solid rgba(188,199,222,0.15)' }}
      >
        <p className="t-label-md text-muted" style={{ marginBottom: 4 }}>Active Flow</p>
        <div className="t-headline-sm" style={{ color: 'var(--secondary)', marginBottom: 16 }}>Deep Work</div>

        <div className="liquid-progress" style={{
          height: 6, background: 'var(--surface-container-highest)', marginBottom: 8,
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '100%', borderRadius: 100,
              background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
              boxShadow: '0 0 12px rgba(190,198,224,0.3)',
            }}
          />
        </div>
        <p className="t-label-sm text-muted">42m / 60m session</p>
      </motion.div>

      {/* ── The Exchange ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <h3 className="t-headline-sm text-on-surface">The Exchange</h3>
            <p className="t-label-md text-muted" style={{ marginTop: 2 }}>Convert discipline into life-time credits.</p>
          </div>
          <button className="btn-ghost t-label-md" style={{ fontSize: 13, fontWeight: 600 }}>View History</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <HabitCard
            icon="psychology" title="Deep Work"
            desc="Focus intensely on a single task without distraction."
            reward="Earn 15m / hr"
            color="var(--primary)" bgColor="rgba(190,198,224,0.08)" borderColor="rgba(190,198,224,0.15)"
            delay={0.25}
          />
          <HabitCard
            icon="self_improvement" title="Meditation"
            desc="Reset your cognitive baseline through stillness."
            reward="Earn 20m / session"
            color="var(--secondary)" bgColor="rgba(188,199,222,0.08)" borderColor="rgba(188,199,222,0.15)"
            delay={0.3}
          />
          <HabitCard
            icon="fitness_center" title="Physical Vitality"
            desc="Restore your vessel through intentional movement."
            reward="Earn 10m / streak"
            color="var(--tertiary)" bgColor="rgba(222,194,154,0.08)" borderColor="rgba(222,194,154,0.15)"
            delay={0.35}
          />
        </div>
      </motion.div>

      {/* ── Weekly Harmony ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface" style={{ marginBottom: 20, textAlign: 'center' }}>Weekly Harmony</h3>

        <div className="week-bar">
          {weekData.map((d, i) => (
            <div key={i} className="week-bar-col">
              <motion.div
                className="week-bar-fill"
                initial={{ height: 0 }}
                animate={{ height: d.h > 0 ? `${d.h}%` : '4px' }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ opacity: d.h === 0 ? 0.2 : 1 }}
              />
              <span className="week-bar-label">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
