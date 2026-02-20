export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDates: string[]; // ISO date strings
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'health' | 'productivity' | 'mindfulness';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DailyInput {
  date: string;
  mood: number; // 1-10
  energy: number; // 1-10
  sleepHours: number;
  focusSessions: number;
  tasksCompleted: number;
}

export interface UserState {
  name: string;
  focusScore: number;
  burnoutRisk: number; // 0-100
  energyLevel: number; // Current energy level
}

export interface AppState {
  user: UserState;
  habits: Habit[];
  tasks: Task[];
  analytics: DailyInput[];
  isLoading: boolean;
  
  // Actions
  toggleHabit: (id: string, date: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => void;
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  logDailyInput: (input: DailyInput) => void;
  updateUserMetrics: (metrics: Partial<UserState>) => void;
}
