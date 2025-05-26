import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ChallengeDetailScreen } from '../../app/screens/challenge/challenge_detail_screen';


export default function ChallengeDetailPage() {

    const { challengeId } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '목표 상세',
                    headerBackTitle: '도전과제',
                    headerShadowVisible: false,
                }}
            />
            <ChallengeDetailScreen route={{ params: { challengeId: challengeId as string } }} />
        </>
    );
} 