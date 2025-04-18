import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useWishHome } from '../../../hooks/wish/useWishHome';

const GoalScreen = () => {
  const { wishInfoList, loading } = useWishHome();
  console.log('위시 정보:', wishInfoList);

  return (
    <SafeAreaView style={styles.container}>
      <Text>goal Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default GoalScreen;
