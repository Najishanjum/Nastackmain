import React, { useState, useEffect } from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../../utils/categories';

export default function MotivationalQuote() {
  const [quote, setQuote] = useState('');

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <Quote className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              Daily Motivation
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
            "{quote}"
          </p>
        </div>
        <button
          onClick={getRandomQuote}
          className="ml-4 p-2 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-lg transition-colors"
          title="Get new quote"
        >
          <RefreshCw className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    </div>
  );
}