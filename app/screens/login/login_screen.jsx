import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const handleTermsClick = () => {
    // 나중에 서비스 이용약관 페이지로 이동하는 로직 추가
    console.log('서비스 이용약관 클릭됨');
};

const handlePrivacyPolicyClick = () => {
// 나중에 개인정보 보호 정책 페이지로 이동하는 로직 추가
    console.log('개인정보 보호 정책 클릭됨');
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
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.googleButton}>
        <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
          <Image 
            source={require('../../../assets/images/login/login_google_logo.png')} 
            style={{ position: 'absolute', left: 40 }}
          />
          <Text style={styles.googleButtonText}>구글 로그인</Text>
        </View>
      </View>
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
