import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Risk', value: 70 },
  { name: 'Safe', value: 30 },
];
const COLORS = ['#ef4444', '#e2e8f0'];

export function BurnoutGauge({ value }: { value: number }) {
  const gaugeData = [
    { name: 'Current', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  return (
    <div className="relative h-[200px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={gaugeData}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            <Cell key="cell-0" fill={value > 70 ? '#ef4444' : value > 40 ? '#f59e0b' : '#10b981'} />
            <Cell key="cell-1" fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
        <span className="text-3xl font-bold text-foreground">{value}%</span>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Risk Level</p>
      </div>
    </div>
  );
}
