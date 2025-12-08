import { categories } from "@/app/data/categories";
import { DifficultyLevel } from "@/app/types";
import Link from "next/link";
import { notFound } from "next/navigation";

const difficultyNames: Record<DifficultyLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  senior: "Senior",
};

const difficultyDescriptions: Record<DifficultyLevel, string> = {
  beginner: "Basic concepts and fundamentals",
  intermediate: "Intermediate level questions",
  senior: "Advanced concepts and expert level",
};

export default async function DifficultyPage({
  params,
}: {
  params: Promise<{ categoryId: string; difficulty: string }>;
}) {
  const { categoryId, difficulty } = await params;
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    notFound();
  }

  // Validate difficulty level
  const validDifficulties: DifficultyLevel[] = ["beginner", "intermediate", "senior"];
  if (!validDifficulties.includes(difficulty as DifficultyLevel)) {
    notFound();
  }

  const difficultyLevel = difficulty as DifficultyLevel;

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/questions/${categoryId}`}
          className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors"
        >
          ← Back to {category.name}
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-white mt-4">
          {category.name} - {difficultyNames[difficultyLevel]}
        </h1>
        <p className="text-gray-400 mb-8">
          {difficultyDescriptions[difficultyLevel]}
        </p>

        <div className="text-center text-gray-500 py-12">
          <p className="text-lg mb-4">No questions yet for this difficulty level.</p>
          <p className="text-sm">Add your first question to get started!</p>
        </div>
      </div>
    </div>
  );
}
