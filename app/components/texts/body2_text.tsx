import { Text, TextProps } from 'react-native';

interface Body2Props extends TextProps {
  children: React.ReactNode;
  color?: string;
}

export const Body2 = ({ 
  children, 
  color = 'black',
  style,
  ...rest
}: Body2Props) => {
  return (
    <Text 
      style={[{ fontSize: 17, fontWeight: 'regular', color }, style]} 
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Body2; 