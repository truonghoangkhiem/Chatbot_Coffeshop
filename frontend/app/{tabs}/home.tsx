import { Text, View, Image, FlatList,StatusBar   } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';
import { Product} from '@/types/types';
import { fetchProducts } from '@/services/productService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

const home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProducts = async () => {
          try {
            const productsData = await fetchProducts();
            setProducts(productsData);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        loadProducts();
      }, []);
      if (loading) return <Text>Loading...</Text>;

  return (
    <GestureHandlerRootView>
        <SafeAreaView className='w-full h-full'>
        <FlatList 
            horizontal={false}
            numColumns={2} 
            columnWrapperStyle={{ justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}
            keyExtractor={(item, index) => index.toString()}
            data= {products}

            renderItem={({item}) => (
                    <View 
                      className='w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between'
                    >
                        <TouchableOpacity>
                            <Image 
                                source= {{ uri: item.image_url}}
                                className='w-full h-32 rounded-2xl'
                            />
                        </TouchableOpacity>
                    </View>
            )}
        />
        </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default home

