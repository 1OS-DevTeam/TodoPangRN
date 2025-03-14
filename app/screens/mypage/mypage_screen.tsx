import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export const MyPageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>My Page</Text>
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

export default MyPageScreen;