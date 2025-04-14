import { COLORS } from '@/constants/theme';
import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R{product.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: COLORS.primary,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.secondary,
  },
});
