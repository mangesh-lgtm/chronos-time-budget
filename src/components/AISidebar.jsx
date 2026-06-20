import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Clock, Tag, TrendingUp, ChevronDown, ChevronUp, Cpu, Activity, Shield, X } from 'lucide-react';

// AI-generated summaries (simulated - no external API needed)
const AI_INSIGHTS = {
  'wikipedia': {
    summary: 'A collaborative, free online encyclopedia maintained by volunteers. Currently the world\'s largest reference source with 60M+ articles across 300+ languages.',
    topics: ['Encyclopedia', 'Knowledge', 'Open Source'],
    sentiment: 'Neutral',
    readTime: '∞',
    trustScore: 97,
    insights: ['Most visited website for research', 'Crowd-sourced knowledge base', 'Citations required for all claims'],
  },
  'github': {
    summary: 'Microsoft-owned platform for version control and collaborative software development. Hosts 330M+ repositories and 100M+ developers worldwide.',
    topics: ['Development', 'Open Source', 'DevOps'],
    sentiment: 'Positive',
    readTime: '5-10 min',
    trustScore: 99,
    insights: ['World\'s largest code repository', 'Home to major OSS projects', 'Integrated CI/CD pipelines available'],
  },
  'developer.mozilla': {
    summary: 'Mozilla\'s comprehensive web technology reference documentation. The gold standard for HTML, CSS, JavaScript, and Web APIs documentation.',
    topics: ['Web Dev', 'Documentation', 'Standards'],
    sentiment: 'Neutral',
    readTime: 'Reference',
    trustScore: 100,
    insights: ['Official web standards documentation', 'Interactive code examples', 'Browser compatibility tables'],
  },
  'news.ycombinator': {
    summary: 'Y Combinator\'s social news aggregator focused on technology, startups, and science. Known for high-quality technical discussions and community.',
    topics: ['Tech News', 'Startups', 'Science'],
    sentiment: 'Mixed',
    readTime: '20-30 min',
    trustScore: 89,
    insights: ['Influential in tech industry', 'Strong community moderation', 'Startup funding announcements'],
  },
  'default': {
    summary: 'NEXUS AI is analyzing this page in real-time using neural pattern recognition and semantic understanding engines.',
    topics: ['Web Content', 'Digital Media'],
    sentiment: 'Analyzing...',
    readTime: 'Computing...',
    trustScore: null,
    insights: ['Content analysis in progress', 'Privacy protection active', 'Ad & tracker blocking enabled'],
  }
};

function getInsights(url) {
  if (!url || url === 'newtab') return null;
  for (const [key, value] of Object.entries(AI_INSIGHTS)) {
    if (url.includes(key)) return value;
  }
  return AI_INSIGHTS.default;
}

// Animated text typewriter
function TypeWriter({ text, speed = 20 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}<span className="typing-cursor" /></span>;
}

// Trust Score Ring
function TrustRing({ score }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = score !== null ? circumference - (score / 100) * circumference : circumference;
  const color = score > 80 ? '#00ff41' : score > 60 ? '#00f5ff' : '#ff0090';

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="64" height="64">
        <circle cx="32" cy="32" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
        <motion.circle
          cx="32" cy="32" r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="text-center">
        <div className="text-xs font-bold font-mono" style={{ color }}>
          {score !== null ? score : '?'}
        </div>
        <div className="text-xs text-gray-600" style={{ fontSize: '8px' }}>TRUST</div>
      </div>
    </div>
  );
}

