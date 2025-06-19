import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import OnboardingScreen from '../screens/mypage/onboarding_screen';


export default function ReviewPage() {
    const router = useRouter();

    const navigateToMyWish = () => {
        console.log('navigateToMyWish');
        router.dismissTo('/mywish');
    }

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
            <OnboardingScreen/>
        </>
    );
} 
