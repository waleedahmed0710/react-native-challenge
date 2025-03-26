import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { USER_KEY, PASSWORD_KEY, USER_DATA_KEY } from '@/services/constants/user';
import * as SecureStore from 'expo-secure-store';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkExistingUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);

      if (userData) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
    }
  };

  useEffect(() => {
    checkExistingUser();
  }, []);

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
      const userData = {
        username,
        createdAt: new Date().toISOString(),
      };
      await SecureStore.setItemAsync(USER_KEY, username);
      await SecureStore.setItemAsync(PASSWORD_KEY, password);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing credentials:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    isLoading,
    handleSignup,
    setUsername,
    setPassword,
  };
};
