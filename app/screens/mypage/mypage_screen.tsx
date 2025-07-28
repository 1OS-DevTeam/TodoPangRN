import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { MyPageMenu } from '../../../api/types';
import MyPageMenuRow from './component/mypage_menu_row';
import DeviceInfo from 'react-native-device-info';
import { useMypage } from '../../../hooks/mypasge/useMypage';
import { TwoButtonBottomSheet } from '@/app/components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SubHeadText } from '@/app/components/texts';
import ScreenWrapper from '@/app/components/screenWrapper/screenWrapper';

const menuList: MyPageMenu[] = [
  {
    title: '서비스 소개',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '계정명 변경',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '의견 남기기',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '로그아웃',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
  {
    title: '탈퇴하기',
    image: require('../../../assets/images/mypage/mypge_chevron_right.png'),
  },
];

export const MyPageScreen = () => {
  const { 
    tapWithdraw,
    tapChangeName,
    tapLogout,
    tapSuggestion,
    tapGuide,
    showLogoutBottomSheet,
    bottomSheetRef,
    bottomSheetState,
    isLoggingOut,
    userName,
  } = useMypage();

  const headerSection = () => {
    return (
      <View style={styles.headerSection}>
        <SubHeadText >마이페이지</SubHeadText>
        <View style={styles.headerContents}>
          <Image
            source={require('../../../assets/images/mypage/mypage_character.png')}
            style={styles.headerImage}
          />
          <SubHeadText >{userName}님</SubHeadText>
        </View>
      </View>
    );
  };
  
  const menuSection = () => {
    const handleMenuPress = (menu: MyPageMenu) => {
      switch (menu.title) {
        case '서비스 소개':
          tapGuide();
          break;
        case '계정명 변경':
          tapChangeName();
          break;
        case '의견 남기기':
          tapSuggestion();
          break;
        case '탈퇴하기':
          tapWithdraw();
          break;
        case '로그아웃':
          showLogoutBottomSheet();
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

  const handleContainerLayout = (event: any) => {
    console.log('🔴 Container Layout:', event.nativeEvent.layout);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScreenWrapper backgroundColor={COLORS.white} onLayout={handleContainerLayout}>
        {headerSection()}
        {menuSection()}

        <TwoButtonBottomSheet
          ref={bottomSheetRef}
          title={`로그아웃\n하시겠습니까?`}
          firstButtonLabel={bottomSheetState.firstButtonLabel}
          firstButtonEvent={bottomSheetState.onFirstButtonPress || (() => {})}
          secondButtonLabel={bottomSheetState.secondButtonLabel}
          secondButtonEvent={bottomSheetState.onSecondButtonPress || (() => {})}
          imageSource={require('../../../assets/images/mywish/mywish_character.png')}
          imageStyle={{ width: 160, height: 160 }}
        />
      </ScreenWrapper>
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
    gap: 8,
    paddingBottom: 16
  },
  headerImage: {
    width: 119,
    height: 119,
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