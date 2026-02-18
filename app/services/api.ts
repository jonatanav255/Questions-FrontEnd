import { QuestionRequest, QuestionResponse, Page, Category, Tag } from '@/app/types/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Categories
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`${API_BASE}/categories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
}

export async function createCategory(data: Omit<Category, 'id' | 'questionCount' | 'createdAt'>): Promise<Category> {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create category');
  }
  return res.json();
}

export async function updateCategory(id: string, data: Omit<Category, 'id' | 'questionCount' | 'createdAt'>): Promise<Category> {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
}

// Tags
export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${API_BASE}/tags`);
  if (!res.ok) throw new Error('Failed to fetch tags');
  return res.json();
}

export async function getTag(id: string): Promise<Tag> {
  const res = await fetch(`${API_BASE}/tags/${id}`);
  if (!res.ok) throw new Error('Failed to fetch tag');
  return res.json();
}

export async function createTag(name: string): Promise<Tag> {
  const res = await fetch(`${API_BASE}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create tag');
  }
  return res.json();
}

// Questions
export async function getQuestions(
  categoryId: string,
  difficulty: string,
  page = 0,
  size = 20
): Promise<Page<QuestionResponse>> {
  const url = `${API_BASE}/questions/category/${categoryId}/difficulty/${difficulty}?page=${page}&size=${size}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function getAllQuestions(
  page = 0,
  size = 20,
  categoryId?: string,
  difficulty?: string,
  tagId?: string
): Promise<Page<QuestionResponse>> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  if (categoryId) params.append('categoryId', categoryId);
  if (difficulty) params.append('difficulty', difficulty);
  if (tagId) params.append('tagId', tagId);

  const url = `${API_BASE}/questions?${params.toString()}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function getQuestion(id: string): Promise<QuestionResponse> {
  const res = await fetch(`${API_BASE}/questions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch question');
  return res.json();
}

export async function getRandomQuestions(
  categoryId: string,
  difficulty: string,
  limit = 20
): Promise<QuestionResponse[]> {
  const url = `${API_BASE}/questions/random?categoryId=${categoryId}&difficulty=${difficulty}&limit=${limit}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch random questions');
  return res.json();
}

export async function createQuestion(data: QuestionRequest): Promise<QuestionResponse> {
  const res = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create question');
  }
  return res.json();
}

export async function updateQuestion(
  id: string,
  data: QuestionRequest
): Promise<QuestionResponse> {
  const res = await fetch(`${API_BASE}/questions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update question');
  }
  return res.json();
}

export async function deleteQuestion(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/questions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete question');
}

export async function getQuestionCount(
  categoryId?: string,
  difficulty?: string
): Promise<number> {
  let url = `${API_BASE}/questions/count`;
  const params = new URLSearchParams();
  if (categoryId) params.append('categoryId', categoryId);
  if (difficulty) params.append('difficulty', difficulty);
  if (params.toString()) url += `?${params.toString()}`;

  const res = await fetch(url, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch count');
  return res.json();
}
