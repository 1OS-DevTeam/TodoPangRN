import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Image } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { useChangeProfile } from '../../../hooks/mypasge/useChangeProfile';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Body2, SubHeadText, C1, Typography } from '@/app/components/texts';
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
    handleCloseBottomSheet,
  } = useChangeProfile();
  
  const bottomButtonSection = () => {
    return (
      <View style={styles.buttonSection}>
        <MainActionButton 
          text="닉네임 변경하기" 
          onClick={() => tapChangeButton()} 
          disabled={!nickname.trim() || loading}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScreenWrapper backgroundColor={COLORS.white}>
        <View style={styles.contents}>
          <Typography mode='SubHead' color='black'>프로필 닉네임을 변경해 보세요!</Typography>
          <Typography mode='Body2' color='black' style={styles.nicknameText}>변경할 닉네임</Typography>
          <TextInput
            style={styles.textInput}
            value={nickname}
            onChangeText={handleNicknameChange}
            placeholder="닉네임을 입력해주세요(10자 이내)"
            maxLength={10}
          />
          <Typography mode='C1' color='grey'>· 변경 후 10일 간 재변경이 불가능합니다</Typography>
        </View>
        <Image source={require('../../../assets/images/mypage/rename_bottom_bg.png')} style={styles.bottomImage} />
        {bottomButtonSection()}
      </ScreenWrapper>
      
      <TwoButtonBottomSheet
        ref={bottomSheetRef}
        title={`"${nickname}"\n닉네임을 변경하시겠습니까?`}
        message={'변경 후 10일강은 재변경이 불가능해요!'}
        imageSource={require('../../../assets/images/mywish/mywish_character.png')}
        imageStyle={{ width: 160, height: 160 }}
        firstButtonLabel={'취소하기'}
        firstButtonEvent={() => {handleCloseBottomSheet()}}
        secondButtonLabel={'변경하기'}
        secondButtonEvent={() => {handleChangeName(nickname)}}
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
    marginBottom: 4,
  },
  buttonSection: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 18,
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