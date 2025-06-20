import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { AuthService } from '@/api/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../app/_layout';
import { BottomSheetState } from '@/api/types';

export const useChangeProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  }

  const handleNicknameChange = (text: string) => {
    setNickname(text);
  };

  const handleChangeName = async (name: string) => {
    try {
      setLoading(true);
      const response = await MypageService.changeName(name);
    } catch (error) {
      console.error('계정명 변경 중 오류가 발생했습니다:', error);
      // 에러 처리 로직 추가
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    isLoggingOut,
    nickname,
    bottomSheetRef,
    bottomSheetState,
    tapChangeButton,
    handleNicknameChange,
    handleChangeName,
  };
};