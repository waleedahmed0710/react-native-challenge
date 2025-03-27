import AsyncStorage from '@react-native-async-storage/async-storage';
import { OfflineAction } from '../types';

export const storageKeys = {
  TASKS: 'tasks',
  CATEGORIES: 'categories',
  SETTINGS: 'settings',
  OFFLINE_QUEUE: 'offlineQueue',
};

export const storageService = {
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error(`Error getting item from storage: ${error}`);
      return null;
    }
  },

  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in storage: ${error}`);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage: ${error}`);
    }
  },

  // Offline queue methods
  getOfflineQueue: async (): Promise<OfflineAction[]> => {
    const queue = await storageService.getItem<OfflineAction[]>(storageKeys.OFFLINE_QUEUE);
    return queue || [];
  },

  addToOfflineQueue: async (action: OfflineAction): Promise<void> => {
    const queue = await storageService.getOfflineQueue();
    queue.push(action);
    await storageService.setItem(storageKeys.OFFLINE_QUEUE, queue);
  },

  removeFromOfflineQueue: async (actionId: string): Promise<void> => {
    const queue = await storageService.getOfflineQueue();
    const updatedQueue = queue.filter(action => action.id !== actionId);
    await storageService.setItem(storageKeys.OFFLINE_QUEUE, updatedQueue);
  },

  clearOfflineQueue: async (): Promise<void> => {
    await storageService.setItem(storageKeys.OFFLINE_QUEUE, []);
  },
};

export default storageService;