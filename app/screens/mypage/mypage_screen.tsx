import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyPageScreen;