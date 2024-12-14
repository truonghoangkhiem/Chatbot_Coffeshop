// Created 7.24, for features inside the tabs
import {StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo'; //7.29
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';//7.31
import { Tabs } from 'expo-router';


const TabsLayout = () => {
    return (
        <>
            <Tabs 
                screenOptions={{
                  tabBarActiveTintColor: "#C67C4E"
                }}
             >
                <Tabs.Screen
                    name='home'
                    options = {{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({color}) => (
                            <Entypo name = "home" size={24} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name='chatRoom'
                    options= {{
                        headerShown: true,
                        title: 'Chat Bot',
                        tabBarStyle: {'display': 'none'},
                        tabBarIcon: ({color}) => (
                            <FontAwesome6 name="robot" size={24} color={color} />
                        )            
                    }}
                />

                <Tabs.Screen
                    name='order'
                    options= {{
                        headerShown: true,
                        title: 'Cart',
                        tabBarStyle: {'display': 'none'},
                        tabBarIcon: ({color}) => (
                            <Entypo name="shopping-cart" size={24} color={color} />
                        )
                    }}
                />

            </Tabs>
        </>
    )
}
export default TabsLayout
const styles = StyleSheet.create({})
