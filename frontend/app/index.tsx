import React from 'react';
import { Text, SafeAreaView, ImageBackground, View } from 'react-native';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/index_bg_image.png')}
          style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ flex: 1, justifyContent: 'center', width: '80%', paddingTop: 500}}>
            <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>
              Fall in Love with Coffee in Blissful Delight!
            </Text>

            <Text style={{ paddingTop: 12, color: '#A2A2A2', textAlign: 'center', fontSize: 16, fontFamily: 'Sora-Regular' }}>
              Welcome to our cozy coffee corner, where every cup is a delightful experience for you.
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#C57C3E',
                marginTop: 40,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={()=>{router.push("/(tabs)/home")}}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Sora-SemiBold',
                }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
