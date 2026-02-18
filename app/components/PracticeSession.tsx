"use client";

import { useState } from "react";
import { QuestionResponse } from "@/app/types/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PracticeSessionProps {
  questions: QuestionResponse[];
  onComplete: (results: PracticeResult[]) => void;
}

export interface PracticeResult {
  question: QuestionResponse;
  knew: boolean;
}

export default function PracticeSession({ questions, onComplete }: PracticeSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<PracticeResult[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleResponse = (knew: boolean) => {
    const newResults = [...results, { question: currentQuestion, knew }];
    setResults(newResults);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      onComplete(newResults);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.difficulty === 'BEGINNER' ? 'bg-green-500/20 text-green-400' :
              currentQuestion.difficulty === 'INTERMEDIATE' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {currentQuestion.difficulty}
            </span>
            {currentQuestion.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Code Snippet */}
        {currentQuestion.codeSnippet && (
          <div className="mb-6">
            <SyntaxHighlighter
              language="java"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              showLineNumbers={true}
            >
              {currentQuestion.codeSnippet}
            </SyntaxHighlighter>
          </div>
        )}

        {/* Answer Section */}
        {!showAnswer ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-6">
              Think about your answer, then reveal to check
            </p>
            <button
              onClick={() => setShowAnswer(true)}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors text-lg"
            >
              Reveal Answer
            </button>
          </div>
        ) : (
          <div>
            <div className="border-t border-gray-700 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Answer:</h3>
              <div className="text-gray-300 whitespace-pre-wrap">
                {currentQuestion.answer}
              </div>
            </div>

            {/* Response Buttons */}
            <div className="border-t border-gray-700 pt-6">
              <p className="text-center text-gray-400 mb-4">
                Did you know the answer?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleResponse(false)}
                  className="px-6 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors"
                >
                  I Didn't Know It
                </button>
                <button
                  onClick={() => handleResponse(true)}
                  className="px-6 py-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition-colors"
                >
                  I Knew It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
