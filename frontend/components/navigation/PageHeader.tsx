// create 902
import { StyleSheet, Text, View } from 'react-native' 
import React from 'react'
import {router, Stack} from 'expo-router';
import {GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'; 
import { FontAwesome5, Feather } from '@expo/vector-icons';

interface HeaderProps {
    title: string;
    showHeaderRight: boolean;
    bgColor: string;
}

const PageHeader: React.FC<HeaderProps> ({title, showHeaderRight, bgColor}) => { 
    return (
    <Stack.Screen
        options={{
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: bgColor,
            },
            headerTitleAlign: 'center',
    
            headerTitle: () => (
            <Text
                className='text-xl text-[#242424] font-[Sora-SemiBold]'
            >
                {title}
            </Text>
            ),

            headerRight: showHeaderRight ? () => (
                <FontAwesome5
                name='heart'
                style={{marginRight: 10}}
                size= {24}
                color='black'
                />
            ): undefined,
            headerBackVisible: false,

            headerLeft: () => (
                <GestureHandlerRootView
                    className='flex-row items-center gap-4'
                >
                <TouchableOpacity
                    className='pl-2'
                    onPress={() => router.back()}
                >
                    <Feather
                        name='arrow-left'
                        size = {24}
                        color='black'
                    />
                </TouchableOpacity>
                </GestureHandlerRootView>
            )
        }}
    />
    )
}
            