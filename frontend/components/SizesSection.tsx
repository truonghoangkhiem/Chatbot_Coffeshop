import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const SizesSection = () => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const sizes = ['S', 'M', 'L'];

  const handleSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <View className="p-4">
      <Text className="text-[#242424] text-lg font-[Sora-SemiBold] mb-2">Size</Text>

      <View className="flex-row justify-between mt-2">
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSelect(size)}
            className={`px-4 py-2 rounded-2xl items-center w-[30%] ${
              selectedSize === size
                ? 'bg-[#fdf5f0] border-2 border-app_orange_color'
                : 'bg-white border-2 border-[#ddd]'
            }`}
          >
            <Text
              className={`text-lg font-[Sora-SemiBold] ${
                selectedSize === size ? 'text-app_orange_color' : 'text-[#242424]'
              }`}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SizesSection;
