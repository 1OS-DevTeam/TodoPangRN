import React, { useCallback } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import NavBackButton from '../components/buttons/nav_back_button';
import WithdrawScreen from '../screens/mypage/withdraw_screen';


export default function WithdrawPage() {
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
            < WithdrawScreen/>
        </>
    );
}   