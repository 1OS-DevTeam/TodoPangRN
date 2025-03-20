import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HomeService } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeData } from '../../../api/types';
import { COLORS } from '../../../assets/colors/colors'

export const HomeScreen = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await HomeService.getHome(userId);
          setHomeData(response.data);
        }
      } catch (error) {
        console.error('홈 데이터 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigationSection = () => {
    return (
      <View style={styles.navigationSection}>
        <Image source={require('../../../assets/images/home/home_todopang_logo.png')} style={styles.logo} />
        <Image source={require('../../../assets/images/home/home_bell.png')} style={styles.bell} />
      </View>
    );
  };

  const headerSection = () => {
    return (
      <View style={styles.headerSection}>
        <View style={styles.headerDescription}>
          <Text style={styles.headerText}>하나님, 지금까지</Text>
          <Text style={styles.headerText}>총 <Text style={styles.headerTextBold}>20개</Text>의 목표를 달성했어요!</Text>
        </View>
        <View style={styles.headerBomb}>
          <Image source={require('../../../assets/images/home/home_bomb.png')} style={styles.bomb} />
        </View>
      </View>
    );
  };

  const challengeBoxSection = () => {
    return (
      <View style={styles.challengeBoxSection}>
        <View style={styles.challengingBox}>
          <Image source={require('../../../assets/images/home/home_arm.png')} style={styles.arm} />
          <View style={styles.challengingContent}>
            <Text style={styles.challengingTitle}>도전중인 목표</Text>
            <Text style={styles.challengingNumber}>12</Text>
          </View>
          <Image source={require('../../../assets/images/home/home_chevron_right.png')} style={styles.arrow} />
        </View>
        <View style={styles.completedBox}>
          <View style={styles.completedContent}>
            <Text style={styles.completedTitle}>달성한 목표</Text>
            <Text style={styles.completedNumber}>12</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.topSection}>
          <Image 
            source={require('../../../assets/images/home/home_top_background.png')} 
            style={styles.topBackground} 
          />
          <View style={styles.topContent}>
            {navigationSection()}
            {headerSection()}
            {challengeBoxSection()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 최상위 컨테이너
  // flex: 1은 부모 컨테이너의 남은 공간을 모두 차지하도록 설정
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // 스크롤 뷰 스타일
  // flex: 1로 부모 컨테이너의 남은 공간을 모두 차지하도록 설정
  scrollView: {
    flex: 1,
  },
  // 스크롤 뷰 컨텐츠 스타일
  // flexGrow: 1로 컨텐츠가 화면보다 작을 때 남은 공간을 채우도록 설정
  scrollViewContent: {
    flexGrow: 1,
  },
  // 상단 섹션 컨테이너
  // position: 'relative'로 내부 요소들의 절대 위치 기준점 설정
  // height: 390으로 고정된 높이 설정
  topSection: {
    position: 'relative',
    height: 390,
  },
  // 배경 이미지 스타일
  // position: 'absolute'로 부모 요소 기준 절대 위치 설정
  // top, left, right, bottom: 0으로 부모 요소 전체를 채우도록 설정
  // width, height: '100%'로 부모 요소의 크기에 맞춤
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  // 상단 컨텐츠 컨테이너
  // position: 'relative'로 내부 요소들의 절대 위치 기준점 설정
  // zIndex: 1로 배경 이미지 위에 표시되도록 설정
  topContent: {
    position: 'relative',
    zIndex: 1,
  },
  // 상단 네비게이션 영역
  // height: 60으로 고정된 높이 설정
  // paddingHorizontal: 16으로 좌우 여백 설정
  // paddingTop: 100으로 상단 여백 설정
  // justifyContent: 'space-between'으로 자식 요소들을 양쪽 끝으로 배치
  // flexDirection: 'row'로 자식 요소들을 가로로 배치
  // alignItems: 'center'로 자식 요소들을 세로 중앙 정렬
  navigationSection: {
    height: 60,
    paddingHorizontal: 16,
    paddingTop: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginLeft: 16,
  },
  bell: {
    marginRight: 20,
  },
  headerSection: {
    paddingTop: 44,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDescription: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
  },
  headerBomb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bomb: {
    marginLeft: 16,
  },  
  headerText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 18,
  },
  headerTextBold: {
    fontSize: 20,
    fontWeight: '700',
  },
  challengeBoxSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  challengingBox: {
    width: '55%',
    height: 74,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBox: {
    width: '40%',
    height: 74,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arm: {
    marginLeft: 24,
  },
  arrow: {
    marginRight: 24,
  },
  challengingContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  challengingTitle: {
    fontSize: 14,
    color: '#666666',
  },
  challengingNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginTop: 4,
  },
  completedContent: {
    alignItems: 'center',
  },
  completedTitle: {
    fontSize: 14,
    color: '#666666',
  },
  completedNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginTop: 4,
  },
});

export default HomeScreen;