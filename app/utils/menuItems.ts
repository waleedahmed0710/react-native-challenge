import { router } from 'expo-router';
import { Linking } from 'react-native';
import { MenuItem } from '@/app/types/menu';

export default function getMenuItems(onClose: () => void): MenuItem[] {
  return [
    {
      title: 'Home',
      icon: 'tasks',
      iconSet: 'FontAwesome5',
      path: '/(tabs)/home',
      onPress: () => {
        router.push('/(tabs)/home');
        onClose();
      },
    },
    {
      title: 'About',
      icon: 'information-circle',
      iconSet: 'Ionicons',
      path: '/about',
      onPress: () => {
        Linking.openURL('https://github.com/waleedahmed0710/react-native-challenge').catch(err =>
          console.error('Error opening URL:', err),
        );
        onClose();
      },
    },
    {
      title: 'Profile',
      icon: 'person',
      iconSet: 'Ionicons',
      path: '/profile',
      onPress: () => {
        router.push('/profile');
        onClose();
      },
    },
  ];
}
