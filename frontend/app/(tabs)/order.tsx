import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';

import PageHeader from '@/components/PageHeader';
import ProductList from '@/components/CartProductList';
import { fetchProducts } from '@/services/productService';
import { useCart } from '@/components/CartContext';
import { Product } from '@/types/types';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

const Order: React.FC = () => {
  const { cartItems, SetQuantityCart, emptyCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Calculate the total price
  const calculateTotal = (products: Product[], quantities: { [key: string]: number }): number => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.name] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  // Update total price when cart items or products change
  useEffect(() => {
    setTotalPrice(calculateTotal(products, cartItems));
  }, [cartItems, products]);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError(`Error fetching products: ${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle loading and error states
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  // Handle order placement
  const orderNow = () => {
    emptyCart();
    Toast.show('Order placed successfully!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
    router.push('/thankyou');
  };

  return (
    <GestureHandlerRootView className="bg-[#F9F9F9] w-full h-full">
      <StatusBar backgroundColor="white" />
      <PageHeader title="Order" showHeaderRight={false} bgColor="#F9F9F9" />

      <View className="h-full flex-col justify-between">
        {/* Product List Section */}
        <View className="h-[75%]">
          <ProductList
            products={products}
            quantities={cartItems}
            setQuantities={SetQuantityCart}
            totalPrice={totalPrice}
          />
        </View>

        {/* Footer Section */}
        <View className="bg-white rounded-tl-3xl rounded-tr-3xl px-7 pt-3 pb-6">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="wallet-outline" size={24} color="#C67C4E" />
              <View className="ml-3">
                <Text className="text-[#242424] text-base font-[Sora-SemiBold] pb-1">
                  Cash/Wallet
                </Text>
                <Text className="text-app_orange_color text-sm font-[Sora-SemiBold]">
                  $ {totalPrice === 0 ? 0 : totalPrice + 1}
                </Text>
              </View>
            </View>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </View>

          <TouchableOpacity
            className={`${
              totalPrice === 0 ? 'bg-[#EDEDED]' : 'bg-app_orange_color'
            } w-full rounded-2xl items-center justify-center mt-6 py-3`}
            disabled={totalPrice === 0}
            onPress={orderNow}
          >
            <Text className="text-xl text-white font-[Sora-Regular]">Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Order;
