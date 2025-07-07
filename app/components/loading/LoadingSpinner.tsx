import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useLoading } from '../../contexts/LoadingContext';

export const LoadingSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#7248E1" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  spinnerContainer: {

  },
}); 