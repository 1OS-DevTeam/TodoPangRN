import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, Keyboard } from 'react-native';
import { HeadText, SubHeadText, Typography } from '../../components/texts';
import { MainActionButton } from '../../components/buttons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AuthService } from '../../../api/services/authService';
import { COLORS } from '../../../assets/colors/colors';
import BottomSheet from '@gorhom/bottom-sheet';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';

const SignupScreen = () => {
const [nickname, setNickname] = useState('');
const [isButtonEnabled, setIsButtonEnabled] = useState(false);

const router = useRouter();
const { userId, email, socialType, idToken } = useLocalSearchParams();
const registerBottomSheetRef = useRef<BottomSheet>(null);


const trySignup = async () => {
    if (!nickname.trim()) {
        return; // 닉네임이 비어있으면 회원가입 시도하지 않음
    }
    
    try {
        const signupResponse = await AuthService.signup(
            nickname, 
            String(email), 
            String(userId), 
            Number(socialType),
            String(idToken)
        );
        
        console.log('회원가입 성공:', signupResponse);
        router.replace('/(tabs)/home');
    } catch (error) {
        console.error('회원가입 실패:', error);
        // 에러 처리 로직
    }
}

// 닉네임 변경 시 유효성 검사 함수
const handleNicknameChange = (text: string) => {
    setNickname(text);
    setIsButtonEnabled(text.trim().length > 0);
};

const greetingSection = () => {
    return (
        <View style={styles.greetingContainer}>
            <Typography mode='SubHead'>반갑습니다</Typography>
            <Typography mode='SubHead'>함께할 닉네임을 입력해주세요!</Typography>
        </View>
    );
};

const nicknameInputSection = () => {

    return (
        <View style={styles.nicknameInputContainer}>
            <Typography mode='Body2' color='darkGrey'>닉네임</Typography>
            <TextInput
                style={styles.textInput}
                value={nickname}
                onChangeText={handleNicknameChange}
                placeholder="닉네임을 입력해 주세요(10자 이내)"
            />

        </View>
    );
};

const bottomButtonSection = () => {
    return (
      <View style={styles.bottomButtonSection}>
        <View style={styles.buttonDescription}>
          <Typography mode="C1" color="grey">· 이후 '마이페이지'에서 변경 가능합니다!</Typography>
        </View>
        <MainActionButton 
            disabled={!isButtonEnabled} 
            text="시작하기"
            onClick={() => {
                Keyboard.dismiss();
                registerBottomSheetRef.current?.expand();
            }} 
        />
      </View>
    );
};

return (
      <GestureHandlerRootView style={styles.container}>
        <ScreenWrapper backgroundColor={COLORS.white}>
          <View style={styles.contents}>
            {greetingSection()}
            {nicknameInputSection()}
          </View>
          <Image source={require('../../../assets/images/mypage/rename_bottom_bg.png')} style={styles.bottomImage} />
          {bottomButtonSection()}
        </ScreenWrapper>
        
        {/* 등록 확인 바텀시트 */}
        <TwoButtonBottomSheet
          ref={registerBottomSheetRef}
          title={`${nickname}\n으로 시작할까요?`}
          message={`이후 '마이페이지'에서 변경 가능합니다!`}
          firstButtonLabel="다시 입력하기"
          firstButtonEvent={() => {
            registerBottomSheetRef.current?.close();
          }}
          secondButtonLabel="시작하기"
          secondButtonEvent={trySignup}
          imageSource={require('../../../assets/images/mywish/mywish_character.png')}
          imageStyle={{ width: 180, height: 180 }}
        />
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,      
    backgroundColor: '#fff',
  },
  contents: {
    // flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 120,
  },
  greetingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 0
  },
  nicknameInputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 71,
    gap: 10
  },
  textInput: {
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    fontSize: 17,
    marginBottom: 60,
    color: COLORS.black,
  },
  bottomButtonSection: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 13,
  },
  buttonDescription: {
      
  },
  bottomImage: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    resizeMode: 'stretch',
  },
});

export default SignupScreen; 