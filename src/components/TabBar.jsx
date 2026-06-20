import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Lock, Maximize2 } from 'lucide-react';

export default function TabBar({ tabs, activeTabId, onTabSelect, onTabClose, onNewTab }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 overflow-x-auto" style={{ minHeight: '44px' }}>
      <AnimatePresence>
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => onTabSelect(tab.id)}
            className={`holo-tab relative flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 flex-shrink-0 min-w-[120px] max-w-[200px] group
              ${activeTabId === tab.id
                ? 'glass neon-border-cyan'
                : 'glass-dark border border-transparent hover:border-cyan-500/20'
              }`}
            style={{
              boxShadow: activeTabId === tab.id
                ? '0 0 15px rgba(0,245,255,0.2), 0 -2px 10px rgba(0,245,255,0.1)'
                : 'none',
            }}
          >
            {/* Favicon/Status */}
            <div className="flex-shrink-0">
              {tab.loading ? (
                <div className="w-3 h-3 rounded-full border border-cyan-400 border-t-transparent animate-spin" />
              ) : tab.secure ? (
                <Lock size={10} className="text-green-400" />
              ) : (
                <Globe size={10} className={activeTabId === tab.id ? 'text-cyan-400' : 'text-gray-500'} />
              )}
            </div>

            {/* Title */}
            <span
              className={`text-xs font-medium truncate flex-1 font-mono
                ${activeTabId === tab.id ? 'text-cyan-300' : 'text-gray-400'}`}
              style={{ fontSize: '11px' }}
            >
              {tab.title || tab.url || 'New Tab'}
            </span>

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 text-gray-500"
            >
              <X size={10} />
            </button>

            {/* Active indicator */}
            {activeTabId === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #00f5ff, #bf00ff)' }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* New Tab Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNewTab}
        className="flex-shrink-0 w-7 h-7 rounded-lg glass border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 hover:shadow-neon-cyan transition-all duration-300 text-lg font-light ml-1"
      >
        +
      </motion.button>
    </div>
  );
}
