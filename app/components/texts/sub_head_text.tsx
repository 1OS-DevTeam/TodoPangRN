import { Text } from 'react-native';

export const SubHeadText = ({ 
  children, 
  color = 'black' 
}: { 
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <Text style={{ fontSize: 20, fontWeight: 600, color }}>{children}</Text>
  );
};

export default SubHeadText; 