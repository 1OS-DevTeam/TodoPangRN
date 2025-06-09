import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Challenge, MyPageMenu, WishInfoTodo } from '../../../../api/types';
import { COLORS } from '../../../../assets/colors/colors';  
import { CaptionText, SectionTitleText } from '@/app/components/texts';

interface MyPageMenuRowProps {
  menu: MyPageMenu;
  onPress?: (menu: MyPageMenu) => void;
}

export const MyPageMenuRow = ({ menu, onPress}: MyPageMenuRowProps) => {
  const tapMenu = () => {
    if (onPress) {
      onPress(menu);
    }
  };
  
  const menuContent = (
    <View style={styles.menuRow}>
      <View style={styles.titleContainer}>
        <Text style={styles.menuTitle}>{menu.title}</Text>
        {menu.appVersion && (
          <Text style={styles.versionTitle}>{menu.appVersion}</Text>
        )}
      </View>
      {menu.image && (
        <Image
          source={menu.image}
          style={styles.menuImage}
          contentFit="contain"
        />
      )}
    </View>
  );

  if (menu.appVersion) {
    return menuContent;
  }

  return (
    <TouchableOpacity onPress={tapMenu}>
      {menuContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 23,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.black,
  },
  versionTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.grey,
  },
  menuImage: {
    width: 24,
    height: 24,
  },
});

export default MyPageMenuRow;