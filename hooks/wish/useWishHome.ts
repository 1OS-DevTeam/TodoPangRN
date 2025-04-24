import { useState, useEffect } from 'react';
import { WishService } from '../../api/services/wishService';
import { WishInfoList, WishUpdateRequest, WishUpdateTodo } from '../../api/types';

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

  // 투두 토글 이벤트 핸들러
  const handleTodoToggle = (todoId: number) => {
    console.log('투두 클릭됨', todoId);
    
    if (!wishInfoList) return;
    
    // 변경된 챌린지 데이터 생성
    let targetChallengeId: number | null = null;
    let newStatus: number = 1;
    
    const updatedChallenges = wishInfoList.challenges.map(challenge => {
      // 해당 todoId를 가진 투두가 있는지 확인
      const targetTodo = challenge.todoList.find(todo => todo.todoId === todoId);
      
      if (!targetTodo) return challenge;
      
      // 타겟 챌린지 ID와 새로운 상태 저장
      targetChallengeId = challenge.challengeId;
      newStatus = targetTodo.status === 2 ? 1 : 2;
      
      // 해당 todoId를 가진 투두의 상태를 변경
      const updatedTodos = challenge.todoList.map(todo => {
        if (todo.todoId === todoId) {
          // 상태 토글 (1 <-> 2)
          return { ...todo, status: newStatus };
        }
        return todo;
      });
      
      return {
        ...challenge,
        todoList: updatedTodos
      };
    });
    
    // UI 즉시 업데이트
    setWishInfoList({
      ...wishInfoList,
      challenges: updatedChallenges
    });
    
    // 타겟 챌린지가 없으면 리턴
    if (targetChallengeId === null) return;
    
    // API 요청을 위한 데이터 준비 (해당 투두와 챌린지만 포함)
    const updateRequest: WishUpdateRequest = {
      challengeList: [{
        challengeId: targetChallengeId,
        challengeName: '', // API에 필요하지 않다면 빈값으로
        todoList: [{
          todoId: todoId,
          status: newStatus,
          title: '', // API에 필요하지 않다면 빈값으로
          challengeId: targetChallengeId
        }]
      }]
    };
    
    // API 호출
    WishService.updateWish(updateRequest)
      .then(response => {
        console.log('투두 상태 업데이트 성공:', response);
      })
      .catch(error => {
        console.error('투두 상태 업데이트 실패:', error);
        // 실패 시 원래 상태로 되돌리기
        setWishInfoList(wishInfoList);
      });
  };

  return { 
    wishInfoList, 
    loading,
    handleTodoToggle
  };
};
