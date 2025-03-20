import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.mainPurple,
      tabBarInactiveTintColor: COLORS.grey,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0
      },
      tabBarIconStyle: {
        marginBottom: 4,
      },
      tabBarLabelStyle: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: 'bold'
      }
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "홈", 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/common/tabbar_home.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? COLORS.mainPurple : COLORS.grey
              }}
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="goal" 
        options={{ 
          title: "도전과제", 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/common/tabbar_goal.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? COLORS.mainPurple : COLORS.grey
              }}
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="challenge" 
        options={{ 
          title: "목표", 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/common/tabbar_challenge.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? COLORS.mainPurple : COLORS.grey
              }}
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="mypage" 
        options={{ 
          title: "마이페이지", 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/common/tabbar_mypage.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? COLORS.mainPurple : COLORS.grey
              }}
            />
          ),
        }} 
      />
    </Tabs>
  );
} 