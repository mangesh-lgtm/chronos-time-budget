import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockadeView() {
  const [shieldActive, setShieldActive] = useState(false);
  const [showViolation, setShowViolation] = useState(false);
  const [apps, setApps] = useState([
    { id: 'notion', name: 'Notion', category: 'STUDY', icon: 'auto_stories', description: 'Used for system planning and logs.' },
    { id: 'anki', name: 'Anki Flashcards', category: 'STUDY', icon: 'school', description: 'Active recall study card decks.' },
    { id: 'instagram', name: 'Instagram', category: 'BAN', icon: 'photo_camera', description: 'Social scroll cycle distraction.', budget: 15 },
    { id: 'youtube', name: 'YouTube', category: 'BAN', icon: 'play_circle', description: 'Video streaming and channels.', budget: 30 },
    { id: 'settings', name: 'Settings', category: 'NEUTRAL', icon: 'settings', description: 'Core system config parameters.' },
    { id: 'dialer', name: 'Phone Dialer', category: 'NEUTRAL', icon: 'call', description: 'Direct phone dialing calls.' }
  ]);

  const toggleShield = () => {
    setShieldActive(prev => !prev);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCategory) => {
    if (shieldActive) return; // Prevent edits when locked
    const appId = e.dataTransfer.getData('appId');
    setApps(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, category: targetCategory };
      }
      return app;
    }));
  };

  const startDrag = (e, app) => {
    if (shieldActive) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('appId', app.id);
  };

  const adjustBudget = (id, direction) => {
    setApps(prev => prev.map(app => {
      if (app.id === id && app.budget !== undefined) {
        const delta = direction === 'up' ? 5 : -5;
        const nextVal = Math.max(0, app.budget + delta);
        if (nextVal === 0) {
          // Trigger mock overlay violation
          setShowViolation(true);
        }
        return { ...app, budget: nextVal };
      }
      return app;
    }));
  };

  return (
    <div className={`view-scroll ${showViolation ? 'animate-shake animate-pulse-red' : ''}`} style={{ transition: 'all 0.3s' }}>
      {/* ── Header ── */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
        <div className="badge badge-primary mb-3">Protocol Engine</div>
        <h2 className="t-headline-lg text-on-surface mb-2">App Blockade</h2>
        <p className="t-body-md text-muted max-w-sm mx-auto">
          Intercept distraction launches instantly. Move apps to regulate focus locks.
        </p>
      </motion.section>

      {/* ── Shield Switch Tactile Card ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="t-headline-sm text-on-surface mb-1">Shield Lockdown</h3>
            <p className="t-body-md text-muted">Freezes lists and activates ban monitoring protocol.</p>
          </div>
          <button
            onClick={toggleShield}
            className={`toggle ${shieldActive ? 'on' : 'off'}`}
            style={{
              width: 56, height: 32, borderRadius: 100,
              background: shieldActive ? 'var(--primary)' : 'var(--surface-container-highest)',
              position: 'relative', border: 'none', cursor: 'pointer', transition: 'all 0.3s'
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#09090b',
              position: 'absolute', top: 4, left: shieldActive ? 28 : 4,
              transition: 'left 0.3s'
            }} />
          </button>
        </div>
      </motion.div>

      {/* ── Three Column Drag & Drop Layout ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {['STUDY', 'BAN', 'NEUTRAL'].map((cat) => {
          const list = apps.filter(app => app.category === cat);
          return (
            <motion.div
              key={cat}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, cat)}
              className="glass-card rounded-3xl p-5"
              style={{
                background: shieldActive ? 'rgba(255,255,255,0.02)' : 'rgba(31,31,33,0.3)',
                borderColor: cat === 'STUDY' ? 'rgba(190,198,224,0.15)' : cat === 'BAN' ? 'rgba(255,180,171,0.15)' : 'rgba(255,255,255,0.06)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="t-headline-sm" style={{
                  color: cat === 'STUDY' ? 'var(--primary)' : cat === 'BAN' ? 'var(--error)' : 'var(--on-surface-variant)'
                }}>{cat} Allowed</h4>
                <span className="badge badge-primary">{list.length} Apps</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.length === 0 ? (
                  <div className="text-center py-4 text-xs text-muted" style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 12 }}>
                    Drag apps here to re-categorize
                  </div>
                ) : (
                  list.map(app => (
                    <div
                      key={app.id}
                      draggable={!shieldActive}
                      onDragStart={(e) => startDrag(e, app)}
                      className="transition-card"
                      style={{ cursor: shieldActive ? 'not-allowed' : 'grab', opacity: shieldActive ? 0.75 : 1 }}
                    >
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{app.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div className="t-label-md">{app.name}</div>
                        <div className="t-label-sm text-muted">{app.description}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Rid App Uses / Budget Controllers ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6">
        <h3 className="t-headline-sm text-on-surface mb-3">Distraction Budgets</h3>
        <p className="t-body-md text-muted mb-5">Set absolute daily budget limits. Reaching zero forces restriction coverage.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {apps.filter(app => app.budget !== undefined).map(app => (
            <div key={app.id} className="flex items-center justify-between">
              <div>
                <div className="t-label-md" style={{ fontWeight: 600 }}>{app.name} Daily Limit</div>
                <div className="t-label-sm text-muted">Current remaining: {app.budget} mins</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustBudget(app.id, 'down')}
                  className="btn btn-primary"
                  style={{ padding: '8px 12px', borderRadius: '8px' }}
                >
                  -5m
                </button>
                <span className="t-label-md font-mono" style={{ minWidth: 32, textAlign: 'center' }}>{app.budget}m</span>
                <button
                  onClick={() => adjustBudget(app.id, 'up')}
                  className="btn btn-primary"
                  style={{ padding: '8px 12px', borderRadius: '8px' }}
                >
                  +5m
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Mock Overlay Ban Violation Pop-up ── */}
      <AnimatePresence>
        {showViolation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-8 max-w-sm text-center relative"
              style={{ borderColor: 'var(--error)' }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,180,171,0.1)',
                display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
              }}>
                <span className="material-symbols-outlined text-error" style={{ fontSize: 32 }}>block</span>
              </div>
              <h3 className="t-headline-lg text-on-surface mb-3">Limit Reached</h3>
              <p className="t-body-lg text-muted mb-6">
                Your remaining daily budget is exhausted. You must earn focus reserve before unlocking access.
              </p>
              <button
                onClick={() => setShowViolation(false)}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: 12 }}
              >
                Return to Core Focus
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
