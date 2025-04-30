import { useState, useEffect } from 'react';
import { WishService } from '../../api/services/wishService';
import { WishInfoList, WishUpdateRequest, WishInfoChallenge, WishCompleteRequest } from '../../api/types';
import Toast from 'react-native-toast-message';

export const useWishHome = () => {
  const [wishInfoList, setWishInfoList] = useState<WishInfoList | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);

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

  // 투두 토글 이벤트 핸들러
  const handleTodoToggle = async (todoId: number) => {
    if (isProcessing) return; // 처리 중이면 리턴
    
    if (!wishInfoList) return;
    
    // 해당 투두가 속한 챌린지와 투두 찾기
    let targetChallenge = null;
    let targetTodo = null;
    
    for (const challenge of wishInfoList.challenges) {
      const todo = challenge.todoList.find(t => t.todoId === todoId);
      if (todo) {
        targetChallenge = challenge;
        targetTodo = todo;
        break;
      }
    }
    
    if (!targetChallenge || !targetTodo) return;
    
    // 현재 상태와 새 상태 계산
    const newStatus = targetTodo.status === 2 ? 1 : 2;
    const challengeId = targetChallenge.challengeId;

    setIsProcessing(true);
    setLoadingTodoId(todoId);
    
    try {
      // API 요청 데이터 준비
      const updateRequest: WishUpdateRequest = {
        challengeList: [{
          challengeId,
          todoList: [{
            todoId,
            challengeId,
            updatedStatus: newStatus
          }]
        }]
      };
      
      // API 호출
      const response = await WishService.updateWish(updateRequest);

      if (response.data) {
        // API 성공 및 data가 true일 때만 UI 업데이트
        setWishInfoList({
          ...wishInfoList,
          challenges: wishInfoList.challenges.map(challenge => {
            if (challenge.challengeId !== challengeId) return challenge;
            
            return {
              ...challenge,
              todoList: challenge.todoList.map(todo => {
                if (todo.todoId === todoId) {
                  return { ...todo, status: newStatus };
                }
                return todo;
              })
            };
          })
        });

        // 토스트 메시지 표시
        Toast.show({
          type: 'success',
          text1: newStatus === 2 ? '할 일을 완료했어요! 🎉' : '할 일을 다시 시작해볼까요? 💪',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
      
    } catch (error) {
      console.error('투두 상태 업데이트 실패:', error);
      
      Toast.show({
        type: 'error',
        text1: '업데이트에 실패했습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } finally {
      setIsProcessing(false);
      setLoadingTodoId(null);
    }
  };

  // 이루기 이벤트 핸들러
  const handleWishComplete = (challenge: WishInfoChallenge) => {
    console.log('이루기 이벤트 핸들러', challenge);

    const completeRequest: WishCompleteRequest = {
      challengeList: [
        {
          challengeId: challenge.challengeId,
          challengeStatus: 3
        } 
      ]
    };

    WishService.completeWish(completeRequest)
      .then(response => {
        console.log('위시 완료 성공:', response);
      });
  };

  return { 
    wishInfoList, 
    loading,
    isProcessing,
    loadingTodoId,
    handleTodoToggle,
    handleWishComplete
  };
};
