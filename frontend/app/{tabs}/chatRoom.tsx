import {Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/PageHeader'

const ChatRoom = () => {
    return (
    <View>
        <PageHeader title="Chatbot" showHeaderRight={false} bgColor='#F9F9F9'/>
        <Text>ChatRoom</Text>
    </View>
    )
}
export default ChatRoom

