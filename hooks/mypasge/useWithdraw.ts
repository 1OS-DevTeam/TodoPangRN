import { MypageService } from '@/api/services/mypageService';
import { WithdrawReason, WithdrawReasonList } from '@/api/types';
import { useEffect, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetState } from '@/api/types';
import { useRouter } from 'expo-router';
import { auth } from '@/app/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useWithdraw = () => {

  const router = useRouter();

  const [withdrawReasonList, setWithdrawReasonList] = useState<WithdrawReasonList>();
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    visible: false,
    title: '',
    message: '',
    firstButtonLabel: '',
    secondButtonLabel: '',
  });

  useEffect(() => {
    const fetchWithdrawReasonList = async () => {
      const response = await MypageService.getWithdrawReasonList();
      setWithdrawReasonList(response.data);
      setLoading(false);
    };
    fetchWithdrawReasonList();
  }, []);

  const tapCancelButton = () => {
    router.back();
  };

  const handleSubmit = async (id: number) => {
    const response = await MypageService.withdraw(id);
    if (response.data === true) {
      await auth.signOut();
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('auth_token');
      router.replace('/screens/login/login_screen');
    }
  };


  return {
    withdrawReasonList,
    loading,
    bottomSheetRef,
    bottomSheetState,
    setBottomSheetState,
    tapCancelButton,
    handleSubmit,
  };
}