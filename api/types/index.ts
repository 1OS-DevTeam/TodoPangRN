/**
 * API 응답 공통 타입
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  result: string;
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 사용자 인증 관련 타입
 */
export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: string;
}

/**
 * 투두 관련 타입
 */
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface PopularChallenge {
  title: string;
  category: number;
  diff: number;
  popularity: number;
}

export interface HomeData {
  userName: string;
  finishedProjects: number;
  registeredProjects: number;
  categories: {
    [key: string]: string;
  };
  popularChallenges: PopularChallenge[];
}

export interface HomeResponse {
  status: number;
  result: string;
  message: string;
  data: HomeData;
} 