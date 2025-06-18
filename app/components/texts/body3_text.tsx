import { Text, TextProps } from 'react-native';

interface Body3Props extends TextProps {
  children: React.ReactNode;
  color?: string;
}

export const Body3 = ({ 
  children, 
  color = 'black',
  style,
  ...rest
}: Body3Props) => {
  return (
    <Text 
      style={[{ fontSize: 14, fontWeight: 'regular', color }, style]} 
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Body3; 