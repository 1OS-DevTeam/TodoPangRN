import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, StatusBar, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadText, SectionTitleText, CaptionText, SubHeadText, Typography } from '@/app/components/texts';
import MainActionButton from '@/app/components/buttons/main_action_button';
import { COLORS } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native';
import { useUserChallengeDetail } from '../../../hooks/challenge/userChallengeDetail';
import ChallengeCard from './component/challenge_card';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';
import OneButtonBottomSheet from '@/app/components/bottomSheet/one_button_bottomsheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const ChallengeDetailScreen = ({ route }: { route: { params: { challengeId: string } } }) => {
  const {
    challengeDetail,
    loading,
    showBottomSheet,
    handleActualRegister,
    bottomSheetRef
  } = useUserChallengeDetail(route.params.challengeId);

  const titleSection = () => {
    return (
      <View style={styles.titleSection}>
        <Typography mode='C1_bold' color='mainBlue'>🙏🏻{challengeDetail?.popularity}명이 등록한 위시에요.</Typography>
        <Typography mode='SubHead' color='black'>{challengeDetail?.title}</Typography>
      </View>
    );  
  };

  const boxeSection = () => {
    return (
      <View style={styles.boxesSection}>
        <View style={styles.boxesContainer}>
          <View style={styles.box}>
            <Typography mode='Body3_bold' color='mainPurple' style={styles.boxTitleText}>카테고리</Typography>
            <Typography mode='Body3' color='darkGrey' style={styles.boxValueText}>{challengeDetail?.category}</Typography>
          </View>
          <View style={styles.box}>
            <Typography mode='Body3_bold' color='mainPurple' style={styles.boxTitleText}>기간</Typography>
            <Typography mode='Body3' color='darkGrey' style={styles.boxValueText}>{challengeDetail?.term}</Typography>
          </View>
          <View style={styles.box}>
            <Typography mode='Body3_bold' color='mainPurple' style={styles.boxTitleText}>난이도</Typography>
            <Typography mode='Body3' color='darkGrey' style={styles.boxValueText}>{challengeDetail?.diff}</Typography>
          </View>
        </View>
      </View>
    );
  };

  const todoListSection = () => {
    return (
      <View style={styles.todoListSection}>
        <Typography mode='SubHead' color='mainPurple'>아래 할 일들을 완료해보세요!</Typography>
        <View style={styles.todoListContainer}>
          {challengeDetail?.todoList.map((todo, index) => (
            <View style={styles.todoItem} key={index}>
              <Image 
                source={require('../../../assets/images/challenge/todolist_divider.png')} 
                style={{
                  width: '100%',
                  height: 1,
                }}
              />  
              <View style={styles.todoItemContentContainer}>
                <View style={styles.todoItemTitleContainer}>
                  <View style={styles.indexCircle}>
                    <Typography mode='Body2' color='mainPurple' style={styles.indexText}>{index + 1}</Typography>
                  </View>
                  <Typography mode='Body3' color='black' style={styles.todoItemTitle}>{todo.desc}</Typography>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const reviewSection = () => {
    return (
      <View style={styles.reviewSection}>
        <Typography mode='SubHead' color='mainPurple'>위시를 이룬 사람들의 한마디</Typography>
        {challengeDetail?.reviewList.length === 0 ? (
          noReviewContent()
        ) : (
          <View style={styles.reviewContainer}>
            {challengeDetail?.reviewList.map((review) => (
              <View style={styles.reviewItem}>
                <Text style={styles.reviewItemTitle}>"{review.desc}"</Text>
                <Text style={styles.reviewItemCount}>{review.count}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const noReviewContent = () => {
    return (
      <View style={styles.noReviewContent}>
        <Image source={require('../../../assets/images/mywish/wish_tung.png')} style={styles.noReviewimage} />
        <View style={styles.noReviewDescription}>
          <Typography mode='Body2' color='black'>해당 위시에 대한</Typography>
          <Typography mode='Body2' color='black'>충분한 리뷰가 아직 쌓이지 않았어요!</Typography>
        </View>
      </View>
    );
  };

  const bottomButtonSection = () => {
    return (
      <View style={styles.bottomButtonSection}>
        <MainActionButton text="등록하기" onClick={showBottomSheet} />
      </View>
    );
  };

  return (
    <GestureHandlerRootView >
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
        <OneButtonBottomSheet
          ref={bottomSheetRef}
          message={`"${challengeDetail?.title}"\n위시를 이뤄볼까요?`}
          imageSource={require('../../../assets/images/mywish/wish_tung.png')}
          imageStyle={{ width: 200, height: 200 }}
          buttonLabel="등록하기"
          buttonEvent={handleActualRegister}
        />
        </ScreenWrapper>
      </GestureHandlerRootView>
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
    paddingTop: 9,
  },
  boxValueText: {
    paddingTop: 14, 
  },
  todoListSection: {
    paddingHorizontal: 20,
    paddingTop: 43,
  },  
  todoListContainer: {
    paddingTop: 24,
  },
  todoItemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  indexCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: COLORS.whiteGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  indexText: {
    textAlign: 'center',
    lineHeight: 25,
  },
  reviewSection: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  todoItem: {
    height: 60,   
  },
  todoItemContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  todoItemTitle: {

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
    height: 116,
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
    paddingTop: 20,
    paddingBottom: 42,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  noReviewContent: {
    paddingTop: 15,
    alignItems: 'center',
    gap: 14
  },
  noReviewimage: {
    width: 137,
    height: 130,
  },
  noReviewDescription: {
    alignItems: 'center',
  },
});