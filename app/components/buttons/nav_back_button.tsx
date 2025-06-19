import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

interface BottomButtonProps {
  onClick: () => void;
}

const NavBackButton: React.FC<BottomButtonProps> = ({
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={onClick}>
        <Image source={require('../../../assets/images/common/nav_chevron_left.png')} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
  }
});

export default NavBackButton; 