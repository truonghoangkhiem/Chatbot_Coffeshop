import { Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from "expo-router";

const DetailsPage = () => {
  const { name, image_path, type, description, price, rating } = useLocalSearchParams() as { name: string, image_path: string, type: string, description: string, price: string, rating: string };
  return (
    <View>
        <Text>DetailsPage</Text>
    </View>
  )
};

export default DetailsPage;
