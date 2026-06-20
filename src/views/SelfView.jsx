import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SelfView() {
  const [stakes, setStakes] = useState({
    gpsFine: true,
    screentimeFine: true,
    habitReward: true,
    baseFine: 5.00,
    multiplier: 1.5,
  });

  const ledger = [
    { type: 'reward', label: 'Gym Zone Entry', amount: '+$5.00', date: 'Today, 8:15 AM', status: 'Cleared' },
    { type: 'penalty', label: 'Instagram Limit Exceeded', amount: '-$7.50', date: 'Yesterday, 9:30 PM', status: 'Deducted' },
    { type: 'reward', label: 'Deep Work Session (2h)', amount: '+$10.00', date: 'Yesterday, 2:00 PM', status: 'Cleared' },
  ];

  return (
    <div className="view-scroll">
      {/* ── Hero section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6"
        style={{ position: 'relative' }}
      >
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 0, pointerEvents: 'none',
        }}>
          <div className="animate-float" style={{
            width: 220, height: 220, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(222,194,154,0.15) 0%, rgba(190,198,224,0.08) 60%, transparent 80%)',
            filter: 'blur(40px)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-secondary" style={{ marginBottom: 16 }}>Financial Stakes</div>
          <h2 className="t-headline-lg text-on-surface" style={{ marginBottom: 10 }}>Capital Commitments</h2>
          <p className="t-body-md text-muted" style={{ maxWidth: 320, margin: '0 auto' }}>
            Put real skin in the game. Connect your funding sources and set your risk tolerances.
          </p>
        </div>
      </motion.section>

      {/* ── Stakes Bento / Commitment Capital Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{ position: 'relative', overflow: 'hidden', marginBottom: 20 }}
      >
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.08, color: 'var(--tertiary)'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 72 }}>payments</span>
        </div>

        <p className="t-label-md text-muted" style={{ marginBottom: 4 }}>Commitment Capital</p>
        <div style={{
          fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em',
          color: 'var(--tertiary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1,
          marginBottom: 12
        }}>$2,450.00</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tertiary)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>shield</span>
          <span className="t-label-sm" style={{ fontWeight: 600 }}>Stripe & Plaid Linked</span>
        </div>
      </motion.div>

      {/* ── Stakes Config ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{ marginBottom: 20 }}
      >
        <h3 className="t-headline-sm text-on-surface" style={{ marginBottom: 20 }}>Stakes Configuration</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* GPS Fine Toggle */}
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'between', alignItems: 'center' }}>
            <div>
              <div className="t-body-md text-on-surface" style={{ fontWeight: 600 }}>Geofence Penalties</div>
              <div className="t-label-sm text-muted">Fine if you leave gym/work zones prematurely</div>
            </div>
            <button
              onClick={() => setStakes(s => ({ ...s, gpsFine: !s.gpsFine }))}
              style={{
                width: 48, height: 26, borderRadius: 100,
                background: stakes.gpsFine ? 'var(--tertiary)' : 'var(--surface-container-highest)',
                position: 'relative', border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#1c1b1f',
                position: 'absolute', top: 3, left: stakes.gpsFine ? 25 : 3,
                transition: 'left 0.2s',
              }} />
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* ScreenTime Fine Toggle */}
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'between', alignItems: 'center' }}>
            <div>
              <div className="t-body-md text-on-surface" style={{ fontWeight: 600 }}>Overuse Penalties</div>
              <div className="t-label-sm text-muted">Charge real money when time budget drops below 0</div>
            </div>
            <button
              onClick={() => setStakes(s => ({ ...s, screentimeFine: !s.screentimeFine }))}
              style={{
                width: 48, height: 26, borderRadius: 100,
                background: stakes.screentimeFine ? 'var(--tertiary)' : 'var(--surface-container-highest)',
                position: 'relative', border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#1c1b1f',
                position: 'absolute', top: 3, left: stakes.screentimeFine ? 25 : 3,
                transition: 'left 0.2s',
              }} />
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* Habit Reward Toggle */}
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'between', alignItems: 'center' }}>
            <div>
              <div className="t-body-md text-on-surface" style={{ fontWeight: 600 }}>Habit Micro-deposits</div>
              <div className="t-label-sm text-muted">Reward hard work with micro-deposits to savings</div>
            </div>
            <button
              onClick={() => setStakes(s => ({ ...s, habitReward: !s.habitReward }))}
              style={{
                width: 48, height: 26, borderRadius: 100,
                background: stakes.habitReward ? 'var(--tertiary)' : 'var(--surface-container-highest)',
                position: 'relative', border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#1c1b1f',
                position: 'absolute', top: 3, left: stakes.habitReward ? 25 : 3,
                transition: 'left 0.2s',
              }} />
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* Slider for Base Fine */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="t-body-md text-on-surface" style={{ fontWeight: 600 }}>Base Fine Amount</span>
              <span className="t-body-md" style={{ color: 'var(--tertiary)', fontWeight: 700 }}>${stakes.baseFine.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={stakes.baseFine}
              onChange={(e) => setStakes(s => ({ ...s, baseFine: parseFloat(e.target.value) }))}
              style={{
                width: '100%',
                accentColor: 'var(--tertiary)',
                background: 'var(--surface-container-highest)',
                height: 6,
                borderRadius: 3,
                outline: 'none',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Commitment & Growth Ledger ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{ marginBottom: 20 }}
      >
        <h3 className="t-headline-sm text-on-surface" style={{ marginBottom: 16 }}>Commitment Ledger</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ledger.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: item.type === 'reward' ? 'rgba(190,198,224,0.1)' : 'rgba(255,180,171,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: 20,
                    color: item.type === 'reward' ? 'var(--primary)' : 'var(--error)'
                  }}>
                    {item.type === 'reward' ? 'trending_up' : 'trending_down'}
                  </span>
                </div>
                <div>
                  <div className="t-body-md text-on-surface" style={{ fontWeight: 600 }}>{item.label}</div>
                  <div className="t-label-sm text-muted">{item.date}</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="t-body-md" style={{
                  fontWeight: 700,
                  color: item.type === 'reward' ? 'var(--primary)' : 'var(--error)'
                }}>{item.amount}</div>
                <div className="t-label-sm text-muted">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Vault Integrity Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="glass-card rounded-3xl p-6"
        style={{
          border: '1px solid rgba(222,194,154,0.2)',
          background: 'linear-gradient(135deg, rgba(31,31,33,0.8) 0%, rgba(38,32,24,0.8) 100%)',
          display: 'flex', flexDirection: 'column', gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>verified_user</span>
          <span className="t-headline-sm text-on-surface" style={{ fontWeight: 600 }}>Vault Integrity Verified</span>
        </div>
        <p className="t-body-md text-muted" style={{ lineHeight: 1.5 }}>
          Smart contracts and Plaid links are active. Attempting to bypass limits or bypass geofencing triggers auto-forfeit protocol.
        </p>
      </motion.div>
    </div>
  );
}
