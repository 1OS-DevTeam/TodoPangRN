import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../_layout'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from '@env';
import { AuthService } from '../../../api/services/authService';
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID, // 파이어베이스 콘솔에서 받은 웹 클라이언트 ID
  iosClientId: GOOGLE_IOS_CLIENT_ID, // Google Cloud Console에서 받은 iOS 클라이언트 ID
  // androidClientId: GOOGLE_ANDROID_CLIENT_ID, // 필요 시 추가 (선택적)
});

const handleTermsClick = () => {
    // 나중에 서비스 이용약관 페이지로 이동하는 로직 추가
};

const handlePrivacyPolicyClick = () => {
    console.log('개인정보 보호 정책 클릭됨');
    // 나중에 개인정보 보호 정책 페이지로 이동하는 로직 추가
};

const logoSection = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative', height: 200, marginBottom: 150, paddingTop: 120 }}>
      <Image 
        source={require('../../../assets/images/login/login_description.png')} 
        style={{ marginBottom: 40 }}
      />
      <View style={{ position: 'relative' }}>
        <Image 
          source={require('../../../assets/images/login/login_todopang_logo.png')} 
          style={{ zIndex: 2 }}
        />
        <Image 
          source={require('../../../assets/images/login/login_drop.png')} 
          style={{ position: 'absolute', left: -20, bottom: -75, zIndex: 1 }}
        />
        <Image 
          source={require('../../../assets/images/login/login_bomb.png')} 
          style={{ position: 'absolute', right: -20, bottom: -130, zIndex: 1 }}
        />
      </View>
      <Image 
        source={require('../../../assets/images/login/login_diamond_mini.png')} 
        style={{ position: 'absolute', left: 10, bottom: -130, right: 150, zIndex: 0 }}
      />
      <Image 
        source={require('../../../assets/images/login/login_diamond.png')} 
        style={{ position: 'absolute', left: -20, bottom: -70, left: 150, zIndex: 0 }}
      />
    </View>
  );
};

const ButtonSection = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      // Google Play 서비스 확인 (Android에서 필요)
      await GoogleSignin.hasPlayServices();
  
      // Google 로그인 요청
      const userInfo = await GoogleSignin.signIn();
  
      // ID 토큰 가져오기
      const idToken = userInfo.data?.idToken;
      if (!idToken) {
        throw new Error('ID 토큰을 가져올 수 없습니다.');
      }

      // 파이어베이스 인증 크리덴셜 생성
      const googleCredential = GoogleAuthProvider.credential(idToken);
  
      // 파이어베이스로 로그인
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      // 파이어베이스 로그인 성공 후 서버에 로그인 요청
      const userId = userCredential.user.uid; // 파이어베이스 사용자 ID
      const firebaseIdToken = await userCredential.user.getIdToken(); // 파이어베이스 ID 토큰
      
      try {
        // 서버 로그인 요청
        const loginResponse = await AuthService.login(userId, firebaseIdToken);
        console.log('서버 로그인 성공:', loginResponse);
        
        // 로그인 성공 후 홈 화면으로 이동
        router.replace('/(tabs)/home');
      } catch (serverError) {
        console.error('서버 로그인 중 오류 발생:', serverError);
        // 서버 로그인 실패 처리 (필요시 사용자에게 알림)
        if (serverError.response && serverError.response.status === 404) {
          console.log('회원가입 페이지로 이동');
          router.replace('/signup');
        }
      }
    } catch (error) {
      console.error('구글 로그인 중 오류:', error, error.code);
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('사용자가 로그인을 취소했습니다.');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('로그인 진행 중입니다.');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Google Play 서비스를 사용할 수 없습니다.');
        } else {
          // message 속성 존재 여부 확인
          const errorMessage = 'message' in error ? error.message : '상세 정보 없음';
          console.log('알 수 없는 오류:', errorMessage);
        }
      } else {
        console.log('알 수 없는 오류 형식:', error);
      }
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
          <Image 
            source={require('../../../assets/images/login/login_google_logo.png')} 
            style={{ position: 'absolute', left: 40 }}
          />
          <Text style={styles.googleButtonText}>구글 로그인</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.appleButton}>
        <View style={{ position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image 
            source={require('../../../assets/images/login/login_apple_logo.png')} 
            style={{ position: 'absolute', left: 40 }}
          />
          <Text style={styles.appleButtonText}>애플 로그인</Text>
        </View>
      </View>
    </View>
  );
};

const BottomTermsSection = () => {
  return (
    <View style={styles.BottomTermsContainer}>
      <Text style={{ fontSize: 12, color: '#FFFFFF', textAlign: 'center' }}>회원가입을 완료할 시,</Text>
      <Text style={{ fontSize: 12, color: '#FFFFFF', textAlign: 'center' }}>
        투두팡의{' '}
        <Text style={{ textDecorationLine: 'underline' }} onPress={handleTermsClick}>
          서비스 이용약관
        </Text>{' '}
        과{' '}
        <Text style={{ textDecorationLine: 'underline' }} onPress={handlePrivacyPolicyClick}>
          개인정보 보호 정책
        </Text>{' '}
        에 동의하게 됩니다.
      </Text>
    </View>
  );
};

export const LoginScreen = () => {
  const linearGradientColors = ['#60B9FF', '#7248E1'];

  return (
    <LinearGradient
      colors={linearGradientColors}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {logoSection()}
        {ButtonSection()}
        {BottomTermsSection()}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  dropContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop: 100,
    zIndex: 3,
    width: '100%',
    paddingHorizontal: 39,
  },
  googleButton: {
    height: 48,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appleButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#343434',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  appleButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  BottomTermsContainer: {
    position: 'absolute', // 절대 위치 지정
    bottom: 60, // 하단에서 20px 띄우기 (원하는 값으로 조정 가능)
    left: 0, // 좌우 중앙 정렬을 위해 left와 right를 0으로
    right: 0,
    alignItems: 'center', // 텍스트나 자식 요소 중앙 정렬
  },
});

export default LoginScreen;
