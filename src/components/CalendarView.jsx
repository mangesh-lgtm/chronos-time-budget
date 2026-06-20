import { motion } from 'framer-motion';
import { CALENDAR_EVENTS, LOCATION_ZONES } from '../data/chronosData';

const EVENT_TYPE_COLORS = {
  work: '#6366f1',
  focus: '#10b981',
  health: '#06b6d4',
  learning: '#8b5cf6',
  personal: '#f59e0b',
};

function TimelineEvent({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.07 }}
      className="flex items-stretch gap-3"
    >
      {/* Time column */}
      <div className="w-16 flex-shrink-0 text-right">
        <div className="text-xs font-mono" style={{ color: '#94a3b8' }}>{event.time}</div>
        <div className="text-xs" style={{ color: '#475569' }}>{event.duration}m</div>
      </div>

      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 20 }}>
        <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" style={{ background: event.color, boxShadow: `0 0 8px ${event.color}80` }} />
        <div className="flex-1 w-px mt-1" style={{ background: `linear-gradient(180deg, ${event.color}40, transparent)` }} />
      </div>

      {/* Event card */}
      <div
        className="flex-1 p-3 rounded-xl mb-2"
        style={{
          background: `${event.color}0d`,
          border: `1px solid ${event.color}30`,
        }}
      >
        <div className="font-medium text-sm" style={{ color: '#f1f5f9' }}>{event.title}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs capitalize" style={{ color: event.color }}>{event.type}</span>
          <span className="text-xs" style={{ color: '#475569' }}>· {event.duration} min</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Calendar({ budget }) {
  const now = new Date();
  const currentHour = now.getHours();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = now.getDay();

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - todayIndex + i);
    return d;
  });

  return (
    <div className="main-scroll p-5 space-y-5">
      {/* Week strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4"
      >
        <div className="font-semibold text-sm mb-3" style={{ color: '#f1f5f9' }}>
          {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, i) => {
            const isToday = i === todayIndex;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-2 rounded-xl cursor-pointer"
                style={{
                  background: isToday ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isToday ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="text-xs" style={{ color: isToday ? '#818cf8' : '#475569' }}>{days[i]}</div>
                <div
                  className="text-sm font-bold mt-0.5"
                  style={{ color: isToday ? '#818cf8' : '#94a3b8' }}
                >
                  {date.getDate()}
                </div>
                {isToday && <div className="w-1 h-1 rounded-full mt-1" style={{ background: '#6366f1' }} />}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 300px' }}>
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Today's Schedule</div>
            <div className="time-chip" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818cf8' }}>
              {CALENDAR_EVENTS.length} events
            </div>
          </div>

          <div>
            {CALENDAR_EVENTS.map((event, i) => (
              <TimelineEvent key={event.id} event={event} index={i} />
            ))}
          </div>

          {/* Add event */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full mt-3 py-2.5 rounded-xl text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', color: '#475569' }}
          >
            + Add Event
          </motion.button>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Today's time budget breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-4"
          >
            <div className="font-semibold text-sm mb-3" style={{ color: '#f1f5f9' }}>Time Allocation</div>
            <div className="space-y-2">
              {[
                { label: 'Sleep', mins: 420, color: '#475569', icon: '😴' },
                { label: 'Work', mins: 480, color: '#6366f1', icon: '💼' },
                { label: 'Discretionary', mins: 540, color: '#10b981', icon: '🎯' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: '#94a3b8' }}>{item.label}</span>
                      <span style={{ color: item.color, fontFamily: 'JetBrains Mono, monospace' }}>
                        {Math.floor(item.mins / 60)}h {item.mins % 60}m
                      </span>
                    </div>
                    <div className="progress-track" style={{ height: '4px' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.mins / 1440) * 100}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="progress-fill"
                        style={{ height: '100%', background: item.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Location zones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-4"
          >
            <div className="font-semibold text-sm mb-3" style={{ color: '#f1f5f9' }}>📍 Location Rules</div>
            <div className="space-y-2">
              {LOCATION_ZONES.map((zone, i) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="flex items-center gap-2 p-2 rounded-xl"
                  style={{
                    background: zone.status === 'current' ? `${zone.color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${zone.status === 'current' ? `${zone.color}40` : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <span className="text-lg">{zone.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium" style={{ color: '#f1f5f9' }}>{zone.name}</div>
                    <div className="text-xs truncate" style={{ color: '#475569' }}>{zone.rule}</div>
                  </div>
                  {zone.status === 'current' && (
                    <div className="status-indicator status-active flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming budget impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-4"
            style={{ border: '1px solid rgba(245,158,11,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span>⚡</span>
              <div className="font-semibold text-sm" style={{ color: '#f59e0b' }}>Smart Prediction</div>
            </div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>
              Based on today's patterns, you'll have{' '}
              <strong style={{ color: '#10b981' }}>{budget.currentBalance + 20}min</strong> left by 9 PM.
              Complete 2 more habits to earn extra time.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
