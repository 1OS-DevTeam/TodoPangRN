import React from 'react';
import { Stack } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // auth 객체 초기화 및 export 필요

// console.log('Firebase 초기화 완료:', app);

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screens/login/login_screen" options={{ title: '로그인' }} />
      <Stack.Screen name="screens/signup/signup_screen" options={{ title: '회원가입' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout; 