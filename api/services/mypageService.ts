import apiClient from '../client';
import * as MypageEndpoints from '../endpoints/mypage';
import { ApiResponse, WithdrawReasonList } from '../types';

export const MypageService = {

  /**
   * 탈퇴 이유 목록 조회
   */
  getWithdrawReasonList: async () => {
    try {
      const response = await apiClient.get<ApiResponse<WithdrawReasonList>>(
        MypageEndpoints.WITHDRAW_REASON_LIST
      );

      return response.data;
    } catch (error) {
      console.error('탈퇴 이유 목록 조회 중 오류 발생:', error);
      throw error;
    }
  },

  /**
   * 탈퇴 제출
   */
  withdraw: async (reasonId: number) => {
    try {
      const response = await apiClient.post<ApiResponse<Boolean>>(
        MypageEndpoints.WITHDRAW,
        { reasonId }
      );

      return response.data;
    } catch (error) {
      console.error('탈퇴 제출 중 오류 발생:', error);
      throw error;
    }
  }
};