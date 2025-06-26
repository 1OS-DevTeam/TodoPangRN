import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback } from 'react';


const WithdrawScreen1 = () => {
  const handleLayout = useCallback(() => {
    console.log('onLayout WithdrawScreen1');
  }, []);

  return (
    // <GestureHandlerRootView style={styles.container} onLayout={handleLayout}>
    //   <ScreenWrapper backgroundColor={COLORS.white}>
    //     <Text>WithdrawScreen1</Text>
    //   </ScreenWrapper>
      
    // </GestureHandlerRootView>
    // <View onLayout={handleLayout}>

    // </View>

    // <ScreenWrapper backgroundColor={COLORS.white} onLayout={handleLayout}>
    //   <Text>WithdrawScreen1</Text>
    // </ScreenWrapper>

    <SafeAreaView style={styles.container} onLayout={handleLayout}>
      <Text>WithdrawScreen1</Text>
    </SafeAreaView>
    
    // <GestureHandlerRootView style={styles.container} onLayout={handleLayout}>
    //    {/* <ScreenWrapper backgroundColor={COLORS.white}>
    //     <Text>WithdrawScreen1</Text>
    //    </ScreenWrapper> */}
    // </GestureHandlerRootView>

    // <View onLayout={handleLayout}>
    //   <Text>WithdrawScreen1</Text>

    // </View>
  );
};

export default WithdrawScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});