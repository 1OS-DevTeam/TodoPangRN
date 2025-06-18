import { Text, TextProps } from 'react-native';

interface C1Props extends TextProps {
  children: React.ReactNode;
  color?: string;
}

export const C1 = ({ 
  children, 
  color = 'black',
  style,
  ...rest
}: C1Props) => {
  return (
    <Text 
      style={[{ fontSize: 12, fontWeight: 'regular', color }, style]} 
      {...rest}
    >
      {children}
    </Text>
  );
};

export default C1; 