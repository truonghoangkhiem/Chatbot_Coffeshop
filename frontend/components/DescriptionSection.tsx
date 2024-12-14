import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import React from 'react';

interface DetailsInterface {
  description: string;
}

const DescriptionSection = ({ description }: DetailsInterface) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="p-4 bg-white rounded-lg shadow-md mb-4">
      <Text className="text-[#242424] text-xl font-[Sora-SemiBold] mb-2">
        Description
      </Text>

      <View className="bg-[#F9F9F9] p-4 rounded-lg">
        <Text
          numberOfLines={expanded ? undefined : 3}
          className="text-[#555555] text-sm font-[Sora-Regular] leading-6"
        >
          {expanded ? description : `${description.slice(0, 150)}...`}
        </Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)} className="mt-2 self-end">
          <Text className="text-app_orange_color text-sm font-[Sora-SemiBold]">
            {expanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DescriptionSection;
