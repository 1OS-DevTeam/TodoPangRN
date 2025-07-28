import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  backgroundColor: string;
  onLayout?: (event: any) => void;
}

// 공통 safeArea 레이아웃 컴포넌트 정의
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, backgroundColor, onLayout }) => {
  // 안전 영역 상단 높이
  const insets = useSafeAreaInsets();
  const offset =  0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} onLayout={onLayout}> 
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={offset}>

        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
export { ScreenWrapper };
