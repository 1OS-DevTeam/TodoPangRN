import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Challenge } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { Body2, C1, Typography } from '@/app/components/texts';

interface GoalCardProps {
  challenge: Challenge;
  getCategoryName: (categoryKey: string | number) => string;
  onPress?: (challenge: Challenge) => void;
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32 - 7 - 8 ) / 2; // 좌우패딩(16*2) - gap(7) / 2

export const ChallengeCard = ({ challenge, getCategoryName, onPress }: GoalCardProps) => {

  const tapWish = () => {
    if (onPress) {
      onPress(challenge);
    }
  };

  const wishContent = (
    <View style={styles.wishCard}>
      <View style={styles.wishCountContainer}>
        <C1 color={COLORS.white}>{getCategoryName(challenge.category)}</C1>
      </View>
      <Body2 numberOfLines={2} ellipsizeMode="tail">{challenge.title}</Body2>
    </View>
  );
  

    return (
    <TouchableOpacity onPress={tapWish}>
      {wishContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wishCard: {
    width: cardWidth,
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 14,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  wishCountContainer: {
    height: 28,
    backgroundColor: COLORS.black,
    opacity: 0.6,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginVertical: 6,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChallengeCard;
