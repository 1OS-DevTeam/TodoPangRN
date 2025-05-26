import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useReview } from '../../../../hooks/wish/useReview';
import { HeadText } from '@/app/components/texts';
import { COLORS } from '../../../../assets/colors/colors';

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
    
    return (
        <SafeAreaView style={styles.container}>
            {satiesfiedSection()}
        </SafeAreaView>
    )
}

export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});