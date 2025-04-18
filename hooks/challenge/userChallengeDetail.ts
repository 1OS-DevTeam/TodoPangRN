import { useState, useEffect } from 'react';
import { ChallengeService } from '../../api/services/challengeService';
import { ChallengeDetail } from '../../api/types';

export const useUserChallengeDetail = (challengeId: string) => {
    const [challengeDetail, setChallengeDetail] = useState<ChallengeDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChallengeDetail = async () => {
            try {
                const response = await ChallengeService.getChallengeDetail(Number(challengeId));
                setChallengeDetail(response.data);
                
            } catch (error) {
                console.error('도전과제 상세 조회 오류:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchChallengeDetail();
    }, [challengeId]);

    const handleRegister = async () => {
        try {
            const challengeId = challengeDetail?.challengeId;
            const todoIds = challengeDetail?.todoList.map((todo) => todo.todoId);
            
            if (challengeId && todoIds) {
                console.log('등록하기', challengeId, todoIds);
                const response = await ChallengeService.registerChallenge(challengeId, todoIds);
            } else {
                console.error('도전과제 또는 할일 정보가 없습니다.');
            }
        } catch (error) {
            console.error('도전과제 등록 오류:', error);
        }   
    }

    return { 
        challengeDetail, 
        loading,
        handleRegister
    };
}   