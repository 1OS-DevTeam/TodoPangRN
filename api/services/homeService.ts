import apiClient from '../client';
import * as HomeEndpoints from '../endpoints/home';
import { ApiResponse } from '../types';

/**
 * 인증 관련 API 서비스
 */
export const HomeService = {
  /**
   * 홈화면 조회
   */
  getHome: async (userId: string) => {
    try {
      const response = await apiClient.post<ApiResponse<Boolean>>(
        HomeEndpoints.HOME,
        { userId }
      );
      
      // 로그인 성공 시 토큰 저장
      if (response.data.result === 'success') {
        // const { token, refreshToken } = response.data.data;
        // await AsyncStorage.setItem('auth_token', token);
        // await AsyncStorage.setItem('refresh_token', refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      throw error;
    }
  }
}; 