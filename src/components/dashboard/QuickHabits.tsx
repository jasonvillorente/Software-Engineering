import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';

export function QuickHabits() {
  const { habits, toggleHabit } = useStore();
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.slice(0, 4).map((habit) => {
            const isCompleted = habit.completedDates.includes(today);
            return (
              <div 
                key={habit.id} 
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toggleHabit(habit.id, today)}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                    {habit.name}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {habit.streak}🔥
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
