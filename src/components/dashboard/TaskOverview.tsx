import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../ui/Button';

export function TaskOverview() {
  const { tasks, toggleTask } = useStore();
  
  // Sort tasks: High priority first, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Tasks & Priorities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedTasks.slice(0, 5).map((task) => (
            <div 
              key={task.id} 
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-all",
                task.completed ? "bg-muted/50 opacity-60" : "bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span className={cn("text-sm font-medium", task.completed && "line-through")}>
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider",
                task.priority === 'high' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                task.priority === 'medium' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
              )}>
                {task.priority}
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p>No tasks for today</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
