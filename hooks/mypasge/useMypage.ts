import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetState {
  visible: boolean;
  title: string;
  message: string;
  firstButtonLabel: string;
  secondButtonLabel: string;
  onFirstButtonPress?: () => void;
  onSecondButtonPress?: () => void;
}

export const useMypage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
  };

  const tapLogout = () => {
    console.log('로그아웃');
  };

  const tapSetting = () => {
    console.log('환경설정');
  };

  const tapGuide = () => {
    console.log('가이드북');
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

  return {
    loading,
    tapWithdraw,
    tapLogout,
    tapSetting,
    tapGuide,
    showWithdrawBottomSheet,
    showLogoutBottomSheet,
    bottomSheetRef,
    bottomSheetState,
  };
};