import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { AuthService } from '@/api/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../app/_layout';
import { BottomSheetState } from '@/api/types';


export const useMypage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    visible: false,
    title: '',
    message: '',
    firstButtonLabel: '',
    secondButtonLabel: '',
  });

  const tapWithdraw = () => {
    console.log('탈퇴하기');
    router.push('/withdraw/withdraw');
  }

  const tapLogout = async () => {
    try {
      setIsLoggingOut(true);
      setLoading(true);
      const response = await AuthService.logout();
      if (response.data === true) {
        await auth.signOut();
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('auth_token');
        router.replace('/screens/login/login_screen');
      }
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoggingOut(false);
      setLoading(false);
    }
  };

  const tapSuggestion = () => {
    router.push('/feedback/feedback');
  };

  const tapGuide = () => {
    router.push('/onboarding/onboarding');
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const showWithdrawBottomSheet = () => {
    setBottomSheetState({
      visible: true,
      title: '탈퇴하기',
      message: '탈퇴하기 전에 확인해주세요!',
      firstButtonLabel: '닫기',
      secondButtonLabel: '탈퇴하기',
      onFirstButtonPress: () => {
        bottomSheetRef.current?.close();
      },
      onSecondButtonPress: () => {
        tapWithdraw();
        bottomSheetRef.current?.close();
      },
    });
    bottomSheetRef.current?.expand();
  };

  const showLogoutBottomSheet = () => {
    setBottomSheetState({
      visible: true,
      title: '로그아웃',
      message: '정말 로그아웃 하시겠습니까?',
      firstButtonLabel: '취소',
      secondButtonLabel: '로그아웃',
      onFirstButtonPress: () => {
        bottomSheetRef.current?.close();
      },
      onSecondButtonPress: () => {
        tapLogout();
        bottomSheetRef.current?.close();
      },
    });
    bottomSheetRef.current?.expand();
  };

  const tapChangeName = () => {
    router.push('/changeProfile/changeProfile');
  };

  return {
    loading,
    isLoggingOut,
    tapWithdraw,
    tapChangeName,
    tapLogout,
    tapSuggestion,
    tapGuide,
    showWithdrawBottomSheet,
    showLogoutBottomSheet,
    bottomSheetRef,
    bottomSheetState,
  };
};