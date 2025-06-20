import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, StatusBar, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadText, SectionTitleText, CaptionText, SubHeadText } from '@/app/components/texts';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { COLORS } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native';
import { useUserChallengeDetail } from '../../../hooks/challenge/userChallengeDetail';
import ChallengeCard from './component/challenge_card';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';
import { useRouter } from 'expo-router';

export const ChallengeDetailScreen = ({ route }: { route: { params: { challengeId: string } } }) => {
  const router = useRouter();

  const {
    challengeDetail,
    loading,
    handleRegister
  } = useUserChallengeDetail(route.params.challengeId);

  const showSuccessAlert = () => {
    Alert.alert(
      '성공',
      '도전과제가 성공적으로 등록되었습니다!',
      [
        {
          text: '확인',
          onPress: () => router.back()
        }
      ]
    );
  };

  const showErrorAlert = (message: string) => {
    Alert.alert(
      '오류',
      message,
      [
        {
          text: '확인',
          style: 'default'
        }
      ]
    );
  };

  const onRegister = () => {
    handleRegister(showSuccessAlert, showErrorAlert);
  };

  const titleSection = () => {
    return (
      <View style={styles.titleSection}>
        <Text style={styles.currentChallengeText}>💪🏻 현재 {challengeDetail?.popularity}명이 도전중이에요!</Text>
        <SubHeadText>{challengeDetail?.title}</SubHeadText>
      </View>
    );  
  };

  const boxeSection = () => {
    return (
      <View style={styles.boxesSection}>
        <View style={styles.boxesContainer}>
          <View style={styles.box}>
            <Text style={styles.boxTitleText}>카테고리</Text>
            <Text style={styles.boxValueText}>{challengeDetail?.category}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitleText}>기간</Text>
            <Text style={styles.boxValueText}>{challengeDetail?.term}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitleText}>난이도</Text>
            <Text style={styles.boxValueText}>{challengeDetail?.diff}</Text>
          </View>
        </View>
      </View>
    );
  };

  const todoListSection = () => {
    return (
      <View style={styles.todoListSection}>
        <SectionTitleText color={COLORS.mainPurple} >아래 할 일들을 완료해보세요!</SectionTitleText>
        <View style={styles.todoListContainer}>
          {challengeDetail?.todoList.map((todo) => (
            <View style={styles.todoItem}>
              <Image 
                source={require('../../../assets/images/challenge/todolist_divider.png')} 
                style={{
                  width: '100%',
                  height: 1,
                }}
              />  
              <Text style={styles.todoItemTitle}>{todo.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const reviewSection = () => {
    return (
      <View style={styles.reviewSection}>
        <SectionTitleText color={COLORS.mainPurple} >목표를 이룬 사람들의 한마디</SectionTitleText>
        <View style={styles.reviewContainer}>
          {challengeDetail?.reviewList.map((review) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewItemTitle}>"{review.desc}"</Text>
              <Text style={styles.reviewItemCount}>{review.count}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const bottomButtonSection = () => {
    return (
      <View style={styles.bottomButtonSection}>
        <MainActionButton text="등록하기" onClick={onRegister} />
      </View>
    );
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.mainPurple} />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {titleSection()}
            {boxeSection()}
            {todoListSection()}
            {reviewSection()}
          </ScrollView>
          {bottomButtonSection()}
        </View>
              )}
      </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 4,
  },
  currentChallengeText: {
    fontSize: 12,
    fontWeight: 'regular',
    color: COLORS.mainBlue,
  },
  boxesSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    height: 83,
    width: '30%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  boxTitleText: {
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.mainPurple,
    paddingTop: 9,
  },
  boxValueText: {
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.darkGrey,
    paddingTop: 14, 
  },
  todoListSection: {
    paddingHorizontal: 20,
    paddingTop: 43,
  },  
  todoListContainer: {
    paddingTop: 24,
  },
  reviewSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  todoItem: {
    height: 50,   
  },
  todoItemTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.black,
    paddingLeft: 56,
    paddingTop: 18,
    paddingRight: 12
  },
  todoItemDescription: {
    fontSize: 14, 
    color: COLORS.darkGrey,
  },
  reviewContainer: {
    paddingTop: 24,
    gap: 4
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 8,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  reviewItemTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.black,
  },  
  reviewItemCount: {
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.mainPurple,
  },
  bottomButtonSection: {
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 42,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});