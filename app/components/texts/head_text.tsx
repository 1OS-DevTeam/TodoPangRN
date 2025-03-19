import { Text } from 'react-native';

export const HeadText = ({ 
  children, 
  color = 'black' 
}: { 
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <Text style={{ fontSize: 24, fontWeight: 'bold', color }}>{children}</Text>
  );
};

export default HeadText; 