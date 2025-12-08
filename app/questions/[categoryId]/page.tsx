import { categories } from "@/app/data/categories";
import { DifficultyCategory } from "@/app/types";
import Link from "next/link";
import { notFound } from "next/navigation";

const difficultyLevels: DifficultyCategory[] = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Basic concepts and fundamentals",
    questionCount: 0,
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Intermediate level questions",
    questionCount: 0,
  },
  {
    id: "senior",
    name: "Senior",
    description: "Advanced concepts and expert level",
    questionCount: 0,
  },
];

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/questions"
          className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors"
        >
          ← Back to Categories
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-white mt-4">
          {category.name}
        </h1>
        <p className="text-gray-400 mb-8">
          Select a difficulty level to add questions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {difficultyLevels.map((level) => (
            <Link
              key={level.id}
              href={`/questions/${categoryId}/${level.id}`}
              className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all cursor-pointer border-2 hover:border-opacity-100 ${category.color.replace('bg-', 'border-')} border-opacity-50 block`}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {level.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{level.description}</p>
              <p className="text-gray-500 text-xs">
                {level.questionCount}{" "}
                {level.questionCount === 1 ? "question" : "questions"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
