"use client";

import { useState } from "react";
import { DifficultyLevel } from "@/app/types";
import QuestionForm from "@/app/components/QuestionForm";

interface DifficultyPageClientProps {
  categoryId: string;
  categoryName: string;
  difficulty: DifficultyLevel;
  difficultyName: string;
  difficultyDescription: string;
}

export default function DifficultyPageClient({
  categoryId,
  categoryName,
  difficulty,
  difficultyName,
  difficultyDescription,
}: DifficultyPageClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-white mt-4">
        {categoryName} - {difficultyName}
      </h1>
      <p className="text-gray-400 mb-8">{difficultyDescription}</p>

      {/* Create Question Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create New Question
        </button>
      </div>

      <section aria-label="Questions list">
        <div className="text-center text-gray-500 py-12" role="status">
          <p className="text-lg mb-4">
            No questions yet for this difficulty level.
          </p>
          <p className="text-sm">Click "Create New Question" to get started!</p>
        </div>
      </section>

      {/* Question Form Modal */}
      {showForm && (
        <QuestionForm
          categoryId={categoryId}
          difficulty={difficulty}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
}
