"use client";

import { useState, useEffect } from "react";
import { Category, QuestionResponse } from "@/app/types/api";
import { DifficultyLevel } from "@/app/types";
import { getCategories, getRandomQuestions } from "@/app/services/api";
import PracticeSetup from "@/app/components/PracticeSetup";
import PracticeSession, { PracticeResult } from "@/app/components/PracticeSession";
import PracticeResults from "@/app/components/PracticeResults";

type PracticeState = "setup" | "session" | "results";

export default function PracticePage() {
  const [state, setState] = useState<PracticeState>("setup");
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [results, setResults] = useState<PracticeResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Store session params for retry
  const [sessionParams, setSessionParams] = useState<{
    categoryId: string;
    difficulty: DifficultyLevel;
    limit: number;
  } | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async (categoryId: string, difficulty: DifficultyLevel, limit: number) => {
    setIsLoading(true);
    setError(null);
    setSessionParams({ categoryId, difficulty, limit });

    try {
      const backendDifficulty = difficulty.toUpperCase();
      const data = await getRandomQuestions(categoryId, backendDifficulty, limit);

      if (data.length === 0) {
        setError("No questions available for this category and difficulty level.");
        setIsLoading(false);
        return;
      }

      setQuestions(data);
      setState("session");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = (sessionResults: PracticeResult[]) => {
    setResults(sessionResults);
    setState("results");
  };

  const handleRestart = () => {
    setState("setup");
    setQuestions([]);
    setResults([]);
    setSessionParams(null);
  };

  const handleRetryWrong = () => {
    const wrongQuestions = results
      .filter((r) => !r.knew)
      .map((r) => r.question);
    setQuestions(wrongQuestions);
    setResults([]);
    setState("session");
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Practice Questions</h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4">Loading...</p>
          </div>
        ) : (
          <>
            {state === "setup" && (
              <PracticeSetup
                categories={categories}
                onStart={handleStart}
              />
            )}

            {state === "session" && (
              <PracticeSession
                questions={questions}
                onComplete={handleComplete}
              />
            )}

            {state === "results" && (
              <PracticeResults
                results={results}
                onRestart={handleRestart}
                onRetryWrong={handleRetryWrong}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
