import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetState } from '@/api/types';

export enum FeedbackBottomSheetType {
  REGISTER = 'register',    // 의견등록 확인
  SUCCESS = 'success',      // 의견등록 성공
  FAILURE = 'failure'       // 의견등록 실패
}

export const useFeedback = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  
  // 각 바텀시트별로 별도의 ref 생성
  const registerBottomSheetRef = useRef<BottomSheet>(null);
  const successBottomSheetRef = useRef<BottomSheet>(null);
  const failureBottomSheetRef = useRef<BottomSheet>(null);
  
  const [bottomSheetType, setBottomSheetType] = useState<FeedbackBottomSheetType>(FeedbackBottomSheetType.REGISTER);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    visible: false,
    title: '',
    message: '',
    firstButtonLabel: '',
    secondButtonLabel: '',
  });

  // 유효성 검사: 별점이 선택되고 의견이 입력되었는지 확인
  useEffect(() => {
    const isValid = rating > 0 && feedback.trim().length > 0;
    setIsNextButtonEnabled(isValid);
  }, [rating, feedback]);

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    setHasRated(true);
  };

  const tapRegisterButton = () => {
    console.log('의견 등록');
    setBottomSheetType(FeedbackBottomSheetType.REGISTER);
    registerBottomSheetRef.current?.expand();
  }

  const handleFeedbackRegister = async () => {
    console.log('의견 등록 클릭');
    
    // 등록 바텀시트 닫기
    registerBottomSheetRef.current?.close();
    
    // ===== 테스트용 코드 (API 개발 전까지 사용) =====
    // 성공 테스트
    setTimeout(() => {
      setBottomSheetType(FeedbackBottomSheetType.SUCCESS);
      successBottomSheetRef.current?.expand();
    }, 300);
    
    // 실패 테스트 (성공 테스트와 교체해서 사용)
    // setTimeout(() => {
    //   setBottomSheetType(FeedbackBottomSheetType.FAILURE);
    //   failureBottomSheetRef.current?.expand();
    // }, 300);
    
    // ===== 실제 API 호출 코드 (API 개발 완료 후 주석 해제) =====
    // try {
    //   setIsProcessing(true);
    //   const response = await MypageService.feedback(rating, feedback);
    
    //   if (response.data) {
    //     // API 성공 시
    //     setTimeout(() => {
    //       setBottomSheetType(FeedbackBottomSheetType.SUCCESS);
    //       successBottomSheetRef.current?.expand();
    //     }, 300);
    //   }
    // } catch (error) {
    //   console.error('의견 등록 중 오류가 발생했습니다:', error);
    //   // API 실패 시
    //   setTimeout(() => {
    //     setBottomSheetType(FeedbackBottomSheetType.FAILURE);
    //     failureBottomSheetRef.current?.expand();
    //   }, 300);
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  const handleCloseBottomSheet = () => {
    registerBottomSheetRef.current?.close();
    successBottomSheetRef.current?.close();
    failureBottomSheetRef.current?.close();
  }

  const handleFeedbackTextChange = (text: string) => {
    if (text.length <= 200) {
      setFeedback(text);
    }
  };

  const naviBack = () => {
    router.back();
  }

  return {
    isProcessing,
    rating,
    hasRated,
    isNextButtonEnabled,
    feedback,
    registerBottomSheetRef,
    successBottomSheetRef,
    failureBottomSheetRef,
    bottomSheetType,
    bottomSheetState,
    tapRegisterButton,
    handleFeedbackRegister,
    handleCloseBottomSheet,
    handleRating,
    handleFeedbackTextChange,
    naviBack,
  };
};