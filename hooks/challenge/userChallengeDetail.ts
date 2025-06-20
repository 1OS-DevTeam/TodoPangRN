import { useState, useEffect } from 'react';
import { ChallengeService } from '../../api/services/challengeService';
import { ChallengeDetail } from '../../api/types';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

export const useUserChallengeDetail = (challengeId: string) => {
    const [challengeDetail, setChallengeDetail] = useState<ChallengeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const showSuccessAlert = () => {
        Alert.alert(
            '성공',
            '도전과제가 성공적으로 등록되었습니다!',
            [
                {
                    text: '확인',
                    onPress: () => router.back()
                }
            ]
        );
    };

    const showErrorAlert = (message: string) => {
        Alert.alert(
            '오류',
            message,
            [
                {
                    text: '확인',
                    style: 'default'
                }
            ]
        );
    };

    const handleRegister = async () => {
        try {
            const challengeId = challengeDetail?.challengeId;
            const todoIds = challengeDetail?.todoList.map((todo) => todo.todoId);
            
            if (challengeId && todoIds) {
                console.log('등록하기', challengeId, todoIds);
                const response = await ChallengeService.registerChallenge(challengeId, todoIds);
                showSuccessAlert();
            } else {
                const message = '도전과제 또는 할일 정보가 없습니다.';
                console.error(message);
                showErrorAlert(message);
            }
        } catch (error) {
            console.error('도전과제 등록 오류:', error);
            const message = '도전과제 등록 중 오류가 발생했습니다.';
            showErrorAlert(message);
        }   
    }

    return { 
        challengeDetail, 
        loading,
        handleRegister
    };
}   