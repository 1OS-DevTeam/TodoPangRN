import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ChallengeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Challenge Screen</Text>
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

export default ChallengeScreen;
