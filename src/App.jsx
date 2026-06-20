import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VaultView from './views/VaultView';
import FlowView from './views/FlowView';
import LimitsView from './views/LimitsView';
import SelfView from './views/SelfView';

export default function App() {
  const [activeTab, setActiveTab] = useState('vault');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'vault':
        return <VaultView />;
      case 'flow':
        return <FlowView />;
      case 'limits':
        return <LimitsView />;
      case 'self':
        return <SelfView />;
      default:
        return <VaultView />;
    }
  };

  const navItems = [
    { id: 'vault', label: 'Vault', icon: 'hourglass_empty' },
    { id: 'flow', label: 'Flow', icon: 'change_history' },
    { id: 'limits', label: 'Limits', icon: 'tune' },
    { id: 'self', label: 'Self', icon: 'person' },
  ];

  return (
    <div className="app-shell">
      {/* ── Top Bar ── */}
      <header className="app-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}>
            hourglass_top
          </span>
          <span className="t-headline-sm" style={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>
            Chronos
          </span>
        </div>

        <button
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--surface-container)', border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: 'var(--on-surface-variant)'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>flare</span>
        </button>
      </header>

      {/* ── Main Content Area ── */}
      <main className="app-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom Navigation ── */}
      <nav className="app-bottomnav">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`} style={{ fontSize: 24 }}>
                {item.icon}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
