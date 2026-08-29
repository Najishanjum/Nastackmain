import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, Save, Code } from 'lucide-react';
import { Task } from '../../types';

interface SolutionModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const PROGRAMMING_LANGUAGES = [
  'JavaScript', 'Python', 'Java', 'C++', 'C', 'Go', 'Rust', 'TypeScript', 'Swift', 'Kotlin'
];

export default function SolutionModal({ task, isOpen, onClose }: SolutionModalProps) {
  const { updateSolution } = useApp();
  const [formData, setFormData] = useState({
    code: '',
    language: 'JavaScript',
    explanation: '',
    timeComplexity: '',
    spaceComplexity: ''
  });

  useEffect(() => {
    if (task.solution) {
      setFormData({
        code: task.solution.code,
        language: task.solution.language,
        explanation: task.solution.explanation,
        timeComplexity: task.solution.timeComplexity,
        spaceComplexity: task.solution.spaceComplexity
      });
    }
  }, [task.solution]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateSolution(task.id, {
      code: formData.code.trim(),
      language: formData.language,
      explanation: formData.explanation.trim(),
      timeComplexity: formData.timeComplexity.trim(),
      spaceComplexity: formData.spaceComplexity.trim()
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Solution for "{task.title}"
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
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Programming Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {PROGRAMMING_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Solution Code
              </label>
              <textarea
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm resize-none"
                placeholder="// Write your solution here..."
              />
            </div>

            {/* Explanation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Explanation & Approach
              </label>
              <textarea
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Explain your approach and key insights..."
              />
            </div>

            {/* Complexity Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Complexity
                </label>
                <input
                  type="text"
                  value={formData.timeComplexity}
                  onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., O(n log n)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Space Complexity
                </label>
                <input
                  type="text"
                  value={formData.spaceComplexity}
                  onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., O(1)"
                />
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
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Solution</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}