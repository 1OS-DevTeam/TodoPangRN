import { useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ReviewList, ReviewResponse } from '@/api/types';
import { ReviewService } from '@/api/services/reviewService';
import { ReviewUpdateRequest } from '@/api/types';

export const useReview = () => {
    
  const [reviewList, setReviewList] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
        fetchData();
    }, [])
  );

  const fetchData = async () => {
    setLoading(true);
    try {
        const response = await ReviewService.getReviewList();
        console.log('response: 성공', response);
        if (response.status === 200) {
            setReviewList(response.data);
        }
    } catch (error) {
        console.error('위시리스트 조회 오류:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    setHasRated(true);
  };

  const updateReview = async (review: ReviewUpdateRequest) => {
    setIsProcessing(true);
    try {
        const response = await ReviewService.updateReview({
            ...review,
            satisfiedRating: rating
        });
        await fetchData();
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
    updateReview,
    rating,
    hasRated,
    handleRating
  };
}