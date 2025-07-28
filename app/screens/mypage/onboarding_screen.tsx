import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SubHeadText, Body1 } from '@/app/components/texts';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 작은 화면 감지 (iPhone SE 2세대, iPhone 13 Mini 등)
const isSmallScreen = screenHeight < 850;
const isSuperSmallScreen = screenHeight < 700;

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: any;
}

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onboardingData: OnboardingItem[] = [
    {
      id: 1,
      title: '다양한 위시를 만나보세요!',
      description: '일상을 다르게 살아보게 만드는\n사소하지만 결정적인?\n위시들이 기다리고 있습니다!',
      image: require('@/assets/images/mypage/onboarding_step1.png'),
    },
    {
      id: 2,
      title: '막막함 속 작은 실천을 해내보세요!',
      description: '`무엇을 해야 할 지 모르겠어요`라는\n질문을 투두팡과 함께 해결하며,\n성취의 즐거움을 느껴보세요!',
      image: require('@/assets/images/mypage/onboarding_step2.png'),
    },
    {
      id: 3,
      title: '함께 실천하며 공감해보세요!',
      description: '다양한 위시에\n공감하고 도전하면서\n나만의 성공기를 만들어보세요!',
      image: require('@/assets/images/mypage/onboarding_step3.png'),
    },
  ];

  const handleComplete = () => {
    // 온보딩 완료 후 메인 화면으로 이동
    router.back();
  };

  const renderOnboardingItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <SubHeadText>{item.title}</SubHeadText>
        <Body1>{item.description}</Body1>
      </View>
    </View>
  );

  const renderPageIndicator = () => (
    <View style={styles.pageIndicatorContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.pageIndicator,
            index === currentIndex && styles.pageIndicatorActive,
          ]}
        />
      ))}
    </View>
  );

  const renderButton = () => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>투두팡과 함께하기</Text>
        </TouchableOpacity>
    </View>
  );

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}> 
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderOnboardingItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.flatListContainer}
        />
        
        {renderPageIndicator()}
      </View>
      
      {currentIndex === onboardingData.length - 1 && (
        <View style={styles.buttonWrapper}>
          {renderButton()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: COLORS.white,
  },
  contents: {
    flex: 0.8,
  },
  flatListContainer: {

  },
  flatList: {
    backgroundColor: 'blue',
    height: 10,
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    gap: 40,

  },
  imageContainer: {
    paddingTop: isSuperSmallScreen ? 40 : isSmallScreen ? 100 : 130,
  },
  image: {
    width: isSmallScreen ? 230 : 280,
    height: isSmallScreen ? 230 : 280,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  pageIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#D9D9D9',
  },
  pageIndicatorActive: {
    backgroundColor: COLORS.mainPurple,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  buttonContainer: {
    paddingBottom: isSuperSmallScreen ? 10 : 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  completeButton: {
    backgroundColor: COLORS.mainPurple,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48
  },
  completeButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '800',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
});