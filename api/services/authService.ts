import apiClient from '../client';
import * as AuthEndpoints from '../endpoints/auth';
import { ApiResponse, AuthResponse, UserInfo } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 인증 관련 API 서비스
 */
export const AuthService = {
  /**
   * 로그인
   */
  login: async (userId: string, idToken: string) => {
    try {
      const response = await apiClient.post<ApiResponse<Boolean>>(
        AuthEndpoints.LOGIN,
        { userId, idToken },
        {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        }
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
  },

  /**
   * 회원가입
   */
  signup: async (name: string, email: string, userId: string, socialType: number) => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        AuthEndpoints.SIGNUP,
        { name, email, userId, socialType }
      );
      
      // 회원가입 성공 시 토큰 저장
      if (response.data.result === 'success') {
        const { token, refreshToken } = response.data.data;
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      throw error;
    }
  },
}; 