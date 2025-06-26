import React, { useCallback } from 'react';
import { Stack, useRouter } from 'expo-router';
import FeedbackScreen from '../screens/mypage/feedback_screen';
import NavBackButton from '../components/buttons/nav_back_button';


export default function ReviewPage() {
    console.log('ReviewPage rendered');
    const router = useRouter();
    const handleBack = useCallback(() => {
        console.log('handleBack called');
        router.back();
    }, [router]);
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                      <NavBackButton onClick={handleBack} />
                  )
                }}
            />
            <FeedbackScreen/>
        </>
    );
} 
