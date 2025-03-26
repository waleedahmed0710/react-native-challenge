import React, { useState, useCallback } from 'react';
import { Tabs, usePathname } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import TaskModal from '../components/modals/TaskModal';
import COLORS from '../constants/colors';
import styles from '../styles/layout.styles';

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const currentPath = usePathname();

  const toggleMenu = useCallback(() => {
    setMenuVisible(prev => !prev);
  }, []);

  const toggleTaskModal = useCallback(() => {
    setTaskModalVisible(prev => !prev);
  }, []);

  return (
    <>
      <Menu
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        currentPath={currentPath}
      />
      <TaskModal isVisible={taskModalVisible} onClose={() => setTaskModalVisible(false)} />
      <View style={StyleSheet.absoluteFill}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarStyle: {
              borderTopColor: COLORS.lightGray,
              borderTopWidth: 1,
              elevation: 0,
              height: 60,
              position: 'relative',
            },
          }}
        >
          <Tabs.Screen
            name="home/index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="tasks" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="categories/index"
            options={{
              title: 'Categories',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="shape" size={size} color={color} />
              ),
            }}
          />
        </Tabs>

        <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
          <Ionicons name="menu" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addTaskButton} onPress={toggleTaskModal}>
          <Entypo name="add-to-list" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </>
  );
}
