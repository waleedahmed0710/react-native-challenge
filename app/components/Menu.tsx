import React from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import Logo from '@/app/components/Logo';
import { MenuProps } from '@/app/types/menu';
import MENU from '@/app/constants/menu';
import getMenuItems from '@/app/utils/menuItems';
import useMenuAnimations from '@/app/hooks/useMenuAnimations';
import useUserData from '@/app/hooks/useUserData';
import styles from '@/app/styles/menu.styles';

export default function Menu({ isVisible, onClose, currentPath = '' }: MenuProps) {
  const { username, handleSignOut } = useUserData(isVisible);
  const menuItems = getMenuItems(onClose);
  const { animation, opacityAnimation, menuItemAnimations } = useMenuAnimations(
    isVisible,
    menuItems,
  );

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [MENU.width * 0.8, 0],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['3deg', '0deg'],
  });

  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.backdrop, { opacity: opacityAnimation }]}>
        <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={onClose} />
        <Animated.View
          style={[
            styles.drawerContainer,
            {
              transform: [{ translateX }, { scale }, { rotateZ: rotate }],
            },
          ]}
        >
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
                <Animated.View
                  key={index}
                  style={{
                    opacity: menuItemAnimations[index],
                    transform: [
                      {
                        translateX: menuItemAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                      {
                        translateY: menuItemAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, 0],
                        }),
                      },
                    ],
                  }}
                >
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
                </Animated.View>
              ))}

              <Animated.View
                style={{
                  opacity: menuItemAnimations[menuItemAnimations.length - 1],
                  transform: [
                    {
                      translateX: menuItemAnimations[menuItemAnimations.length - 1].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                    {
                      translateY: menuItemAnimations[menuItemAnimations.length - 1].interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={[styles.menuItem, styles.signOutItem]}
                  onPress={handleSignOut}
                >
                  <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
                  <Text style={[styles.menuItemText, styles.signOutText]}>Sign Out</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
