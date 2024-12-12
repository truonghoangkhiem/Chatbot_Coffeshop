import {Image, Text, View} from 'react-native'
import React, { useEffect, useState} from 'react'
import { Product, ProductCategory } from '@/types/types'
import { fetchProducts } from '@/services/productService';
import {FlatList, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign";
import Banner from '@/components/Banner'; 
import { router } from 'expo-router';
import SearchArea from '@/components/SearchArea";
import { useCart } from '../../components/navigation/Cartcontext';


const Home = () => {
    const {addToCart, cartItems} = useCart();
    const [products, setProducts]= useState<Product[]>([]); 
    const [shownProducts, setshownProducts]= useState<Product[]>([]); 
    const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const uniqueCategories Array.from(productCategories).map((category) => ({ 
            id: category.id,
            selected: selectedCategory === category.id,
            }));
            setProductCategories (uniqueCategories);
            
            if (selectedCategory === 'All') {
                setshownProducts (products);
            } else {
                const filteredProducts = products.filter((product) => product.category === selectedCategory);
                setshownProducts (filteredProducts)
            } // completed 8.38
    },[selectedCategory]);

    useEffect(() => {
        const loadProducts async () => {
            try {
                const productsData = await fetchProucts();

                const categories = productsData.map((product) => product.category); 
                categories.unshift('All');
                const uniqueCategories Array.from(new Set (categories)).map((category) => ({
                    id: category,
                    selected: selectedCategory === category,
                })); //8.25

                setProductCategories (uniqueCategories);

                setProducts (productsData);
                setshownProducts (productsData);
            }   catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();

    },[])

    if (loading) return <Text> 
        Loading...
    </Text> //7.19 
    
    const addButton = (name:string) => { 
        addToCart(name, 1);
        Toast.show(`${name} added to cart`, {
            duration: Toast.durations.SHORT,
    }}// install root toast

    return (
        <GestureHandlerRootView>
            <SafeAreaView
                className= 'w-full h-full'
            >
                <FlatList
                horizontal {false}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between', marginLeft: 15, marginRight : 15}}
                keyExtractor={(item, index) => index.toString()}
                data = {shownProducts}

                renderItem={({item}) => (
                    <View
                        className='w-[48%] mt-2 bg-white rounded-2x1 p-2 flex justify-between' //7.41
                    >
                    <TouchableOpacity
                        onPress={() => { 
                            router.push({
                                pathname: '/details', params: {
                                name: item.name,
                                type: item.category,
                                price: item.price,
                                rating: item.rating,
                                description: item.description,
                                }
                            })
                        }}
                    >
                        <Image
                            className="w-full h-32 rounded-2x1"
                            source={{uri: item.image_url}}
                        />
                        <Text
                            className='text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2'
                        >
                            {item.name}
                        </Text>
                        <Text
                            className='text-[#A2A2A2] text-sm font-[Sora-Reglar] ml-1 mt-2' //7.45
                        >
                            {item.category}
                        </Text>
                    </TouchableOpacity>
                    <View
                        className='flex-row justify-between ml-1 mt-5 mb-2'
                    >
                        <Text
                            className='text-[#050505] text-x1 font-[Sora-SemiBold]'
                        >
                            ${item.price}
                        </Text> //7.48

                        <TouchableOpacity
                            onPress = {() => addButton(item.name)} //8.55
                        >
                            <View
                                className='mr-2 p-2 -mt-1 bg-[#C67C4E] rounded-x1'
                            >
                                <AntDesign name="plus" size=(20) color="white" /> 
                            </View>
                        </TouchableOpacity> //7,50tailwind config.js*/

                        </View>
                    </View> //7.39
                )}

                ListHeaderComponent={() => (
                    <View
                        className='flex'
                    >
                        <SearchArea />
                        <Banner />
                        <View
                            className = 'flex items-center'
                        >
                            <FlatList
                                className='mt-6 w-[90%] mb-2'
                                data ={productCategories}
                                horizontal={true}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => setSelectedCategory(item.id)}
                                    >
                                        <Text
                                            className= {`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg
                                                ${item.selected ? 'text-white': 'text-[#313131]'} 
                                                ${item.selected ? 'bg-app_orange_color': 'bg-[#EDEDED]'}
                                            `}
                                        >
                                            {item.id}
                                        </Text>
                                    </TouchableOpacity>
                        </View>
                    </View>
                )}

            />
            </SafeAreaView>
        </GestureHandlerRootView> //7.35
    )
    }
)
}
export default Home