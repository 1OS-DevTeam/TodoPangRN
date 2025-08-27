import { auth } from '../../app/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadingManager } from './loadingManager';
import apiClient from '../client';
import { AxiosRequestConfig } from 'axios';

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

/**
 * Firebase 토큰을 갱신합니다.
 * 토큰이 만료되었거나 유효하지 않을 때 사용합니다.
 * @returns {Promise<string|null>} 새로 갱신된 토큰 또는 실패 시 null
 */
export const refreshFirebaseToken = async (): Promise<string | null> => {
  try {
    // 현재 로그인된 사용자 확인
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error('토큰 갱신 실패: 로그인된 사용자가 없습니다.');
      return null;
    }
    
    // forceRefresh=true 옵션으로 새 토큰 강제 발급
    const newToken = await currentUser.getIdToken(true);
    
    if (!newToken) {
      console.error('토큰 갱신 실패: 새 토큰을 발급받지 못했습니다.');
      return null;
    }
    
    // 새 토큰 저장
    await AsyncStorage.setItem('auth_token', newToken);
    await AsyncStorage.setItem('id_token', newToken);
    
    console.log('Firebase 토큰 갱신 성공');
    return newToken;
  } catch (error) {
    console.error('Firebase 토큰 갱신 중 오류 발생:', error);
    return null;
  }
};

/**
 * 토큰 갱신 후 원래 요청을 재시도합니다.
 * @param {object} config API 요청 설정
 * @returns {Promise} 재시도된 요청의 결과
 */
export const retryRequestWithNewToken = async (config: RetryAxiosRequestConfig): Promise<any> => {
  try {
    // 새 토큰 발급
    const newToken = await refreshFirebaseToken();
    
    if (!newToken) {
      // 토큰 갱신 실패 시 로딩 종료
      loadingManager.decrementLoading();
      throw new Error('토큰 갱신에 실패했습니다.');
    }
    
    // 원래 요청의 설정을 복제해서 새 토큰으로 헤더 업데이트
    const newConfig: RetryAxiosRequestConfig = { ...config };
    newConfig.headers = { ...newConfig.headers, Authorization: `Bearer ${newToken}` };
    
    // 재시도 요청임을 표시
    newConfig._isRetry = true;
    
    // 요청 재시도 (apiClient 사용)
    console.log('새 토큰으로 요청 재시도:', newConfig.url);
    return await apiClient(newConfig);
  } catch (error) {
    console.error('요청 재시도 중 오류 발생:', error);
    // 재시도 실패 시 로딩 종료
    loadingManager.decrementLoading();
    throw error;
  }
}; 