import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ReviewScreen from '../screens/mywish/review/review_screen';
import { TouchableOpacity, Image } from 'react-native';
import NavBackButton from '../components/buttons/nav_back_button';

export default function ReviewPage() {
    const router = useRouter();

    const { originChallengeId } = useLocalSearchParams();

    const navigateToMyWish = () => {
        console.log('navigateToMyWish');
        router.dismissTo('/mywish');
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <NavBackButton onClick={navigateToMyWish} />
                    )
                }}
            />
            <ReviewScreen route={{ params: { originChallengeId: parseInt(originChallengeId as string) } }} />
        </>
    );
} 
