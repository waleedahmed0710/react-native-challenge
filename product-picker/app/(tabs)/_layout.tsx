import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('screen')

const TabLayout = ()=>{
return(
    <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: '8%',
                paddingHorizontal: 15
            }
         }}>
            <Tabs.Screen
                name='home'
                options={{
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                      <View style={styles.iconContainer}>            
                          <FontAwesome5
                             name={"home"} 
                             size={24} 
                             color={focused? '#0B1320' : '#748c94' } 
                             solid={false}
                          />
                          <Text
                          style={{
                            color: focused ? '#0B1320' : '#748c94',
                            fontSize: 12,
                          }}
                        >
                          Home
                        </Text>
                      </View>
                    ),
                  
                  }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                    <View style={styles.iconContainer}>
                    <FontAwesome5 
                        name={'shopping-cart' } 
                        color={focused? '#0B1320' : '#748c94' }
                        size={24} 
                        solid={false}
                        />
                    <Text
                        style={{
                        color: focused ? '#0B1320' : '#748c94',
                        fontSize: 12,
                        }}
                    >
                        Cart
                    </Text>
                    </View>
                ),
                }}
            />
         </Tabs>
)
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        borderRadius: 10,
        height: '10%',
        shadowColor: '#7F5DF0',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 5,
        width: width * 0.15
      },
      iconStyle: {
        width: 25,
        height: 25,
      },
      shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.7,
        shadowRadius: 0.9,
      },
      
})
export default TabLayout;