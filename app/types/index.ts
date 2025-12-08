export type DifficultyLevel = "beginner" | "intermediate" | "senior";

export interface Question {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  difficulty: DifficultyLevel;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  questionCount: number;
}

export interface DifficultyCategory {
  id: DifficultyLevel;
  name: string;
  description: string;
  questionCount: number;
}
