import React from 'react';
import { Brain, RotateCcw, ArrowRight } from 'lucide-react';

interface ReviewReminderProps {
  tasksCount: number;
  flashcardsCount: number;
}

export default function ReviewReminder({ tasksCount, flashcardsCount }: ReviewReminderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300">
              Time for Review! 🧠
            </h3>
            <p className="text-purple-700 dark:text-purple-400">
              {tasksCount > 0 && `${tasksCount} problems`}
              {tasksCount > 0 && flashcardsCount > 0 && ' and '}
              {flashcardsCount > 0 && `${flashcardsCount} flashcards`}
              {' '}ready for spaced repetition review
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {tasksCount > 0 && (
            <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <RotateCcw className="w-4 h-4" />
              <span>Review Problems</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {flashcardsCount > 0 && (
            <button className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Brain className="w-4 h-4" />
              <span>Review Cards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}