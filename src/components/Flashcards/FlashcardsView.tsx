import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { BookOpen, RotateCcw, CheckCircle, XCircle, Brain } from 'lucide-react';
import { Flashcard } from '../../types';

export default function FlashcardsView() {
  const { state, getFlashcardsForReview, markFlashcardReviewed } = useApp();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const flashcardsForReview = getFlashcardsForReview();
  const allFlashcards = state.flashcards;
  const currentCards = reviewMode ? flashcardsForReview : allFlashcards;
  const currentCard = currentCards[currentCardIndex];

  const handleAnswer = (correct: boolean) => {
    if (currentCard) {
      markFlashcardReviewed(currentCard.id, correct);
      nextCard();
    }
  };

  const nextCard = () => {
    setShowAnswer(false);
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  if (allFlashcards.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review your solved problems with spaced repetition
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No flashcards yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Complete some tasks and create flashcards to start reviewing!
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Tip: Click the flashcard icon on completed tasks to create review cards
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {reviewMode ? `${flashcardsForReview.length} cards due for review` : `${allFlashcards.length} total cards`}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setReviewMode(!reviewMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              reviewMode
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            {reviewMode ? 'Exit Review' : 'Review Mode'}
          </button>
          <button
            onClick={resetSession}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{allFlashcards.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Cards</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{flashcardsForReview.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Due for Review</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {Math.round((allFlashcards.reduce((sum, card) => sum + card.correctCount, 0) / Math.max(allFlashcards.reduce((sum, card) => sum + card.reviewCount, 0), 1)) * 100)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {currentCardIndex + 1}/{currentCards.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  currentCard.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  currentCard.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentCard.difficulty}
                </span>
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {currentCard.category}
                </span>
              </div>
              
              <div className="min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {showAnswer ? 'Answer' : 'Question'}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                    {showAnswer ? currentCard.answer : currentCard.question}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Show Answer
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Incorrect</span>
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Correct</span>
                  </button>
                </div>
              )}
            </div>

            {/* Card Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <span>Reviews: {currentCard.reviewCount}</span>
                <span>Correct: {currentCard.correctCount}</span>
                <span>
                  Accuracy: {currentCard.reviewCount > 0 ? Math.round((currentCard.correctCount / currentCard.reviewCount) * 100) : 0}%
                </span>
                {currentCard.nextReviewDate && (
                  <span>
                    Next Review: {new Date(currentCard.nextReviewDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}