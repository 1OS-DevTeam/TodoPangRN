import React, { useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { Typography } from '@/app/components/texts';
import { COLORS } from '../../../assets/colors/colors';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFeedback } from '@/hooks/mypasge/useFeedback';

export const FeedbackScreen = () => {
  const { 
    loading,
    isProcessing,
    rating,
    hasRated,
    isNextButtonEnabled,
    feedback,
    bottomSheetRef,
    bottomSheetState,
    tapRegisterButton,
    handleFeedbackRegister,
    handleCloseBottomSheet,
    handleRating,
    handleFeedbackTextChange,
  } = useFeedback();
  
  const handleNextButtonPress = () => {
    bottomSheetRef.current?.expand();
};

if (loading) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.mainPurple} />
            </View>
        </SafeAreaView>
    );
}

const satiesfiedSection = () => {
    return (
        <View style={styles.satisfiedSection}>
            <Typography mode="SubHead">투두팡에 대한 의견을 남겨주세요!</Typography>
            <Typography mode="Body1">1. 전반적인 서비스 만족도를 알려주세요!</Typography>
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleRating(index)}
                        disabled={isProcessing}
                    >
                        <Image 
                            source={
                                index <= rating
                                    ? require('../../../assets/images/mywish/star_fill_review.png')
                                    : require('../../../assets/images/mywish/star_empty_review.png')
                            }
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const feedbackSection = () => {
    return (
        <View style={styles.feedbackDescription}>
            <Typography mode="Body1">2. 투두팡에 대한 의견을 자유롭게 남겨주세요!</Typography>
            <View style={styles.feedbackInputContainer}>
                <TextInput
                    style={styles.feedbackInput}
                    placeholder="답변을 적어주세요 (최대 200자)"
                    placeholderTextColor={COLORS.grey}
                    value={feedback}
                    onChangeText={handleFeedbackTextChange}
                    multiline={true}
                    textAlignVertical="top"
                    maxLength={200}
                />
                <View style={styles.characterCountContainer}>
                    <Typography mode="C1" style={{ color: COLORS.grey }}>
                        {feedback.length}/200
                    </Typography>
                </View>
            </View>
        </View>
    )
}

const bottomButtonSection = () => {
    return (
      <View style={styles.bottomButtonSection}>
        <View style={styles.buttonDescription}>
          <Typography mode="C1" color="white">· 의견 남기기는 1달에 1번만 가능합니다!</Typography>
          <Typography mode="C1" color="white">· 보내주신 의견에 대해서 별도로 답변을 드리지는 않아요</Typography>
          <Typography mode="C1" color="white">· 답변이 필요한 의견은 다운로드 받은 스토어 리뷰로 남겨주세요</Typography>
        </View>
        <MainActionButton 
            disabled={false || isProcessing} 
            text="의견 등록하기"
            onClick={handleNextButtonPress} 
        />
        {isProcessing && (
            <View style={styles.processingSpinner}>
                <ActivityIndicator size="small" color={COLORS.mainPurple} />
            </View>
        )}
      </View>
    );
};

return (
    <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {satiesfiedSection()}
                {feedbackSection()}
            </ScrollView>
            <Image source={require('../../../assets/images/mypage/rename_bottom_bg.png')} style={styles.bottomImage} />
            {bottomButtonSection()}
            <TwoButtonBottomSheet
                ref={bottomSheetRef}
                message={`소중한 의견을 남겨주세요!`}
                firstButtonLabel="취소"
                firstButtonEvent={() => {
                    bottomSheetRef.current?.close();
                }}
                secondButtonLabel="등록하기"
                secondButtonEvent={() => {
                    bottomSheetRef.current?.close();
                }}
                imageSource={require('../../../assets/images/mywish/review_register_character.png')}
                imageStyle={{ width: 165, height: 183 }}
                messageStyle={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: COLORS.mainPurple,
                    textAlign: 'center',
                    lineHeight: 24
                }}
            />
        </SafeAreaView>
    </GestureHandlerRootView>
  ) 
}

export default FeedbackScreen;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: COLORS.white,
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
satisfiedSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16
},
starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
},
feedbackDescription: {
    paddingHorizontal: 16,
    paddingTop: 39,
},
feedbackInputContainer: {
    marginTop: 8,
    height: 124
},
feedbackInput: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 120,
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    textAlignVertical: 'top',
},
characterCountContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
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
},
});