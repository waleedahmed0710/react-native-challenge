import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { clientRequest } from '@/services/clientRequest'
import Button from '@/components/ui/Button';
import TextInputField from '@/components/ui/TextInputField/intex';
import Loader from '@/components/ui/Loader';

export default function Posts() {
  const [inputText, setInputText] = useState<string>("");

  return (
    <View style={{padding: 10, backgroundColor: "#FFF", flex: 1}}>
      <Text>Hello Job World 2</Text>
      <TextInputField value={inputText} onChangeText={(text) => setInputText(text)} multiline={true} />
      <Loader visible={true} />
    </View>
  )
}