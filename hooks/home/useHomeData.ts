import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeService } from '../../api';
import { HomeData, PopularChallenge } from '../../api/types';

export const useHomeData = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await HomeService.getHome(userId);
          setHomeData(response.data);
        }
      } catch (error) {
        console.error('홈 데이터 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    // navigation.navigate('CategoryGoals', { categoryId: id, categoryName: name });
  };

  // 인기 목표 카드 클릭 이벤트 핸들러
  const handlePopularChallengeClick = (challenge: PopularChallenge) => {
    console.log(`인기 목표 카드 클릭됨: ${challenge.title}`);
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
    // navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
  };

  // 인기 목표 전체보기 기능 처리 함수
  const handleViewAllPopularChallenges = () => {
    // 여기에 전체보기 클릭 시 실행할 코드를 작성합니다.
    // 예: 인기 목표 전체 목록 화면으로 이동
    console.log('인기 목표 전체보기 클릭됨');
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
    // navigation.navigate('AllPopularChallenges');
  };

  return { 
    homeData, 
    loading, 
    handleChallengingGoalsClick,
    handleCompletedGoalsClick,
    handleCategoryClick,
    handlePopularChallengeClick,
    handleViewAllPopularChallenges
  };
};