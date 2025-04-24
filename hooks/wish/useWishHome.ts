import { useState, useEffect } from 'react';
import { WishService } from '../../api/services/wishService';
import { WishInfoList } from '../../api/types';

export const useWishHome = () => {
  const [wishInfoList, setWishInfoList] = useState<WishInfoList | null>(null);
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WishService.getWishInfoList();
        console.log('위시리스트 정보:', JSON.stringify(response.data, null, 2));
        setWishInfoList(response.data);
      } catch (error) {
        console.error('위시리스트 조회 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    // 도전중인 목표 클릭 이벤트 핸들러
    const handleTodoToggle = (todoId: number) => {
      console.log('투두 클릭됨', todoId);
    };

  return { 
    wishInfoList, 
    loading,
    handleTodoToggle
  };
};
