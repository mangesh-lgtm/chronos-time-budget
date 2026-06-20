import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertTriangle, RefreshCw, Globe } from 'lucide-react';

// New Tab Home Page
function NewTabPage({ onNavigate }) {
  const quickLinks = [
    { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '📚', desc: 'Knowledge Base' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙', desc: 'Code Repository' },
    { name: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '🦊', desc: 'Web Standards' },
    { name: 'HackerNews', url: 'https://news.ycombinator.com', icon: '🔥', desc: 'Tech News' },
    { name: 'Dev.to', url: 'https://dev.to', icon: '💻', desc: 'Dev Articles' },
    { name: 'CodePen', url: 'https://codepen.io', icon: '✏️', desc: 'Playground' },
    { name: 'Arxiv', url: 'https://arxiv.org', icon: '🧪', desc: 'Research Papers' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '💡', desc: 'Q&A Forum' },
  ];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour12: false });
  const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto hex-grid ai-shimmer" style={{ color: '#e0e0e0' }}>
      {/* Header */}
      <div className="flex flex-col items-center pt-16 pb-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
              background: 'conic-gradient(from 0deg, #00f5ff, #bf00ff, #ff0090, #00ff41, #00f5ff)',
              padding: '2px',
            }}>
              <div className="w-full h-full rounded-full" style={{ background: '#010008' }} />
            </div>
            <div className="relative z-10 text-3xl">⬡</div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-orbitron font-black neon-text-cyan mb-1 tracking-widest"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          NEXUS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm font-mono text-purple-400 tracking-[0.3em]"
        >
          AI BROWSER · v2050.1
        </motion.p>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="text-4xl font-mono font-light neon-text-cyan tabular-nums">
            {formatTime(time)}
          </div>
          <div className="text-sm font-mono text-gray-500 mt-1">
            {formatDate(time)}
          </div>
        </motion.div>
      </div>

      {/* Quick Links Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-3xl px-6 pb-10"
      >
        <div className="text-xs font-mono text-cyan-500/60 mb-4 tracking-widest">◈ QUICK ACCESS NODES</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link, i) => (
            <motion.button
              key={link.url}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(link.url)}
              className="glass holo-tab neon-border-cyan rounded-xl p-4 text-left cursor-pointer group transition-all duration-300 hover:shadow-neon-cyan"
            >
              <div className="text-2xl mb-2">{link.icon}</div>
              <div className="text-sm font-medium text-gray-200 group-hover:text-cyan-300 transition-colors">
                {link.name}
              </div>
              <div className="text-xs text-gray-600 font-mono">{link.desc}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full max-w-3xl px-6 pb-8"
      >
        <div className="text-xs font-mono text-cyan-500/60 mb-3 tracking-widest">◈ SYSTEM MATRIX</div>
        <div className="glass rounded-xl p-4 grid grid-cols-3 gap-4">
          {[
            { label: 'NEURAL CORES', value: '12', unit: 'active', color: '#00f5ff' },
            { label: 'PRIVACY SHIELD', value: '100', unit: '%', color: '#00ff41' },
            { label: 'QUANTUM LAG', value: '0.4', unit: 'ms', color: '#bf00ff' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-orbitron font-bold" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}` }}>
                {stat.value}
                <span className="text-sm ml-1 font-normal" style={{ color: stat.color + '80' }}>{stat.unit}</span>
              </div>
              <div className="text-xs font-mono text-gray-600 mt-1 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function BrowserFrame({ tab, onUpdateTab }) {
  const iframeRef = useRef(null);
  const [proxyUrl, setProxyUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!tab || tab.url === 'newtab' || !tab.url) {
      setProxyUrl(null);
      setError(null);
      setLoadError(false);
      return;
    }

    setError(null);
    setLoadError(false);

    // Use allorigins proxy to bypass CORS
    const encoded = encodeURIComponent(tab.url);
    const proxy = `https://api.allorigins.win/raw?url=${encoded}`;
    setProxyUrl(proxy);
    onUpdateTab(tab.id, { loading: true, title: 'Loading...' });
  }, [tab?.url]);

  const handleLoad = useCallback(() => {
    if (!tab || tab.url === 'newtab') return;
    onUpdateTab(tab.id, {
      loading: false,
      title: tab.url.replace(/^https?:\/\//, '').split('/')[0],
      secure: tab.url.startsWith('https://'),
      canGoBack: false,
      canGoForward: false,
    });
  }, [tab]);

  const handleError = useCallback(() => {
    setLoadError(true);
    onUpdateTab(tab.id, { loading: false, title: 'Error' });
  }, [tab]);

  if (!tab || tab.url === 'newtab') {
    return <NewTabPage onNavigate={(url) => onUpdateTab(tab.id, { url })} />;
  }

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center hex-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass neon-border-cyan rounded-2xl p-8 max-w-md text-center"
        >
          <AlertTriangle size={40} className="text-yellow-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 10px #ffff00)' }} />
          <h2 className="text-xl font-orbitron neon-text-cyan mb-2">Connection Failed</h2>
          <p className="text-sm text-gray-400 font-mono mb-1">{tab.url}</p>
          <p className="text-xs text-gray-600 font-mono mb-6">Site blocked iframe embedding or connection refused.</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setLoadError(false);
                onUpdateTab(tab.id, { url: tab.url + '?' + Date.now() });
              }}
              className="btn-cyber px-4 py-2 rounded-lg glass neon-border-cyan text-cyan-300 text-sm font-mono flex items-center gap-2"
            >
              <RefreshCw size={14} /> Retry
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(tab.url, '_blank')}
              className="btn-cyber px-4 py-2 rounded-lg glass neon-border-purple text-purple-300 text-sm font-mono flex items-center gap-2"
            >
              <ExternalLink size={14} /> Open External
            </motion.button>
          </div>
          <p className="text-xs text-gray-700 font-mono mt-4">
            Note: Some sites block iframe embedding (X-Frame-Options). Use "Open External" to view them.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="browser-frame w-full h-full relative">
      {/* Loading overlay */}
      <AnimatePresence>
        {tab?.loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            style={{ background: 'rgba(1,0,8,0.8)', backdropFilter: 'blur(4px)' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-purple-400 border-b-pink-400 border-l-transparent animate-spin" />
                <Globe size={24} className="absolute inset-0 m-auto text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-mono text-cyan-400 text-center">ESTABLISHING CONNECTION</p>
                <p className="text-xs font-mono text-gray-600 text-center mt-1 truncate max-w-xs">{tab.url}</p>
              </div>
              <div className="w-48 h-1 rounded-full overflow-hidden bg-gray-800">
                <div className="h-full progress-bar rounded-full w-2/3" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {proxyUrl && (
        <iframe
          ref={iframeRef}
          src={proxyUrl}
          title={tab.title || tab.url}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={handleLoad}
          onError={handleError}
          style={{ background: '#fff' }}
        />
      )}
    </div>
  );
}
