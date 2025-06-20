import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeService } from '../../api';
import { HomeData, PopularChallenge } from '../../api/types';
import { useRouter } from 'expo-router';


export const useHomeData = () => {
  const router = useRouter();

  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await HomeService.getHome(userId);
        setHomeData(response.data);
        let userName = response.data.userData.userName;
        AsyncStorage.setItem('userName', userName);
      } else {
        console.log('userId가 없습니다.');
      }
    } catch (error) {
      console.error('홈 데이터 로딩 오류:', error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Pull to refresh 함수
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // 도전중인 목표 클릭 이벤트 핸들러
  const handleChallengingGoalsClick = () => {
    console.log('도전중인 목표 클릭됨');
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
    // navigation.navigate('ChallengingGoals');
  };

  // 달성한 목표 클릭 이벤트 핸들러
  const handleCompletedGoalsClick = () => {
    console.log('달성한 목표 클릭됨');
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
    // navigation.navigate('CompletedGoals');
  };

  // 카테고리 클릭 이벤트 핸들러
  const handleCategoryClick = (id: string, name: string) => {
    console.log(`카테고리 클릭됨: ${id}, ${name}`);
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
  };

  // 인기 목표 카드 클릭 이벤트 핸들러
  const handlePopularChallengeClick = (challenge: PopularChallenge) => {
    console.log(`인기 목표 카드 클릭됨: ${challenge.title}`);
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
    router.push({
      pathname: '/challenge/challenge-detail',
      params: { 
        challengeId: challenge.challengeId,
        headerTitle: '목표 상세',
        headerBackTitle: '도전과제',
      }
    });
  };

  // 인기 목표 전체보기 기능 처리 함수
  const handleViewAllPopularChallenges = () => {
    router.push('/(tabs)/challenge');
  };

  return { 
    homeData, 
    loading, 
    refreshing,
    handleChallengingGoalsClick,
    handleCompletedGoalsClick,
    handleCategoryClick,
    handlePopularChallengeClick,
    handleViewAllPopularChallenges,
    onRefresh
  };
};