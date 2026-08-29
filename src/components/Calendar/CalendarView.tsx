import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarView() {
  const { state } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const getDayTasks = (day: number) => {
    const date = new Date(year, month, day);
    return state.tasks.filter(task => 
      new Date(task.createdAt).toDateString() === date.toDateString()
    );
  };

  const getDayStatus = (day: number) => {
    const tasks = getDayTasks(day);
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    
    if (total === 0) return 'none';
    if (completed === total) return 'complete';
    if (completed > 0) return 'partial';
    return 'incomplete';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500 text-white';
      case 'partial':
        return 'bg-yellow-500 text-white';
      case 'incomplete':
        return 'bg-red-500 text-white';
      default:
        return 'hover:bg-gray-100 dark:hover:bg-gray-800';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Calendar View</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Track your daily progress
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {monthNames[month]} {year}
            </h2>
          </div>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-3 sm:p-6">
          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-1 sm:p-2 text-center text-[10px] sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2"></div>;
              }

              const tasks = getDayTasks(day);
              const status = getDayStatus(day);
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

              return (
                <div
                  key={day}
                  className={`p-1 sm:p-2 h-10 sm:h-16 border rounded-md sm:rounded-lg cursor-pointer transition-all duration-200 ${
                    isToday 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  } ${getStatusColor(status)}`}
                  title={`${tasks.length} tasks on ${monthNames[month]} ${day}`}
                >
                  <div className="font-medium text-[10px] sm:text-sm mb-0.5 sm:mb-1">{day}</div>
                  {tasks.length > 0 && (
                    <div className="text-[8px] sm:text-xs hidden sm:block">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full inline-block mr-0.5 sm:mr-1 ${
                        status === 'complete' ? 'bg-white' :
                        status === 'partial' ? 'bg-white' :
                        status === 'incomplete' ? 'bg-white' : 'bg-gray-400'
                      }`}></div>
                      {tasks.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="p-3 sm:p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-400">All Complete</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-400">Partial</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-400">Incomplete</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-400">No Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}