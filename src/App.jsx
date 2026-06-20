import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusView from './views/FocusView';
import BlockadeView from './views/BlockadeView';
import SetupView from './views/SetupView';

export default function App() {
  const [activeTab, setActiveTab] = useState('focus');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'focus':
        return <FocusView />;
      case 'blockade':
        return <BlockadeView />;
      case 'setup':
        return <SetupView />;
      default:
        return <FocusView />;
    }
  };

  const navItems = [
    { id: 'focus', label: 'Focus', icon: 'hourglass_empty' },
    { id: 'blockade', label: 'App Control', icon: 'shield' },
    { id: 'setup', label: 'Setup', icon: 'verified_user' },
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
      <nav className="app-bottomnav" style={{ justifyContent: 'space-around' }}>
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
