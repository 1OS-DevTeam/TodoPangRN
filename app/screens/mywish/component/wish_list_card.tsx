import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WishInfoChallenge } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText } from '@/app/components/texts';
import { WishTodoRow } from './wish_todo_row';

interface WishCardProps {
  challenge: WishInfoChallenge;
  onPress?: (challenge: WishInfoChallenge) => void;
}

export const WishListCard = ({ challenge, onPress }: WishCardProps) => {

  const wishHeaderSection = () => {
    return (
      <View style={styles.wishHeaderSection}>
          <Text style={styles.wishHeaderText}>{challenge.challengeName}</Text>
          <TouchableOpacity style={styles.wishCompleteButton}>
            <Text style={styles.wishCompleteButtonText}>이루기</Text>
          </TouchableOpacity>
      </View>
    );
  };

  const todoListSection = () => {
    if (challenge.todoList.length === 0) {
      return (
        <View style={styles.todoListSection}>
            <Text>없음</Text>
        </View>
      );
    }
    return (
      <View style={styles.todoListSection}>
        {challenge.todoList.map((todo, index) => (
          <WishTodoRow 
            key={todo.todoId} 
            todo={todo} 
            isLast={index === challenge.todoList.length - 1} 
          />
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.wishListCard}>  
      {wishHeaderSection()}
      {todoListSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  wishListCard: {
    width: '100%',
  },
  wishHeaderSection: {
    flexDirection: 'row',
    height: 34,
    alignItems: 'center',
  },
  todoListSection: {
    paddingTop: 8,
  },
  wishHeaderText: {
    fontSize: 17,
    fontWeight: 'regular',
    color: '#1E1E1E',
    marginLeft: 16,
  },
  wishCompleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(114, 72, 225, 0.3)',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 78,
    height: 32,
    position: 'absolute',
    right: 18,
  },
  wishCompleteButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'regular',
  },
});

export default WishListCard;
