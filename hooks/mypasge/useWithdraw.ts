import { MypageService } from '@/api/services/mypageService';
import { WithdrawReason } from '@/api/types';
import { useEffect, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetState } from '@/api/types';
import { useRouter } from 'expo-router';
import { auth } from '@/app/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useWithdraw = () => {

  const router = useRouter();

  const [withdrawReasonList, setWithdrawReasonList] = useState<WithdrawReason[]>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [userName, setUserName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [selectedReason, setSelectedReason] = useState<WithdrawReason | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const reasonBottomSheetRef = useRef<BottomSheet>(null);

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
    };
    fetchWithdrawReasonList();
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      const userName = await AsyncStorage.getItem('userName') as string;
      setUserName(userName);
    }
    getUserName();
  }, []);

  const tapCancelButton = () => {
    router.back();
  };

  const handleWithdraw = async () => {
    setIsProcessing(true);
    const response = await MypageService.withdraw(selectedReason?.reasonId ?? 0);
    if (response.data === true) {
      await auth.signOut();
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('auth_token');
      router.replace('/screens/login/login_screen');
    }
  };

  const showMenu = () => {
    // console.log('🔥 BottomSheet로 메뉴 열기');
    if (!withdrawReasonList || withdrawReasonList.length === 0) {
      console.log('🔥 withdrawReasonList가 비어있어서 BottomSheet 안 열림!');
      return;
    }
    reasonBottomSheetRef.current?.expand();
  };

  const selectReason = (reason: WithdrawReason) => {
    setSelectedReason(reason);
  };

  const tapWithdrawButton = () => {
    bottomSheetRef.current?.expand();
  };




  return {
    isProcessing,
    buttonEnabled,
    withdrawReasonList,
    bottomSheetRef,
    bottomSheetState,
    userName,
    selectedReason,
    setSelectedReason,
    setBottomSheetState,
    setModalVisible,
    tapCancelButton,
    handleWithdraw,
    showMenu,
    selectReason,
    modalVisible,
    tapWithdrawButton,
    // BottomSheet 관련 추가
    reasonBottomSheetRef,
  };
}