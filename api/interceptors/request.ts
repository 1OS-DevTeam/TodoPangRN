import { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadingManager } from '../utils/loadingManager';

// _isRetry 속성을 포함하는 사용자 정의 요청 설정 타입
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

/**
 * 요청 인터셉터
 * 모든 API 요청이 발생하기 전에 실행됩니다.
 */
export const requestInterceptor = async (config: CustomAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  // 재시도 요청이 아닌 경우에만 로딩 시작
  if (!config._isRetry) {
    loadingManager.incrementLoading();
  }
  
  // 로컬 스토리지에서 토큰 가져오기
  const token = await AsyncStorage.getItem('auth_token');
  
  // 헤더에 토큰 추가 (재시도 요청 시에는 이미 설정되어 있지만, 일관성을 위해 유지)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // 자세한 요청 로깅 (개발 환경에서만)
  if (__DEV__) {
    // 전체 URL 구성 (baseURL + path)
    const fullUrl = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
    
    console.log(`📤 API 요청 시작 ===================================`);
    console.log(`📤 메서드: ${config.method?.toUpperCase()}`);
    console.log(`📤 경로: ${config.url}`);
    console.log(`📤 전체 URL: ${fullUrl}`);
    console.log(`📤 베이스 URL: ${config.baseURL || '없음'}`);
    console.log(`📤 헤더:`, JSON.stringify(config.headers, null, 2));
    console.log(`📤 파라미터:`, config.params ? JSON.stringify(config.params, null, 2) : '없음');
    console.log(`📤 데이터:`, config.data ? JSON.stringify(config.data, null, 2) : '없음');
    console.log(`📤 토큰 존재 여부:`, token ? '있음' : '없음');
    console.log(`📤 재시도 요청 여부:`, config._isRetry ? '예' : '아니오');
    console.log(`📤 API 요청 끝 ===================================`);
  }
  
  return config;
};
