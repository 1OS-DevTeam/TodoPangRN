import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { useChangeProfile } from '../../../hooks/mypasge/useChangeProfile';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Body2, SubHeadText, C1 } from '@/app/components/texts';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';


export const ChangeProfileScreen = () => {
  const { 
    bottomSheetRef,
    bottomSheetState,
    isLoggingOut,
    loading,
    nickname,
    tapChangeButton,
    handleNicknameChange,
    handleChangeName,
  } = useChangeProfile();
  
  const bottomButtonSection = () => {
    return (
      <View style={styles.buttonSection}>
        <C1 color={COLORS.grey}>· 변경 후 10일 간 재변경이 불가능합니다</C1>
        <MainActionButton 
          text="변경하기" 
          onClick={() => handleChangeName(nickname)} 
          disabled={!nickname.trim() || loading}
        />
      </View>
    );
  }
  
  const handleContainerLayout = (event: any) => {
    console.log('🔴 Container Layout:', event.nativeEvent.layout);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScreenWrapper backgroundColor={COLORS.white} onLayout={handleContainerLayout}>
        <View style={styles.contents}>
          <SubHeadText>프로필 닉네임을 변경해 보세요!</SubHeadText>

          <Body2 style={styles.nicknameText}>변경할 닉네임</Body2>
          <TextInput
            style={styles.textInput}
            value={nickname}
            onChangeText={handleNicknameChange}
            placeholder="닉네임을 입력해주세요(10자 이내)"
            maxLength={10}
          />
        </View>
        <Image source={require('../../../assets/images/mypage/rename_bottom_bg.png')} style={styles.bottomImage} />
        {bottomButtonSection()}
      </ScreenWrapper>
      
      {/* <TwoButtonBottomSheet
        ref={bottomSheetRef}
        title={bottomSheetState.title}
        message={bottomSheetState.message}
        firstButtonLabel={bottomSheetState.firstButtonLabel}
        secondButtonLabel={bottomSheetState.secondButtonLabel}
        onFirstButtonPress={() => {}}
        onSecondButtonPress={() => {}}
      /> */}
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
    paddingTop: 100,
  },
  nicknameText: {
    paddingTop: 90,
  },
  textInput: {
    paddingTop: 20,
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    fontSize: 16,
    marginBottom: 60,
  },
  buttonSection: {
    position: 'absolute',
    bottom: 42,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    zIndex: 1,
    gap: 11
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

export default ChangeProfileScreen;