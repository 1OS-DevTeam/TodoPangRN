import { Text, TextProps, TextStyle } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';

interface TypographyProps extends TextProps {
  mode?:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'subtitle1'
    | 'subtitle2'
    | 'subtitle3'
    | 'subtitle4'
    | 'caption1'
    | 'caption2'
    | 'body1'
    | 'body2';
  color?: keyof typeof COLORS;
  disableFontScaling?: boolean;
}

const Typography: React.FC<TypographyProps> = ({ 
  style, 
  mode = 'body1', 
  color = 'gray900', 
  children, 
  disableFontScaling,
  ...rest 
}) => {
  const modeStyle = styles[mode] as TextStyle;
  const colorStyle = { color: COLORS[color as keyof typeof COLORS] } as TextStyle;

  return (
    <Text 
      style={[modeStyle, colorStyle, style]} 
      {...rest}
    >
      {children}
    </Text>
  );
};

export { Typography };
export default Typography;


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading1: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 28,
    letterSpacing: -1,
    lineHeight: 42,
  },
  heading2: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 24,
    letterSpacing: -1,
    lineHeight: 36,
  },
  heading3: {
    fontFamily: 'NotoSansKR-SemiBold',
    fontSize: 20,
    letterSpacing: -1,
    lineHeight: 30,
  },
  subtitle1: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    letterSpacing: -1,
    lineHeight: 27,
  },
  subtitle2: {
    fontFamily: 'NotoSansKR-SemiBold',
    fontSize: 16,
    letterSpacing: -1,
    lineHeight: 24,
  },
  subtitle3: {
    fontFamily: 'NotoSansKR-SemiBold',
    fontSize: 14,
    letterSpacing: -1,
    lineHeight: 21,
  },
  subtitle4: {
    fontFamily: 'NotoSansKR-SemiBold',
    fontSize: 12,
    letterSpacing: -1,
    lineHeight: 18,
  },
  caption1: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    letterSpacing: -1,
    lineHeight: 18,
  },
  caption2: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    letterSpacing: -1,
    lineHeight: 16.5,
  },
  body1: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    letterSpacing: -1,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    letterSpacing: -1,
    lineHeight: 21,
  },
});

export { styles };
