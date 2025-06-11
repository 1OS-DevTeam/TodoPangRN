import React, { useEffect, useState } from 'react';
import { MypageService } from '../../api/services/mypageService';
import { useRouter } from 'expo-router';

export const useMypage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  return {
    loading,
    tapWithdraw,
    tapLogout,
    tapSetting,
    tapGuide,
  };
};