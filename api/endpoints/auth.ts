/**
 * 인증 관련 API 엔드포인트
 */

// 로그인
export const LOGIN = '/auth/login';

// 회원가입
export const SIGNUP = '/auth/signup';

// 로그아웃
export const LOGOUT = '/auth/logout';

// 토큰 갱신
export const REFRESH_TOKEN = '/auth/refresh-token';

// 비밀번호 재설정 요청
export const FORGOT_PASSWORD = '/auth/forgot-password';

// 비밀번호 재설정
export const RESET_PASSWORD = '/auth/reset-password';

// 사용자 정보 조회
export const GET_USER_PROFILE = '/auth/profile';

// 사용자 정보 업데이트
export const UPDATE_USER_PROFILE = '/auth/profile';

// 이메일 변경
export const CHANGE_EMAIL = '/auth/change-email';

// 비밀번호 변경
export const CHANGE_PASSWORD = '/auth/change-password';

// 소셜 로그인 - 구글
export const GOOGLE_LOGIN = '/auth/google';

// 소셜 로그인 - 애플
export const APPLE_LOGIN = '/auth/apple'; 