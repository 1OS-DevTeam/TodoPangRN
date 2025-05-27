import { useState, useEffect } from 'react';
import { useFocusEffect, router } from 'expo-router';
import { useCallback } from 'react';
import { ReviewResponse } from '@/api/types';
import { ReviewService } from '@/api/services/reviewService';
import { ReviewUpdateRequest } from '@/api/types';

export const useReview = (originChallengeId: number) => {
    console.log('[useReview] originChallengeId received:', originChallengeId);
    
  const [reviewList, setReviewList] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
        fetchData();
    }, [])
  );

  useEffect(() => {
    // 별점과 리뷰가 모두 선택되었는지 확인
    setIsNextButtonEnabled(hasRated && selectedReview !== null);
  }, [hasRated, selectedReview]);

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

  const handleReviewSelect = (review: ReviewResponse) => {
    // 이미 선택된 리뷰를 다시 클릭하면 선택 해제
    if (selectedReview?.reviewId === review.reviewId) {
      setSelectedReview(null);
    } else {
      setSelectedReview(review);
    }
  };

  const updateReview = async () => {
    setIsProcessing(true);
    const review: ReviewUpdateRequest = {
      originChallengeId: originChallengeId,
      selectedReviewId: selectedReview?.reviewId ?? 0,
      satisfiedRating: rating
    }
    try {
        const response = await ReviewService.updateReview(review);
        if (response.status === 200) {
            console.log('리뷰 업데이트 성공');
            // 성공시에만 화면 이동
            router.replace('/(tabs)/mywish');
        }
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
    updateReview,
    rating,
    hasRated,
    handleRating,
    selectedReview,
    handleReviewSelect,
    isNextButtonEnabled
  };
}