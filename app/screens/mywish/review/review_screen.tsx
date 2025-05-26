import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';
import { useReview } from '../../../../hooks/wish/useReview';
import { HeadText } from '@/app/components/texts';
import { COLORS } from '../../../../assets/colors/colors';

const ReviewScreen = () => {

    const {
        reviewList,
        loading,
        isProcessing,
        loadingTodoId,
        updateReview
    } = useReview();
    
    return (
        <View>
            <Text>ReviewScreen</Text>
        </View>
    )
}

export default ReviewScreen;