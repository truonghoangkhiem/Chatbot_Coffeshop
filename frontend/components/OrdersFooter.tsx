import React from 'react';
import { View, Text } from 'react-native';

interface OrdersFooterProps {
  totalPrice: number;
}

const OrdersFooter: React.FC<OrdersFooterProps> = ({ totalPrice }) => {
  const deliveryFee = totalPrice === 0 ? 0 : 1;

  return (
    <>
      {/* Separator Line */}
      <View className="border-b-4 border-[#F9F2ED] mt-3" />

      {/* Payment Summary Header */}
      <Text className="mx-7 text-[#242424] text-lg font-[Sora-SemiBold] mb-4 mt-4">
        Payment Summary
      </Text>

      {/* Price Section */}
      <View className="flex-row justify-between mx-7 mb-3">
        <Text className="text-base font-[Sora-Regular]">Price</Text>
        <Text className="text-base font-[Sora-SemiBold]">$ {totalPrice}</Text>
      </View>

      {/* Delivery Fee Section */}
      <View className="flex-row justify-between mx-7 pb-8">
        <Text className="text-base font-[Sora-Regular]">Delivery Fee</Text>
        <Text className="text-base font-[Sora-SemiBold]">$ {deliveryFee}</Text>
      </View>
    </>
  );
};

export default OrdersFooter;
