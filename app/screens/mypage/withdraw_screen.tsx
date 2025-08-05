import { useWithdraw } from '@/hooks/mypasge/useWithdraw';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { Image } from 'expo-image';
import { WithdrawReason } from '@/api/types';
import { Typography } from '@/app/components/texts';
import MainActionButton from '@/app/components/buttons/main_action_button';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TwoButtonBottomSheet from '@/app/components/bottomSheet/two_button_bottomsheet';
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const WithdrawScreen = () => {
  console.log('🔥 WithdrawScreen 렌더링됨');

  const { 
    isProcessing,
    buttonEnabled,
    withdrawReasonList,
    bottomSheetRef,
    bottomSheetState,
    userName,
    selectedReason,
    setSelectedReason,
    setBottomSheetState,
    setModalVisible,
    tapCancelButton,
    handleWithdraw,
    showMenu,
    selectReason,
    modalVisible,
    tapWithdrawButton,
    // BottomSheet 관련 추가
    reasonBottomSheetRef,
  } = useWithdraw();



  // 안정적인 참조를 위해 useCallback 사용
  const handleLayout = useCallback((event: any) => {
    console.log('🟡 onLayout 호출됨:', new Date().toISOString());
    console.log('🟡 Layout 정보:', event.nativeEvent.layout);
  }, []);

  // BottomSheet backdrop 렌더링
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );


  
  const descriptionSection = () => {
    return (
      <View style={styles.descriptionSection}>
        <Typography mode='SubHead' color='mainPurple'>{userName}님</Typography>
        <Typography mode='SubHead' color='mainPurple'>항상 함께하고 싶었는데 떠니사나요..?😢</Typography>
      </View>
    );
  };

  const selectReasonSection = () => {
    return (
      <View style={styles.selectReasonSection}>
        <Typography mode='Body2_bold' >투두팡을 떠나시는 이유가 궁금해요...😭</Typography>
        <TouchableOpacity style={styles.selectReasonBox} onPress={showMenu}>
          <Text style={selectedReason ? styles.selectedReasonText : styles.placeholderText}>
            {selectedReason?.reasonDesc || '선택해주세요'}
          </Text>
          <Image source={require('@/assets/images/mypage/chevron_down.png')} style={styles.selectReasonBoxImage} />
        </TouchableOpacity>
        
        
      </View>
    );
  };

  const bottomButtonSection = () => {
    return (
      <View style={styles.bottomButtonSection}>
        <View style={styles.buttonDescription}>
          <Typography mode="C1" color="white">· 계정 탈퇴 시, 모든 앱 서비스 활동 정보가 삭제됩니다.</Typography>
          <Typography mode="C1" color="white">· 이후 재가입 시, 기존 정보에 대한 복구는 불가능합니다.</Typography>
        </View>
        <MainActionButton 
            disabled={!selectedReason || isProcessing} 
            text="회원 탈퇴하기"
            onClick={tapWithdrawButton} 
        />
        {/* {isProcessing && (
            <View style={styles.processingSpinner}>
                <ActivityIndicator size="small" color={COLORS.mainPurple} />
            </View>
        )} */}
      </View>
    );
  };





  return (
    <GestureHandlerRootView style={styles.container} onLayout={handleLayout}>
      <SafeAreaView style={styles.container}> 
        <ScrollView >
          <View style={styles.topSection}>
            {descriptionSection()}
            {selectReasonSection()}   
          </View>

        </ScrollView>
        <Image source={require('../../../assets/images/mypage/rename_bottom_bg.png')} style={styles.bottomImage} />
        {bottomButtonSection()}

            {/* 등록 확인 바텀시트 */}
            <TwoButtonBottomSheet
              ref={bottomSheetRef}
              title={`${userName}님,\n그동안 감사했습니다!`}
              message={`다음번에 다시 만나기를 기대하고 있겠습니다!`}
              firstButtonLabel="탈퇴 취소하기"
              firstButtonEvent={() => {
                bottomSheetRef.current?.close();
              }}
              secondButtonLabel="탈퇴 완료하기"
              secondButtonEvent={handleWithdraw}
              imageSource={require('@/assets/images/mypage/onboarding_step3.png')}
              imageStyle={{ width: 150, height: 150 }}
            />

            {/* 사유 선택 BottomSheet */}
            <BottomSheet
              ref={reasonBottomSheetRef}
              index={-1}
              snapPoints={['40%']}
              enablePanDownToClose={true}
              backdropComponent={renderBackdrop}
            >
              <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.bottomSheetTitle}>탈퇴 사유를 선택해주세요</Text>
                <BottomSheetScrollView style={styles.bottomSheetScrollView}>
                  {withdrawReasonList?.map((item) => (
                    <TouchableOpacity
                      key={item.reasonId}
                      style={styles.bottomSheetItem}
                      onPress={() => {
                        setSelectedReason(item);
                        reasonBottomSheetRef.current?.close();
                      }}
                    >
                      <Text style={styles.bottomSheetItemText}>
                        {item.reasonDesc}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </BottomSheetScrollView>
              </BottomSheetView>
            </BottomSheet>
       </SafeAreaView>


    </GestureHandlerRootView>
  );
};  

export default WithdrawScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contents: {
    flex: 1,
    // backgroundColor: COLORS.mainBlue,
    // justifyContent: 'space-between',
    // paddingHorizontal: 20,
    paddingVertical: 20,
    // backgroundColor: 'red',
  },
  topSection: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  descriptionSection: {
    backgroundColor: COLORS.white,

  },
  selectReasonSection: {
    paddingTop: 100,
    backgroundColor: COLORS.white,
    gap: 7,
  },
  selectReasonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    paddingHorizontal: 16,
    height: 40,
  },
  selectReasonBoxImage: {
    width: 28,
    height: 28,
    tintColor: '#999999',
  },
  selectedReasonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
  },
  placeholderText: {
    color: '#999999',
    fontSize: 16,
    fontWeight: '400',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  bottomSection: {
    marginTop: 'auto',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  overlayButtonSection: {
    position: 'absolute',
    bottom: 50, // 이미지 하단에서 50px 위에 배치
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  bottomButtonSection: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 13,
  },
  buttonDescription: {
      
  },
  processingSpinner: {
    position: 'absolute',
    right: 40,
  },
  bottomImage: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    resizeMode: 'stretch',
    height: 300,
  },
  bottomFixedSection: {
    marginTop: 'auto',
  },

  // BottomSheet 스타일
  bottomSheetContainer: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bottomSheetScrollView: {
    flex: 1,
  },
  bottomSheetItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: COLORS.white,
  },
  bottomSheetItemText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 18,
  },
});

