import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetState } from '@/api/types';

export const useChangeProfile = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [nickname, setNickname] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    visible: false,
    title: '',
    message: '',
    firstButtonLabel: '',
    secondButtonLabel: '',
  });

  const tapChangeButton = () => {
    console.log('계정명 변경');
    bottomSheetRef.current?.snapToIndex(0); // 바텀시트 열기
  }

  const handleNicknameChange = (text: string) => {
    setNickname(text);
  };

  const handleChangeName = async (name: string) => {
    try {
      const response = await MypageService.changeName(name);
    } catch (error) {
      console.error('계정명 변경 중 오류가 발생했습니다:', error);
      // 에러 처리 로직 추가
    }
  }

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  }

  return {
    isLoggingOut,
    nickname,
    bottomSheetRef,
    bottomSheetState,
    tapChangeButton,
    handleNicknameChange,
    handleChangeName,
    handleCloseBottomSheet,
  };
};