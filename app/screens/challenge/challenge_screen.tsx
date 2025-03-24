import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useChallengeHome } from '../../../hooks/challenge/useChallengeHome';

const ChallengeScreen = () => {
  const { challengeInfoList, loading } = useChallengeHome();
  console.log(challengeInfoList);

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
