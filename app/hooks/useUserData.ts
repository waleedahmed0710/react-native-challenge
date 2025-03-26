import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import MENU from '@/app/constants/menu';
import SECURE_STORE from '@/app/constants/secureStore';
import { router } from 'expo-router';

export default function useUserData(isVisible: boolean) {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync(MENU.USER_DATA_KEY);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUsername(userData.username);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    if (isVisible) {
      loadUserData();
    }
  }, [isVisible]);

  const handleSignOut = async () => {
    try {
      // Clear all user data
      await SecureStore.deleteItemAsync(MENU.USER_DATA_KEY);
      await SecureStore.deleteItemAsync(SECURE_STORE.USER_KEY);
      await SecureStore.deleteItemAsync(SECURE_STORE.PASSWORD_KEY);

      // Navigate back to the signup page
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    username,
    handleSignOut,
  };
}
