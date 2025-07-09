import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChallengeHome } from '../../../hooks/challenge/useChallengeHome';
import { HeadText, SectionTitleText, CaptionText, Typography } from '@/app/components/texts';
import { COLORS } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native';
import { Challenge } from '../../../api/types';
import { ChallengeCard } from './component/challenge_card';

export const ChallengeScreen = () => {
  const {
    challengeInfoList,
    selectedCategory,
    filteredChallenges,
    handleCategoryClick,
    handleCategorySelection,
    handleChallengePress
  } = useChallengeHome();

  const headerSection = () => {
    return (
      <View style={styles.headerSection}>
        <Typography mode='SubHead'>위시 탐색소</Typography>
        <View style={styles.headerSubSection}>
          <Typography mode='Body2_bold' color='darkGrey'>뭐부터 해야할지 모르겠나요?</Typography>
          <Typography mode='C1' color='darkGrey'>그래서 투두팡이 준비했어요! 따라해보며 목표달성의 성취감을 느껴보세요</Typography>
        </View>
      </View>
    );
  };

  const categorySection = () => {
    return (
      <View style={styles.categorySection}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {/* 전체 카테고리 추가 */}
          <TouchableOpacity 
            style={[styles.categoryItem, selectedCategory === '0' && styles.selectedCategoryItem]}
            onPress={() => handleCategorySelection('0', '전체')}
            activeOpacity={0.7}
          >
            <Text style={[styles.categoryItemText, selectedCategory === '0' && styles.selectedCategoryItemText]}>전체</Text>
          </TouchableOpacity>
          
          {challengeInfoList?.categories && 
            Object.keys(challengeInfoList.categories).map(id => {
              const name = challengeInfoList.categories[id];
              const isSelected = selectedCategory === id;
              return (
                <TouchableOpacity 
                  key={id} 
                  style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
                  onPress={() => handleCategorySelection(id, name)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryItemText, isSelected && styles.selectedCategoryItemText]}>{name}</Text>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
    );
  };

  const challengeCardGridSection = () => {
    return (
      <View style={styles.challengeCardGridSection}>
        {
        filteredChallenges.length === 0 ? (
          <Text style={styles.emptyText}>도전과제가 없습니다</Text>
        ) : (
          <FlatList
            data={filteredChallenges}
            renderItem={({ item }) => (
              <ChallengeCard challenge={item} onPress={handleChallengePress} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.challengeCardRow}
            showsVerticalScrollIndicator={false}
          />
        )}
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
        {headerSection()}
        {categorySection()}
        {challengeCardGridSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20
  },
  headerSection: {
    paddingTop: 20,
    paddingHorizontal: 16
  },
  headerSubSection: {
    paddingTop: 30,
    gap: 4
  },
  categorySection: {
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 12,
  },
  categoryScrollContainer: {
    paddingTop: 25,
    paddingRight: 16,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 10,
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.mainPurple,
    borderColor: COLORS.mainPurple,
  },
  categoryItemText: {
    fontSize: 14,
    color: COLORS.black,
  },
  selectedCategoryItemText: {
    color: COLORS.white,
  },
  challengeCardGridSection: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.grey,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.grey,
  },
  challengeCardRow: {
    justifyContent: 'space-between',
    marginBottom: 7,
  }
});

export default ChallengeScreen;