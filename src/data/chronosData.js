// ─── App Categories ────────────────────────────────────────────────────────
export const APP_CATEGORIES = {
  productive: { label: 'Productive', color: '#10b981', icon: '⚡' },
  social: { label: 'Social Media', color: '#ef4444', icon: '📱' },
  entertainment: { label: 'Entertainment', color: '#f59e0b', icon: '🎮' },
  health: { label: 'Health & Fitness', color: '#06b6d4', icon: '💪' },
  communication: { label: 'Communication', color: '#8b5cf6', icon: '💬' },
  learning: { label: 'Learning', color: '#6366f1', icon: '📚' },
};

// ─── Tracked Apps ───────────────────────────────────────────────────────────
export const TRACKED_APPS = [
  { id: 'instagram', name: 'Instagram', category: 'social', icon: '📸', color: '#E1306C', used: 127, limit: 60, locked: true, lockedUntil: '8:30 PM' },
  { id: 'tiktok', name: 'TikTok', category: 'social', icon: '🎵', color: '#010101', used: 94, limit: 30, locked: true, lockedUntil: '9:00 PM' },
  { id: 'youtube', name: 'YouTube', category: 'entertainment', icon: '▶️', color: '#FF0000', used: 48, limit: 90, locked: false },
  { id: 'netflix', name: 'Netflix', category: 'entertainment', icon: '🎬', color: '#E50914', used: 0, limit: 120, locked: false },
  { id: 'vscode', name: 'VS Code', category: 'productive', icon: '💻', color: '#007ACC', used: 214, limit: 480, locked: false },
  { id: 'notion', name: 'Notion', category: 'productive', icon: '📋', color: '#000000', used: 45, limit: 120, locked: false },
  { id: 'twitter', name: 'X / Twitter', category: 'social', icon: '𝕏', color: '#1DA1F2', used: 67, limit: 20, locked: true, lockedUntil: '10:00 PM' },
  { id: 'slack', name: 'Slack', category: 'communication', icon: '💬', color: '#4A154B', used: 88, limit: 180, locked: false },
  { id: 'spotify', name: 'Spotify', category: 'entertainment', icon: '🎧', color: '#1DB954', used: 76, limit: 120, locked: false },
  { id: 'gmail', name: 'Gmail', category: 'communication', icon: '📧', color: '#EA4335', used: 32, limit: 60, locked: false },
];

// ─── Habits / Challenges ────────────────────────────────────────────────────
export const HABITS = [
  { id: 'gym', name: 'Hit the gym', icon: '🏋️', reward: 60, xp: 150, category: 'health', completed: true, streak: 5, description: 'Earn 1 hour back for every gym session' },
  { id: 'reading', name: 'Read for 30 min', icon: '📖', reward: 45, xp: 100, category: 'learning', completed: true, streak: 12, description: 'Earn 45 min back for focused reading' },
  { id: 'meditation', name: 'Meditate 10 min', icon: '🧘', reward: 20, xp: 75, category: 'health', completed: false, streak: 3, description: 'Earn 20 min back for mindfulness practice' },
  { id: 'walk', name: 'Walk 5000 steps', icon: '🚶', reward: 30, xp: 80, category: 'health', completed: false, streak: 0, description: 'Earn 30 min back for hitting step goals' },
  { id: 'journal', name: 'Write in journal', icon: '✍️', reward: 25, xp: 60, category: 'learning', completed: true, streak: 7, description: 'Earn 25 min back for daily journaling' },
  { id: 'coldshower', name: 'Cold shower', icon: '🚿', reward: 30, xp: 90, category: 'health', completed: false, streak: 2, description: 'Earn 30 min for mental toughness' },
  { id: 'nophone', name: 'No phone 1 hr', icon: '📵', reward: 40, xp: 110, category: 'productive', completed: false, streak: 0, description: 'Earn 40 min for phone-free focus block' },
  { id: 'hydration', name: 'Drink 8 glasses', icon: '💧', reward: 15, xp: 50, category: 'health', completed: true, streak: 9, description: 'Earn 15 min for staying hydrated' },
];

// ─── Calendar Events ─────────────────────────────────────────────────────────
export const CALENDAR_EVENTS = [
  { id: 1, title: 'Team Standup', time: '9:00 AM', duration: 30, type: 'work', color: '#6366f1' },
  { id: 2, title: 'Deep Work Block', time: '10:00 AM', duration: 120, type: 'focus', color: '#10b981' },
  { id: 3, title: 'Gym Session', time: '12:30 PM', duration: 60, type: 'health', color: '#06b6d4' },
  { id: 4, title: 'Product Review', time: '2:00 PM', duration: 60, type: 'work', color: '#6366f1' },
  { id: 5, title: 'Reading Time', time: '4:30 PM', duration: 30, type: 'learning', color: '#8b5cf6' },
  { id: 6, title: 'Dinner', time: '7:00 PM', duration: 60, type: 'personal', color: '#f59e0b' },
  { id: 7, title: 'Wind Down', time: '9:00 PM', duration: 60, type: 'personal', color: '#475569' },
];

