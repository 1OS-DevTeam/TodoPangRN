import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ReviewScreen from '../screens/mywish/review/review_screen';

export default function ReviewPage() {

    const { originChallengeId } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTitle: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                }}
            />
            <ReviewScreen route={{ params: { originChallengeId: parseInt(originChallengeId as string) } }} />
        </>
    );
} 