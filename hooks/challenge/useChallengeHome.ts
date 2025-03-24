import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChallengeService } from '../../api/services/challengeService';
import { ChallengeInfoList } from '../../api/types';

export const useChallengeHome = () => {
  const [challengeInfoList, setChallengeInfoList] = useState<ChallengeInfoList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await ChallengeService.getChallengeInfoList(userId);
          setChallengeInfoList(response.data);
        }
      } catch (error) {
        console.error('도전과제 목록 조회 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return { 
    challengeInfoList, 
    loading
  };
};