import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ReviewResponse } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';
import { CaptionText, SectionTitleText } from '@/app/components/texts';

interface ReviewRowProps {
    review: ReviewResponse;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAX_WIDTH = SCREEN_WIDTH / 2;

const convertEmojiNumber = (emojiNumber: number): string => {
    const emojiMap: { [key: number]: string } = {
        1: '🌟',
        2: '🎯',
        3: '💪',
        4: '🏃',
        5: '📚',
        6: '🎨',
        7: '🎵',
        8: '💡',
        9: '🌱',
        10: '⚡️',
        11: '🔥',
        12: '✨'
    };
    
    return emojiMap[emojiNumber] || '🎯';
};

export const ReviewRow = ({ review }: ReviewRowProps) => {
    return (
        <TouchableOpacity style={styles.reviewRow}>
            <View style={styles.contentContainer}>
                <Text style={styles.emojiText}>{convertEmojiNumber(review.emoji)}</Text>
                <Text style={styles.reviewRowText} numberOfLines={1}>{review.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    reviewRow: {
        alignSelf: 'flex-start',
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.whiteGrey,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    reviewRowText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    emojiText: {
        fontSize: 16,
    }
});

export default ReviewRow;


