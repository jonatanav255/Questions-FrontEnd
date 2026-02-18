export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "SENIOR";

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  questionCount: number;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
}

export interface QuestionResponse {
  id: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty: DifficultyLevel;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  tags: string[];
  createdAt: string;
}

export interface QuestionRequest {
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty: DifficultyLevel;
  categoryId: string;
  tags?: string[];
}

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
