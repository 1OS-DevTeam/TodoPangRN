import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LoginScreen from './screens/login/login_screen';
import { Stack, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인을 위한 리스너 설정
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        // 사용자가 로그인되어 있으면 홈 화면으로 이동
        console.log('사용자 로그인 상태: 로그인됨', user.uid);
        AsyncStorage.setItem('userId', user.uid);
        router.replace('/(tabs)/home');
      } else {
        // 로그인되어 있지 않으면 현재 로그인 화면 유지
        console.log('사용자 로그인 상태: 로그아웃됨');
      }
    });

    // 컴포넌트 언마운트 시 리스너 해제
    return () => unsubscribe();
  }, [router]);

  // 로딩 중일 때 로딩 인디케이터 표시
  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false, title: "로딩 중" }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </>
    );
  }

  // 로그인되어 있지 않은 경우 로그인 화면 표시
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "로그인" }} />
      <LoginScreen />
    </>
  );
} 