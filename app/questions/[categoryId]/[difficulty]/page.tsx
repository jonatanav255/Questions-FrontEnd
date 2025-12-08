import { categories } from "@/app/data/categories";
import { DifficultyLevel } from "@/app/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DifficultyPageClient from "./DifficultyPageClient";

const difficultyNames: Record<DifficultyLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  senior: "Senior",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string; difficulty: string }>;
}): Promise<Metadata> {
  const { categoryId, difficulty } = await params;
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return {
      title: "Category Not Found | Questions App",
    };
  }

  const validDifficulties: DifficultyLevel[] = ["beginner", "intermediate", "senior"];
  if (!validDifficulties.includes(difficulty as DifficultyLevel)) {
    return {
      title: "Invalid Difficulty | Questions App",
    };
  }

  const difficultyLevel = difficulty as DifficultyLevel;

  return {
    title: `${category.name} ${difficultyNames[difficultyLevel]} Questions | Questions App`,
    description: `Practice ${difficultyLevel} level ${category.name} questions. Test your knowledge and improve your ${category.name} programming skills.`,
  };
}

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
        <nav aria-label="Breadcrumb">
          <Link
            href={`/questions/${categoryId}`}
            className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors"
          >
            ← Back to {category.name}
          </Link>
        </nav>

        <DifficultyPageClient
          categoryId={categoryId}
          categoryName={category.name}
          difficulty={difficultyLevel}
          difficultyName={difficultyNames[difficultyLevel]}
          difficultyDescription={difficultyDescriptions[difficultyLevel]}
        />
      </div>
    </div>
  );
}
