/**
 * Todo 관련 API 엔드포인트
 */

// 모든 투두 목록 가져오기
export const GET_TODOS = '/todos';

// 특정 ID의 투두 조회
export const GET_TODO_BY_ID = (todoId: string) => `/todos/${todoId}`;

// 새 투두 생성
export const CREATE_TODO = '/todos';

// 특정 투두 업데이트
export const UPDATE_TODO = (todoId: string) => `/todos/${todoId}`;

// 특정 투두 삭제
export const DELETE_TODO = (todoId: string) => `/todos/${todoId}`;

// 완료된 투두 조회
export const GET_COMPLETED_TODOS = '/todos/completed';

// 미완료된 투두 조회
export const GET_INCOMPLETE_TODOS = '/todos/incomplete';

// 우선순위별 투두 조회
export const GET_TODOS_BY_PRIORITY = (priority: 'low' | 'medium' | 'high') => 
  `/todos/priority/${priority}`; 