import React from 'react';
import { Stack } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebaseConfig';

// Firebase 초기화
const app = initializeApp(firebaseConfig);
// AsyncStorage를 사용하여 인증 상태 유지
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// console.log('Firebase 초기화 완료:', app);

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/login/login_screen" options={{ title: '로그인' }} />
      <Stack.Screen name="screens/signup/signup_screen" options={{ title: '회원가입' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout; 