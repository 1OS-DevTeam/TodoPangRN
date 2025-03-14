import React from 'react';
import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="screens/login/login_screen" options={{ title: "로그인" }} />
      {/* 다른 Screen 컴포넌트를 추가할 수 있습니다 */}
    </Stack>
  );
};

export default AppLayout; 