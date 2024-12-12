// create 7.59
import {Text, View } from 'react-native' 
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';


const SearchArea = () => {
    return (
        <View
            className='w-full items-center bg-[#222222] pb-6'
        >
        <View
            className='flex w-[98%] pt-8'
        >
            <Text
                    className= 'text-[#A2A2A2] text-sm font-[Sora-Regular]'
                >
                location
            </Text>
            <Text
                className= 'text-white font-[Sora-Regular]'
            >
                Bilzen, Tanjungbalai
            </Text>
        
            <View
                className="w-full mt-5 flex-row justify-between'
            >
                <View
                    className= 'flex w-[80%] h-14 px-4 bg-[#2A2A2A] rounded-2x1 focus:border-secondary justify-center'
                >
                    <AntDesign name="search1" size=(24) color="white" />
                </View>
                <TouchableOpacity
                    className='flex-1 w-14 h-14 bg-app_orange_color rounded-2x1 items-center justify-center'
                >
                    <Entypo name="sound-mix" size=(24) color="white" /> 
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}