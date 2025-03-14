import React from 'react';
import LoginScreen from './screens/login/login_screen';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "로그인" }} />
      <LoginScreen />
    </>
  );
} 