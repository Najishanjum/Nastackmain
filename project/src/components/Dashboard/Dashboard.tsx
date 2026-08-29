import React from 'react';
import { useApp } from '../../contexts/AppContext';
import StatsCards from './StatsCards';
import TodayTasks from './TodayTasks';
import ProgressChart from './ProgressChart';
import MotivationalQuote from './MotivationalQuote';
import ReviewReminder from './ReviewReminder';

export default function Dashboard() {
  const { getTodayTasks, state, getTasksForReview, getFlashcardsForReview } = useApp();
  const todayTasks = getTodayTasks();
  const tasksForReview = getTasksForReview();
  const flashcardsForReview = getFlashcardsForReview();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {state.settings.username}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Let's continue your DSA journey
          </p>
        </div>
      </div>

      {/* Motivational Quote */}
      <MotivationalQuote />

      {/* Review Reminder */}
      {(tasksForReview.length > 0 || flashcardsForReview.length > 0) && (
        <ReviewReminder 
          tasksCount={tasksForReview.length}
          flashcardsCount={flashcardsForReview.length}
        />
      )}

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2">
          <TodayTasks tasks={todayTasks} />
        </div>

        {/* Progress Chart */}
        <div className="lg:col-span-1">
          <ProgressChart />
        </div>
      </div>
    </div>
  );
}