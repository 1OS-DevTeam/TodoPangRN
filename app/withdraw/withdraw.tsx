import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import WithdrawScreen from '../screens/mypage/withdraw_screen';


export default function WithdrawPage() {
  
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '탈퇴하기',
                    headerBackTitle: '마이페이지',
                    headerShadowVisible: false,
                }}
            />
            <WithdrawScreen />
        </>
    );
} 