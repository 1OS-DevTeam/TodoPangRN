import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
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
    console.log('handleToggle', todo.todoId);
    if (onToggleStatus) {
      onToggleStatus(todo.todoId);
    }
  };

  const tapTodoMenu = () => {
    if (onPress) {
      onPress(todo);
    }
  };
  
  return (
    <View style={[styles.wishTodoRow, !isLast && styles.borderBottom]}>  
        <View style={styles.contents}>
        <TouchableOpacity 
          style={styles.checkbox}
          onPress={handleToggle}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.mainPurple} />
          ) : (
            <View style={[
              styles.checkboxInner,
              todo.status === 2 && styles.checkboxChecked
            ]} />
          )}
        </TouchableOpacity>
        <Text style={[
          styles.todoTitle,
          todo.status === 2 && styles.todoTextCompleted
        ]}>{todo.title || ''}</Text>
        <Image
            source={require('../../../../assets/images/mywish/wish_todo_menu.png')}
            style={styles.todoMenu}
        />
        </View>
        {!isLast && (
        <TouchableOpacity onPress={tapTodoMenu}>
            <Image 
                source={require('../../../../assets/images/challenge/todolist_divider.png')} 
                style={styles.divider}
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
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGrey,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  checkboxChecked: {
    backgroundColor: COLORS.mainPurple,
  },
  todoTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#1E1E1E',
    paddingLeft: 16,
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
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.grey,
  },
});

export default WishTodoRow;
