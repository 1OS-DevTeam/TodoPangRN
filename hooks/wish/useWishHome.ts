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
        console.log('위시리스트 정보:', response.data);
        setWishInfoList(response.data);
      } catch (error) {
        console.error('위시리스트 조회 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { 
    wishInfoList, 
    loading
  };
};
