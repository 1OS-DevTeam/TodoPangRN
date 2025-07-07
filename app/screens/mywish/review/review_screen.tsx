import React, { useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useReview } from '../../../../hooks/wish/useReview';
import { SubHeadText, Body1, Body2 } from '@/app/components/texts';
import { COLORS } from '../../../../assets/colors/colors';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { ReviewRow } from './review_row';
import { ReviewResponse } from '@/api/types';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const ReviewScreen = ({ route }: { route: { params: { originChallengeId: number } } }) => {    
    const bottomSheetRef = useRef<BottomSheet>(null);
    
    const {
        reviewList,
        isProcessing,
        updateReview,
        rating,  
        handleRating,
        selectedReview,
        handleReviewSelect,
        isNextButtonEnabled,
        userName
    } = useReview(route.params.originChallengeId);

    const handleNextButtonPress = () => {
        bottomSheetRef.current?.expand();
    };



    const satiesfiedSection = () => {
        return (
            <View style={styles.satisfiedSection}>
                <SubHeadText>만족도 남기기!</SubHeadText>
                <Body1 color={COLORS.darkGrey}>이룬 위시의 만족도를 체크해주세요.</Body1>
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
                                        ? require('../../../../assets/images/mywish/star_fill_review.png')
                                        : require('../../../../assets/images/mywish/star_empty_review.png')
                                }
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    const goalDescroptionSection = () => {
        return (
            <View style={styles.goalDescroptionSection}>
                <SubHeadText>리뷰 남기기!</SubHeadText>
                <Body1 color={COLORS.darkGrey}>이룬 위시를 표현하는 키워드를 골라주세요.</Body1>
            </View>
        )
    }

    const renderItem = ({ item }: { item: ReviewResponse }) => (
        <View style={styles.itemContainer}>
            <ReviewRow 
                review={item} 
                isSelected={selectedReview?.reviewId === item.reviewId}
                onSelect={() => handleReviewSelect(item)}
                disabled={isProcessing}
            />
        </View>
    );

    const reviewListSection = () => {
        return (
            <View style={styles.reviewListSection}>
                <FlatList
                    data={reviewList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.reviewId.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.reviewRow}
                    scrollEnabled={false}
                    contentContainerStyle={styles.reviewListContainer}
                />
            </View>
        )
    }

    const bottomButtonSection = () => {
        return (
          <View style={styles.bottomButtonSection}>
            <MainActionButton 
                disabled={!isNextButtonEnabled} 
                text="다음"
                onClick={handleNextButtonPress} 
            />
          </View>
        );
    };
    
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {satiesfiedSection()}
                    {goalDescroptionSection()}
                    {reviewListSection()}
                </ScrollView>
                {bottomButtonSection()}
                <TwoButtonBottomSheet
                    ref={bottomSheetRef}
                    message={`${userName}님의,\n소중한 리뷰를 등록할까요?`}
                    firstButtonLabel="취소"
                    firstButtonEvent={() => {
                        bottomSheetRef.current?.close();
                    }}
                    secondButtonLabel="등록하기"
                    secondButtonEvent={() => {
                        updateReview();
                        bottomSheetRef.current?.close();
                    }}
                    imageSource={require('../../../../assets/images/mywish/review_register_character.png')}
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

export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
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
    goalDescroptionSection: {
        paddingHorizontal: 16,
        paddingTop: 51,
        gap: 16
    },
    reviewListSection: {
        paddingHorizontal: 16,
        paddingTop: 51,
    },
    reviewListContainer: {
        gap: 8,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    reviewRow: {
        gap: 8,
    },
    bottomButtonSection: {
        height: 74,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
    },

});