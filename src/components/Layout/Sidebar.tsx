import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Home,
  Sun,
  Moon,
  User,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { state, updateSettings } = useApp();

  const toggleTheme = () => {
    updateSettings({ theme: state.settings.theme === 'light' ? 'dark' : 'light' });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'All Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white text-sm">NAStack</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">DSA Journey</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {state.settings.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Keep coding! 🚀</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {state.settings.theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {state.settings.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}