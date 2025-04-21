import { Colors } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Post',
          tabBarIcon: ({color}) => <MaterialCommunityIcons size={28} name="post" color={Colors.indigoDye} />
        }}
      />
      <Tabs.Screen
        name="my_profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({color}) => <MaterialIcons size={28} name="account-circle" color={Colors.indigoDye} />
        }}
      />
    </Tabs>
  );
}
