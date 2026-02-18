"use client";

import { QuestionResponse } from "@/app/types/api";
import { useState } from "react";

interface QuestionCardProps {
  question: QuestionResponse;
  onEdit?: (question: QuestionResponse) => void;
  onDelete?: (id: string) => void;
}

export default function QuestionCard({ question, onEdit, onDelete }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            {question.question}
          </h3>
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              question.difficulty === 'BEGINNER' ? 'bg-green-500/20 text-green-400' :
              question.difficulty === 'INTERMEDIATE' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {question.difficulty}
            </span>
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(question)}
                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Edit question"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this question?')) {
                    onDelete(question.id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Delete question"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Code Snippet */}
      {question.codeSnippet && (
        <div className="mb-4">
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono">
              {question.codeSnippet}
            </code>
          </pre>
        </div>
      )}

      {/* Answer Section */}
      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full text-left flex items-center justify-between text-white hover:text-blue-400 transition-colors"
        >
          <span className="font-medium">
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${showAnswer ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {showAnswer && (
          <div className="mt-4 text-gray-300 whitespace-pre-wrap">
            {question.answer}
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="mt-4 text-xs text-gray-500">
        Created: {new Date(question.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
