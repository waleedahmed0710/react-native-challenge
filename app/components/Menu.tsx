import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import Logo from '@/app/components/Logo';
import { MenuProps } from '@/app/types/menu';
import getMenuItems from '@/app/utils/menuItems';
import useUserData from '@/app/hooks/useUserData';
import styles from '@/app/styles/menu.styles';

export default function Menu({ isVisible, onClose, currentPath = '' }: MenuProps) {
  const { username, handleSignOut } = useUserData(isVisible);
  const menuItems = getMenuItems(onClose);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={onClose} />
        <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Logo size="medium" />
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.userSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{username ? username[0].toUpperCase() : 'U'}</Text>
              </View>
              <Text style={styles.userName}>{username}</Text>
            </View>

            <View style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={[styles.menuItem, isActive(item.path) && styles.activeMenuItem]}
                    onPress={item.onPress}
                  >
                    {item.iconSet === 'FontAwesome5' ? (
                      <FontAwesome5
                        name={item.icon}
                        size={24}
                        color={isActive(item.path) ? COLORS.primary : COLORS.gray}
                      />
                    ) : (
                      <Ionicons
                        name={item.icon as keyof typeof Ionicons.glyphMap}
                        size={24}
                        color={isActive(item.path) ? COLORS.primary : COLORS.gray}
                      />
                    )}
                    <Text
                      style={[
                        styles.menuItemText,
                        isActive(item.path) && styles.activeMenuItemText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    {isActive(item.path) && <View style={styles.activeIndicator} />}
                  </TouchableOpacity>
                </View>
              ))}

              <View>
                <TouchableOpacity
                  style={[styles.menuItem, styles.signOutItem]}
                  onPress={handleSignOut}
                >
                  <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
                  <Text style={[styles.menuItemText, styles.signOutText]}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}
