export type DifficultyLevel = "beginner" | "intermediate" | "senior";

export type TailwindBgColor =
  | "bg-orange-500"
  | "bg-green-500"
  | "bg-blue-500"
  | "bg-red-500"
  | "bg-purple-500"
  | "bg-yellow-500"
  | "bg-pink-500"
  | "bg-indigo-500";

export interface Question {
  id: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  tags?: string[];
  categoryId: string;
  difficulty: DifficultyLevel;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: TailwindBgColor;
  icon: string;
  questionCount: number;
}

export interface DifficultyCategory {
  id: DifficultyLevel;
  name: string;
  description: string;
  questionCount: number;
}
