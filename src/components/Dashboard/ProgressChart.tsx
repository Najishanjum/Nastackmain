import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { TrendingUp, Calendar } from 'lucide-react';

export default function ProgressChart() {
  const { state } = useApp();
  const last7Days = getLast7Days();
  const weeklyData = last7Days.map(date => {
    const dayTasks = state.tasks.filter(task => 
      new Date(task.createdAt).toDateString() === date.toDateString()
    );
    const completed = dayTasks.filter(task => task.completed).length;
    return {
      date,
      completed,
      total: dayTasks.length
    };
  });

  const maxCompleted = Math.max(...weeklyData.map(d => d.completed), 1);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weekly Progress
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-12 text-xs text-gray-500 dark:text-gray-400">
                {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(day.completed / maxCompleted) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm text-gray-900 dark:text-white text-right">
                {day.completed}/{day.total}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              Weekly Total: {weeklyData.reduce((sum, day) => sum + day.completed, 0)} problems solved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getLast7Days(): Date[] {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
}