import apiClient from '../client';
import * as ChallengeEndpoints from '../endpoints/challenge';
import { ApiResponse } from '../types';
import { ChallengeInfoList, ChallengeDetail } from '../types';


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
      
      if (response.data.status === 200) {

      }
      
      return response.data;
    } catch (error) {
      console.error('도전과제 목록 조회 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 도전과제 상세 조회
   */
  getChallengeDetail: async (challengeId: number) => {
    try {
      const response = await apiClient.post<ApiResponse<ChallengeDetail>>(
        ChallengeEndpoints.CHALLENGE_DETAIL,
        { challengeId }
      );

      if (response.data.status === 200) {

      }
      
      return response.data;
    } catch (error) {
      console.error('도전과제 상세 조회 중 오류 발생:', error);
      throw error;
    }
  }
}; 