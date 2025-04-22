import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Challenge, WishInfoTodo } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText } from '@/app/components/texts';

interface GoalCardProps {
  todo: WishInfoTodo;
  onPress?: (todo: WishInfoTodo) => void;
  isLast?: boolean;
  onToggleStatus?: (todoId: number) => void;
}

export const WishTodoRow = ({ todo, onPress, isLast = false, onToggleStatus }: GoalCardProps) => {
  
  const handleToggle = () => {
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
    <View style={styles.wishTodoRow}>  
        <View style={styles.contents}>
        <TouchableOpacity onPress={handleToggle}>
          <Image
              source={todo.status === 2 
                ? require('../../../../assets/images/mywish/wish_todo_check_off.png')
                : require('../../../../assets/images/mywish/wish_todo_check_on.png')}
              style={styles.todoCheck}
          />
        </TouchableOpacity>
        <Text style={styles.todoTitle}>{todo.title || ''}</Text>
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
  todoCheck: {
    width: 25,
    height: 25,
    marginLeft: 16,
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
});

export default WishTodoRow;
