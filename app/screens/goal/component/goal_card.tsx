import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Challenge } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText } from '@/app/components/texts';

interface GoalCardProps {
  challenge: Challenge;
  onPress?: (challenge: Challenge) => void;
}

export const GoalCard = ({ challenge, onPress }: GoalCardProps) => {
  const difficultyText = challenge.diff === 1 ? '쉬움' : challenge.diff === 2 ? '보통' : '어려움';
  
  return (
    <TouchableOpacity 
      style={styles.challengeCard} 
      activeOpacity={0.7}
      onPress={() => onPress && onPress(challenge)}
    >
        <View style={styles.challengeCardHeader}>   
            <SectionTitleText>{challenge.title}</SectionTitleText>
            <CaptionText color={COLORS.mainPurple}>난이도: {difficultyText}</CaptionText>
        </View>
      <View style={styles.challengeCardInfo}>
        <Text style={styles.challengeCardPopularity}>도전중: {challenge.popularity}명</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  challengeCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 4,
    paddingTop: 12,
    paddingLeft: 8,
    minHeight: 158,
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android 그림자
    elevation: 4,
    margin: 1, // 그림자가 잘리지 않도록 여백 추가
  },
  challengeCardHeader: {
    gap: 4,
  },
  challengeCardInfo: {
    gap: 4,
  },
  challengeCardDifficulty: {
    fontSize: 12,
    color: COLORS.mainPurple,
  },
  challengeCardPopularity: {
    fontSize: 12,
    color: COLORS.darkGrey,
  },
});

export default GoalCard;
