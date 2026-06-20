# Chronos — Time Budget Tracker 🕐

> **Your 24 hours, treated like a bank account.**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://chronos-time-budget.vercel.app)
[![Built with Vite](https://img.shields.io/badge/Built_with-Vite_8-646cff?logo=vite)](https://vite.dev)
[![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)

## 🌐 Live URL
**[https://chronos-time-budget.vercel.app](https://chronos-time-budget.vercel.app)**

---

## 🚀 Features

### ⏱ Time as Currency
Chronos treats your daily 24 hours exactly like a bank account. Every app you use draws from your balance. Every good habit earns time back.

### 📱 App Locking System
- Set daily limits per app (Instagram, TikTok, YouTube, etc.)
- Apps automatically lock when limit exceeded
- Visual red alerts with unlock countdowns
- Earn time back via habits to unlock early

### 🏆 Habits & Rewards
- Complete habits (gym, reading, meditation) to earn back screen time
- XP and leveling system for gamification
- Streak tracking with bonus rewards
- Progress toward unlocking specific locked apps

### 📊 Analytics Dashboard
- Activity heatmap by hour and day
- Weekly discipline score (0–100)
- Category breakdown donut chart
- Top apps ranked by usage

### 💰 Time Bank
- Real money micro-deposits for good habits
- Automatic fines for overuse ($0.02/min over limit)
- Transaction ledger with reward/fine history
- Plaid bank account integration (coming soon)

### 📍 Calendar + Location
- Full calendar with event timeline
- Location-based rules (gym = +60min earned)
- Smart time allocation display
- Predictive balance insights

---

## 🛠 Tech Stack

| Tool | Version |
|------|---------|
| React | 19.2 |
| Vite | 8.0 |
| Tailwind CSS | 4.3 |
| Framer Motion | 12.x |
| Vercel Analytics | Latest |
| Vercel Speed Insights | Latest |

---

## 🏗 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🚀 Deploy to Vercel

```bash
npm run build
vercel deploy --prod
```

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point + Vercel analytics
├── index.css            # Global design system
├── data/
│   └── chronosData.js   # App data & constants
└── components/
    ├── Sidebar.jsx       # Navigation sidebar
    ├── Dashboard.jsx     # Main overview
    ├── AppControl.jsx    # Per-app limits
    ├── Habits.jsx        # Habit tracking
    ├── Analytics.jsx     # Charts & heatmap
    ├── TimeBank.jsx      # Money & transactions
    └── CalendarView.jsx  # Schedule & location
```

---

Built with ❤️ by Mangesh · Powered by Vercel
