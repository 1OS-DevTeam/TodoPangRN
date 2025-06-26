import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import OnboardingScreen from '../screens/mypage/onboarding_screen';
import NavBackButton from '../components/buttons/nav_back_button';


export default function Onboarding() {
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
                    // headerLeft: () => (
                    //     <NavBackButton onClick={() => router.back()} />
                    // )
                }}
            />
            <OnboardingScreen/>
        </>
    );
} 
