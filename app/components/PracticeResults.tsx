"use client";

import { PracticeResult } from "./PracticeSession";

interface PracticeResultsProps {
  results: PracticeResult[];
  onRestart: () => void;
  onRetryWrong: () => void;
}

export default function PracticeResults({ results, onRestart, onRetryWrong }: PracticeResultsProps) {
  const correctCount = results.filter((r) => r.knew).length;
  const incorrectCount = results.length - correctCount;
  const percentage = Math.round((correctCount / results.length) * 100);

  const wrongQuestions = results.filter((r) => !r.knew);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        {/* Score Summary */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Practice Session Complete!
          </h2>
          <div className="inline-block">
            <div className="text-6xl font-bold mb-2">
              <span className="text-green-400">{correctCount}</span>
              <span className="text-gray-500"> / </span>
              <span className="text-white">{results.length}</span>
            </div>
            <p className="text-2xl text-gray-400">
              {percentage}% Correct
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {correctCount}
            </div>
            <div className="text-sm text-gray-400">Correct</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {incorrectCount}
            </div>
            <div className="text-sm text-gray-400">Incorrect</div>
          </div>
        </div>

        {/* Wrong Answers */}
        {wrongQuestions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Questions to Review ({wrongQuestions.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wrongQuestions.map((result, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-700"
                >
                  <h4 className="text-white font-medium mb-2">
                    {result.question.question}
                  </h4>
                  <div className="text-sm text-gray-400">
                    <span className="font-semibold text-gray-300">Answer:</span>{" "}
                    {result.question.answer.substring(0, 150)}
                    {result.question.answer.length > 150 && "..."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {wrongQuestions.length > 0 && (
            <button
              onClick={onRetryWrong}
              className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
            >
              Retry Wrong Questions ({wrongQuestions.length})
            </button>
          )}
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            New Practice Session
          </button>
        </div>
      </div>
    </div>
  );
}
