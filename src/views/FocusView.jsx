import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FocusView() {
  const [sessionActive, setSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins in seconds
  const [showBanOverlay, setShowBanOverlay] = useState(false);

  useEffect(() => {
    let interval = null;
    if (sessionActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setSessionActive(false);
      alert('Focus session completed successfully! Keep up the good work.');
    }
    return () => clearInterval(interval);
  }, [sessionActive, timeLeft]);

  const toggleSession = () => {
    if (sessionActive) {
      // Prompt confirm to avoid accidental exit
      const exit = window.confirm('Are you sure you want to stop? Unlocking early breaks your focus cycle.');
      if (exit) {
        setSessionActive(false);
        setTimeLeft(1500);
      }
    } else {
      setSessionActive(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Percent calculation for circular ring
  const totalDuration = 1500;
  const percentage = timeLeft / totalDuration;
  const radius = 80;
  const stroke = 8;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - percentage);

  return (
    <div className="view-scroll">
      {/* ── Status Header ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <div className={`badge ${sessionActive ? 'badge-primary animate-pulse-slow' : 'badge-secondary'}`}>
          {sessionActive ? 'Focus Lock Engaged' : 'System Idle'}
        </div>
        <h2 className="t-headline-lg text-on-surface mt-2 mb-1">Chronos Focus</h2>
        <p className="t-body-md text-muted max-w-xs mx-auto">
          Block distracting mobile apps and stay anchored in the present.
        </p>
      </motion.section>

      {/* ── Central Focus Ring ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center"
      >
        <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
          <svg className="ring-svg" width={200} height={200}>
            <circle
              className="ring-track"
              cx={100}
              cy={100}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke / 2}
            />
            <motion.circle
              className="ring-fill"
              cx={100}
              cy={100}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circ}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.3 }}
            />
          </svg>

          {/* Central Countdown Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 style={{
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--on-surface)',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1
            }}>
              {formatTime(timeLeft)}
            </h1>
            <span className="t-label-sm text-muted mt-2">TIMER</span>
          </div>
        </div>

        {/* Start / Stop Toggle Button */}
        <button
          onClick={toggleSession}
          className="btn btn-primary"
          style={{ width: '100%', maxWidth: 240, marginTop: 32, borderRadius: 16 }}
        >
          {sessionActive ? 'Stop Focus Session' : 'Start Focus Session'}
        </button>
      </motion.div>

      {/* ── Simulated Distraction Block Trigger ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="t-headline-sm text-on-surface mb-2">Overlay Lockout Simulator</h3>
        <p className="t-body-md text-muted mb-5">
          Simulate what happens when you launch a banned app (like Instagram) during active Focus Lock.
        </p>
        <button
          onClick={() => setShowBanOverlay(true)}
          className="btn btn-primary"
          style={{ width: '100%', borderRadius: 12, border: '1px solid rgba(255,180,171,0.2)' }}
        >
          Simulate Instagram Launch
        </button>
      </motion.div>

      {/* ── Simulated Fullscreen Block Screen ── */}
      <AnimatePresence>
        {showBanOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(9,9,11,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              className="glass-card rounded-3xl p-8 max-w-sm text-center"
              style={{ borderColor: 'var(--error)' }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,180,171,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
              }}>
                <span className="material-symbols-outlined text-error" style={{ fontSize: 28 }}>block</span>
              </div>
              <h3 className="t-headline-lg text-on-surface mb-2">Access Restrained</h3>
              <p className="t-body-lg text-muted mb-6">
                Chronos has blocked Instagram. You have active focus commitments remaining.
              </p>
              <button
                onClick={() => setShowBanOverlay(false)}
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
