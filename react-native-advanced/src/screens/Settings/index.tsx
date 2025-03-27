import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { setTheme, setDefaultView, selectTheme, selectDefaultView } from '../../store/slices/settingsSlice';
import { clearOfflineQueue, selectOfflineQueue } from '../../store/slices/tasksSlice';
import { checkNetworkConnectivity } from '../../utils/network';
import { storageService } from '../../services/storage';
import { LoadingIndicator } from '../../components/common/LoadingIndicator';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const theme = useSelector(selectTheme);
  const defaultView = useSelector(selectDefaultView);
  const offlineQueue = useSelector(selectOfflineQueue);
  
  const [syncingData, setSyncingData] = useState(false);
  
  const handleThemeToggle = (value: boolean) => {
    dispatch(setTheme(value ? 'dark' : 'light'));
  };
  
  const handleDefaultViewChange = (view: 'all' | 'todo' | 'inProgress' | 'done') => {
    dispatch(setDefaultView(view));
  };
  
  const handleSyncData = async () => {
    const networkStatus = await checkNetworkConnectivity();
    
    if (!networkStatus.isConnected) {
      Alert.alert(
        'Offline',
        'You are currently offline. Please connect to the internet to sync data.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    if (offlineQueue.length === 0) {
      Alert.alert(
        'No Data to Sync',
        'There are no pending changes to synchronize.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    setSyncingData(true);
    
    // Simulate syncing delay (in a real app, this would process the queue)
    setTimeout(() => {
      dispatch(clearOfflineQueue());
      setSyncingData(false);
      
      Alert.alert(
        'Sync Complete',
        `Successfully synchronized ${offlineQueue.length} changes.`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };
  
  const handleClearData = () => {
    Alert.alert(
      'Clear Local Data',
      'Are you sure you want to clear all local data? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await storageService.removeItem('tasks');
            await storageService.removeItem('categories');
            await storageService.removeItem('offlineQueue');
            
            Alert.alert(
              'Data Cleared',
              'All local data has been cleared. Please restart the app.',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };
  
  if (syncingData) {
    return <LoadingIndicator text="Synchronizing data..." fullScreen />;
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="contrast-outline" size={22} color="#666" />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={handleThemeToggle}
            trackColor={{ false: '#e0e0e0', true: '#b39ddb' }}
            thumbColor={theme === 'dark' ? '#6200EE' : '#fff'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Defaults</Text>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => handleDefaultViewChange('all')}
        >
          <View style={styles.settingLabelContainer}>
            <Ionicons name="apps-outline" size={22} color="#666" />
            <Text style={styles.settingLabel}>Default View</Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Text style={styles.settingValue}>
              {defaultView === 'all'
                ? 'All Tasks'
                : defaultView === 'todo'
                ? 'To Do'
                : defaultView === 'inProgress'
                ? 'In Progress'
                : 'Done'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={handleSyncData}
        >
          <View style={styles.settingLabelContainer}>
            <Ionicons name="sync-outline" size={22} color="#666" />
            <View style={styles.settingLabelWithBadge}>
              <Text style={styles.settingLabel}>Sync Data</Text>
              {offlineQueue.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{offlineQueue.length}</Text>
                </View>
              )}
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={handleClearData}
        >
          <View style={styles.settingLabelContainer}>
            <Ionicons name="trash-outline" size={22} color="#B00020" />
            <Text style={[styles.settingLabel, styles.dangerText]}>
              Clear Local Data
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="information-circle-outline" size={22} color="#666" />
            <Text style={styles.settingLabel}>Version</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginVertical: 8,
    marginHorizontal: 16,
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  settingLabelWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  dangerText: {
    color: '#B00020',
  },
  badge: {
    backgroundColor: '#6200EE',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;