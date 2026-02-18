"use client";

import { useState, useEffect } from "react";
import { DifficultyLevel } from "@/app/types";
import { QuestionResponse } from "@/app/types/api";
import QuestionForm from "@/app/components/QuestionForm";
import QuestionEditForm from "@/app/components/QuestionEditForm";
import QuestionCard from "@/app/components/QuestionCard";
import Pagination from "@/app/components/Pagination";
import { getQuestions, deleteQuestion } from "@/app/services/api";

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
  const [editingQuestion, setEditingQuestion] = useState<QuestionResponse | null>(null);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async (page = 0) => {
    setIsLoading(true);
    setError(null);
    try {
      // Convert frontend difficulty format to backend format
      const backendDifficulty = difficulty.toUpperCase();
      const data = await getQuestions(categoryId, backendDifficulty, page, 20);
      setQuestions(data.content);
      setCurrentPage(data.number);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(0);
  }, [categoryId, difficulty]);

  const handlePageChange = (page: number) => {
    fetchQuestions(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuestion(id);
      fetchQuestions(currentPage);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete question");
    }
  };

  const handleEdit = (question: QuestionResponse) => {
    setEditingQuestion(question);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white mt-4">
            {categoryName} - {difficultyName}
          </h1>
          <p className="text-gray-400">{difficultyDescription}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">
            Total Questions: <span className="text-white font-semibold">{totalElements}</span>
          </p>
        </div>
      </div>

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

      {/* Error State */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-gray-400 py-12" role="status">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading questions...</p>
        </div>
      )}

      {/* Questions List */}
      {!isLoading && !error && (
        <section aria-label="Questions list">
          {questions.length === 0 ? (
            <div className="text-center text-gray-500 py-12" role="status">
              <p className="text-lg mb-4">
                No questions yet for this difficulty level.
              </p>
              <p className="text-sm">Click "Create New Question" to get started!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      )}

      {/* Question Form Modal */}
      {showForm && (
        <QuestionForm
          categoryId={categoryId}
          difficulty={difficulty}
          onCancel={() => setShowForm(false)}
          onSuccess={() => fetchQuestions(currentPage)}
        />
      )}

      {/* Question Edit Modal */}
      {editingQuestion && (
        <QuestionEditForm
          question={editingQuestion}
          onCancel={() => setEditingQuestion(null)}
          onSuccess={() => fetchQuestions(currentPage)}
        />
      )}
    </>
  );
}
