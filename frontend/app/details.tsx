import { Text, View, ScrollView, StatusBar, TouchableOpacity  } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import PageHeader from '@/components/PageHeader';
import DescriptionSection from '@/components/DescriptionSection';
import SizesSection from '@/components/SizesSection';
import DetailsHeader from '@/components/DetailsHeader';

const DetailsPage = () => {
  const { name, image_path, type, description, price, rating } = useLocalSearchParams() as { name: string, image_path: string, type: string, description: string, price: string, rating: string };
  return (
      <GestureHandlerRootView
        className='bg-[#F9F9F9] w-full h-full'
      >
        <PageHeader title="Detail" showHeaderRight={true} bgColor='#F9F9F9' />
        
        <View className='h-full flex-col justify-between'>
          <ScrollView>
              <View className='mx-5 items-center'>
                <DetailsHeader image_path={image_path} name={name} type={type} rating={Number(rating)} />
                <DescriptionSection description={description} />
                <SizesSection />
              </View>
          </ScrollView>
          
          <View
            className='flex-row justify-between bg-white rounded-tl-3xl rounded-tr-3xl px-6 pt-3 pb-6'
          > 
            <View>
              <Text
                      className="text-[#A2A2A2] text-base font-[Sora-Regular] pb-3"
                >Price
              </Text>
              <Text
                      className="text-app_orange_color text-2xl font-[Sora-SemiBold]"
                >$ {price}
              </Text>
            </View>
              
            <TouchableOpacity 
                  className="bg-app_orange_color w-[70%] rounded-3xl items-center justify-center" 
                >
                  <Text className="text-xl color-white font-[Sora-Regular]">Buy Now</Text> 
            </TouchableOpacity> 
          
          </View>
          
        </View>
        
          
      </GestureHandlerRootView>
    )
};

export default DetailsPage;
