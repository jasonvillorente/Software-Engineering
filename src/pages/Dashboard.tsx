import { useStore } from '../store/useStore';
import { StatCards } from '../components/dashboard/StatCards';
import { ProductivityTrendChart } from '../components/dashboard/ProductivityTrendChart';
import { EnergyCurveChart } from '../components/dashboard/EnergyCurveChart';
import { QuickHabits } from '../components/dashboard/QuickHabits';
import { TaskOverview } from '../components/dashboard/TaskOverview';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user } = useStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <StatCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ProductivityTrendChart />
        </div>
        <div className="col-span-3">
          <EnergyCurveChart />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 border-indigo-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                <Sparkles className="h-5 w-5" />
                AI Daily Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your energy levels peak around 10 AM. Based on your recent focus scores, 
                try scheduling your "Deep Work Session" immediately after your morning standup.
                You're showing signs of fatigue in the late afternoon—consider a 15-minute 
                walk at 3 PM to reset.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                  Optimization Available
                </span>
              </div>
            </CardContent>
          </Card>
          
          <TaskOverview />
        </div>
        <div className="col-span-3">
          <QuickHabits />
        </div>
      </div>
    </div>
  );
}
