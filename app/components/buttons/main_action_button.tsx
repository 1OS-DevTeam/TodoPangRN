import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, DimensionValue } from 'react-native';

interface BottomButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  width?: DimensionValue;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const MainActionButton: React.FC<BottomButtonProps> = ({
  text,
  onClick,
  disabled = false,
  width = '100%',
  loading = false,
  style = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled || loading}
      style={[
        styles.button,
        { width },
        (disabled || loading) && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 5,
    backgroundColor: '#7248E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default MainActionButton; 