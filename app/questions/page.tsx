import { getCategories } from "@/app/services/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question Categories | Questions App",
  description: "Browse programming questions by category: Java, Spring, and more. Practice and improve your coding skills.",
};

export default async function QuestionsPage() {
  let categories;
  let error = null;

  try {
    categories = await getCategories();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load categories";
    categories = [];
  }

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-white">List of Questions</h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">Make sure the backend server is running at http://localhost:8080</p>
          </div>
        )}

        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="text-xl font-semibold text-white mb-4">Categories</h2>
          {categories.length === 0 && !error ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg mb-4">No categories available.</p>
              <p className="text-sm">Create categories using the backend API.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
              {categories.map((category) => (
              <Link
                key={category.id}
                href={`/questions/${category.id}`}
                className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all cursor-pointer border-2 hover:border-opacity-100 ${category.color.replace('bg-', 'border-')} border-opacity-50 block`}
                role="listitem"
                aria-label={`${category.name} category - ${category.questionCount} ${category.questionCount === 1 ? 'question' : 'questions'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {category.name}
                  </h3>
                  {category.icon.startsWith('/') ? (
                    <div suppressHydrationWarning>
                      <Image
                        src={category.icon}
                        alt={`${category.name} icon`}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                  ) : (
                    <div className="text-2xl" aria-hidden="true">{category.icon}</div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  {category.questionCount} {category.questionCount === 1 ? 'question' : 'questions'}
                </p>
              </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
