//create 8.10
import { Image, Text, View } from 'react-native' 
import React from 'react'
    const Banner = () => {
    return (
        <View
            className='rounded-1g items-center'
        >
        <View
            className='absolute w-full h-[90px] -top-1 items-center bg-[#222222] pb-10'
        />
            <Image
                source={require('../assets/images/banner.png')} // chua chen hinh 8.15
                    className='w-[90%] h-36 rounded-3x1'
            />
        <View
            className='absolute w-[98%] pl-7 mt-2'
        >
            {/* Promo bagde */}
            <Text
                className='bg-[#ED5151] rounded-1g text-white mb-1 text-m p-1.5 font-[Sora-SemiBold] self-start'
            >
                Promo
            </Text>
        
            {/* Promo Title */}
            <View
                className='bg-[#222222] w-[75%] h-7 top-6'
            >
            </View>
            <View
                className='bg-[#222222] w-[75%] h-7 top-9'
            >
            </View>

            <Text
                className='text-white text-4x1 font-[Sora-SemiBold] mt-3 w-[75%] -top-16' 
                style={{lineHeight: 45}}
            >
                Buy one get one FREE
            </Text>
        </View>
    </View>
    )
}