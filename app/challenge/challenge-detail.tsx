import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChallengeDetailScreen } from '../../app/screens/challenge/challenge_detail_screen';
import NavBackButton from '../components/buttons/nav_back_button';


export default function ChallengeDetailPage() {
    const router = useRouter();

    const { challengeId, categoryName } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '위시 상세',
                    headerBackTitle: '도전과제',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <NavBackButton onClick={() => router.back()} />
                    )
                }}
            />
            <ChallengeDetailScreen route={{ params: { challengeId: challengeId as string, categoryName: categoryName as string } }} />
        </>
    );
} 