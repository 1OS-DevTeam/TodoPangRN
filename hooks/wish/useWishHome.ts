import { useState, useEffect, useRef, useCallback } from 'react';
import { WishService } from '../../api/services/wishService';
import { WishInfoList, WishUpdateRequest, WishUpdateTodo } from '../../api/types';

// 투두 변경사항 타입 정의
type TodoChange = {
  todoId: number;
  challengeId: number;
  status: number;
  originalStatus: number; // 원래 상태 추적용
};

export const useWishHome = () => {
  const [wishInfoList, setWishInfoList] = useState<WishInfoList | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 디바운싱을 위한 상태와 타이머 참조 (Map으로 변경)
  const [pendingTodoChanges, setPendingTodoChanges] = useState<Map<number, TodoChange>>(new Map());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  // 변경사항 일괄 처리 함수
  const processPendingChanges = useCallback(() => {
    // 변경사항이 없으면 API 호출하지 않음
    if (pendingTodoChanges.size === 0) {
      console.log('변경된 투두가 없어 API 요청을 하지 않습니다.');
      return;
    }
    
    // 변경된 투두 데이터를 챌린지별로 그룹화
    const challengeMap = new Map<number, {todoId: number, status: number, title: string, challengeId: number}[]>();
    
    // Map을 순회하며 챌린지별로 그룹화
    pendingTodoChanges.forEach(change => {
      if (!challengeMap.has(change.challengeId)) {
        challengeMap.set(change.challengeId, []);
      }
      
      challengeMap.get(change.challengeId)?.push({
        todoId: change.todoId,
        status: change.status,
        title: '', // API에 필요하지 않다면 빈값으로
        challengeId: change.challengeId
      });
    });
    
    // 챌린지별로 그룹화된 데이터를 API 요청 형식으로 변환
    const challengeList = Array.from(challengeMap.entries()).map(([challengeId, todos]) => ({
      challengeId,
      challengeName: '', // API에 필요하지 않다면 빈값으로
      todoList: todos
    }));
    
    // API 요청
    const updateRequest: WishUpdateRequest = {
      challengeList
    };
    
    console.log('변경된 투두 일괄 전송:', pendingTodoChanges.size, '개 항목');
    
    WishService.updateWish(updateRequest)
      .then(response => {
        console.log('투두 상태 일괄 업데이트 성공:', response);
        // 처리된 변경사항 초기화
        setPendingTodoChanges(new Map());
      })
      .catch(error => {
        console.error('투두 상태 일괄 업데이트 실패:', error);
        // 실패 시 원래 상태로 되돌리는 복잡한 로직이 필요할 수 있으나
        // 여기서는 생략하고 변경사항만 초기화
        setPendingTodoChanges(new Map());
      });
  }, [pendingTodoChanges]);

  // 투두 토글 이벤트 핸들러
  const handleTodoToggle = (todoId: number) => {
    console.log('투두 클릭됨', todoId);
    
    if (!wishInfoList) return;
    
    // 변경된 챌린지 데이터 생성 및 투두 검색
    let targetChallenge = null;
    let targetTodo = null;
    
    // 해당 투두가 속한 챌린지와 투두 찾기
    for (const challenge of wishInfoList.challenges) {
      const todo = challenge.todoList.find(t => t.todoId === todoId);
      if (todo) {
        targetChallenge = challenge;
        targetTodo = todo;
        break;
      }
    }
    
    // 대상이 없으면 종료
    if (!targetChallenge || !targetTodo) return;
    
    // 현재 상태와 새 상태 계산
    const originalStatus = targetTodo.status;
    const newStatus = originalStatus === 2 ? 1 : 2;
    const challengeId = targetChallenge.challengeId;
    
    // 업데이트된 챌린지 목록 생성
    const updatedChallenges = wishInfoList.challenges.map(challenge => {
      if (challenge.challengeId !== challengeId) return challenge;
      
      // 해당 todoId를 가진 투두의 상태를 변경
      const updatedTodos = challenge.todoList.map(todo => {
        if (todo.todoId === todoId) {
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
    
    // 새로운 pendingTodoChanges 맵 생성
    let newPendingChanges: Map<number, TodoChange>;
    
    // 변경사항 관리 - 매우 간단하게 처리
    setPendingTodoChanges(prev => {
      const newMap = new Map(prev);
      
      // 이전에 변경 기록이 있고, 원래 상태로 돌아왔는지 확인
      const existingChange = prev.get(todoId);
      
      if (existingChange && existingChange.originalStatus === newStatus) {
        // 원래 상태로 돌아왔으면 목록에서 제거
        newMap.delete(todoId);
        console.log(`투두 #${todoId} 원래 상태로 돌아와 변경 목록에서 제거됨`);
      } else {
        // 그렇지 않으면 변경사항 추가/업데이트
        newMap.set(todoId, {
          todoId, 
          challengeId, 
          status: newStatus,
          originalStatus: existingChange?.originalStatus || originalStatus
        });
      }
      
      // 로컬 변수에 저장하여 아래 타이머 설정에서 사용
      newPendingChanges = newMap;
      return newMap;
    });
    
    // 이전 타이머가 있으면 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    
    // 변경사항이 남아있는 경우에만 타이머 설정
    // setTimeout이 실행되는 시점에서는 newPendingChanges가 이미 설정되어 있음
    setTimeout(() => {
      // setPendingTodoChanges는 비동기적으로 작동하므로 
      // 가장 최근 상태를 사용하기 위해 pendingTodoChanges 대신 newPendingChanges 확인
      if (newPendingChanges.size > 0) {
        console.log('변경된 투두가 있어 3초 후 동기화 예약');
        debounceTimerRef.current = setTimeout(() => {
          processPendingChanges();
          debounceTimerRef.current = null;
        }, 3000);
      } else {
        console.log('변경된 투두가 모두 원상태로 돌아와 동기화 생략');
      }
    }, 0);
  };

  return { 
    wishInfoList, 
    loading,
    handleTodoToggle
  };
};
