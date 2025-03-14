import React from 'react';
import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screens/login/login_screen" options={{ title: '로그인' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout; 