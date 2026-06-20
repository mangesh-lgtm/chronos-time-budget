import { motion } from 'framer-motion';

export default function DownloadView() {
  const steps = [
    {
      title: 'Initialize Project',
      cmd: 'npm install @capacitor/core @capacitor/cli\nnpx cap init Chronos com.mangesh.chronos',
      desc: 'Installs Capacitor and sets up application configuration parameters.'
    },
    {
      title: 'Add Platforms',
      cmd: 'npm install @capacitor/android @capacitor/ios\nnpx cap add android\nnpx cap add ios',
      desc: 'Integrates local build folders for native system compilers.'
    },
    {
      title: 'Sync UI Assets',
      cmd: 'npm run build\nnpx cap sync',
      desc: 'Bundles the production web components into native container assets.'
    }
  ];

  return (
    <div className="view-scroll">
      {/* ── Header ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <div className="badge badge-primary mb-3">Install Wrapper</div>
        <h2 className="t-headline-lg text-on-surface mb-2">Native Client Wrapper</h2>
        <p className="t-body-md text-muted max-w-sm mx-auto">
          To enforce strict app limits and query usage stats, run this application inside a native wrapper.
        </p>
      </motion.section>

      {/* ── Direct Installer Download Links ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-3">Direct App Installer Files</h3>
        <p className="t-body-md text-muted mb-6">Install wrapper container directly on your mobile device.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Android Download */}
          <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'var(--surface-container-low)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div className="t-label-md" style={{ fontWeight: 800 }}>Android Installer</div>
              <div className="t-label-sm text-muted">File: chronos-vault-release.apk (24MB)</div>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Downloading chronos-vault-release.apk (Simulator Mock)...'); }}
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
              onClick={(e) => { e.preventDefault(); alert('Downloading chronos-vault-release.ipa (Simulator Mock)...'); }}
              className="btn btn-primary"
              style={{ padding: '10px 16px', borderRadius: '12px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              IPA
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Native Wrapper Build Guide ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-3">Capacitor Packaging Guide</h3>
        <p className="t-body-md text-muted mb-6">Build the native container yourself using the following terminal layout commands:</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((step, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-2">
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)',
                  display: 'flex', items: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800
                }}>
                  {idx + 1}
                </div>
                <div className="t-label-md" style={{ fontWeight: 700 }}>{step.title}</div>
              </div>
              <p className="t-body-md text-muted mb-3">{step.desc}</p>
              <pre
                className="p-3 rounded-xl font-mono text-xs text-primary"
                style={{ background: '#050507', border: '1px solid rgba(255,255,255,0.04)', overflowX: 'auto', whiteSpace: 'pre-wrap' }}
              >
                {step.cmd}
              </pre>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
