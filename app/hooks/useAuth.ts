import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import UserData from '../types/user';
import SECURE_STORE from '../constants/secureStore';

export default function useAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync(SECURE_STORE.USER_DATA_KEY);

      if (userData) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
    }
  };

  const handleSignup = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const userData: UserData = {
        username,
        createdAt: new Date().toISOString(),
      };

      await SecureStore.setItemAsync(SECURE_STORE.USER_KEY, username);
      await SecureStore.setItemAsync(SECURE_STORE.PASSWORD_KEY, password);
      await SecureStore.setItemAsync(SECURE_STORE.USER_DATA_KEY, JSON.stringify(userData));

      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error storing credentials:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleSignup,
  };
}
