import apiClient from '../client';
import * as TodoEndpoints from '../endpoints/todos';
import { ApiResponse, PaginatedResponse, Todo, CreateTodoRequest, UpdateTodoRequest } from '../types';

/**
 * 투두 관련 API 서비스
 */
export const TodoService = {
  /**
   * 모든 투두 목록 가져오기
   */
  getAllTodos: async (page: number = 1, limit: number = 10) => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Todo>>>(
        `${TodoEndpoints.GET_TODOS}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('투두 목록 조회 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 특정 ID의 투두 조회
   */
  getTodoById: async (todoId: string) => {
    try {
      const response = await apiClient.get<ApiResponse<Todo>>(
        TodoEndpoints.GET_TODO_BY_ID(todoId)
      );
      return response.data;
    } catch (error) {
      console.error(`투두 ID(${todoId}) 조회 중 오류 발생:`, error);
      throw error;
    }
  },

  /**
   * 새 투두 생성
   */
  createTodo: async (todoData: CreateTodoRequest) => {
    try {
      const response = await apiClient.post<ApiResponse<Todo>>(
        TodoEndpoints.CREATE_TODO,
        todoData
      );
      return response.data;
    } catch (error) {
      console.error('투두 생성 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 특정 투두 업데이트
   */
  updateTodo: async (todoId: string, todoData: UpdateTodoRequest) => {
    try {
      const response = await apiClient.put<ApiResponse<Todo>>(
        TodoEndpoints.UPDATE_TODO(todoId),
        todoData
      );
      return response.data;
    } catch (error) {
      console.error(`투두 ID(${todoId}) 업데이트 중 오류 발생:`, error);
      throw error;
    }
  },

  /**
   * 투두 완료 상태 토글
   */
  toggleTodoComplete: async (todoId: string, completed: boolean) => {
    try {
      const response = await apiClient.patch<ApiResponse<Todo>>(
        TodoEndpoints.UPDATE_TODO(todoId),
        { completed }
      );
      return response.data;
    } catch (error) {
      console.error(`투두 ID(${todoId}) 완료 상태 변경 중 오류 발생:`, error);
      throw error;
    }
  },

  /**
   * 특정 투두 삭제
   */
  deleteTodo: async (todoId: string) => {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        TodoEndpoints.DELETE_TODO(todoId)
      );
      return response.data;
    } catch (error) {
      console.error(`투두 ID(${todoId}) 삭제 중 오류 발생:`, error);
      throw error;
    }
  },

  /**
   * 완료된 투두 조회
   */
  getCompletedTodos: async (page: number = 1, limit: number = 10) => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Todo>>>(
        `${TodoEndpoints.GET_COMPLETED_TODOS}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('완료된 투두 목록 조회 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 미완료된 투두 조회
   */
  getIncompleteTodos: async (page: number = 1, limit: number = 10) => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Todo>>>(
        `${TodoEndpoints.GET_INCOMPLETE_TODOS}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('미완료된 투두 목록 조회 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 우선순위별 투두 조회
   */
  getTodosByPriority: async (priority: 'low' | 'medium' | 'high', page: number = 1, limit: number = 10) => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Todo>>>(
        `${TodoEndpoints.GET_TODOS_BY_PRIORITY(priority)}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(`우선순위(${priority}) 투두 목록 조회 중 오류 발생:`, error);
      throw error;
    }
  },
}; 