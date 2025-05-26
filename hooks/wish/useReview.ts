import { useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ReviewList } from '@/api/types';
import { ReviewService } from '@/api/services/reviewService';
import { ReviewUpdateRequest } from '@/api/types';
export const useReview = () => {
    
  const [reviewList, setReviewList] = useState<ReviewList | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
        fetchData();
    }, [])
  );

  const fetchData = async () => {
    setLoading(true);
    try {
        const response = await ReviewService.getReviewList();
    } catch (error) {
        console.error('위시리스트 조회 오류:', error);
    } finally {
        setLoading(false);
    }
  };

  const updateReview = async (review: ReviewUpdateRequest) => {
    setIsProcessing(true);
    try {
        const response = await ReviewService.updateReview(review);
    } catch (error) {
        console.error('리뷰 업데이트 오류:', error);
    } finally {
        setIsProcessing(false);
    }
  };

  return {
    reviewList,
    loading,
    isProcessing,
    loadingTodoId,
    updateReview
  };
}