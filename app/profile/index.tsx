import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, View, TouchableOpacity, ScrollView, TextInput, Switch, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import useProfile from '../hooks/useProfile';
import styles from '@/app/styles/profile.styles';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const {
    username,
    isEditing,
    newUsername,
    settings,
    setNewUsername,
    setIsEditing,
    saveProfile,
    toggleSetting,
    handleSignOut,
  } = useProfile();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{username ? username[0].toUpperCase() : 'U'}</Text>
          </View>
          {!isEditing ? (
            <Text style={styles.username}>{username}</Text>
          ) : (
            <TextInput
              style={styles.usernameInput}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="Enter username"
              autoFocus
            />
          )}
        </View>
        <View style={styles.actions}>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={20} color={COLORS.white} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity
                style={[styles.editActionButton, styles.cancelButton]}
                onPress={() => {
                  setNewUsername(username);
                  setIsEditing(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.editActionButton, styles.saveButton]}
                onPress={saveProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={20} color={COLORS.gray} />
            <Text style={styles.infoLabel}>Username:</Text>
            <Text style={styles.infoValue}>{username}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="trash-outline" size={20} color={COLORS.gray} />
              <Text style={styles.settingLabel}>Auto Delete Completed Tasks</Text>
            </View>
            <Switch
              trackColor={{ false: '#d0d0d0', true: COLORS.alternate }}
              thumbColor={settings.autoDeleteCompleted ? COLORS.primary : '#f4f3f4'}
              ios_backgroundColor="#d0d0d0"
              onValueChange={() => toggleSetting('autoDeleteCompleted')}
              value={settings.autoDeleteCompleted}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="list-outline" size={20} color={COLORS.gray} />
              <Text style={styles.settingLabel}>Compact View</Text>
            </View>
            <Switch
              trackColor={{ false: '#d0d0d0', true: COLORS.alternate }}
              thumbColor={settings.compactView ? COLORS.primary : '#f4f3f4'}
              ios_backgroundColor="#d0d0d0"
              onValueChange={() => toggleSetting('compactView')}
              value={settings.compactView}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoItem}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() =>
              Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Sign Out',
                  style: 'destructive',
                  onPress: async () => {
                    const success = await handleSignOut();
                    if (success) {
                      router.replace('/');
                    }
                  },
                },
              ])
            }
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
