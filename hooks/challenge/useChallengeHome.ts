import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChallengeService } from '../../api/services/challengeService';
import { ChallengeInfoList, Challenge } from '../../api/types';
import { useRouter } from 'expo-router';

export const useChallengeHome = () => {
  const router = useRouter();
  const [challengeInfoList, setChallengeInfoList] = useState<ChallengeInfoList | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('0'); // 디폴트를 'all'로 설정
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);

  // 데이터 로드
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
      }
    };

    fetchData();
  }, []);

  // 챌린지 클릭 이벤트 핸들러
  const handleChallengePress = (challenge: Challenge) => {
    console.log('챌린지 선택됨:', challenge);

    // 카테고리 이름 가져오기
    const categoryName = challengeInfoList?.categories?.[challenge.category] || '';

    router.push({
      pathname: '/challenge/challenge-detail',
      params: { 
        challengeId: challenge.id,
        categoryName: categoryName,
        headerTitle: '목표 상세',
        headerBackTitle: '도전과제',
      }
    });
  };

  // 최초 로딩 시 첫 번째 카테고리 자동 선택
  useEffect(() => {
    if (challengeInfoList?.categories && !selectedCategory) {
      const categoryIds = Object.keys(challengeInfoList.categories);
      if (categoryIds.length > 0) {
        const firstCategoryId = categoryIds[0];
        setSelectedCategory(firstCategoryId);
      }
    }
  }, [challengeInfoList, selectedCategory]);

  // 카테고리에 따른 도전과제 필터링
  useEffect(() => {
    if (challengeInfoList?.infoData) {
      if (selectedCategory === '0' || !selectedCategory) {
        // "전체" 선택 시 모든 도전과제 표시
        setFilteredChallenges(challengeInfoList.infoData);
      } else {
        // 선택된 카테고리에 따라 도전과제 필터링
        const filtered = challengeInfoList.infoData.filter(
          challenge => challenge.category.toString() === selectedCategory
        );
        setFilteredChallenges(filtered);
      }
    }
  }, [selectedCategory, challengeInfoList]);

  // 카테고리 클릭 이벤트 핸들러
  const handleCategoryClick = (id: string, name: string) => {
    console.log(`카테고리 클릭됨: ${id}, ${name}`);
    // 네비게이션 기능이 추가되면 다음과 같이 구현할 수 있습니다:
    // navigation.navigate('CategoryGoals', { categoryId: id, categoryName: name });
  };

  // 카테고리 선택/해제 핸들러
  const handleCategorySelection = (id: string, name: string) => {
    setSelectedCategory(id);
    // 원래 핸들러 호출
    handleCategoryClick(id, name);
  };

  return { 
    challengeInfoList, 
    selectedCategory,
    filteredChallenges,
    handleCategoryClick,
    handleCategorySelection,
    handleChallengePress
  };
};