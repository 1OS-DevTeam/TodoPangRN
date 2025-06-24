import React, { useEffect, useRef, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetState } from '@/api/types';

export const useFeedback = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    visible: false,
    title: '',
    message: '',
    firstButtonLabel: '',
    secondButtonLabel: '',
  });

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    setHasRated(true);
  };

  const tapRegisterButton = () => {
    console.log('의견 등록');
    bottomSheetRef.current?.snapToIndex(0); // 바텀시트 열기
  }

  const handleFeedbackRegister = (text: string) => {
    console.log('feedback: ', text);
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  }

  const handleFeedbackTextChange = (text: string) => {
    if (text.length <= 200) {
      setFeedback(text);
    }
  };

  return {
    loading,
    isProcessing,
    rating,
    hasRated,
    isNextButtonEnabled,
    feedback,
    bottomSheetRef,
    bottomSheetState,
    tapRegisterButton,
    handleFeedbackRegister,
    handleCloseBottomSheet,
    handleRating,
    handleFeedbackTextChange,
  };
};