import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowLeft, ArrowRight, RefreshCw, Home,
  Lock, Globe, Star, Download, Share2, Zap, Shield, X
} from 'lucide-react';

// Quick access sites
const QUICK_SITES = [
  { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '📚', color: '#00f5ff' },
  { name: 'GitHub', url: 'https://github.com', icon: '🐙', color: '#bf00ff' },
  { name: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '🦊', color: '#ff0090' },
  { name: 'HackerNews', url: 'https://news.ycombinator.com', icon: '🔥', color: '#00ff41' },
  { name: 'Dev.to', url: 'https://dev.to', icon: '💻', color: '#0080ff' },
  { name: 'CodePen', url: 'https://codepen.io', icon: '✏️', color: '#ffff00' },
];

const SEARCH_ENGINES = [
  { name: 'Brave', url: 'https://search.brave.com/search?q=', icon: '🦁' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🦆' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: '🔷' },
  { name: 'Google', url: 'https://www.google.com/search?q=', icon: '🔍' },
];

function isValidUrl(str) {
  try {
    const url = new URL(str.startsWith('http') ? str : `https://${str}`);
    return url.hostname.includes('.');
  } catch {
    return false;
  }
}

export default function AddressBar({ activeTab, onNavigate, onBack, onForward, onRefresh, onHome }) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState(SEARCH_ENGINES[0]);
  const [showEngineMenu, setShowEngineMenu] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeTab?.url && !isFocused) {
      setInputValue(activeTab.url !== 'newtab' ? activeTab.url : '');
    }
  }, [activeTab?.url, isFocused]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    let url = inputValue.trim();
    if (isValidUrl(url)) {
      url = url.startsWith('http') ? url : `https://${url}`;
    } else {
      url = selectedEngine.url + encodeURIComponent(url);
    }
    onNavigate(url);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const filteredSites = QUICK_SITES.filter(s =>
    s.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    s.url.toLowerCase().includes(inputValue.toLowerCase())
  );

  const displayUrl = activeTab?.url && activeTab.url !== 'newtab' ? activeTab.url : '';
  const isSecure = displayUrl.startsWith('https://');

  return (
    <div className="flex items-center gap-2 px-3 py-2 glass-dark border-b" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
      {/* Nav buttons */}
      <div className="flex items-center gap-1">
        {[
          { icon: ArrowLeft, action: onBack, disabled: !activeTab?.canGoBack, title: 'Back' },
          { icon: ArrowRight, action: onForward, disabled: !activeTab?.canGoForward, title: 'Forward' },
          { icon: RefreshCw, action: onRefresh, disabled: false, title: 'Refresh', spin: activeTab?.loading },
        ].map(({ icon: Icon, action, disabled, title, spin }) => (
          <motion.button
            key={title}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={action}
            disabled={disabled}
            title={title}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200
              ${disabled
                ? 'text-gray-700 cursor-not-allowed'
                : 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300'
              }`}
          >
            <Icon size={13} className={spin ? 'animate-spin' : ''} />
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onHome}
          title="Home"
          className="w-7 h-7 rounded-md flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 transition-all duration-200"
        >
          <Home size={13} />
        </motion.button>
      </div>

      {/* Search Engine Selector */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowEngineMenu(!showEngineMenu)}
          className="h-8 px-2 rounded-lg glass border border-cyan-500/20 text-xs flex items-center gap-1 hover:border-cyan-400/50 transition-all duration-200 text-cyan-300"
        >
          <span>{selectedEngine.icon}</span>
          <span className="font-mono hidden sm:block" style={{ fontSize: '10px' }}>{selectedEngine.name}</span>
        </motion.button>
        <AnimatePresence>
          {showEngineMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-10 left-0 z-50 glass-dark neon-border-cyan rounded-xl p-1 min-w-[140px]"
            >
              {SEARCH_ENGINES.map(engine => (
                <button
                  key={engine.name}
                  onClick={() => { setSelectedEngine(engine); setShowEngineMenu(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200
                    ${selectedEngine.name === engine.name
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-gray-400 hover:bg-white/5 hover:text-cyan-400'
                    }`}
                >
                  <span>{engine.icon}</span>
                  <span>{engine.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* URL/Search Input */}
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <div className={`relative flex items-center rounded-xl transition-all duration-300 ${
          isFocused
            ? 'neon-border-cyan shadow-neon-cyan'
            : 'glass border border-cyan-500/15 hover:border-cyan-500/30'
        }`}>
          {/* Security icon */}
          <div className="pl-3">
            {isSecure
              ? <Lock size={11} className="text-green-400" />
              : <Globe size={11} className="text-gray-500" />
            }
          </div>

          <input
            ref={inputRef}
            type="text"
            value={isFocused ? inputValue : (displayUrl || inputValue)}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setInputValue(displayUrl || '');
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Navigate to URL or search..."
            className="flex-1 bg-transparent py-2 px-2 text-sm font-mono text-gray-200 placeholder-gray-600 outline-none"
            style={{ fontSize: '12px' }}
          />

          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue('')}
              className="pr-2 text-gray-600 hover:text-gray-400 transition-colors"
            >
              <X size={12} />
            </button>
          )}

          <button type="submit" className="pr-3">
            <Search size={13} className="text-cyan-400 hover:text-cyan-300 transition-colors" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              className="absolute top-12 left-0 right-0 z-50 glass-dark neon-border-cyan rounded-xl overflow-hidden"
            >
              {/* Quick sites */}
              {filteredSites.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-mono" style={{ color: 'rgba(0,245,255,0.5)', fontSize: '10px' }}>
                    ◈ QUICK ACCESS
                  </div>
                  {filteredSites.slice(0, 4).map(site => (
                    <button
                      key={site.url}
                      onMouseDown={() => {
                        onNavigate(site.url);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-cyan-500/10 transition-all duration-200 text-left"
                    >
                      <span className="text-base">{site.icon}</span>
                      <div>
                        <div className="text-sm text-gray-200 font-medium">{site.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{site.url}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Search hint */}
              {inputValue && (
                <div className="border-t border-cyan-500/10">
                  <button
                    onMouseDown={() => handleSubmit()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-purple-500/10 transition-all duration-200 text-left"
                  >
                    <Search size={14} className="text-purple-400" />
                    <span className="text-sm text-gray-300 font-mono">
                      Search for "<span className="text-purple-400">{inputValue}</span>"
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200"
          title="Bookmark"
        >
          <Star size={13} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
          title="AI Boost"
        >
          <Zap size={13} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200"
          title="Privacy Shield"
        >
          <Shield size={13} />
        </motion.button>
      </div>
    </div>
  );
}
