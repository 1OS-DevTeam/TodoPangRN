import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChallengeService } from '../../api/services/challengeService';
import { ChallengeInfoList, Challenge } from '../../api/types';

export const useChallengeHome = () => {
  const [challengeInfoList, setChallengeInfoList] = useState<ChallengeInfoList | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 챌린지 클릭 이벤트 핸들러
  const handleChallengePress = (challenge: Challenge) => {
    console.log('챌린지 선택됨:', challenge);
    // 여기에 챌린지 선택 시 동작 추가 (예: 상세 페이지로 이동)
    // navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
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
      if (selectedCategory) {
        // 선택된 카테고리에 따라 도전과제 필터링
        const filtered = challengeInfoList.infoData.filter(
          challenge => challenge.category.toString() === selectedCategory
        );
        setFilteredChallenges(filtered);
      } else {
        // 카테고리가 선택되지 않았으면 전체 도전과제 표시
        setFilteredChallenges(challengeInfoList.infoData);
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
    // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
    if (selectedCategory === id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(id);
    }
    // 원래 핸들러 호출
    handleCategoryClick(id, name);
  };

  return { 
    challengeInfoList, 
    loading,
    selectedCategory,
    filteredChallenges,
    handleCategoryClick,
    handleCategorySelection,
    handleChallengePress
  };
};