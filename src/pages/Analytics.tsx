import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BurnoutGauge } from '../components/analytics/BurnoutGauge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ZAxis, BarChart, Bar } from 'recharts';

export default function Analytics() {
  const { analytics, user } = useStore();

  // Transform analytics data for charts
  const productivityData = analytics.map(d => ({
    date: d.date,
    focus: d.focusSessions * 20, // Mock calculation
    mood: d.mood * 10,
  }));

  const scatterData = analytics.map(d => ({
    x: d.mood,
    y: d.tasksCompleted,
    z: d.energy,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">Understand your patterns to optimize your life.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Burnout Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <BurnoutGauge value={user.burnoutRisk} />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly Productivity vs Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {weekday: 'short'})} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="focus" stroke="#4f46e5" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} name="Focus Score" />
                  <Line type="monotone" dataKey="mood" stroke="#14b8a6" strokeWidth={2} dot={{r: 4}} name="Mood Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mood vs. Task Completion</CardTitle>
            <p className="text-sm text-muted-foreground">Does happiness lead to productivity?</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="x" name="Mood" unit="/10" domain={[0, 10]} />
                  <YAxis type="number" dataKey="y" name="Tasks" unit="" />
                  <ZAxis type="number" dataKey="z" range={[50, 400]} name="Energy" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Scatter name="Days" data={scatterData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habit Consistency</CardTitle>
            <p className="text-sm text-muted-foreground">Completion rate by category</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Health', value: 85 },
                  { name: 'Productivity', value: 65 },
                  { name: 'Mindfulness', value: 45 },
                  { name: 'Learning', value: 70 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
