import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartslice';
import { AppDispatch } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '@/constants/theme';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
}

const ProductDetailScreen: React.FC = () => {
  const { product } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState<number>(1);

  if (!product || typeof product !== 'string') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid product data</Text>
      </View>
    );
  }

  let parsedProduct: Product;
  try {
    parsedProduct = JSON.parse(product);
  } catch (e) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to parse product data</Text>
      </View>
    );
  }

  const totalPrice = (parsedProduct.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...parsedProduct, quantity }));
    router.replace('/(tabs)/profile')
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: parsedProduct.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{parsedProduct.name}</Text>

          {parsedProduct.description && (
            <Text style={styles.description}>{parsedProduct.description}</Text>
          )}

          {parsedProduct.rating !== undefined && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{parsedProduct.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Ionicons name="remove" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.priceText}>R{parsedProduct.price.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Quantity:</Text>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>R{totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={20} color={COLORS.white} />
          <Text style={styles.addToCartText}>Add to Cart - R{totalPrice}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  container: {
    padding: 20,
    paddingBottom: 100, 
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: FONTS.medium,
    color: COLORS.error,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
    lineHeight: 22,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  ratingText: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  quantitySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    marginBottom: 10,
    fontWeight: '600',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    padding: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  quantityText: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    marginHorizontal: 15,
    fontWeight: '600',
  },
  priceSection: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
    paddingTop: 8,
    marginTop: 8,
  },
  priceLabel: {
    fontSize: FONTS.small,
    color: COLORS.primary,
  },
  priceText: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '700',
  },
  totalPrice: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
  },
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
  },
  addToCartText: {
    fontSize: FONTS.small,
    color: COLORS.white,
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
