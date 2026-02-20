import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart2, Calendar, Settings, PlusCircle } from 'lucide-react';
import { cn } from './ui/Button';

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: CheckSquare, label: 'Habits', to: '/habits' },
    { icon: BarChart2, label: 'Analytics', to: '/analytics' },
    { icon: Calendar, label: 'Routine', to: '/routine' },
    { icon: PlusCircle, label: 'Daily Input', to: '/daily-input' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background hidden md:flex flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold text-primary tracking-tight">ZenFlow</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Alex User</span>
            <span className="text-xs text-muted-foreground">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
