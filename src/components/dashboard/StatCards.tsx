import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Zap, AlertTriangle, TrendingUp } from 'lucide-react';

export function StatCards() {
  const { user } = useStore();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Focus Score</CardTitle>
          <Zap className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.focusScore}</div>
          <p className="text-xs text-muted-foreground">+12% from last week</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Burnout Risk</CardTitle>
          <AlertTriangle className={`h-4 w-4 ${user.burnoutRisk > 50 ? 'text-destructive' : 'text-yellow-500'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.burnoutRisk}%</div>
          <p className="text-xs text-muted-foreground">
            {user.burnoutRisk < 30 ? 'Low risk - Keep it up!' : 'Moderate risk - Take a break.'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Energy Level</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.energyLevel}%</div>
          <p className="text-xs text-muted-foreground">Peak performance window</p>
        </CardContent>
      </Card>
    </div>
  );
}
