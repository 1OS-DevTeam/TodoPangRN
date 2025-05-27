import apiClient from '../client';
import * as ReviewEndpoints from '../endpoints/review';
import { ApiResponse, ReviewResponse, ReviewUpdateRequest } from '../types';

/**
 * 리뷰 관련 API 서비스
 */
export const ReviewService = {
    /**
     * 리뷰 목록 조회
     */
    getReviewList: async () => {
      try {
        const response = await apiClient.post<ApiResponse<ReviewResponse[]>>(
          ReviewEndpoints.REVIEW_LIST
        );
        
        if (response.data.status === 200) {
          console.log('리뷰 목록 요청 성공:', response.data.data);
        }
        
        return response.data;
      } catch (error) {
        console.error('리뷰 목록 조회 중 오류 발생:', error);
        throw error;
      }
    },

    /**
     * 리뷰 업데이트
     */
    updateReview: async (review: ReviewUpdateRequest) => {
      try {
        const response = await apiClient.post<ApiResponse<Boolean>>(
          ReviewEndpoints.REVIEW_UPDATE,
          review
        );

        return response.data;
      } catch (error) {
        console.error('리뷰 업데이트 중 오류 발생:', error);
        throw error;
      }
    }
}; 