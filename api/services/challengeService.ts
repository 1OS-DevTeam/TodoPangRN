import apiClient from '../client';
import * as ChallengeEndpoints from '../endpoints/challenge';
import { ApiResponse } from '../types';
import { ChallengeInfoList } from '../types';


/**
 * 도전가제 관련 API 서비스
 */
export const ChallengeService = {
  /**
   * 도전과제 목록 조회
   */
  getChallengeInfoList: async (userId: string) => {
    try {
      const response = await apiClient.post<ApiResponse<ChallengeInfoList>>(
        ChallengeEndpoints.CHALLENGE_INFO_LIST,
        { userId }
      );
      
      if (response.data.result === 'success') {

      }
      
      return response.data;
    } catch (error) {
      console.error('도전과제 목록 조회 중 오류 발생:', error);
      throw error;
    }
  }
}; 