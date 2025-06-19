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
  },

  /**
   * 닉네임 변경
   */
  changeName: async (newUserName: string) => {
    try {
      const response = await apiClient.post<ApiResponse<Boolean>>(
        MypageEndpoints.CHANGE_NAME,
        { newUserName }
      );
      return response.data;
    } catch (error) {
      console.error('닉네임 변경 중 오류가 발생했습니다:', error);
      throw error;
    }
  },
};