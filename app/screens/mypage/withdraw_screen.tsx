import { useWithdraw } from '@/hooks/mypasge/useWithdraw';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { Image } from 'expo-image';
import { WithdrawReason } from '@/api/types';
import { Typography } from '@/app/components/texts';
import MainActionButton from '@/app/components/buttons/main_action_button';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TwoButtonBottomSheet from '@/app/components/bottomSheet/two_button_bottomsheet';

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
  } = useWithdraw();

  // 안정적인 참조를 위해 useCallback 사용
  const handleLayout = useCallback((event: any) => {
    console.log('🟡 onLayout 호출됨:', new Date().toISOString());
    console.log('🟡 Layout 정보:', event.nativeEvent.layout);
  }, []);

  const renderReasonItem = ({ item }: { item: WithdrawReason }) => (
    <TouchableOpacity
      style={styles.reasonItem}
      onPress={() => selectReason(item)}
    >
      <Text style={styles.reasonItemText}>{item.reasonDesc}</Text>
    </TouchableOpacity>
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
          <Typography mode="C1" color="white">· 계정 탈퇴 시, </Typography>
          <Typography mode="C1" color="white">· 답변이 필요한 의견은 다운로드 받은 스토어 리뷰로 남겨주세요</Typography>
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

  const reasonModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>탈퇴 사유를 선택해주세요</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedReason(null);
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={withdrawReasonList || []}
            renderItem={renderReasonItem}
            keyExtractor={(item: WithdrawReason) => item.reasonId.toString()}
            style={styles.reasonList}
          />
        </View>
      </View>
    </Modal>
  );

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
       </SafeAreaView>
      {reasonModal()}


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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    lineHeight: 24,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  reasonList: {
    maxHeight: 320,
  },
  reasonItem: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reasonItemText: {
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 22,
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
});

