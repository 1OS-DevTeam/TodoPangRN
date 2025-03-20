import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeService } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const loginResponse = await HomeService.getHome(userId);
        }
      } catch (error) {
        console.error('로그인 오류:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
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

export default HomeScreen;