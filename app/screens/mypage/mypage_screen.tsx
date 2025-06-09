import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { MyPageMenu } from '../../../api/types';
import MyPageMenuRow from './component/mypage_menu_row';
import DeviceInfo from 'react-native-device-info';

const menuList: MyPageMenu[] = [
  {
    title: '가이드북',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '탈퇴하기',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '로그아웃',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '환경설정',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '앱버전',
    appVersion: DeviceInfo.getVersion(),
  },
];

const hadleTapGuide = () => {
  console.log('guide');
};

const handleTapNotice = () => {
  console.log('notice');
};

const handleTapInquiry = () => {
  console.log('inquiry');
};

const handleTapSetting = () => {
  console.log('setting');
};

const handleTapLogout = () => {
  console.log('logout');
};

const handleTapWithdraw = () => {
  console.log('withdraw');
};


const headerSection = () => {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.headerTitle}>마이페이지</Text>
      <View style={styles.headerContents}>
        <Image
          source={require('../../../assets/images/mypage/bomb_icon.png')}
          style={styles.headerImage}
        />
        <Text style={styles.myName}>김하나님</Text>
      </View>
    </View>
  );
};

const menuSection = () => {
  const handleMenuPress = (menu: MyPageMenu) => {
    switch (menu.title) {
      case '가이드북':
        hadleTapGuide();
        break;
      case '탈퇴하기':
        handleTapWithdraw();
        break;
      case '로그아웃':
        handleTapLogout();
        break;
      case '환경설정':
        handleTapSetting();
        break;
    }
  };

  return (
    <View style={styles.menuSection}>
        <FlatList
          data={menuList}
          renderItem={({ item }) => <MyPageMenuRow menu={item} onPress={handleMenuPress} />}
          contentContainerStyle={styles.menuListContainer}
        />
    </View>
  );
};

export const MyPageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {headerSection()}
      {menuSection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,      
    backgroundColor: '#fff',
  },
  headerSection: {
  },
  headerTitle: {
    paddingTop: 16,
    paddingBottom: 18,
    paddingLeft: 17,
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.black,
  },
  headerContents: {
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  headerImage: {
    width: 72,
    height: 72,
  },
  myName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  menuListContainer: {
    gap: 20,
  },
});

export default MyPageScreen;