import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "홈", 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',    
            borderTopWidth: 0
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="goal" 
        options={{ 
          title: "도전과제", 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',    
            borderTopWidth: 0
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="challenge" 
        options={{ 
          title: "목표", 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',    
            borderTopWidth: 0
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="mypage" 
        options={{ 
          title: "마이페이지", 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',    
            borderTopWidth: 0
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
} 