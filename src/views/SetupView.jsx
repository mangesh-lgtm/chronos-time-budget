import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SetupView() {
  const [permissions, setPermissions] = useState([
    { id: 'usage', name: 'Usage Stats Monitor', desc: 'Allows tracking exact app launch events.', active: false },
    { id: 'overlay', name: 'System Overlay (Draw Over Apps)', desc: 'Required to launch the un-bypassable lockout screen.', active: false },
    { id: 'battery', name: 'Battery Optimization Whitelist', desc: 'Prevents the OS from killing the focus background service.', active: false },
    { id: 'admin', name: 'Device Administrator Lock', desc: 'Prevents sneaky uninstalls during active study blocks.', active: false }
  ]);

  const togglePermission = (id) => {
    setPermissions(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, active: !p.active };
      }
      return p;
    }));
  };

  return (
    <div className="view-scroll">
      {/* ── Header ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <div className="badge badge-primary mb-3">System Permissions</div>
        <h2 className="t-headline-lg text-on-surface mb-2">Device Integration</h2>
        <p className="t-body-md text-muted max-w-sm mx-auto">
          Ensure system permissions are granted and install client wrappers to enable absolute blocking layers.
        </p>
      </motion.section>

      {/* ── Step-by-Step Onboarding checklist ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-2">Permission Config</h3>
        <p className="t-body-md text-muted mb-5">Toggle to simulate permission status feedback.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {permissions.map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <div style={{ flex: 1, marginRight: 16 }}>
                <div className="t-label-md" style={{ fontWeight: 600 }}>{p.name}</div>
                <div className="t-label-sm text-muted">{p.desc}</div>
              </div>
              <button
                onClick={() => togglePermission(p.id)}
                className={`badge ${p.active ? 'badge-primary' : 'badge-error'}`}
                style={{ cursor: 'pointer', minWidth: 90, textAlign: 'center', justifyContent: 'center' }}
              >
                {p.active ? 'GRANTED' : 'DENIED'}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Direct Installer Wrapper Download Links ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-3">Direct App Installer Files</h3>
        <p className="t-body-md text-muted mb-5">Download wrapper containers directly on your mobile device.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Android Download */}
          <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'var(--surface-container-low)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div className="t-label-md" style={{ fontWeight: 800 }}>Android Installer</div>
              <div className="t-label-sm text-muted">File: chronos-vault-release.apk (24MB)</div>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Downloading apk installer wrapper...'); }}
              className="btn btn-primary"
              style={{ padding: '10px 16px', borderRadius: '12px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              APK
            </a>
          </div>

          {/* iOS Download */}
          <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'var(--surface-container-low)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div className="t-label-md" style={{ fontWeight: 800 }}>iOS Installer</div>
              <div className="t-label-sm text-muted">File: chronos-vault-release.ipa (38MB)</div>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Downloading ipa installer wrapper...'); }}
              className="btn btn-primary"
              style={{ padding: '10px 16px', borderRadius: '12px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              IPA
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
