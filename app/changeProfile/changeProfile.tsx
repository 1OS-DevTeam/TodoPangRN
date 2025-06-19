import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ChangeProfileScreen from '../screens/mypage/change_profile_screen';
import NavBackButton from '../components/buttons/nav_back_button';


  export default function ChangeProfilePage() {
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
            <ChangeProfileScreen/>
        </>
    );
} 
