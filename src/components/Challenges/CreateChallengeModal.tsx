import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, Zap, Calendar, Target } from 'lucide-react';
import { CATEGORIES } from '../../utils/categories';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateChallengeModal({ isOpen, onClose }: CreateChallengeModalProps) {
  const { createChallenge, state } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'daily' as 'daily' | 'weekly' | 'custom',
    target: 3,
    category: '',
    difficulty: '' as '' | 'Easy' | 'Medium' | 'Hard',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline) return;

    createChallenge({
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      target: formData.target,
      category: formData.category || undefined,
      difficulty: formData.difficulty || undefined,
      deadline: formData.deadline,
      participants: [state.settings.username],
      createdBy: state.settings.username,
      isActive: true
    });

    setFormData({
      title: '',
      description: '',
      type: 'daily',
      target: 3,
      category: '',
      difficulty: '',
      deadline: ''
    });
    onClose();
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create Challenge
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Solve 5 Array Problems Today"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Describe the challenge and any specific requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Challenge Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target (Problems to Solve)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category (Optional)
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Any Category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty (Optional)
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Deadline *
                </label>
                <input
                  type="datetime-local"
                  required
                  min={getMinDate()}
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Challenge Preview */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-medium text-orange-900 dark:text-orange-300">
                  Challenge Preview
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-orange-800 dark:text-orange-400">
                  <strong>Goal:</strong> Solve {formData.target} {formData.category || 'DSA'} problems
                  {formData.difficulty && ` (${formData.difficulty} difficulty)`}
                </p>
                <p className="text-orange-800 dark:text-orange-400">
                  <strong>Type:</strong> {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} challenge
                </p>
                {formData.deadline && (
                  <p className="text-orange-800 dark:text-orange-400">
                    <strong>Deadline:</strong> {new Date(formData.deadline).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Create Challenge</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}