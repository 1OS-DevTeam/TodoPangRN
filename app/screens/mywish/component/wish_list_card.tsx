import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { WishInfoChallenge, WishCompleteRequest, WishInfoTodo } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText } from '@/app/components/texts';
import { WishTodoRow } from './wish_todo_row';

interface WishCardProps {
  challenge: WishInfoChallenge;
  onPress?: (challenge: WishInfoChallenge) => void;
  handleTodoToggle?: (todoId: number) => void;
  handleWishComplete?: (challenge: WishInfoChallenge) => void;
  isLoading?: boolean;
  loadingTodoId?: number;
  handleTodoDelete?: (todo: WishInfoTodo) => void;
}

export const WishListCard = ({ 
  challenge, 
  onPress, 
  handleTodoToggle, 
  handleWishComplete,
  isLoading,
  loadingTodoId,
  handleTodoDelete
}: WishCardProps) => {

  // 모든 todo가 완료되었는지 확인하는 함수
  const isAllTodosCompleted = () => {
    if (challenge.todoList.length === 0) return false;
    return challenge.todoList.every(todo => todo.status === 1);
  };

  const wishHeaderSection = () => {
    const allCompleted = isAllTodosCompleted();
    
    return (
      <View style={styles.wishHeaderSection}>
          <Text style={styles.wishHeaderText}>{challenge.challengeName}</Text>
          <TouchableOpacity 
            style={[
              styles.wishCompleteButton,
              !allCompleted && styles.wishCompleteButtonDisabled
            ]}
            onPress={() => handleWishComplete?.(challenge)}
            disabled={isLoading || !allCompleted}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.mainPurple} />
            ) : (
              <Text style={[
                styles.wishCompleteButtonText,
                !allCompleted && styles.wishCompleteButtonTextDisabled
              ]}>이루기</Text>
            )}
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
            onToggleStatus={handleTodoToggle}
            isLoading={loadingTodoId === todo.todoId}
            handleTodoDelete={handleTodoDelete}
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
    marginTop: 6,
    flexDirection: 'row',
    height: 34,
    alignItems: 'center',
  },
  todoListSection: {
    paddingTop: 8,
  },
  wishHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
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
    width: 61,
    height: 30,
    position: 'absolute',
    right: 18,
  },
  wishCompleteButtonDisabled: {
    backgroundColor: '#D9D9D9',
  },
  wishCompleteButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'regular',
  },
  wishCompleteButtonTextDisabled: {
    color: '#1E1E1E',
  },
});

export default WishListCard;
