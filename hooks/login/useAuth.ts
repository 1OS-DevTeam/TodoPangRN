import { useRouter } from 'expo-router';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { signInWithCredential, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import { auth } from '../../app/_layout';
import { AuthService } from '../../api/services/authService';
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env';

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // 파이어베이스 콘솔에서 받은 웹 클라이언트 ID
    iosClientId: GOOGLE_IOS_CLIENT_ID, // Google Cloud Console에서 받은 iOS 클라이언트 ID
    // androidClientId: GOOGLE_ANDROID_CLIENT_ID, // 필요 시 추가 (선택적)
  });

interface ServerError {
    response?: {
        status: number;
    };
    message?: string;
}

interface AppleCredential extends AppleAuthentication.AppleAuthenticationCredential {
    nonce?: string;
}

export const useAuth = () => {
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.data?.idToken;

            if (!idToken) {
                throw new Error('ID 토큰을 가져올 수 없습니다.');
            }

            const googleCredential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, googleCredential);

            const userId = userCredential.user.uid;
            const firebaseIdToken = await userCredential.user.getIdToken();

            try {
                const loginResponse = await AuthService.login(userId, firebaseIdToken);
                console.log('서버 로그인 성공:', loginResponse);
                router.replace('/(tabs)/home');
            } catch (serverError: unknown) {
                const error = serverError as ServerError;
                console.error('서버 로그인 중 오류 발생:', error);
                if (error.response?.status === 404) {
                    router.replace({
                        pathname: '/screens/signup/signup_screen',
                        params: {
                            userId: userId,
                            email: userCredential.user.email,
                            socialType: 1
                        }
                    });
                }
            }
        } catch (error: unknown) {
            console.error('구글 로그인 중 오류:', error);
            if (error && typeof error === 'object' && 'code' in error) {
                const typedError = error as { code: string; message?: string };
                if (typedError.code === statusCodes.SIGN_IN_CANCELLED) {
                    console.log('사용자가 로그인을 취소했습니다.');
                } else if (typedError.code === statusCodes.IN_PROGRESS) {
                    console.log('로그인 진행 중입니다.');
                } else if (typedError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    console.log('Google Play 서비스를 사용할 수 없습니다.');
                } else {
                    const errorMessage = typedError.message || '상세 정보 없음';
                    console.log('알 수 없는 오류:', errorMessage);
                }
            } else {
                console.log('알 수 없는 오류 형식:', error);
            }
        }
    };

    const handleAppleLogin = async () => {
        console.log('애플 로그인 시도');

        try {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            if (!isAvailable) {
                console.log('애플 로그인을 사용할 수 없습니다.');
                return;
            }

            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            }) as AppleCredential;

            if (!credential.identityToken) {
                throw new Error('애플 ID 토큰을 가져올 수 없습니다.');
            }

            const provider = new OAuthProvider('apple.com');
            const oAuthCredential = provider.credential({
                idToken: credential.identityToken,
                rawNonce: credential.nonce || '',
            });

            const userCredential = await signInWithCredential(auth, oAuthCredential);

            const userId = userCredential.user.uid;
            const firebaseIdToken = await userCredential.user.getIdToken();

            try {
                const loginResponse = await AuthService.login(userId, firebaseIdToken);
                console.log('서버 애플 로그인 성공:', loginResponse);
                router.replace('/(tabs)/home');
            } catch (serverError: unknown) {
                const error = serverError as ServerError;
                console.error('서버 로그인 중 오류 발생:', error);

                if (error.response?.status === 404) {
                    router.replace({
                        pathname: '/screens/signup/signup_screen',
                        params: {
                            userId: userId,
                            email: userCredential.user.email,
                            socialType: 2
                        }
                    });
                }
            }
        } catch (error: unknown) {
            console.error('애플 로그인 중 오류:', error);

            if (error && typeof error === 'object' && 'code' in error) {
                const typedError = error as { code: string; message?: string };
                if (typedError.code === 'ERR_CANCELED') {
                    console.log('사용자가 애플 로그인을 취소했습니다.');
                } else if (typedError.code === 'ERR_APPLE_AUTHENTICATION_UNAVAILABLE') {
                    console.log('이 기기에서는 애플 로그인을 사용할 수 없습니다.');
                } else if (typedError.code === 'ERR_APPLE_AUTHENTICATION_INVALID_SCOPE') {
                    console.log('요청된 스코프가 잘못되었습니다.');
                } else if (typedError.code === 'ERR_APPLE_AUTHENTICATION_REQUEST_FAILED') {
                    console.log('인증 요청이 실패했습니다.');
                } else {
                    console.log('알 수 없는 오류 발생:', typedError.message || '상세 정보 없음');
                }
            } else {
                console.log('알 수 없는 오류 발생:', error);
            }
        }
    };


    const handleTermsClick = () => {
        console.log('서비스 이용약관 클릭됨');
    };

    const handlePrivacyPolicyClick = () => {
        console.log('개인정보 보호 정책 클릭됨');
    };

    return {
        handleGoogleLogin,
        handleAppleLogin,
        handleTermsClick,
        handlePrivacyPolicyClick
    };
};
