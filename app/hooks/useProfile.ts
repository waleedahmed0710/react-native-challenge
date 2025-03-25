import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MENU from '../constants/menu';
import { defaultSettings } from '../constants/profile';

export default function useProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync(MENU.USER_DATA_KEY);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUsername(userData.username || 'User');
          setEmail(userData.email || 'user@example.com');
          setNewUsername(userData.username || 'User');
        }
        const settingsString = await SecureStore.getItemAsync(MENU.USER_SETTINGS_KEY);
        if (settingsString) {
          setSettings(JSON.parse(settingsString));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const saveProfile = async () => {
    try {
      if (!newUsername.trim()) {
        Alert.alert('Error', 'Username cannot be empty');
        return;
      }
      const userDataString = await SecureStore.getItemAsync(MENU.USER_DATA_KEY);
      let userData = userDataString ? JSON.parse(userDataString) : {};
      userData = {
        ...userData,
        username: newUsername,
      };
      await SecureStore.setItemAsync(MENU.USER_DATA_KEY, JSON.stringify(userData));
      setUsername(newUsername);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile changes');
    }
  };

  const toggleSetting = async (setting: keyof typeof defaultSettings) => {
    try {
      const newSettings = {
        ...settings,
        [setting]: !settings[setting],
      };
      setSettings(newSettings);
      await SecureStore.setItemAsync(MENU.USER_SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error(`Error toggling ${setting}:`, error);
      Alert.alert('Error', 'Failed to update setting');
    }
  };

  const handleSignOut = async () => {
    try {
      await SecureStore.deleteItemAsync(MENU.USER_DATA_KEY);
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  };

  return {
    username,
    email,
    isEditing,
    newUsername,
    settings,
    setNewUsername,
    setIsEditing,
    saveProfile,
    toggleSetting,
    handleSignOut,
  };
}
