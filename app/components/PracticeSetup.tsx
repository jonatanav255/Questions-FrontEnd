"use client";

import { useState, useEffect } from "react";
import { Category } from "@/app/types/api";
import { DifficultyLevel } from "@/app/types";
import { getQuestionCount } from "@/app/services/api";

interface PracticeSetupProps {
  categories: Category[];
  onStart: (categoryId: string, difficulty: DifficultyLevel, limit: number) => void;
}

export default function PracticeSetup({ categories, onStart }: PracticeSetupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("beginner");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [availableQuestions, setAvailableQuestions] = useState<number>(0);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  // Fetch available question count when category or difficulty changes
  useEffect(() => {
    const fetchCount = async () => {
      if (!selectedCategory) {
        setAvailableQuestions(0);
        return;
      }

      setIsLoadingCount(true);
      try {
        const backendDifficulty = selectedDifficulty.toUpperCase();
        const count = await getQuestionCount(selectedCategory, backendDifficulty);
        setAvailableQuestions(count);

        // Adjust question count if it exceeds available
        if (questionCount > count) {
          setQuestionCount(Math.min(count, 10));
        }
      } catch (error) {
        console.error("Failed to fetch question count:", error);
        setAvailableQuestions(0);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchCount();
  }, [selectedCategory, selectedDifficulty]);

  const handleStart = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    if (availableQuestions === 0) {
      alert("No questions available for this category and difficulty level");
      return;
    }

    if (questionCount > availableQuestions) {
      alert(`Only ${availableQuestions} question(s) available. Please adjust the count.`);
      return;
    }

    onStart(selectedCategory, selectedDifficulty, questionCount);
  };

  const maxQuestions = Math.min(availableQuestions, 100);
  const minQuestions = Math.min(5, availableQuestions);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">
          Setup Practice Session
        </h2>

        {/* Category Selection */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
            Select Category <span className="text-red-400">*</span>
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.questionCount} questions)
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Select Difficulty <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["beginner", "intermediate", "senior"] as DifficultyLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedDifficulty(level)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors capitalize ${
                  selectedDifficulty === level
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Available Questions Info */}
        {selectedCategory && (
          <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">
                Available Questions:
              </span>
              {isLoadingCount ? (
                <span className="text-sm text-gray-400">Loading...</span>
              ) : (
                <span className={`text-lg font-bold ${
                  availableQuestions === 0 ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {availableQuestions}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Question Count */}
        <div className="mb-8">
          <label htmlFor="count" className="block text-sm font-medium text-white mb-2">
            Number of Questions
          </label>
          <input
            type="number"
            id="count"
            min={minQuestions}
            max={maxQuestions}
            value={questionCount}
            onChange={(e) => {
              const value = parseInt(e.target.value) || minQuestions;
              setQuestionCount(Math.min(maxQuestions, Math.max(minQuestions, value)));
            }}
            disabled={!selectedCategory || availableQuestions === 0}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-gray-400 text-xs mt-1">
            {selectedCategory && availableQuestions > 0
              ? `Between ${minQuestions} and ${maxQuestions} questions`
              : "Select a category first"}
          </p>
          {availableQuestions > 0 && questionCount > availableQuestions && (
            <p className="text-red-400 text-xs mt-1">
              ⚠️ Only {availableQuestions} question(s) available
            </p>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!selectedCategory || availableQuestions === 0 || isLoadingCount}
          className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isLoadingCount
            ? "Checking available questions..."
            : availableQuestions === 0 && selectedCategory
            ? "No questions available"
            : "Start Practice Session"}
        </button>
      </div>
    </div>
  );
}
