import React from 'react';
import { Stack, useRouter } from 'expo-router';
import FeedbackScreen from '../screens/mypage/feedback_screen';
import NavBackButton from '../components/buttons/nav_back_button';


export default function ReviewPage() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                      <NavBackButton onClick={() => router.back()} />
                  )
                }}
            />
            <FeedbackScreen/>
        </>
    );
} 
