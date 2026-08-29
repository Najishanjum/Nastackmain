import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Check, Edit2, Trash2, Clock, ExternalLink, Code, BookOpen } from 'lucide-react';
import { Task } from '../../types';
import { DIFFICULTY_COLORS } from '../../utils/categories';
import EditTaskModal from './EditTaskModal';
import ResourcesModal from './ResourcesModal';
import SolutionModal from './SolutionModal';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, createFlashcard } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleCreateFlashcard = () => {
    if (task.completed) {
      createFlashcard(task.id);
      alert('Flashcard created successfully!');
    }
  };

  return (
    <>
      <div className={`p-4 border rounded-lg transition-all duration-200 ${
        task.completed 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
      }`}>
        <div className="flex items-start space-x-3">
          <button
            onClick={handleToggle}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
            }`}
          >
            {task.completed && <Check className="w-3 h-3 text-white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`font-medium ${
                task.completed 
                  ? 'text-green-800 dark:text-green-300 line-through' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {task.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded border ${DIFFICULTY_COLORS[task.difficulty]}`}>
                {task.difficulty}
              </span>
            </div>
            
            {task.description && (
              <p className={`text-sm mb-2 ${
                task.completed 
                  ? 'text-green-700 dark:text-green-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {task.description}
              </p>
            )}

            {/* Resources */}
            {task.resources && task.resources.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {task.resources.slice(0, 3).map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{resource.type}</span>
                  </a>
                ))}
                {task.resources.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                    +{task.resources.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                {task.category}
              </span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
              {task.completed && task.completedAt && (
                <span className="text-green-600 dark:text-green-400">
                  ✓ Completed {new Date(task.completedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowResourcesModal(true)}
              className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded transition-colors"
              title="Manage Resources"
            >
              <ExternalLink className="w-4 h-4 text-purple-600" />
            </button>
            <button
              onClick={() => setShowSolutionModal(true)}
              className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
              title="Add Solution"
            >
              <Code className="w-4 h-4 text-green-600" />
            </button>
            {task.completed && (
              <button
                onClick={handleCreateFlashcard}
                className="p-1 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded transition-colors"
                title="Create Flashcard"
              >
                <BookOpen className="w-4 h-4 text-orange-600" />
              </button>
            )}
            <button
              onClick={() => setShowEditModal(true)}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      <EditTaskModal
        task={task}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <ResourcesModal
        task={task}
        isOpen={showResourcesModal}
        onClose={() => setShowResourcesModal(false)}
      />
      <SolutionModal
        task={task}
        isOpen={showSolutionModal}
        onClose={() => setShowSolutionModal(false)}
      />
    </>
  );
}