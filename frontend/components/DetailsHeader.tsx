import { Text, View, Image } from 'react-native';
import React from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface DetailsHeaderInterface {
  image_path: string;
  name: string;
  type: string;
  rating: number;
}

const DetailsHeader = ({ image_path, name, type, rating }: DetailsHeaderInterface) => {
  return (
    <>
      {/* Image Section */}
      <Image source={{ uri: image_path}} className="w-full h-48 rounded-2xl mt-2" />

      {/* Details Section */}
      <View className="mt-4 px-2">
        <Text className="text-[#242424] text-2xl font-[Sora-SemiBold] mb-1">{name}</Text>

        <View className="flex-row w-full justify-between items-center mb-4">
          <Text className="text-[#A2A2A2] text-sm font-[Sora-Regular]">{type}</Text>

          {/* Icon Section */}
          <View className="flex-row">
            <View className="bg-[#F5F5F5] p-2 rounded-xl mr-2">
              <MaterialIcons name="delivery-dining" size={24} color="#C67C4E" />
            </View>

            <View className="bg-[#F5F5F5] p-2 rounded-xl mr-2">
              <FontAwesome name="coffee" size={24} color="#C67C4E" />
            </View>

            <View className="bg-[#F5F5F5] p-2 rounded-xl">
              <MaterialCommunityIcons name="food-croissant" size={24} color="#C67C4E" />
            </View>
          </View>
        </View>

        {/* Rating Section */}
        <View className="flex-row items-center">
          <Octicons name="star-fill" size={24} color="#FBBE21" />
          <Text className="pl-2 text-xl font-[Sora-SemiBold] text-[#2A2A2A]">{rating}</Text>
        </View>

        {/* Divider */}
        <View className="w-full items-center mt-4">
          <View className="w-[90%] border-b border-gray-300" />
        </View>
      </View>
    </>
  );
};

export default DetailsHeader;
