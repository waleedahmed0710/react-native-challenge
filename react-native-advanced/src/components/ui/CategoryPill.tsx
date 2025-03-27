import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Category } from '../../types';

interface CategoryPillProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  size = 'medium',
}) => {
  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return {
          container: { height: 16, paddingHorizontal: 6 },
          text: { fontSize: 10 },
        };
      case 'large':
        return {
          container: { height: 28, paddingHorizontal: 12 },
          text: { fontSize: 14 },
        };
      case 'medium':
      default:
        return {
          container: { height: 22, paddingHorizontal: 8 },
          text: { fontSize: 12 },
        };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const backgroundColor = category.color + '20'; // Adding 20% opacity
  const textColor = category.color;

  return (
    <View style={[styles.container, sizeStyles.container, { backgroundColor }]}>
      <Text style={[styles.text, sizeStyles.text, { color: textColor }]}>
        {category.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});