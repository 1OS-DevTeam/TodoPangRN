import React from 'react';
import { Stack } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

// Firebase 초기화
const app = initializeApp(firebaseConfig);
console.log('Firebase 초기화 완료:', app);

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screens/login/login_screen" options={{ title: '로그인' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout; 