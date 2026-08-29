import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { Task, Resource } from '../../types';

interface ResourcesModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const RESOURCE_TYPES = ['GeeksforGeeks', 'LeetCode', 'YouTube', 'Article', 'Other'] as const;

export default function ResourcesModal({ task, isOpen, onClose }: ResourcesModalProps) {
  const { addResource, removeResource } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'GeeksforGeeks' as Resource['type']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;

    addResource(task.id, {
      title: formData.title.trim(),
      url: formData.url.trim(),
      type: formData.type
    });

    setFormData({
      title: '',
      url: '',
      type: 'GeeksforGeeks'
    });
  };

  const handleRemoveResource = (resourceId: string) => {
    if (window.confirm('Are you sure you want to remove this resource?')) {
      removeResource(task.id, resourceId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Resources for "{task.title}"
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Add Resource Form */}
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Add New Resource
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Resource title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="url"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex space-x-2">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Resource['type'] })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {RESOURCE_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </form>

          {/* Resources List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Saved Resources ({task.resources?.length || 0})
            </h3>
            
            {!task.resources || task.resources.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <ExternalLink className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No resources added yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {task.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          resource.type === 'GeeksforGeeks' ? 'bg-green-100 text-green-800' :
                          resource.type === 'LeetCode' ? 'bg-orange-100 text-orange-800' :
                          resource.type === 'YouTube' ? 'bg-red-100 text-red-800' :
                          resource.type === 'Article' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {resource.type}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {resource.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {resource.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                      </a>
                      <button
                        onClick={() => handleRemoveResource(resource.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}