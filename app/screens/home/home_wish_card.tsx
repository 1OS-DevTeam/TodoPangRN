import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../../assets/colors/colors';  
import { Body2, C1 } from '../../components/texts';
import { PopularChallenge } from '../../../api/types';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32 - 7) / 2; // 좌우패딩(16*2) - gap(7) / 2


interface HomeWishCardProps {
  wish: PopularChallenge;
  onPress?: (menu: PopularChallenge) => void;
}

export const HomeWishCard = ({ wish, onPress}: HomeWishCardProps) => {
  const tapWish = () => {
    if (onPress) {
      onPress(wish);
    }
  };
  
  const wishContent = (
    <View style={styles.wishCard}>
      <Body2 numberOfLines={2} ellipsizeMode="tail">{wish.title}</Body2>
      <View style={styles.wishCountContainer}>
        <C1 color={COLORS.white}>🙏 {wish.popularity}명의 위시</C1>
      </View>
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
    height: 101,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 14,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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

export default HomeWishCard;