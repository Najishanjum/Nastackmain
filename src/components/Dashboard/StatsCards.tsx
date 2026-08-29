import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle, Target, Calendar, Zap } from 'lucide-react';

export default function StatsCards() {
  const { state, getTodayTasks } = useApp();
  const todayTasks = getTodayTasks();
  const completedToday = todayTasks.filter(task => task.completed).length;
  const totalCompleted = state.tasks.filter(task => task.completed).length;
  
  // Calculate streak
  const streak = calculateStreak(state.tasks);

  const stats = [
    {
      label: 'Completed Today',
      value: completedToday,
      total: todayTasks.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Total Solved',
      value: totalCompleted,
      icon: Target,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Current Streak',
      value: streak,
      icon: Zap,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      label: 'This Week',
      value: getWeeklyCount(state.tasks),
      icon: Calendar,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${stat.bgColor} p-6 rounded-xl border border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                  {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function calculateStreak(tasks: any[]): number {
  const today = new Date();
  let streak = 0;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toDateString();
    
    const dayTasks = tasks.filter(task => 
      new Date(task.createdAt).toDateString() === dateStr && task.completed
    );
    
    if (dayTasks.length > 0) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}

function getWeeklyCount(tasks: any[]): number {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  return tasks.filter(task => 
    new Date(task.completedAt || task.createdAt) >= weekAgo && task.completed
  ).length;
}