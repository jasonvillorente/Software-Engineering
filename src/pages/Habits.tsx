import { useState, FormEvent } from 'react';
import { useStore } from '../store/useStore';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Check, X, Plus, Flame, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { cn } from '../components/ui/Button';

export default function Habits() {
  const { habits, toggleHabit, addHabit } = useStore();
  const [newHabitName, setNewHabitName] = useState('');
  
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const handleAddHabit = (e: FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit({
      name: newHabitName,
      difficulty: 'medium',
      category: 'productivity',
    });
    setNewHabitName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
          <p className="text-muted-foreground">Build consistency, one day at a time.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            View Insights
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Overview</CardTitle>
            <form onSubmit={handleAddHabit} className="flex gap-2">
              <input
                type="text"
                placeholder="New habit..."
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Habit</th>
                  {weekDays.map((day) => (
                    <th key={day.toString()} className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span>{format(day, 'EEE')}</span>
                        <span className={`text-xs ${isSameDay(day, new Date()) ? 'text-primary font-bold' : ''}`}>
                          {format(day, 'd')}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 rounded-tr-lg text-center">Streak</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4 font-medium">
                      <div className="flex flex-col">
                        <span>{habit.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {habit.category} • {habit.difficulty}
                        </span>
                      </div>
                    </td>
                    {weekDays.map((day) => {
                      const dateStr = format(day, 'yyyy-MM-dd');
                      const isCompleted = habit.completedDates.includes(dateStr);
                      const isFuture = day > new Date();
                      
                      return (
                        <td key={day.toString()} className="px-4 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isFuture}
                            onClick={() => toggleHabit(habit.id, dateStr)}
                            className={cn(
                              "h-8 w-8 rounded-full transition-all duration-200",
                              isCompleted 
                                ? "bg-green-500 text-white hover:bg-green-600 hover:text-white" 
                                : "bg-muted hover:bg-muted-foreground/20 text-transparent hover:text-muted-foreground",
                              isFuture && "opacity-20 cursor-not-allowed"
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </td>
                      );
                    })}
                    <td className="px-4 py-4 text-center font-mono font-medium text-orange-500">
                      <div className="flex items-center justify-center gap-1">
                        <Flame className="h-4 w-4" />
                        {habit.streak}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
