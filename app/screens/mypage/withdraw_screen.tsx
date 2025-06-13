import { useWithdraw } from '@/hooks/mypasge/useWithdraw';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { Image } from 'expo-image';
import { WithdrawReason } from '@/api/types';

const WithdrawScreen = () => {

  const { 
    withdrawReasonList, 
    loading, 
    bottomSheetRef, 
    bottomSheetState, 
    tapCancelButton,
    handleSubmit,
  } = useWithdraw();

  const [selectedReason, setSelectedReason] = useState<WithdrawReason | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showMenu = () => {
    // if (!withdrawReasonList || withdrawReasonList.reasonList.length === 0) return;
    setModalVisible(true);
  };

  const selectReason = (reason: WithdrawReason) => {
    setSelectedReason(reason);
    setModalVisible(false);
  };

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
        <Text style={styles.descriptionTitleText}>OOO님과 항상 함께하고 싶었는데 떠나시나요?😢</Text>
        <Text style={styles.descriptionSubText}>계정을 탈퇴하면 모든 활동 정보가 삭제됩니다.</Text>
      </View>
    );
  };

  const selectReasonSection = () => {
    return (
      <View style={styles.selectReasonSection}>
        <Text style={styles.selectReasonTitle}>OOO님이 투두팡을 떠나는 이유가 궁금해요</Text>
        <TouchableOpacity style={styles.selectReasonBox} onPress={showMenu}>
          <Text style={selectedReason ? styles.selectedReasonText : styles.placeholderText}>
            {selectedReason?.reasonDesc || '선택해주세요'}
          </Text>
          <Image source={require('@/assets/images/mypage/chevron_down.png')} style={styles.selectReasonBoxImage} />
        </TouchableOpacity>
      </View>
    );
  };

  const buttonSection = () => {
    return (
      <View style={styles.buttonSection}>
        <View style={styles.buttonSectionText}>
          <Text style={styles.farewellText}>말씀해주신 소중한 의견을 반영하여 더 따뜻한 서비스를 만들어 가도록 노력할게요.</Text>
          <Text style={styles.farewellText}>언제나 이 자리에서 기다리고 있을게요. 언제든지 돌아와 주세요. 지금까지 함께여서 진심으로 행복했어요.</Text>
        </View>
        <View style={styles.buttonSectionButton}>
          <TouchableOpacity style={styles.cancelButton} onPress={tapCancelButton}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(selectedReason?.reasonId ?? 0)}>
            <Text style={styles.submitButtonText}>제출</Text>
          </TouchableOpacity>
        </View>
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
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={withdrawReasonList}
            renderItem={renderReasonItem}
            keyExtractor={(item) => item.reasonId.toString()}
            style={styles.reasonList}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.contents}>
        {descriptionSection()}
        {selectReasonSection()}
        {selectedReason && buttonSection()}
        {reasonModal()}
      </View>
    </SafeAreaView>
  );
};  

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contents: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 32,
  },
  descriptionSection: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  descriptionTitleText: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 26,
  },
  descriptionSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectReasonSection: {
    backgroundColor: COLORS.white,
    gap: 16,
  },
  selectReasonTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    lineHeight: 22,
  },
  selectReasonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },
  selectReasonBoxImage: {
    width: 24,
    height: 24,
    tintColor: '#999999',
  },
  buttonSection: {
    backgroundColor: COLORS.white,
    gap: 20,
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
  buttonSectionText: {
    backgroundColor: COLORS.white,
    gap: 8,
  },
  farewellText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonSectionButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.mainPurple,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: COLORS.mainPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  submitButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default WithdrawScreen;