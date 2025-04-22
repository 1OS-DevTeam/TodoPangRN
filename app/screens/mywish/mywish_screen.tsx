import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native';
import { useWishHome } from '../../../hooks/wish/useWishHome';
import { HeadText } from '@/app/components/texts';
import { WishListCard } from './component/wish_list_card';
import { WishInfoChallenge } from '../../../api/types';
import { COLORS } from '../../../assets/colors/colors';

const MyWishScreen = () => {
  const { 
    wishInfoList, loading 
  } = useWishHome();

  const headerSection = () => {
    return (
      <View style={styles.headerSection}>
        <View style={styles.headerTitle}>
          <HeadText>목표</HeadText>
        </View>
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
        <View style={styles.wishListSection}>
          <Text>로딩 중...</Text>
        </View>
      );
    }

    return (
      <View style={styles.wishListSection}>
        <FlatList
          data={wishInfoList.challenges.map(challenge => ({
            challengeId: challenge.challengeId,
            challengeName: challenge.challengeName,
            todoList: challenge.todoList,
          }) as WishInfoChallenge)}
          renderItem={({ item }) => <WishListCard challenge={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}>
            <View style={{ height: 1, backgroundColor: COLORS.whiteGrey, width: '100%' }} />
          </View>}
          style={styles.wishList}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {headerSection()}
        {wishListSection()}
      </View>
    </SafeAreaView>
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
});

export default MyWishScreen;
