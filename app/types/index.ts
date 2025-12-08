export interface Question {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  questionCount: number;
}
