import { Text } from 'react-native';

export const CaptionText = ({ 
  children, 
  color = 'black' 
}: { 
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <Text style={{ fontSize: 12, fontWeight: 'regular', color }}>{children}</Text>
  );
};

export default CaptionText; 