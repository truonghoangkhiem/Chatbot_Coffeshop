import { Text, View } from 'react-native'
import DeliveryToggle from './DeliveryToggle'
import React from 'react'

const OrdersHeader = () => {
  return (
    <View>
        <DeliveryToggle />

        <Text
        className=" mx-7 mt-7 text-[#242424] text-lg font-[Sora-SemiBold]"
        >
        Delivery Address
        </Text>
        <Text
        className=" mx-7 mt-3 text-[#242424] text-base font-[Sora-SemiBold] mb-2"
        >
        UIT - Gate A
        </Text>
        <Text
        className=" mx-7 text-[#A2A2A2] text-xs font-[Sora-SemiBold] mb-3"
        >
        Han Thuyen Street, Thu Duc, Ho Chi Minh City
        </Text>

        <View className="mx-12 border-b border-gray-400 my-4 " />
    </View>
  )
}

export default OrdersHeader
