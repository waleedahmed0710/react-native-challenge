import NetInfo from '@react-native-community/netinfo';

export type NetworkStatus = {
  isConnected: boolean;
  isInternetReachable: boolean | null;
};

export const subscribeToNetworkChanges = (callback: (state: NetworkStatus) => void) => {
  return NetInfo.addEventListener((state) => {
    callback({
      isConnected: !!state.isConnected,
      isInternetReachable: state.isInternetReachable,
    });
  });
};

export const checkNetworkConnectivity = async (): Promise<NetworkStatus> => {
  const state = await NetInfo.fetch();
  return {
    isConnected: !!state.isConnected,
    isInternetReachable: state.isInternetReachable,
  };
};

export default {
  subscribeToNetworkChanges,
  checkNetworkConnectivity,
};