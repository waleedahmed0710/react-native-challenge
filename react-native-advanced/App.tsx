import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';


function App(): React.JSX.Element {

  return (
    <View>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#f0f0f0'}
      />
     <SafeAreaView>
      <Text>Hello, World</Text>
     </SafeAreaView>
    </View>
  );
}

export default App;
