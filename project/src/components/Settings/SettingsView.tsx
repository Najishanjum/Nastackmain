import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Save, User, Target, Trash2 } from 'lucide-react';

export default function SettingsView() {
  const { state, updateSettings } = useApp();
  const [formData, setFormData] = useState({
    username: state.settings.username,
    targetPerDay: state.settings.targetPerDay
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Customize your DSA tracker experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Settings
              </h3>
            </div>
          </div>
          
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Daily Target (problems per day)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.targetPerDay}
                onChange={(e) => setFormData({ ...formData, targetPerDay: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </form>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Data Management
              </h3>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Current Statistics
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>Total Tasks: {state.tasks.length}</p>
                <p>Completed Tasks: {state.tasks.filter(task => task.completed).length}</p>
                <p>Data stored locally in your browser</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset All Data</span>
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                This will permanently delete all your tasks and settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          About NAStack DSA Journey Tracker
        </h3>
        <div className="prose prose-sm text-gray-600 dark:text-gray-400">
          <p>
            This application helps you track your Data Structures & Algorithms learning journey.
            Built with React and Tailwind CSS, featuring local storage for data persistence.
          </p>
          <p className="mt-4">
            Features include task management, progress tracking, calendar view, analytics, 
            and motivational quotes to keep you motivated on your coding journey.
          </p>
        </div>
      </div>
    </div>
  );
}