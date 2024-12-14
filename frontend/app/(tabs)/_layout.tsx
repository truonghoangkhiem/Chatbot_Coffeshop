import { Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
  <>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#C67C4E',
          }}
        >
          <Tabs.Screen 
            name='home'
            options={{
              headerShown: false,
              title: 'Home',
            }}
          />

          <Tabs.Screen 
            name='chatRoom'
            options={{
              headerShown: true,
              tabBarStyle: { display: 'none' },
              title: 'Chat Bot',
            }}
          />

      <Tabs.Screen 
            name='order'
            options={{
              headerShown: true,
              tabBarStyle: { display: 'none' },
              title: 'Cart',
            }}
          />
        </Tabs>
      </>
  )
};

export default TabsLayout;
