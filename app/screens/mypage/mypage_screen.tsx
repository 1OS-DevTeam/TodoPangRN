import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { MyPageMenu } from '../../../api/types';
import MyPageMenuRow from './component/mypage_menu_row';
import DeviceInfo from 'react-native-device-info';
import { useMypage } from '../../../hooks/mypasge/useMypage';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

export const MyPageScreen = () => {
  const { 
    tapWithdraw,
    tapLogout,
    tapSetting,
    tapGuide,
    showWithdrawBottomSheet,
    showLogoutBottomSheet,
    bottomSheetRef,
    bottomSheetState,
    isLoggingOut,
    loading,
  } = useMypage();

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
          tapGuide();
          break;
        case '탈퇴하기':
          tapWithdraw();
          break;
        case '로그아웃':
          showLogoutBottomSheet();
          break;
        case '환경설정':
          tapSetting();
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {loading && (
          <View>
            <ActivityIndicator size="large" color={COLORS.mainPurple} />
          </View>
        )}
        {headerSection()}
        {menuSection()}

        <TwoButtonBottomSheet
          ref={bottomSheetRef}
          title={bottomSheetState.title}
          message={bottomSheetState.message}
          firstButtonLabel={bottomSheetState.firstButtonLabel}
          firstButtonEvent={bottomSheetState.onFirstButtonPress || (() => {})}
          secondButtonLabel={bottomSheetState.secondButtonLabel}
          secondButtonEvent={bottomSheetState.onSecondButtonPress || (() => {})}
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
  headerSection: {
    paddingTop: 16,
    paddingBottom: 18,
    paddingLeft: 17,
  },
  headerTitle: {
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