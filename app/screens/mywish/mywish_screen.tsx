import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useWishHome } from '../../../hooks/wish/useWishHome';
import { HeadText } from '@/app/components/texts';
import { WishListCard } from './component/wish_list_card';
import { WishInfoChallenge } from '../../../api/types';
import { COLORS } from '../../../assets/colors/colors';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const MyWishScreen = () => {
  const [loadingTodoId, setLoadingTodoId] = useState<number | undefined>(undefined);
  const [loadingWishId, setLoadingWishId] = useState<number | undefined>(undefined);
  const [selectedChallenge, setSelectedChallenge] = useState<WishInfoChallenge | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { 
    wishInfoList, 
    loading,
    handleTodoToggle,
    handleWishComplete,
    handleTodoDelete,
    fetchData,
    useWishNavigation
  } = useWishHome();

  const onTodoToggle = async (todoId: number) => {
    if (loadingTodoId) return; // 이미 로딩 중이면 리턴
    setLoadingTodoId(todoId);
    try {
      await handleTodoToggle?.(todoId);
      setLoadingTodoId(undefined);
    } catch (error) {
      setLoadingTodoId(undefined);
    }
  };

  const onWishComplete = async (challenge: WishInfoChallenge) => {
    setLoadingWishId(challenge.challengeId);
    bottomSheetRef.current?.expand();

    try {
      const success = await handleWishComplete(challenge);
      console.log('위시 완료 응답:', success);
      if (success) {
        await fetchData(); // 성공 시 데이터 새로고침
      }
      setSelectedChallenge(challenge);
      bottomSheetRef.current?.expand();
      setLoadingWishId(undefined);
    } catch (error) {
      console.error('위시 완료 에러:', error);
    } finally {
      setLoadingWishId(undefined);
    }
  };

  const headerSection = () => {
    return (
      <View style={styles.headerSection}>
        <View style={styles.headerContents}>
          <Image
            source={require('../../../assets/images/mywish/wish_balloon.png')}
            style={styles.wishBalloon}
          />
          <View style={styles.headerTexts}>
              <Text style={styles.userName}>{wishInfoList?.userName},</Text>
              <View style={styles.wishCountContainer}>
                <Text style={styles.wishCount}>{wishInfoList?.challenges.length}개의 위시</Text>
                <Text style={styles.wishText}>가 있어!</Text>
              </View>
          </View>
          <View style={styles.headerFilterButton}>
            <Image
              source={require('../../../assets/images/mywish/wish_filter.png')}
              style={styles.wishFilter}
            />
            <Text>추천순</Text>
          </View>
        </View>
      </View>
    );
  };

  const wishListSection = () => {
    if (loading || !wishInfoList?.challenges) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.mainPurple} />
        </View>
      );
    }

    return (
      <View style={styles.wishListSection}>
        <FlatList
          data={wishInfoList.challenges.map(challenge => ({
            challengeId: challenge.challengeId,
            originChallengeId: challenge.originChallengeId,
            challengeName: challenge.challengeName,
            todoList: challenge.todoList,
            challengeStatus: challenge.challengeStatus
          }) as WishInfoChallenge)}
          renderItem={({ item }) => (
            <WishListCard 
              challenge={item} 
              handleTodoToggle={onTodoToggle}
              handleWishComplete={onWishComplete}
              isLoading={loadingWishId === item.challengeId}
              loadingTodoId={loadingTodoId}
              handleTodoDelete={handleTodoDelete}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 16 }}>
              <View style={{ height: 1, backgroundColor: COLORS.whiteGrey, width: '100%' }} />
            </View>
          )}
          style={styles.wishList}
        />
      </View>
    );
  };

  const noWishSection = () => {
    return (
      <View style={styles.noWishContainer}>
        <Image
          source={require('../../../assets/images/mywish/wish_tung.png')}
          style={styles.noWishImage}
        />
        <Text style={styles.noWishTitle}>
          위시가 <Text style={styles.tungText}>텅!</Text> 비었어요
        </Text>
        <View style={styles.noWishDescription}>
          <Text style={styles.noWishDescriptionText}>얼른 위시를 추가해보세요-</Text>
        </View>

        <TouchableOpacity style={styles.noWishButton}>
          <Text style={styles.noWishButtonText}>위시 추가하기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerTitle}>
          <HeadText>나의 위시</HeadText>
        </View>
        {wishInfoList?.challenges.length === 0 ? noWishSection() : (
          <View style={styles.content}>
            {headerSection()}
            {wishListSection()}
          </View>
        )}
        <TwoButtonBottomSheet
          ref={bottomSheetRef}
          title="위시"
          message={`수빈지킴이! 이번 목표를 기반으로
다른 목표들도 도전해봐! 넌 할 수 있어!`}
          firstButtonLabel="닫기"
          firstButtonEvent={() => {
            setSelectedChallenge(null);
            bottomSheetRef.current?.close();
          }}
          secondButtonLabel="목표 후기 남기기"
          secondButtonEvent={() => {
            if (selectedChallenge) {
                console.log('[MyWishScreen] originChallengeId:', selectedChallenge.originChallengeId);
                useWishNavigation(selectedChallenge.originChallengeId);
            }
          }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    gap: 30,
  },
  headerSection: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  headerTitle: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  headerContents: {
    height: 56,
    flexDirection: 'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
  },
  wishBalloon: {
    width: 36,
    height: 47,
    marginTop: 4,
    marginLeft: 16,
    marginRight: 19,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'regular',
  },
  headerTexts: {
    flexDirection: 'column',
  },
  wishCountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  wishCount: {
    fontSize: 24,
    fontWeight: 'regular',
  },
  wishText: {
    fontSize: 17,
    fontWeight: 'regular',
    paddingBottom: 3,
  },
  headerFilterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 78,
    height: 32,
    position: 'absolute',
    right: 18,
  },
  wishFilter: {
    width: 13,
    height: 13,
  },
  wishListSection: {
    flex: 1,
    width: '100%',
  },
  wishList: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  noWishContainer: {
    marginTop: 101,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWishTitle: {  
    marginTop: 16,
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.black,
  },
  tungText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.mainPurple,
  },
  noWishDescription: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWishDescriptionText: {
    fontSize: 14,
    fontWeight: 'regular',
    color: COLORS.black,
  },
  noWishImage: {
    marginTop: 12,
    width: 138,
    height: 130,
  },
  noWishButton: {
    marginTop: 30,
    marginHorizontal: 57,
    width: '70%',
    height: 39,
    backgroundColor: COLORS.mainPurple,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWishButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default MyWishScreen;
