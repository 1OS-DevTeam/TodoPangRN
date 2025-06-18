import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Challenge, WishInfoTodo } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText, Body3 } from '@/app/components/texts';
import { Swipeable } from 'react-native-gesture-handler';

interface GoalCardProps {
  todo: WishInfoTodo;
  onPress?: (todo: WishInfoTodo) => void;
  isLast?: boolean;
  onToggleStatus?: (todoId: number) => void;
  isLoading?: boolean;
  handleTodoDelete?: (todo: WishInfoTodo) => void;
}

export const WishTodoRow = ({ todo, onPress, isLast = false, onToggleStatus, isLoading, handleTodoDelete }: GoalCardProps) => {
  
  const handleToggle = () => {  
    if (isLoading) return;
    if (onToggleStatus) {
      onToggleStatus(todo.todoId);
    }
  };

  const handleDeleteTodo = () => {
    if (isLoading) return;
    if (handleTodoDelete) {
      handleTodoDelete(todo);
    }
  }

  const tapTodoMenu = () => {
    if (onPress) {
      onPress(todo);
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [0, 120],
    });

    return (
      <Animated.View 
        style={[
          styles.rightAction,
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleTodoDelete?.(todo)}
        >
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>
      </Animated.View>
    );
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
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
      <View style={styles.wishTodoRow}>  
        <View style={styles.contents}>
          <TouchableOpacity 
            onPress={handleToggle}
            disabled={isLoading}
            style={styles.checkboxTouchable}
          >
            {renderCheckbox()}
          </TouchableOpacity>
          <Body3 style={styles.todoTitle}>{todo.title || ''}</Body3>
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
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  wishTodoRow: {
    width: '100%',
    flexDirection: 'column',
    height: 66,
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#1E1E1E',
    paddingLeft: 11,
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
  rightAction: {
    width: 120,
    height: '100%',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WishTodoRow;