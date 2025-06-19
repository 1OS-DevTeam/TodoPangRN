import { Text, TextProps } from 'react-native';

interface Body2Props extends TextProps {
  children: React.ReactNode;
  color?: string;
}

export const Body1 = ({ 
  children, 
  color = 'black',
  style,
  ...rest
}: Body2Props) => {
  return (
    <Text 
      style={[{ fontSize: 18, fontWeight: 'semibold', color }, style]} 
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Body1; 