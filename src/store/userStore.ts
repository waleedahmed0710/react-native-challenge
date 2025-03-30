import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '../types';

// Define the store state interface
interface UserState {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (userData: UserData | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
}

// Create the store with persistence
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Set user data
            setUser: (userData) => set({
                user: userData,
                isAuthenticated: !!userData
            }),

            // Set authentication token
            setToken: (token) => set({
                token,
                isAuthenticated: !!token
            }),

            // Clear all user data and token
            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false
            }),
        }),
        {
            name: 'user-storage', // unique name for storage
            storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for persistence
        }
    )
);