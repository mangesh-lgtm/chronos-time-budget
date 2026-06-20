import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ─── SVG Progress Ring ────────────────────────────────────────────────────────
function ProgressRing({ size = 192, strokeWidth = 8, pct = 0.75, label, icon }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="ring-svg" width={size} height={size}>
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="currentColor" strokeWidth={strokeWidth / 2} />
        <motion.circle
          className="ring-fill"
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center animate-breathe">
        {icon && <span className="material-symbols-outlined text-4xl text-primary" style={{ opacity: 0.5, fontVariationSettings: "'wght' 200" }}>{icon}</span>}
        {label && <span className="t-label-sm text-muted mt-1">{label}</span>}
      </div>
    </div>
  );
}

// ─── Live Balance Counter ─────────────────────────────────────────────────────
function LiveBalance() {
  const [secs, setSecs] = useState(15);
  const [mins, setMins] = useState(20);
  const [hrs,  setHrs]  = useState(4);

  useEffect(() => {
    const t = setInterval(() => {
      setSecs(s => {
        if (s > 0) return s - 1;
        setMins(m => {
          if (m > 0) return m - 1;
          setHrs(h => (h > 0 ? h - 1 : 0));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = n => n.toString().padStart(2, '0');
  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="animate-count-glow"
      style={{
        fontSize: 'clamp(52px, 14vw, 72px)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        background: 'linear-gradient(180deg, #e4e2e4 30%, #bec6e0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      ${fmt(hrs)}:{fmt(mins)}:{fmt(secs)}
    </motion.h2>
  );
}

// ─── Vault View ───────────────────────────────────────────────────────────────
export default function VaultView() {
  return (
    <div className="view-scroll">

      {/* ── Hero: Current Reserve ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center justify-center py-10 text-center"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-breathe" style={{
            width: 280, height: 280, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,198,224,0.12) 0%, rgba(222,194,154,0.06) 60%, transparent 80%)',
            filter: 'blur(32px)',
          }} />
        </div>

        <p className="t-label-sm text-muted mb-4" style={{ letterSpacing: '0.2em' }}>CURRENT RESERVE</p>

        <LiveBalance />

        {/* FLOWING indicator */}
        <div className="flex items-center gap-3 mt-6">
          <div className="ping-dot">
            <div className="ping-dot-inner" />
          </div>
          <span className="t-label-sm text-primary" style={{ letterSpacing: '0.2em' }}>FLOWING</span>
        </div>
      </motion.section>

      {/* ── Daily Harvest Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="glass-card glass-card-hover rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div style={{
            padding: '10px', borderRadius: '14px',
            background: 'rgba(190,198,224,0.1)',
          }}>
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>energy_savings_leaf</span>
          </div>
          <span className="badge badge-primary">+12% vs yest.</span>
        </div>

        <h3 className="t-headline-sm text-on-surface mb-1">Daily Harvest</h3>
        <p className="t-body-md text-muted mb-6">Time earned through focused presence and intentional breaks.</p>

        <div style={{
          fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em',
          color: 'var(--primary)', fontVariantNumeric: 'tabular-nums',
        }}>$01:45:00</div>

        {/* Progress */}
        <div className="mt-4">
          <div className="liquid-progress" style={{
            height: 6, background: 'var(--surface-container-highest)', borderRadius: 100,
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{
                height: '100%', borderRadius: 100,
                background: 'linear-gradient(90deg, var(--primary), var(--tertiary))',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Quiet Flow Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-start gap-4">
          <div style={{ flex: 1 }}>
            <h3 className="t-headline-sm text-on-surface mb-2">Quiet Flow</h3>
            <p className="t-body-md text-muted mb-5">Visualizing the gentle expiration of your daily cycle. Each breath represents a moment anchored in the present.</p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { label: 'Deep Work', color: 'var(--primary)', bg: 'rgba(190,198,224,0.08)', border: 'rgba(190,198,224,0.2)' },
                { label: 'Meditation', color: 'var(--tertiary)', bg: 'rgba(222,194,154,0.08)', border: 'rgba(222,194,154,0.2)' },
                { label: 'Reading', color: 'var(--on-surface-variant)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.06)' },
              ].map(pill => (
                <span key={pill.label} style={{
                  padding: '6px 14px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                  color: pill.color, background: pill.bg, border: `1px solid ${pill.border}`,
                  letterSpacing: '0.04em',
                }}>{pill.label}</span>
              ))}
            </div>
          </div>

          <ProgressRing size={160} strokeWidth={8} pct={0.75} label="75%" icon="air" />
        </div>
      </motion.div>

      {/* ── Recent Transitions ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="t-headline-sm text-on-surface">Recent Transitions</h3>
          <button className="btn-ghost t-label-md" style={{ fontSize: 13, fontWeight: 600 }}>View All Cycles</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: 'self_improvement', label: 'Morning Stillness', sub: 'Flow Session', delta: '+$00:20', positive: true, color: 'var(--primary)' },
            { icon: 'web', label: 'Social Drift', sub: 'Spent', delta: '-$00:45', positive: false, color: 'var(--error)' },
            { icon: 'book_2', label: 'Reading Logic', sub: 'Deep Focus', delta: '+$00:15', positive: true, color: 'var(--tertiary)' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="transition-card"
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: item.positive ? 'rgba(190,198,224,0.08)' : 'rgba(255,180,171,0.08)',
                border: `1px solid ${item.positive ? 'rgba(190,198,224,0.15)' : 'rgba(255,180,171,0.15)'}`,
              }}>
                <span className="material-symbols-outlined" style={{ color: item.color, fontSize: 20 }}>{item.icon}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="t-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{item.label}</div>
                <div className="t-label-sm text-muted" style={{ marginTop: 2 }}>{item.sub}</div>
              </div>
              <div style={{
                fontWeight: 700, fontSize: 14, fontVariantNumeric: 'tabular-nums',
                color: item.positive ? 'var(--primary)' : 'var(--on-surface-variant)',
                flexShrink: 0,
              }}>{item.delta}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Focus Ambiance Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="rounded-3xl overflow-hidden"
        style={{ height: 200, position: 'relative' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 40%, #0d1f1a 100%)',
        }} />
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: 20, right: 20,
          width: 100, height: 100, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,198,224,0.15), transparent)',
          filter: 'blur(20px)',
        }} />
        <div style={{
          position: 'absolute', bottom: 10, left: 30,
          width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(222,194,154,0.12), transparent)',
          filter: 'blur(16px)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19,19,21,0.8), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <h4 className="t-headline-sm" style={{ color: 'white', marginBottom: 4 }}>Focus Ambiance</h4>
          <p className="t-label-md" style={{ color: 'rgba(255,255,255,0.6)' }}>"Time is a flat circle, make it yours."</p>
        </div>
      </motion.div>

      {/* ── Flow Guardians + Cryo-Vault ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: 'timer_off', color: 'var(--tertiary)', title: 'Flow Guardians', desc: 'Automatic locks at $00:10 remaining.' },
            { icon: 'ac_unit',   color: 'var(--primary)', title: 'Cryo-Vault', desc: 'Preserve surplus balance for weekends.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="material-symbols-outlined" style={{ color: item.color, fontSize: 22 }}>{item.icon}</span>
              <div>
                <div className="t-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{item.title}</div>
                <div className="t-label-sm text-muted" style={{ marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 20, borderRadius: 16 }}>
          Configure Limits
        </button>
      </motion.div>
    </div>
  );
}
