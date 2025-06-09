import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.mainPurple,
      tabBarInactiveTintColor: COLORS.grey,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        height: 80
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
        name="challenge" 
        options={{ 
          title: "위시 탐색소", 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/common/tabbar_wish.png')} 
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
        name="mywish" 
        options={{ 
          title: "나의 위시", 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/common/tabbar_mywish.png')} 
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