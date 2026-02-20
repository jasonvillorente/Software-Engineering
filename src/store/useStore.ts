import { create } from 'zustand';
import { AppState, Habit, Task, DailyInput } from '../types';
import { format } from 'date-fns';

// Mock Data
const MOCK_HABITS: Habit[] = [
  { id: '1', name: 'Morning Meditation', streak: 5, completedDates: [format(new Date(), 'yyyy-MM-dd')], difficulty: 'medium', category: 'mindfulness' },
  { id: '2', name: 'Deep Work Session', streak: 12, completedDates: [], difficulty: 'hard', category: 'productivity' },
  { id: '3', name: 'Drink 2L Water', streak: 3, completedDates: [], difficulty: 'easy', category: 'health' },
];

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Review Q1 Goals', completed: false, dueDate: '2023-10-25', priority: 'high' },
  { id: '2', title: 'Update Portfolio', completed: true, dueDate: '2023-10-24', priority: 'medium' },
  { id: '3', title: 'Team Sync', completed: false, dueDate: '2023-10-26', priority: 'low' },
];

const MOCK_ANALYTICS: DailyInput[] = Array.from({ length: 7 }).map((_, i) => ({
  date: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  mood: Math.floor(Math.random() * 3) + 7,
  energy: Math.floor(Math.random() * 4) + 6,
  sleepHours: Math.floor(Math.random() * 2) + 6,
  focusSessions: Math.floor(Math.random() * 3) + 2,
  tasksCompleted: Math.floor(Math.random() * 5) + 3,
}));

export const useStore = create<AppState>((set) => ({
  user: {
    name: 'Alex',
    focusScore: 78,
    burnoutRisk: 24,
    energyLevel: 85,
  },
  habits: MOCK_HABITS,
  tasks: MOCK_TASKS,
  analytics: MOCK_ANALYTICS,
  isLoading: false,

  toggleHabit: (id, date) => set((state) => {
    const habits = state.habits.map((h) => {
      if (h.id === id) {
        const isCompleted = h.completedDates.includes(date);
        const newCompletedDates = isCompleted
          ? h.completedDates.filter((d) => d !== date)
          : [...h.completedDates, date];
        
        // Simple streak calculation logic (mock)
        const newStreak = isCompleted ? Math.max(0, h.streak - 1) : h.streak + 1;

        return { ...h, completedDates: newCompletedDates, streak: newStreak };
      }
      return h;
    });
    return { habits };
  }),

  addHabit: (habit) => set((state) => ({
    habits: [...state.habits, { ...habit, id: Math.random().toString(36).substr(2, 9), streak: 0, completedDates: [] }]
  })),

  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
  })),

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9), completed: false }]
  })),

  logDailyInput: (input) => set((state) => ({
    analytics: [...state.analytics, input],
    user: {
      ...state.user,
      // Simple logic to update user state based on input
      energyLevel: input.energy * 10,
      focusScore: Math.min(100, state.user.focusScore + (input.focusSessions * 5)),
      burnoutRisk: Math.max(0, 100 - (input.sleepHours * 10) - (input.mood * 2)),
    }
  })),

  updateUserMetrics: (metrics) => set((state) => ({
    user: { ...state.user, ...metrics }
  })),
}));
