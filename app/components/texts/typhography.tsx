import { Text, TextProps, TextStyle } from 'react-native';
import { COLORS } from '../../../assets/colors/colors';

interface TypographyProps extends TextProps {
  mode?:
    | 'Head'
    | 'SubHead'
    | 'Body1'
    | 'Body2'
    | 'Body2_bold'
    | 'Body3'
    | 'Body3_bold'
    | 'C1'
    | 'C1_bold'
    | 'C2'
  color?: keyof typeof COLORS;
  disableFontScaling?: boolean;
}

const Typography: React.FC<TypographyProps> = ({ 
  style, 
  mode = 'Body1', 
  color = COLORS.black, 
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
  Head: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 40,
    letterSpacing: 0,
    lineHeight: 42,
  },
  SubHead: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    letterSpacing: -1,
    lineHeight: 36,
  },
  Body1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
    letterSpacing: -1,
    lineHeight: 30,
  },
  Body2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 17,
    letterSpacing: -1,
    lineHeight: 27,
  },
  Body2_bold: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
    letterSpacing: -1,
    lineHeight: 24,
  },
  Body3: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 17,
    letterSpacing: -1,
    lineHeight: 27,
  },
  Body3_bold: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    letterSpacing: -1,
    lineHeight: 24,
  },
  C1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    letterSpacing: -1,
    lineHeight: 18,
  },
  C1_bold: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    letterSpacing: -1,
    lineHeight: 18,
  },
  C2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    letterSpacing: -1,
    lineHeight: 18,
  },
});

export { styles };
