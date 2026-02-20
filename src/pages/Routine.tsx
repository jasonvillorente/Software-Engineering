import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowRight, Zap, Coffee, Moon, Sun, Briefcase } from 'lucide-react';
import { cn } from '../components/ui/Button';

interface TimeBlock {
  id: string;
  time: string;
  activity: string;
  type: 'work' | 'break' | 'personal' | 'sleep';
  energy: 'high' | 'medium' | 'low';
}

const ORIGINAL_SCHEDULE: TimeBlock[] = [
  { id: '1', time: '08:00', activity: 'Email & Slack', type: 'work', energy: 'low' },
  { id: '2', time: '09:00', activity: 'Deep Work', type: 'work', energy: 'high' },
  { id: '3', time: '12:00', activity: 'Lunch', type: 'personal', energy: 'medium' },
  { id: '4', time: '13:00', activity: 'Meetings', type: 'work', energy: 'medium' },
  { id: '5', time: '15:00', activity: 'Deep Work', type: 'work', energy: 'low' }, // Inefficient
  { id: '6', time: '17:00', activity: 'Wrap up', type: 'work', energy: 'low' },
];

const OPTIMIZED_SCHEDULE: TimeBlock[] = [
  { id: '1', time: '08:00', activity: 'Deep Work (Peak Focus)', type: 'work', energy: 'high' }, // Moved to peak time
  { id: '2', time: '10:30', activity: 'Email & Slack', type: 'work', energy: 'low' },
  { id: '3', time: '12:00', activity: 'Lunch & Walk', type: 'personal', energy: 'medium' },
  { id: '4', time: '13:30', activity: 'Meetings', type: 'work', energy: 'medium' },
  { id: '5', time: '15:30', activity: 'Power Nap / Break', type: 'break', energy: 'low' }, // Added break
  { id: '6', time: '16:00', activity: 'Admin Tasks', type: 'work', energy: 'low' },
];

function ScheduleColumn({ title, blocks, isOptimized = false }: { title: string, blocks: TimeBlock[], isOptimized?: boolean }) {
  return (
    <div className="flex-1 space-y-4">
      <h3 className={cn("text-lg font-semibold flex items-center gap-2", isOptimized ? "text-primary" : "text-muted-foreground")}>
        {isOptimized && <Zap className="h-5 w-5" />}
        {title}
      </h3>
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div 
            key={block.id} 
            className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              isOptimized ? "bg-card shadow-sm hover:shadow-md border-primary/20" : "bg-muted/30 border-transparent opacity-70",
              block.type === 'break' && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-muted-foreground">{block.time}</span>
              {block.type === 'work' && <Briefcase className="h-3 w-3 text-muted-foreground" />}
              {block.type === 'break' && <Coffee className="h-3 w-3 text-green-500" />}
              {block.type === 'personal' && <Sun className="h-3 w-3 text-orange-500" />}
            </div>
            <div className="font-medium">{block.activity}</div>
            
            {isOptimized && block.energy === 'high' && (
              <div className="mt-2 text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 w-fit px-2 py-1 rounded-full">
                <Zap className="h-3 w-3" /> Peak Energy Match
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Routine() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showOptimized, setShowOptimized] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setShowOptimized(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Routine Optimizer</h1>
          <p className="text-muted-foreground">AI-driven schedule adjustments for maximum flow.</p>
        </div>
        {!showOptimized && (
          <Button onClick={handleOptimize} disabled={isOptimizing} size="lg" className="gap-2">
            {isOptimizing ? (
              <>
                <Zap className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Optimize Schedule
              </>
            )}
          </Button>
        )}
        {showOptimized && (
          <Button variant="outline" onClick={() => setShowOptimized(false)}>
            Reset View
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <ScheduleColumn title="Current Routine" blocks={ORIGINAL_SCHEDULE} />
        
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className={cn(
            "bg-background border rounded-full p-2 shadow-lg transition-all duration-500",
            showOptimized ? "opacity-100 rotate-0" : "opacity-0 -rotate-180 pointer-events-none"
          )}>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {showOptimized ? (
          <div className="animate-in slide-in-from-right-10 fade-in duration-500">
            <ScheduleColumn title="AI Optimized" blocks={OPTIMIZED_SCHEDULE} isOptimized />
          </div>
        ) : (
          <div className="flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/10 min-h-[400px]">
            <div className="text-center max-w-sm mx-auto p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Optimize?</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your energy peaks and habit consistency to suggest a flow-state friendly schedule.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
