"use client";

import { useState, useEffect } from "react";
import { QuestionResponse } from "@/app/types/api";
import { DifficultyLevel } from "@/app/types";
import { updateQuestion } from "@/app/services/api";

interface QuestionEditFormProps {
  question: QuestionResponse;
  onCancel: () => void;
  onSuccess?: () => void;
}

export default function QuestionEditForm({
  question,
  onCancel,
  onSuccess,
}: QuestionEditFormProps) {
  const [formData, setFormData] = useState({
    question: question.question,
    answer: question.answer,
    codeSnippet: question.codeSnippet || "",
    tags: question.tags.join(", "),
  });
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    question.difficulty.toLowerCase() as DifficultyLevel
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const tags = formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

      await updateQuestion(question.id, {
        question: formData.question,
        answer: formData.answer,
        codeSnippet: formData.codeSnippet || undefined,
        difficulty: difficulty.toUpperCase() as "BEGINNER" | "INTERMEDIATE" | "SENIOR",
        categoryId: question.categoryId,
        tags: tags.length > 0 ? tags : undefined,
      });

      // Call success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }

      // Close modal
      onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onCancel}
    >
      <div
        className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4">
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            Edit Question
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Category: <span className="font-medium">{question.categoryName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Difficulty <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["beginner", "intermediate", "senior"] as DifficultyLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors capitalize ${
                    difficulty === level
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Question Title */}
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-white mb-2">
              Question Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="question"
              required
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., What is the difference between == and === in JavaScript?"
            />
          </div>

          {/* Answer */}
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-white mb-2">
              Answer <span className="text-red-400">*</span>
            </label>
            <textarea
              id="answer"
              required
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Provide a detailed answer to the question..."
            />
          </div>

          {/* Code Snippet */}
          <div>
            <label htmlFor="codeSnippet" className="block text-sm font-medium text-white mb-2">
              Code Snippet <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="codeSnippet"
              value={formData.codeSnippet}
              onChange={(e) =>
                setFormData({ ...formData, codeSnippet: e.target.value })
              }
              rows={8}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-vertical"
              placeholder={`// Paste your code example here
function example() {
  return 'Hello World';
}`}
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-white mb-2">
              Tags <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., syntax, operators, comparison (comma-separated)"
            />
            <p className="text-gray-500 text-xs mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
