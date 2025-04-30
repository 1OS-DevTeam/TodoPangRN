import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Challenge, WishInfoTodo } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText } from '@/app/components/texts';

interface GoalCardProps {
  todo: WishInfoTodo;
  onPress?: (todo: WishInfoTodo) => void;
  isLast?: boolean;
  onToggleStatus?: (todoId: number) => void;
  isLoading?: boolean;
}

export const WishTodoRow = ({ todo, onPress, isLast = false, onToggleStatus, isLoading }: GoalCardProps) => {
  
  const handleToggle = () => {
    if (isLoading) return;
    if (onToggleStatus) {
      onToggleStatus(todo.todoId);
    }
  };

  const tapTodoMenu = () => {
    if (onPress) {
      onPress(todo);
    }
  };
  
  const renderCheckbox = () => {
    if (isLoading) {
      return (
        <View style={styles.checkboxContainer}>
          <ActivityIndicator size="small" color={COLORS.mainPurple} />
        </View>
      );
    }

    return (
      <Image
        source={todo.status === 2 
          ? require('../../../../assets/images/mywish/wish_todo_check_off.png')
          : require('../../../../assets/images/mywish/wish_todo_check_on.png')}
        style={styles.todoCheck}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
    );
  };
  
  return (
    <View style={styles.wishTodoRow}>  
      <View style={styles.contents}>
        <TouchableOpacity 
          onPress={handleToggle}
          disabled={isLoading}
          style={styles.checkboxTouchable}
        >
          {renderCheckbox()}
        </TouchableOpacity>
        <Text style={styles.todoTitle}>{todo.title || ''}</Text>
        <Image
          source={require('../../../../assets/images/mywish/wish_todo_menu.png')}
          style={styles.todoMenu}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
      </View>
      {!isLast && (
        <TouchableOpacity onPress={tapTodoMenu}>
          <Image 
            source={require('../../../../assets/images/challenge/todolist_divider.png')} 
            style={styles.divider}
            contentFit="contain"
            cachePolicy="memory-disk"
          /> 
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wishTodoRow: {
    width: '100%',
    flexDirection: 'column',
    height: 66,
    justifyContent: 'space-between',
  },
  todoCheck: {
    width: 25,
    height: 25,
  },
  checkboxContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTouchable: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#1E1E1E',
    paddingLeft: 8,
  },
  todoMenu: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 16,
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 'auto',
  },
});

export default WishTodoRow;