export default function AISidebar({ activeTab, isOpen, onClose }) {
  const [expanded, setExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('summary');
  const insights = getInsights(activeTab?.url);

  const sections = [
    { id: 'summary', label: 'AI SUMMARY', icon: Brain },
    { id: 'insights', label: 'INSIGHTS', icon: TrendingUp },
    { id: 'privacy', label: 'PRIVACY', icon: Shield },
    { id: 'system', label: 'SYSTEM', icon: Cpu },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sidebar-panel relative h-full flex flex-col overflow-hidden"
          style={{ width: '280px', minWidth: '280px' }}
        >
          {/* Background */}
          <div className="absolute inset-0 glass-dark ai-shimmer" />
          <div className="absolute inset-y-0 left-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, #00f5ff, #bf00ff, transparent)' }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)' }}>
                    <Brain size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-orbitron font-bold neon-text-cyan tracking-widest">NEXUS AI</div>
                    <div className="text-xs font-mono text-gray-600" style={{ fontSize: '9px' }}>NEURAL ANALYSIS ENGINE</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="status-dot online" />
                  <button onClick={onClose} className="text-gray-600 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Section tabs */}
              <div className="grid grid-cols-4 gap-1">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 transition-all duration-200 text-center
                      ${activeSection === id
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-600 hover:text-gray-400 hover:bg-white/5'
                      }`}
                  >
                    <Icon size={11} />
                    <span style={{ fontSize: '7px' }} className="font-mono leading-none">{label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence mode="wait">
                {activeSection === 'summary' && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {!activeTab || activeTab.url === 'newtab' ? (
                      <div className="text-center py-8">
                        <Brain size={32} className="text-gray-700 mx-auto mb-3" />
                        <p className="text-xs font-mono text-gray-600">Navigate to a page to activate AI analysis</p>
                      </div>
                    ) : (
                      <>
                        {/* Trust score */}
                        <div className="glass rounded-xl p-3 flex items-center gap-3 neon-border-cyan">
                          <TrustRing score={insights?.trustScore ?? null} />
                          <div>
                            <div className="text-xs font-mono text-gray-400 mb-1">CONTENT TRUST</div>
                            <div className="text-xs text-gray-300">
                              {insights?.trustScore !== null
                                ? `${insights.trustScore}% verified`
                                : 'Analyzing...'}
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="glass rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap size={10} className="text-yellow-400" />
                            <span className="text-xs font-mono text-gray-500 tracking-widest">AI SUMMARY</span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {insights ? <TypeWriter text={insights.summary} /> : 'Processing...'}
                          </p>
                        </div>

                        {/* Meta */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="glass rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Clock size={9} className="text-cyan-400" />
                              <span className="text-xs font-mono text-gray-600" style={{ fontSize: '9px' }}>READ TIME</span>
                            </div>
                            <div className="text-xs text-gray-300 font-mono">{insights?.readTime || '...'}</div>
                          </div>
                          <div className="glass rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Activity size={9} className="text-purple-400" />
                              <span className="text-xs font-mono text-gray-600" style={{ fontSize: '9px' }}>SENTIMENT</span>
                            </div>
                            <div className="text-xs font-mono" style={{
                              color: insights?.sentiment === 'Positive' ? '#00ff41' :
                                insights?.sentiment === 'Negative' ? '#ff0090' : '#00f5ff'
                            }}>
                              {insights?.sentiment || 'Analyzing'}
                            </div>
                          </div>
                        </div>

                        {/* Topics */}
                        {insights?.topics && (
                          <div className="glass rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Tag size={10} className="text-purple-400" />
                              <span className="text-xs font-mono text-gray-500 tracking-widest">TOPICS</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {insights.topics.map(topic => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 rounded-full text-xs font-mono"
                                  style={{ background: 'rgba(191,0,255,0.1)', border: '1px solid rgba(191,0,255,0.3)', color: '#bf00ff' }}
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

                {activeSection === 'insights' && (
                  <motion.div
                    key="insights"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-2"
                  >
                    <div className="text-xs font-mono text-gray-500 tracking-widest mb-3">◈ NEURAL INSIGHTS</div>
                    {insights?.insights ? insights.insights.map((insight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-lg p-3 flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#00f5ff', boxShadow: '0 0 4px #00f5ff' }} />
                        <p className="text-xs text-gray-300">{insight}</p>
                      </motion.div>
                    )) : (
                      <div className="text-center py-6">
                        <p className="text-xs font-mono text-gray-600">Navigate to a page to see insights</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeSection === 'privacy' && (
                  <motion.div
                    key="privacy"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <div className="text-xs font-mono text-gray-500 tracking-widest mb-3">◈ PRIVACY MATRIX</div>
                    {[
                      { label: 'Trackers Blocked', value: '14', color: '#00ff41', icon: '🚫' },
                      { label: 'Ads Blocked', value: '32', color: '#00ff41', icon: '🛡️' },
                      { label: 'Cookies Managed', value: '7', color: '#00f5ff', icon: '🍪' },
                      { label: 'Fingerprint Guard', value: 'ON', color: '#00ff41', icon: '🔒' },
                      { label: 'HTTPS Enforced', value: 'YES', color: '#00ff41', icon: '🔐' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span className="text-xs text-gray-400 font-mono">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold font-mono" style={{ color: item.color, textShadow: `0 0 6px ${item.color}` }}>
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'system' && (
                  <motion.div
                    key="system"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <div className="text-xs font-mono text-gray-500 tracking-widest mb-3">◈ SYSTEM CORE</div>
                    {[
                      { label: 'NEXUS VERSION', value: 'v2050.1.0' },
                      { label: 'ENGINE', value: 'Neural-WebKit' },
                      { label: 'AI CORE', value: 'GPT-Quantum' },
                      { label: 'RENDER FPS', value: '120 fps' },
                      { label: 'MEMORY', value: '2.1 GB' },
                      { label: 'NETWORK', value: '<1ms' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between py-2 border-b"
                        style={{ borderColor: 'rgba(0,245,255,0.05)' }}
                      >
                        <span className="text-xs font-mono text-gray-600">{item.label}</span>
                        <span className="text-xs font-mono text-cyan-400">{item.value}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer status */}
            <div className="p-3 border-t" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="status-dot online" />
                  <span className="text-xs font-mono text-gray-600">AI ONLINE</span>
                </div>
                <div className="text-xs font-mono text-gray-700">NEXUS · 2050</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
