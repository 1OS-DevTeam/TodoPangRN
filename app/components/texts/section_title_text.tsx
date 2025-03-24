import { Text } from 'react-native';

export const SectionTitleText = ({ 
  children, 
  color = 'black' 
}: { 
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <Text style={{ fontSize: 20, fontWeight: 'bold', color }}>{children}</Text>
  );
};

export default SectionTitleText; 