// ─── Bank Transactions ───────────────────────────────────────────────────────
export const BANK_REWARDS = [
  { id: 1, date: 'Today', action: 'Gym session completed', amount: '+$0.50', type: 'reward', time: '1:28 PM' },
  { id: 2, date: 'Today', action: 'Social media overuse fine', amount: '-$2.00', type: 'fine', time: '11:42 AM' },
  { id: 3, date: 'Today', action: 'Reading goal achieved', amount: '+$0.25', type: 'reward', time: '10:15 AM' },
  { id: 4, date: 'Yesterday', action: 'Deep work streak (3 days)', amount: '+$1.00', type: 'bonus', time: '6:00 PM' },
  { id: 5, date: 'Yesterday', action: 'No phone morning routine', amount: '+$0.35', type: 'reward', time: '8:30 AM' },
  { id: 6, date: 'Jun 18', action: 'Twitter overuse fine', amount: '-$1.50', type: 'fine', time: '9:00 PM' },
  { id: 7, date: 'Jun 18', action: 'Meditation streak bonus', amount: '+$0.75', type: 'bonus', time: '7:00 AM' },
];

// ─── Time Ledger Entries ─────────────────────────────────────────────────────
export const TIME_LEDGER = [
  { time: '11:42 AM', action: 'Instagram limit exceeded', delta: -67, type: 'debit', icon: '📸' },
  { time: '10:15 AM', action: 'Reading goal: 30 min earned', delta: +45, type: 'credit', icon: '📖' },
  { time: '9:00 AM', action: 'Gym session: 60 min earned', delta: +60, type: 'credit', icon: '🏋️' },
  { time: '8:30 AM', action: 'Twitter limit exceeded', delta: -47, type: 'debit', icon: '𝕏' },
  { time: '7:30 AM', action: 'Morning journal: 25 min earned', delta: +25, type: 'credit', icon: '✍️' },
  { time: 'Yesterday', action: 'TikTok overuse fine', delta: -94, type: 'debit', icon: '🎵' },
  { time: 'Yesterday', action: 'Deep work block completed', delta: +90, type: 'credit', icon: '💻' },
];

// ─── Computed Time Budget ────────────────────────────────────────────────────
export const TIME_BUDGET = {
  totalMinutes: 1440, // 24 hours
  sleepMinutes: 420,  // 7 hours
  workMinutes: 480,   // 8 hours
  discretionaryMinutes: 540, // 9 hours
  earnedMinutes: 130,   // via habits
  usedMinutes: 335,
  lockedMinutes: 158,  // currently locked due to overuse
  currentBalance: 137, // minutes left to spend
  level: 14,
  xp: 3840,
  xpToNext: 5000,
  streakDays: 12,
  moneyBalance: 8.45,
  moneySaved: 42.30,
  moneyFined: 12.80,
};

// ─── Weekly Stats ────────────────────────────────────────────────────────────
export const WEEKLY_DATA = [
  { day: 'Mon', earned: 120, wasted: 45, score: 85 },
  { day: 'Tue', earned: 90, wasted: 90, score: 60 },
  { day: 'Wed', earned: 150, wasted: 30, score: 95 },
  { day: 'Thu', earned: 80, wasted: 120, score: 45 },
  { day: 'Fri', earned: 110, wasted: 60, score: 75 },
  { day: 'Sat', earned: 60, wasted: 180, score: 30 },
  { day: 'Sun', earned: 130, wasted: 35, score: 88 },
];

// ─── Notifications ───────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 1, type: 'lock', message: 'Instagram locked — 67 min over limit', time: '11:42 AM', icon: '🔒', color: '#ef4444' },
  { id: 2, type: 'reward', message: 'Gym habit completed! +60 min earned', time: '1:28 PM', icon: '🏆', color: '#10b981' },
  { id: 3, type: 'warning', message: 'YouTube: 42 min remaining', time: '3:15 PM', icon: '⚠️', color: '#f59e0b' },
  { id: 4, type: 'banking', message: 'Fine deducted: -$2.00 for overuse', time: '11:43 AM', icon: '💸', color: '#ef4444' },
  { id: 5, type: 'streak', message: '12-day streak! Bonus time credited', time: '12:00 AM', icon: '🔥', color: '#f59e0b' },
];

// ─── Location Triggers ───────────────────────────────────────────────────────
export const LOCATION_ZONES = [
  { name: 'Home', icon: '🏠', status: 'current', rule: 'Limited social media', color: '#6366f1' },
  { name: 'Office', icon: '🏢', status: 'visited', rule: 'Work apps only', color: '#10b981' },
  { name: 'Gym', icon: '🏋️', status: 'visited', rule: '+60 min earned on arrival', color: '#06b6d4' },
  { name: 'Coffee Shop', icon: '☕', status: 'nearby', rule: 'Focus mode auto-enabled', color: '#8b5cf6' },
];
