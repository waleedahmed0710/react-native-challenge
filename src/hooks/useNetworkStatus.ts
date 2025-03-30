import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';


export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
        });

        // Subscribe to network changes
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        // Cleanup
        return () => {
            unsubscribe();
        };
    }, []);

    return { isConnected };
};