import { AxiosResponse, AxiosError } from 'axios';
import { retryRequestWithNewToken } from '../utils/tokenRefresher';

/**
 * 성공 응답 인터셉터
 * 모든 API 응답이 성공적으로 받아졌을 때 실행됩니다.
 */
export const responseSuccessInterceptor = (response: AxiosResponse): AxiosResponse => {
  // 자세한 응답 로깅 (개발 환경에서만)
  if (__DEV__) {
    // 전체 URL 구성 (baseURL + path)
    const fullUrl = response.config.baseURL 
      ? `${response.config.baseURL}${response.config.url}` 
      : response.config.url;
      
    console.log(`📥 API 응답 성공 ===================================`);
    console.log(`📥 메서드: ${response.config.method?.toUpperCase()}`);
    console.log(`📥 경로: ${response.config.url}`);
    console.log(`📥 전체 URL: ${fullUrl}`);
    console.log(`📥 베이스 URL: ${response.config.baseURL || '없음'}`);
    console.log(`📥 상태 코드: ${response.status}`);
    console.log(`📥 응답 헤더:`, JSON.stringify(response.headers, null, 2));
    console.log(`📥 응답 데이터:`, JSON.stringify(response.data, null, 2));
    console.log(`📥 API 응답 끝 ===================================`);
  }
  
  return response;
};

/**
 * 오류 응답 인터셉터
 * API 요청 중 오류가 발생했을 때 실행됩니다.
 */
export const responseErrorInterceptor = (error: AxiosError): Promise<any> => {
  const { response, request, message, config } = error;
  
  if (__DEV__) {
    console.log(`🚫 API 오류 시작 ===================================`);
    
    // 요청 정보 출력
    if (config) {
      // 전체 URL 구성 (baseURL + path)
      const fullUrl = config.baseURL 
        ? `${config.baseURL}${config.url}` 
        : config.url;
        
      console.log(`🚫 메서드: ${config.method?.toUpperCase()}`);
      console.log(`🚫 경로: ${config.url}`);
      console.log(`🚫 전체 URL: ${fullUrl}`);
      console.log(`🚫 베이스 URL: ${config.baseURL || '없음'}`);
      console.log(`🚫 요청 헤더:`, JSON.stringify(config.headers, null, 2));
      console.log(`🚫 요청 데이터:`, config.data ? JSON.stringify(config.data, null, 2) : '없음');
    }
  }
  
  // 서버 응답이 있는 경우 (4xx, 5xx 응답)
  if (response) {
    if (__DEV__) {
      // 전체 URL 구성 (baseURL + path)
      const fullUrl = config?.baseURL 
        ? `${config.baseURL}${config.url}` 
        : config?.url;
        
      console.error(`🚫 서버 오류 (${response.status})`);
      console.error(`🚫 경로: ${config?.url}`);
      console.error(`🚫 전체 URL: ${fullUrl || '알 수 없음'}`);
      console.error(`🚫 응답 헤더:`, JSON.stringify(response.headers, null, 2));
      console.error(`🚫 응답 데이터:`, JSON.stringify(response.data, null, 2));
      
      // 401 오류일 경우 인증 관련 상세 정보 출력
      if (response.status === 401) {
        console.error(`🚫 인증 오류 (401): 인증 토큰이 유효하지 않거나 만료되었습니다.`);
        console.error(`🚫 Authorization 헤더:`, config?.headers?.Authorization || '없음');
      }
    }
    
    // 401 Unauthorized 오류 처리
    if (response.status === 401 && config) {
      console.log('토큰이 만료되었습니다. 토큰 갱신 후 요청을 재시도합니다.');
      
      // 토큰 갱신 및 요청 재시도 로직
      return retryRequestWithNewToken(config);
    }
  } 
  // 요청은 만들어졌지만 응답이 없는 경우 (네트워크 오류)
  else if (request) {
    if (__DEV__) {
      // 네트워크 오류 시에도 전체 URL 표시
      const fullUrl = config?.baseURL 
        ? `${config.baseURL}${config.url}` 
        : config?.url;
        
      console.error('🌐 네트워크 오류: 서버에 연결할 수 없습니다');
      console.error(`🌐 경로: ${config?.url || '알 수 없음'}`);
      console.error(`🌐 전체 URL: ${fullUrl || '알 수 없음'}`);
      console.error('🌐 요청 객체:', request);
      if (message) {
        console.error('🌐 오류 메시지:', message);
      }
      if (error.code) {
        console.error('🌐 오류 코드:', error.code);
      }
      if (error.cause) {
        console.error('🌐 오류 원인:', error.cause);
      }
    }
  } 
  // 요청 자체를 만들지 못한 경우
  else {
    if (__DEV__) {
      console.error('⚠️ 요청 설정 오류:', message);
      console.error('⚠️ 오류 상세:', error);
    }
  }
  
  if (__DEV__) {
    console.log(`🚫 API 오류 끝 ===================================`);
  }
  
  // 오류를 다시 던져서 컴포넌트에서 처리할 수 있게 함
  return Promise.reject(error);
};
