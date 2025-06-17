import { ImageSourcePropType } from 'react-native';

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
  challengeId: number;
  title: string;
  category: number;
  diff: number;
  popularity: number;
}

export interface HomeData {
  userData: {
    userName: string;
    serviceUsedDays: number;
    completeProjects: number;
  },
  popularChallenges: PopularChallenge[];
}

export interface HomeResponse {
  status: number;
  result: string;
  message: string;
  data: HomeData;
}

export interface Challenge {
  id: number;
  category: number;
  title: string;
  diff: number;
  popularity: number;
}

export interface ChallengeInfoList {
  categories: {
    [key: string]: string;
  };
  infoData: Challenge[];
} 

export interface ChallengeDetail {
  title: string;
  popularity: number;
  challengeId: number;
  category: number;
  term: number;
  diff: number;
  todoList: Todo[];
  reviewList: Review[];
}

export interface Todo {
  todoId: number;
  desc: string;
}

export interface Review {
  reviewId: number;
  desc: string;
  count: number;
}

export interface WishInfoList {
  userName: string;
  registeredChallenges: number;
  challenges: WishInfoChallenge[];
}

export interface WishInfoChallenge {
  challengeId: number;
  originChallengeId: number;
  challengeStatus: number;
  challengeName: string;
  todoList: WishInfoTodo[];
}

export interface WishInfoTodo {
  title: string;
  challengeId: number;
  todoId: number;
  status: number;
}

export interface WishUpdateRequest {
  challengeList: WishUpdateChallenge[];
}

export interface WishUpdateChallenge {
  challengeId: number;
  todoList: WishUpdateTodo[];
}

export interface WishUpdateTodo {
  todoId: number;
  updatedStatus: number;
}

export interface WishCompleteRequest {
  challengeList: WishCompleteChallenge[];
}

export interface WishCompleteChallenge {
  challengeId: number;
  updatedStatus: number;
}

export interface ReviewList {
  reviewList: ReviewResponse[];
}

export interface ReviewResponse {
  reviewId: number;
  emoji: number;
  title: string;
}

export interface ReviewUpdateRequest {
  originChallengeId: number;
  selectedReviewId: number;
  satisfiedRating: number;
}

export interface MyPageMenu {
  title: string;
  image?: ImageSourcePropType;
  appVersion?: string;
}

export interface WithdrawReasonList {
  reasonList: WithdrawReason[];
}

export interface WithdrawReason {
  reasonId: number;
  reasonDesc: string;
}

export interface BottomSheetState {
  visible: boolean;
  title: string;
  message: string;
  firstButtonLabel: string;
  secondButtonLabel: string;
  onFirstButtonPress?: () => void;
  onSecondButtonPress?: () => void;
}