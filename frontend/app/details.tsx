import {Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import PageHeader from '@/components/PageHeader';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; 

const DetailsPage = () => {
    const {name, image_url, type, description, price, rating} = useLocalSearchParams() as {name:string,image_url:string,type: string, description: string,price:string, rating:string}
    return (
        <GestureHandlerRootView>
            <PageHeader title={"Detail"} showHeaderRight={true} bgColor='#F9F9F9:'/>
            <Text>
                className= 'h-full flex-col justify-between' 
            </Text>
        </GestureHandlerRootView>
    )
}
export default DetailsPage