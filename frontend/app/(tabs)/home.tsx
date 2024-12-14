import { Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { fetchProducts } from '@/services/productService';
import { Product } from '@/types/types';

const Home = () => {

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

  if (loading) return <Text>Loading ...</Text>

  return (
  <View>
      <Text>Home</Text>
  </View>
  )
};

export default Home;
