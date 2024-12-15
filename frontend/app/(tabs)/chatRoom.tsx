import React, { useEffect, useRef, useState } from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import MessageList from '@/components/MessageList';
import PageHeader from '@/components/PageHeader';
import { useCart } from '@/components/CartContext';
import { callChatBotAPI } from '@/services/chatBot';
import { MessageInterface } from '@/types/types';

const ChatRoom = () => {
  const { addToCart, emptyCart } = useCart();

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const textRef = useRef('');
  const inputRef = useRef<TextInput>(null);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    const message = textRef.current.trim();
    if (!message) return;

    try {
      // Add user message to the list
      const updatedMessages = [...messages, { content: message, role: 'user' }];
      setMessages(updatedMessages);

      // Clear input field
      textRef.current = '';
      inputRef.current?.clear();

      // Indicate typing status
      setIsTyping(true);

      // Call chatbot API
      const responseMessage = await callChatBotAPI(updatedMessages);
      setIsTyping(false);

      setMessages((prevMessages) => [...prevMessages, responseMessage]);

      // Handle response memory (e.g., orders)
      if (responseMessage?.memory?.order) {
        emptyCart();
        responseMessage.memory.order.forEach((item: any) => {
          addToCart(item.item, item.quantity);
        });
      }
    } catch (err: any) {
      Alert.alert('Message', err.message);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 bg-white">
        <PageHeader title="Chat Bot" showHeaderRight={false} bgColor="white" />
        
        <View className="h-3 border-b border-neutral-300" />

        <View className="flex-1 justify-between bg-neutral-100">
          <View className="flex-1">
            <MessageList messages={messages} isTyping={isTyping} />
          </View>

          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between border p-2 bg-white border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChatRoom;
