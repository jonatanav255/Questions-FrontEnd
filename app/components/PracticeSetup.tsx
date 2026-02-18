"use client";

import { useState, useEffect } from "react";
import { Category } from "@/app/types/api";
import { DifficultyLevel } from "@/app/types";

interface PracticeSetupProps {
  categories: Category[];
  onStart: (categoryId: string, difficulty: DifficultyLevel, limit: number) => void;
}

export default function PracticeSetup({ categories, onStart }: PracticeSetupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("beginner");
  const [questionCount, setQuestionCount] = useState<number>(10);

  const handleStart = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    onStart(selectedCategory, selectedDifficulty, questionCount);
  };

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

        {/* Question Count */}
        <div className="mb-8">
          <label htmlFor="count" className="block text-sm font-medium text-white mb-2">
            Number of Questions
          </label>
          <input
            type="number"
            id="count"
            min="5"
            max="100"
            value={questionCount}
            onChange={(e) => setQuestionCount(Math.min(100, Math.max(5, parseInt(e.target.value) || 5)))}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-400 text-xs mt-1">Between 5 and 100 questions</p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!selectedCategory}
          className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          Start Practice Session
        </button>
      </div>
    </div>
  );
}
