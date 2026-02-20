import { useState, FormEvent, ChangeEvent } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Smile, Battery, Moon, Zap, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DailyInput() {
  const { logDailyInput } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    mood: 7,
    energy: 6,
    sleepHours: 7,
    focusSessions: 2,
    tasksCompleted: 3,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logDailyInput({
      date: format(new Date(), 'yyyy-MM-dd'),
      ...formData,
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Daily Check-in</h1>
        <p className="text-muted-foreground mt-2">Track your vitals to improve your algorithm.</p>
      </div>

      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>How was your day?</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-300">
              <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Log Saved!</h3>
              <p className="text-muted-foreground">Your insights have been updated.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-4">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-2"><Smile className="h-4 w-4 text-yellow-500" /> Mood</span>
                  <span className="text-muted-foreground">{formData.mood}/10</span>
                </label>
                <input
                  type="range"
                  name="mood"
                  min="1"
                  max="10"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Terrible</span>
                  <span>Amazing</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-2"><Battery className="h-4 w-4 text-green-500" /> Energy Level</span>
                  <span className="text-muted-foreground">{formData.energy}/10</span>
                </label>
                <input
                  type="range"
                  name="energy"
                  min="1"
                  max="10"
                  value={formData.energy}
                  onChange={handleChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Exhausted</span>
                  <span>Energized</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Moon className="h-4 w-4 text-indigo-400" /> Sleep Hours
                  </label>
                  <input
                    type="number"
                    name="sleepHours"
                    min="0"
                    max="24"
                    step="0.5"
                    value={formData.sleepHours}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="h-4 w-4 text-orange-500" /> Focus Sessions
                  </label>
                  <input
                    type="number"
                    name="focusSessions"
                    min="0"
                    max="20"
                    value={formData.focusSessions}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Log Daily Stats'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
