import { motion } from 'framer-motion';
import { useState } from 'react';
import { BANK_REWARDS, TIME_BUDGET } from '../data/chronosData';

export default function TimeBank({ budget }) {
  const [activeTab, setActiveTab] = useState('transactions');

  const rewards = BANK_REWARDS.filter(t => t.type === 'reward' || t.type === 'bonus');
  const fines = BANK_REWARDS.filter(t => t.type === 'fine');
  const totalEarned = rewards.reduce((s, t) => s + parseFloat(t.amount.replace(/[^0-9.]/g, '')), 0);
  const totalFined = fines.reduce((s, t) => s + parseFloat(t.amount.replace(/[^0-9.]/g, '')), 0);

  return (
    <div className="main-scroll p-5 space-y-5">
      {/* Bank card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
          border: '1px solid rgba(99,102,241,0.4)',
          boxShadow: '0 8px 40px rgba(99,102,241,0.2)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'rgba(139,92,246,0.15)' }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }} />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-xs font-semibold tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>CHRONOS BANK</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Time & Money Account</div>
            </div>
            <div className="text-3xl">⏱</div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Available Balance</div>
              <div className="text-4xl font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                ${budget.moneyBalance.toFixed(2)}
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {budget.currentBalance} min time credit
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Lifetime Saved</div>
              <div className="text-xl font-bold" style={{ color: '#10b981' }}>${budget.moneySaved.toFixed(2)}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Total fined: -${budget.moneyFined.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bank stats */}
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {[
          { label: 'Rewards Earned', value: `+$${totalEarned.toFixed(2)}`, color: '#10b981', icon: '🏆', desc: 'from good habits' },
          { label: 'Fines Paid', value: `-$${totalFined.toFixed(2)}`, color: '#ef4444', icon: '💸', desc: 'overuse penalties' },
          { label: 'Net This Week', value: `+$${(totalEarned - totalFined).toFixed(2)}`, color: '#6366f1', icon: '📊', desc: 'profit from discipline' },
          { label: 'Next Milestone', value: '$50.00', color: '#f59e0b', icon: '🎯', desc: `$${(50 - budget.moneySaved).toFixed(2)} away` },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="card p-4"
          >
            <div className="text-xl mb-2">{s.icon}</div>
            <div className="font-bold text-lg" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
            <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>{s.label}</div>
            <div className="text-xs" style={{ color: '#475569' }}>{s.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Tab header */}
      <div className="flex gap-2">
        {['transactions', 'rewards', 'fines', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-1.5 rounded-xl text-xs font-medium capitalize"
            style={{
              background: activeTab === tab ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === tab ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: activeTab === tab ? '#818cf8' : '#94a3b8',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-4">
          <div className="font-semibold text-sm mb-4" style={{ color: '#f1f5f9' }}>Recent Transactions</div>
          <div className="space-y-1">
            {BANK_REWARDS.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.04)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: tx.type === 'fine' ? 'rgba(239,68,68,0.12)' : tx.type === 'bonus' ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
                    border: `1px solid ${tx.type === 'fine' ? 'rgba(239,68,68,0.2)' : tx.type === 'bonus' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`,
                  }}
                >
                  {tx.type === 'fine' ? '💸' : tx.type === 'bonus' ? '⭐' : '🏆'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: '#f1f5f9' }}>{tx.action}</div>
                  <div className="text-xs" style={{ color: '#475569' }}>{tx.date} · {tx.time}</div>
                </div>
                <div
                  className="font-bold text-sm flex-shrink-0"
                  style={{
                    color: tx.type === 'fine' ? '#ef4444' : '#10b981',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {tx.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Rewards config */}
      {activeTab === 'settings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="card p-4">
            <div className="font-semibold text-sm mb-4" style={{ color: '#f1f5f9' }}>Bank Rules Configuration</div>
            <div className="space-y-3">
              {[
                { label: 'Fine per minute over limit', value: '$0.02 / min', color: '#ef4444' },
                { label: 'Gym session reward', value: '$0.50', color: '#10b981' },
                { label: 'Reading reward (30 min)', value: '$0.25', color: '#10b981' },
                { label: 'Streak bonus (7 days)', value: '$1.00', color: '#f59e0b' },
                { label: 'Streak bonus (30 days)', value: '$5.00', color: '#f59e0b' },
                { label: 'Monthly savings cap', value: '$20.00', color: '#6366f1' },
              ].map((rule, i) => (
                <div
                  key={rule.label}
                  className="flex items-center justify-between py-2.5 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-sm" style={{ color: '#94a3b8' }}>{rule.label}</span>
                  <span className="font-bold text-sm font-mono" style={{ color: rule.color }}>{rule.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4" style={{ border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span>🏦</span>
              <div className="font-semibold text-sm" style={{ color: '#f59e0b' }}>Connect Real Bank Account</div>
            </div>
            <div className="text-xs mb-3" style={{ color: '#94a3b8' }}>
              Link your bank to enable real micro-deposits and fines. Requires Plaid integration.
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#000' }}
            >
              Connect via Plaid →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Rewards list */}
      {activeTab === 'rewards' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-4">
          <div className="font-semibold text-sm mb-4" style={{ color: '#10b981' }}>Rewards Earned</div>
          {rewards.map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              <span className="text-xl">🏆</span>
              <div className="flex-1">
                <div className="text-sm" style={{ color: '#f1f5f9' }}>{tx.action}</div>
                <div className="text-xs" style={{ color: '#475569' }}>{tx.date} · {tx.time}</div>
              </div>
              <div className="font-bold font-mono text-sm" style={{ color: '#10b981' }}>{tx.amount}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Fines list */}
      {activeTab === 'fines' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-4">
          <div className="font-semibold text-sm mb-4" style={{ color: '#ef4444' }}>Fines Deducted</div>
          {fines.map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              <span className="text-xl">💸</span>
              <div className="flex-1">
                <div className="text-sm" style={{ color: '#f1f5f9' }}>{tx.action}</div>
                <div className="text-xs" style={{ color: '#475569' }}>{tx.date} · {tx.time}</div>
              </div>
              <div className="font-bold font-mono text-sm" style={{ color: '#ef4444' }}>{tx.amount}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
