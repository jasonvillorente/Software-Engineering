# ZenFlow - AI Life Organizer

## Component Architecture

```
App
├── Layout
│   ├── Sidebar (Navigation)
│   └── Outlet (Page Content)
│       ├── Dashboard
│       │   ├── StatCards (Focus, Burnout, Energy)
│       │   ├── ProductivityTrendChart (Bar Chart)
│       │   ├── EnergyCurveChart (Area Chart)
│       │   ├── QuickHabits (List)
│       │   ├── TaskOverview (List)
│       │   └── AI Insight Card
│       ├── Habits
│       │   └── HabitGrid (Weekly view with toggles)
│       ├── Analytics
│       │   ├── BurnoutGauge (Pie Chart)
│       │   ├── WeeklyProductivityChart (Line Chart)
│       │   ├── MoodVsProductivityChart (Scatter Chart)
│       │   └── HabitConsistencyChart (Bar Chart)
│       ├── DailyInput
│       │   └── DailyInputForm (Sliders, Inputs)
│       └── Routine
│           └── RoutineVisualizer (Comparison View)
└── Toast/Modal Overlays (if added)
```

## State Management (Zustand)

- **User Store**: Profile, Focus Score, Burnout Risk
- **Habits Store**: List of habits, completion history, streaks
- **Tasks Store**: List of tasks, priorities, due dates
- **Analytics Store**: Daily logs (mood, energy, sleep)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Recharts
- Zustand
- React Router DOM
