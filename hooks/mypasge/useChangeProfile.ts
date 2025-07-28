import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetState } from '@/api/types';

export const useChangeProfile = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const resultBottomSheetRef = useRef<BottomSheet>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // 성공/실패 상태 관리

  const tapChangeButton = () => {
    console.log('계정명 변경');
    bottomSheetRef.current?.expand(); // 바텀시트 열기
  }

  const handleNicknameChange = (text: string) => {
    setNickname(text);
  };

  const handleChangeName = async (name: string) => {
    try {
      const response = await MypageService.changeName(name);
      // 성공 시 처리 로직
      console.log('계정명 변경 성공:', response);
      setIsSuccess(true);
      resultBottomSheetRef.current?.expand(); // 성공 바텀시트 열기
    } catch (error) {
      console.error('계정명 변경 중 오류가 발생했습니다:', error);
      // 에러 발생 시 실패 바텀시트 열기
      setIsSuccess(false);
      resultBottomSheetRef.current?.expand();
    }
    finally {
      bottomSheetRef.current?.close();
    }
  }

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  }

  const handleCloseResultBottomSheet = () => {
    resultBottomSheetRef.current?.close();
    setIsSuccess(null); // 상태 초기화
  }

  // 성공/실패에 따른 동적 props 계산
  const getResultBottomSheetProps = () => {
    if (isSuccess === true) {
      return {
        title: `"${nickname}"\n으로 변경되었습니다!`,
        message: '',
        imageSource: require('../../assets/images/mywish/mywish_complete_character.png'),
      };
    } else if (isSuccess === false) {
      return {
        title: `"${nickname}"\n으로 변경에 실패했습니다...`,
        message: '변경 후 10일간은 재변경이 불가능합니다',
        imageSource: require('../../assets/images/mywish/fail_character.png'),
      };
    }
    return {
      title: '',
      message: '',
      imageSource: require('../../assets/images/mywish/mywish_complete_character.png'),
    };
  };

  return {
    nickname,
    bottomSheetRef,
    resultBottomSheetRef,
    tapChangeButton,
    handleNicknameChange,
    handleChangeName,
    handleCloseBottomSheet,
    handleCloseResultBottomSheet,
    getResultBottomSheetProps,
  };
};