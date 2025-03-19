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

  /**
   * 로그아웃
   */
  logout: async () => {
    try {
      // 서버에 로그아웃 요청
      const response = await apiClient.post<ApiResponse<null>>(AuthEndpoints.LOGOUT);
      
      // 로컬 스토리지에서 토큰 제거
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('refresh_token');
      
      return response.data;
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      
      // 서버 오류가 발생해도 로컬 토큰은 삭제
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('refresh_token');
      
      throw error;
    }
  },

  /**
   * 토큰 갱신
   */
  refreshToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('리프레시 토큰이 없습니다');
      }
      
      const response = await apiClient.post<ApiResponse<{ token: string; refreshToken: string }>>(
        AuthEndpoints.REFRESH_TOKEN,
        { refreshToken }
      );
      
      // 새 토큰 저장
      await AsyncStorage.setItem('auth_token', response.data.data.token);
      await AsyncStorage.setItem('refresh_token', response.data.data.refreshToken);
      
      return response.data;
    } catch (error) {
      console.error('토큰 갱신 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 비밀번호 재설정 요청 (이메일 전송)
   */
  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        AuthEndpoints.FORGOT_PASSWORD,
        { email }
      );
      return response.data;
    } catch (error) {
      console.error('비밀번호 재설정 요청 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 비밀번호 재설정
   */
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        AuthEndpoints.RESET_PASSWORD,
        { token, newPassword }
      );
      return response.data;
    } catch (error) {
      console.error('비밀번호 재설정 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 사용자 프로필 정보 조회
   */
  getUserProfile: async () => {
    try {
      const response = await apiClient.get<ApiResponse<UserInfo>>(
        AuthEndpoints.GET_USER_PROFILE
      );
      return response.data;
    } catch (error) {
      console.error('사용자 프로필 조회 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 사용자 프로필 정보 업데이트
   */
  updateUserProfile: async (userData: Partial<UserInfo>) => {
    try {
      const response = await apiClient.put<ApiResponse<UserInfo>>(
        AuthEndpoints.UPDATE_USER_PROFILE,
        userData
      );
      return response.data;
    } catch (error) {
      console.error('사용자 프로필 업데이트 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 구글 로그인
   */
  googleLogin: async (idToken: string) => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        AuthEndpoints.GOOGLE_LOGIN,
        { idToken }
      );
      
      // 로그인 성공 시 토큰 저장
      if (response.data.result === 'success') {
        const { token, refreshToken } = response.data.data;
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error('구글 로그인 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 애플 로그인
   */
  appleLogin: async (identityToken: string) => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        AuthEndpoints.APPLE_LOGIN,
        { identityToken }
      );
      
      // 로그인 성공 시 토큰 저장
      if (response.data.result === 'success') {
        const { token, refreshToken } = response.data.data;
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error('애플 로그인 중 오류 발생:', error);
      throw error;
    }
  },
}; 