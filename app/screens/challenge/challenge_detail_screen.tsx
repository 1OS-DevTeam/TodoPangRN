import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadText, SectionTitleText, CaptionText, SubHeadText } from '@/app/components/texts';
import { COLORS } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native';
import { useUserChallengeDetail } from '../../../hooks/challenge/userChallengeDetail';
import ChallengeCard from './component/challenge_card';

export const ChallengeDetailScreen = ({ route }: { route: { params: { challengeId: string } } }) => {
  const {
    challengeDetail,
    loading,
  } = useUserChallengeDetail(route.params.challengeId);

  const titleSection = () => {
    return (
      <View style={styles.titleSection}>
        <Text style={styles.currentChallengeText}>현재 42명이 도전중이에요!</Text>
        <SubHeadText>스위스의 자연 탐험가처럼</SubHeadText>
      </View>
    );  
  };

  const boxeSection = () => {
    return (
      <View style={styles.boxesSection}>

      </View>
    );
  };

  const todoListSection = () => {
    return (
      <View style={styles.todoListSection}>

      </View>
    );
  };

  const reviewSection = () => {
    return (
      <View style={styles.reviewSection}>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {titleSection()}
        {boxeSection()}
        {todoListSection()}
        {reviewSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  currentChallengeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  boxesSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  todoListSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },  
  reviewSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});