import apiClient from '../client';
import * as WishEndpoints from '../endpoints/wish';
import { ApiResponse, WishInfoList } from '../types';


/**
 * 위시 관련 API 서비스
 */
export const WishService = {
    /**
     * 위시 홈화면 정보 조회
     */
    getWishInfoList: async () => {
      try {
        const response = await apiClient.post<ApiResponse<WishInfoList>>(
          WishEndpoints.WISH_INFO_LIST
        );
        
        if (response.data.status === 200) {
          console.log('위시 데이터 요청 성공:', response.data.data);
        }
        
        return response.data;
      } catch (error) {
        console.error('도전과제 목록 조회 중 오류 발생:', error);
        throw error;
      }
    },
  
  }; 