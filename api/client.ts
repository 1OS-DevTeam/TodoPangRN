import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { requestInterceptor } from './interceptors/request';
import { responseSuccessInterceptor, responseErrorInterceptor } from './interceptors/response';

// 기본 설정
const baseConfig: AxiosRequestConfig = {
  baseURL: 'https://todopang.uk',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer `,
  },
};

// API 클라이언트 인스턴스 생성
const apiClient: AxiosInstance = axios.create(baseConfig);

// 인터셉터 설정
apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export default apiClient;
