import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useReview } from '../../../../hooks/wish/useReview';
import { HeadText } from '@/app/components/texts';
import { COLORS } from '../../../../assets/colors/colors';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { ReviewRow } from './review_row';
import { ReviewResponse } from '@/api/types';

const ReviewScreen = () => {
    const {
        reviewList,
        loading,
        isProcessing,
        loadingTodoId,
        updateReview,
        rating,
        hasRated,
        handleRating
    } = useReview();

    const satiesfiedSection = () => {
        return (
            <View style={styles.satisfiedSection}>
                <HeadText>만족도 Check!</HeadText>
                <Text style={{fontSize: 18, color: COLORS.darkGrey}}>해당 템플릿 만족도를 체크해줘!</Text>
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleRating(index)}
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
                <HeadText>목표 키워드</HeadText>
                <Text style={{fontSize: 18, color: COLORS.darkGrey}}>
                    키워드를 골라주세요 (1개)
                </Text>

            </View>
        )
    }

    const renderItem = ({ item }: { item: ReviewResponse }) => (
        <View style={styles.itemContainer}>
            <ReviewRow review={item} />
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
            <MainActionButton text="다음" onClick={() => {}} />
          </View>
        );
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {satiesfiedSection()}
                {goalDescroptionSection()}
                {reviewListSection()}
            </ScrollView>
            {bottomButtonSection()}
        </SafeAreaView>
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
    ratingText: {
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.darkGrey,
        marginTop: 8
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
    }
});