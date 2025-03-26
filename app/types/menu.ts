export interface MenuItem {
  title: string;
  icon: string;
  iconSet?: 'Ionicons' | 'FontAwesome5';
  onPress: () => void;
  path: string;
}

export interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
  currentPath?: string;
}
