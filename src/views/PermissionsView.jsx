import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PermissionsView() {
  const [permissions, setPermissions] = useState([
    {
      id: 'usage',
      name: 'Usage Statistics Access',
      description: 'Allows tracking exact app open/close cycles to calculate live balances.',
      manager: 'Android: UsageStatsManager | iOS: DeviceActivityCenter',
      status: 'DENIED',
    },
    {
      id: 'overlay',
      name: 'System Overlay Display',
      description: 'Allows showing the un-bypassable lockout screen instantly over distracting apps.',
      manager: 'Android: Settings.canDrawOverlays() | iOS: ManagedSettingsStore',
      status: 'DENIED',
    },
    {
      id: 'battery',
      name: 'Battery Optimization Whitelist',
      description: 'Configures the app to run continuously as an optimized background service.',
      manager: 'Android: REQUEST_IGNORE_BATTERY_OPTIMIZATIONS | iOS: BackgroundTasks',
      status: 'DENIED',
    },
    {
      id: 'admin',
      name: 'Device Administrator Elevation',
      description: 'Prevents sneaky uninstalls during active study focus sessions.',
      manager: 'Android: DevicePolicyManager | iOS: MDM / FamilyControls Enrollment',
      status: 'DENIED',
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const [logMessages, setLogMessages] = useState([]);

  const addLog = (msg) => {
    setLogMessages(prev => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 8)
    ]);
  };

  const handleGrant = (id) => {
    setPermissions(prev => prev.map(p => {
      if (p.id === id) {
        addLog(`System pipeline initialized: Requested permission for ${p.name}`);
        setTimeout(() => {
          addLog(`Pipeline callback received: ${p.name} -> GRANTED`);
        }, 600);
        return { ...p, status: 'GRANTED' };
      }
      return p;
    }));
  };

  const handleReset = () => {
    setPermissions(prev => prev.map(p => ({ ...p, status: 'DENIED' })));
    setLogMessages([]);
    setActiveStep(0);
    addLog('System permissions reset. Mock device pipeline re-initialized.');
  };

  return (
    <div className="view-scroll">
      {/* ── Onboarding Banner ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <div className="badge badge-primary mb-3">System Alignment</div>
        <h2 className="t-headline-lg text-on-surface mb-2">Onboarding Wizard</h2>
        <p className="t-body-md text-muted max-w-sm mx-auto">
          Chronos requires system-level integrations to monitor activity and protect your vault balance.
        </p>
      </motion.section>

      {/* ── Step-by-Step Onboarding Wizard Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="t-headline-sm text-on-surface">Step {activeStep + 1} of {permissions.length}</h3>
          <button onClick={handleReset} className="btn-ghost t-label-md text-primary">Reset Wizard</button>
        </div>

        {/* Current Step Content */}
        <div style={{ minHeight: 160 }} className="flex flex-col justify-center">
          <h4 className="t-headline-sm text-primary mb-2">{permissions[activeStep].name}</h4>
          <p className="t-body-md text-muted mb-4">{permissions[activeStep].description}</p>
          <div className="p-3 rounded-xl mb-4" style={{ background: 'var(--surface-container-low)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="t-label-sm text-tertiary font-mono">{permissions[activeStep].manager}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="t-label-sm text-muted">Status:</span>
              <span className={`badge ${permissions[activeStep].status === 'GRANTED' ? 'badge-primary' : 'badge-error'}`}>
                {permissions[activeStep].status}
              </span>
            </div>

            {permissions[activeStep].status === 'DENIED' ? (
              <button
                onClick={() => handleGrant(permissions[activeStep].id)}
                className="btn btn-primary"
                style={{ padding: '8px 16px', borderRadius: '12px' }}
              >
                Grant Access
              </button>
            ) : (
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 28 }}>check_circle</span>
            )}
          </div>
        </div>

        {/* Navigation Step Indicators */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setActiveStep(s => Math.max(0, s - 1))}
            className="btn-ghost t-label-md text-muted"
            disabled={activeStep === 0}
            style={{ opacity: activeStep === 0 ? 0.3 : 1 }}
          >
            Back
          </button>
          
          <div className="flex gap-2">
            {permissions.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setActiveStep(idx)}
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: activeStep === idx ? 'var(--primary)' : 'var(--surface-container-highest)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveStep(s => Math.min(permissions.length - 1, s + 1))}
            className="btn-ghost t-label-md text-primary"
            disabled={activeStep === permissions.length - 1}
            style={{ opacity: activeStep === permissions.length - 1 ? 0.3 : 1 }}
          >
            Next
          </button>
        </div>
      </motion.div>

      {/* ── Native Tracking Pipelines Logger ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-4">Device Pipeline Logs</h3>
        <div className="p-4 rounded-2xl font-mono text-xs text-muted" style={{ background: '#050507', minHeight: 120, border: '1px solid rgba(255,255,255,0.03)' }}>
          {logMessages.length === 0 ? (
            <div className="text-center py-8">No pipeline events recorded. Trigger permission grants to view logs.</div>
          ) : (
            logMessages.map((log, idx) => (
              <div key={idx} className="mb-2" style={{ color: log.includes('GRANTED') ? '#10b981' : '#a3a3a3' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
