import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DeliveryToggle: React.FC = () => {
  const [isDelivery, setIsDelivery] = useState(true);

  // Reusable function to determine dynamic styles
  const getButtonStyle = (selected: boolean) =>
    `py-1 px-[15%] font-[Sora-SemiBold] rounded-xl ${selected ? 'bg-[#C67C4E]' : ''}`;

  const getTextStyle = (selected: boolean) =>
    `text-lg ${selected ? 'text-white' : 'text-black'}`;

  return (
    <View className="flex-row justify-between bg-[#EDEDED] mx-7 p-1 rounded-xl mt-7">
      <TouchableOpacity className={getButtonStyle(isDelivery)} onPress={() => setIsDelivery(true)}>
        <Text className={getTextStyle(isDelivery)}>Deliver</Text>
      </TouchableOpacity>

      <TouchableOpacity className={getButtonStyle(!isDelivery)} onPress={() => setIsDelivery(false)}>
        <Text className={getTextStyle(!isDelivery)}>Pick Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryToggle;
