import { View, Text } from 'react-native'
import React from 'react'
import { clientRequest } from '@/services/clientRequest'

export default function Posts() {
  clientRequest("/users");
  return (
    <View>
      <Text>Hello Job World 2</Text>
    </View>
  )
}